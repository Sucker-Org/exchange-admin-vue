<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-06-13 14:30:28
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="tableColumns" :request-api="getTableData">
      <template #tableHeader>
        <el-button type="primary" icon="circle-plus" @click="onActions('create')">添加用户</el-button>
      </template>
      <template #status="{ row }">
        <el-switch
          v-model="statusMap[row.id]"
          :loading="row.id == detailInfo.id ? switchLoading : false"
          :active-text="row.id == detailInfo.id && switchLoading ? '禁用中' : '正常'"
          :inactive-text="row.id == detailInfo.id && switchLoading ? '启用中' : '禁用'"
          :before-change="async () => await statusBeforeChange(!statusMap[row.id], row.id)"
          inline-prompt
        />
      </template>
      <template #operation="{ row }">
        <el-button type="success" icon="edit-pen" size="small" @click="onActions('view', row)"> 查看 </el-button>
        <el-button type="primary" icon="edit-pen" size="small" @click="onActions('update', row)"> 编辑 </el-button>
        <pro-button type="danger" icon="delete" size="small" tip="确定要删除吗？" @click="onActions('delete', row)">
          删除
        </pro-button>
      </template>
    </pro-table>
    <pro-form-dialog
      width="35%"
      v-model="dialog.open"
      :mode="dialog.mode"
      :form-items="config.formItems(roleOptions)"
      :initial-value="detailInfo"
      :validate="formValidate"
      :request="submit"
      @close="detailInfo = {}"
    />
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/admin";
import { getRoleByPage } from "@/api/modules/role";
import { useTableFetch } from "@/hooks";
import { ElMessage, ElMessageBox } from "element-plus";
import { computed, reactive, ref } from "vue";
import * as config from "./config";

const proTableRef = ref();

const statusMap = reactive<{ id?: boolean }>({});

const detailInfo = ref<Record<string, any>>({});

const switchLoading = ref(false);

const roleOptions = ref<any[]>([]);

const dialog = reactive({
  mode: "create",
  open: false
});

const tableColumns = computed(() => config.tableColumns(roleOptions));

const { fetchData } = useTableFetch(service.getAdminByPage, params => {
  if (params.roleNames) {
    params["roles"] = params.roleNames;
    delete params.roleNames;
  }

  return params;
});

const getTableData = async params => {
  const res = await fetchData(params);
  if (res.data.list.length) {
    res.data.list.forEach(user => {
      if (user.id) {
        statusMap[user.id] = user.status == 0 ? true : false;
      }
    });
  }
  return res;
};

const onActions = (type: "create" | "view" | "update" | "delete", row: Record<string, any> = {}) => {
  if (type != "delete") {
    detailInfo.value = { ...row };
    const role = roleOptions.value?.find(role => role.label == row.roleNames) ?? {};
    detailInfo.value.roleId = role.value;
    dialog.mode = type;
    dialog.open = true;
  } else {
    service.delAdmin(row.id).then(() => {
      ElMessage.success("删除成功");
      proTableRef.value.getTableList();
    });
  }
};

const getRoleOptions = () => {
  getRoleByPage({ page: 1, limit: 9999 }).then((res: any) => {
    roleOptions.value = res.data.content?.map(role => ({
      label: role.roleName,
      value: role.id,
      disabled: role.status === 1
    }));
  });
};

const statusBeforeChange = async (isEnable, id) => {
  if (isEnable) {
    return startUpdateStatus(id, isEnable);
  }

  return await ElMessageBox.confirm("确定要禁用吗?", "提示", {
    type: "warning",
    cancelButtonText: "否",
    confirmButtonText: "是"
  })
    .then(() => startUpdateStatus(id, isEnable))
    .catch(() => {
      return false;
    });
};

const startUpdateStatus = async (id, isEnable) => {
  detailInfo.value.id = id;
  switchLoading.value = true;
  try {
    await service.updateStatus(id, isEnable ? 0 : 1);
    return Promise.resolve(true);
  } finally {
    switchLoading.value = false;
    proTableRef.value.getTableList();
  }
};

const formValidate = async (formRef, entity) => {
  const valid = await formRef.validate();
  if (!valid) {
    return ElMessage.warning("表单验证未通过~");
  }
  const phoneReg = /^1(3|4|5|7|8|9)\d{9}$/;
  if (entity.mobilePhone && !phoneReg.test(entity.mobilePhone)) {
    return ElMessage.warning("手机号格式有误~");
  }
  const emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (entity.email && !emailReg.test(entity.email)) {
    return ElMessage.warning("邮箱格式有误~");
  }
  return true;
};

const submit = entity => {
  const serviceName = entity.id ? "updateAdmin" : "addAdmin";
  service[serviceName](entity).then(() => {
    dialog.open = false;
    proTableRef.value.getTableList();
  });
};

getRoleOptions();
</script>
