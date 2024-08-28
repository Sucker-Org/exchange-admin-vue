<!--
 * @Description: 
 * @Date: 2024-04-07 09:54:32
 * @LastEditTime: 2024-06-13 13:34:11
-->
<template>
  <div class="table-box">
    <ProTable ref="proTableRef" title="角色列表" row-key="id" :indent="20" :columns="columns" :request-api="getTableData">
      <template #tableHeader>
        <el-button type="primary" icon="circle-plus" @click="onActions('create')">添加角色</el-button>
      </template>
      <template #status="{ row }">
        <el-switch
          v-model="statusMap[row.id]"
          :loading="row.id == currEditId ? switchLoading : false"
          :active-text="row.id == currEditId && switchLoading ? '停用中' : '启用'"
          :inactive-text="row.id == currEditId && switchLoading ? '启用中' : '停用'"
          :before-change="async () => await statusBeforeChange(!statusMap[row.id], row.id)"
          inline-prompt
        />
      </template>
      <template #operation="{ row }">
        <el-button type="success" icon="search" size="small" @click="onActions('view', row)"> 查看 </el-button>
        <el-button type="primary" icon="edit-pen" size="small" @click="onActions('update', row)"> 编辑 </el-button>
        <pro-button type="danger" icon="delete" size="small" tip="确定要删除吗？" @click="onDelRole(row.id)"> 删除 </pro-button>
      </template>
    </ProTable>
    <el-dialog
      v-model="dialog.open"
      width="30%"
      :title="dialog.title"
      @open="proFormRef.clearValidate()"
      @close="
        () => {
          selectedMenuIds = [];
          roleFormEntity = {};
          dialog.isView = false;
          treeRef.setCheckedKeys([]);
        }
      "
    >
      <pro-form
        ref="proFormRef"
        v-model="roleFormEntity"
        label-position="top"
        :show-action="false"
        :required="true"
        :readonly="dialog.isView"
        :items="formItems"
      >
        <template #rules-input-box>
          <el-tree
            ref="treeRef"
            style="flex: 1"
            :data="menus"
            :default-checked-keys="selectedMenuIds"
            node-key="id"
            show-checkbox
            highlight-current
            @check="getCheckedMenuKeys"
          />
        </template>
      </pro-form>
      <template v-if="!dialog.isView" #footer>
        <div class="dialog-footer">
          <el-button @click="dialog.open = false">取消</el-button>
          <el-button :loading="dialog.loading" type="primary" @click="onSaveBtn"> 保存 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="roles">
import * as service from "@/api/modules/role";
import { ColumnProps } from "@/components/ProTable/interface";
import { ProFormItem } from "@/components/ProForm";
import { useTableFetch } from "@/hooks";
import { useAuthStore } from "@/stores/modules/auth";
import { ElMessage, ElMessageBox } from "element-plus";
import { computed, reactive, ref } from "vue";
const proTableRef = ref();

const treeRef = ref();

const dialog = reactive({
  open: false,
  title: "",
  loading: false,
  isView: false
});

const statusMap = reactive<{ id?: boolean }>({});

const currEditId = ref("");

const switchLoading = ref(false);

const proFormRef = ref();

const roleFormEntity = ref<{ [x: string]: any }>({});

const selectedMenuIds = ref([]);

const authStore = useAuthStore();

const { fetchData } = useTableFetch(service.getRoleByPage);

const getTableData = async params => {
  const res = await fetchData(params);
  if (res.data.list.length) {
    res.data.list.forEach(role => {
      if (role.id) {
        statusMap[role.id] = role.status == 0 ? true : false;
      }
    });
  }
  return res;
};

const menus = computed(() => {
  const menusStructureProcessing = menus => {
    return menus.map(menu => ({
      id: menu.id,
      label: menu.meta.title,
      children: menusStructureProcessing(menu.children ?? []),
      disabled: dialog.isView
    }));
  };
  return menusStructureProcessing(authStore.showMenuListGet);
});

// 表格配置项
const columns: ColumnProps[] = [
  { prop: "roleName", label: "角色名称", search: { el: "input" } },
  {
    prop: "status",
    label: "状态",
    search: {
      el: "select"
    },
    enum: [
      { label: "启用", value: 0 },
      { label: "停用", value: 1 }
    ]
  },
  { prop: "operation", label: "操作", width: 250, fixed: "right" }
];
const formItems: ProFormItem[] = [
  {
    label: "角色名称:",
    field: "roleName"
  },
  {
    label: "状态:",
    field: "status",
    type: "select",
    options: [
      { label: "启用", value: 0 },
      { label: "停用", value: 1 }
    ]
  },
  {
    label: "分配菜单:",
    field: "rules"
  }
];

const onDelRole = id => {
  service.delRole(id).then(() => {
    ElMessage.success("删除成功");
    proTableRef.value.getTableList();
  });
};

const onActions = (type: "create" | "view" | "update", row: Record<string, any> = {}) => {
  enum Title {
    "create" = "添加",
    "view" = "查看",
    "update" = "编辑"
  }
  if (type != "create") {
    roleFormEntity.value = row;
    selectedMenuIds.value = row.rules.split(",");
  }
  if (type == "view") {
    dialog.isView = true;
  }
  dialog.title = Title[type];
  dialog.open = true;
};

const getCheckedMenuKeys = (...args) => {
  console.log(args, "args");
  selectedMenuIds.value = args[1].checkedKeys;
  roleFormEntity.value.rules = selectedMenuIds.value.join(",");
  treeRef.value.setCheckedKeys(selectedMenuIds.value);
};

const statusBeforeChange = async (isEnable, id) => {
  if (isEnable) {
    return startUpdateStatus(id, isEnable);
  }

  return await ElMessageBox.confirm("确定要停用吗?", "提示", {
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
  currEditId.value = id;
  switchLoading.value = true;
  try {
    await service.updateRoleStatus(id, isEnable ? 0 : 1);
    return Promise.resolve(true);
  } finally {
    switchLoading.value = false;
    proTableRef.value.getTableList();
  }
};

const onSaveBtn = () => {
  proFormRef.value.validate(valid => {
    if (!valid) {
      return ElMessage.warning("表单验证未通过~");
    }
    sendSaveRequest();
  });
};

const sendSaveRequest = () => {
  const serviceName = roleFormEntity.value.id ? "updateRole" : "addRole";
  dialog.loading = true;
  service[serviceName](roleFormEntity.value)
    .then(() => {
      ElMessage.success("保存成功");
      dialog.open = false;
      proTableRef.value.getTableList();
    })
    .finally(() => {
      dialog.loading = false;
    });
};
</script>
