<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-06-18 11:38:38
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns" :request-api="getTableData">
      <template #tableHeader>
        <el-button type="success" icon="promotion" @click="onExport">导出</el-button>
      </template>
      <template v-for="key in Object.keys(switchMap)" :key="key" #[key]="{ row }">
        <el-switch
          v-model="switchMap[key].values[row.id]"
          :loading="row.id == currEditId ? switchMap[key].loading : false"
          :active-text="row.id == currEditId && switchMap[key].loading ? '请求中' : key == 'status' ? '正常' : '允许'"
          :inactive-text="row.id == currEditId && switchMap[key].loading ? '请求中' : key == 'status' ? '非法' : '禁止'"
          :before-change="async () => await switchBeforeChange(key as any, row, !switchMap[key].values[row.id])"
          inline-prompt
        />
      </template>
      <template #operation="{ row }">
        <el-space>
          <el-button type="success" icon="search" size="small" @click="onActions('view', row)"> 详情 </el-button>
          <el-button type="primary" icon="plus" size="small" @click="onActions('invite', row)"> 增加邀请关系 </el-button>
          <pro-button
            :disabled="row.loginStatus !== 1"
            type="danger"
            icon="bottom"
            size="small"
            tip="确定要强制下线吗?"
            @click="onActions('offline', row)"
          >
            强制下线
          </pro-button>
        </el-space>
      </template>
    </pro-table>
    <detail-dialog v-model="dialog.open" :row-data="currRow" />
    <pro-form-dialog
      v-model="dialog.openInvite"
      title="增加邀请关系"
      width="30%"
      :form-items="[
        { label: 'ID:', field: 'id', type: 'text', initialValue: currRow.id },
        { label: '设置邀请人的ID:', field: 'inviterId', required: true }
      ]"
      :request="submitInvite"
    />
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/member";
import { useDownload, useTableFetch } from "@/hooks";
import { ElMessage, ElMessageBox } from "element-plus";
import { reactive, ref } from "vue";
import DetailDialog from "./DetailDialog/index.vue";
import * as config from "./config";

const proTableRef = ref();

const filterParams = ref({});

const currEditId = ref("");

const switchMap = reactive<Record<string, { loading: boolean; values: { [id: string]: boolean } }>>({
  status: {
    loading: false,
    values: {}
  },
  canOtc: {
    loading: false,
    values: {}
  },
  canRecharge: {
    loading: false,
    values: {}
  },
  canWithdraw: {
    loading: false,
    values: {}
  },
  transactionStatus: {
    loading: false,
    values: {}
  }
});

const dialog = reactive({
  open: false,
  openInvite: false,
  inviteForm: {}
});

const currRow = ref<{ [x: string]: any }>({});

const { fetchData } = useTableFetch(service.getMemberByPage);

const getTableData = async params => {
  if (params.registrationTime) {
    params["startTime"] = params.registrationTime[0];
    params["endTime"] = params.registrationTime[1];
    delete params.registrationTime;
  }

  filterParams.value = params;

  const res = await fetchData(params);
  if (res.data.list.length) {
    res.data.list.forEach(item => {
      if (item.id) {
        switchMap.status.values[item.id] = item.status == 0 ? true : false;
        switchMap.canOtc.values[item.id] = item.canOtc == 0 ? false : true;
        switchMap.canRecharge.values[item.id] = item.canRecharge == 0 ? false : true;
        switchMap.canWithdraw.values[item.id] = item.canWithdraw == 0 ? false : true;
        switchMap.transactionStatus.values[item.id] = item.transactionStatus == 0 ? false : true;
      }
    });
  }
  return res;
};

const onExport = () => {
  useDownload(service.memberExport, `会员信息`, filterParams.value);
};

const switchBeforeChange = async (key: keyof typeof switchMap, row, isTips: boolean) => {
  if (isTips) {
    return updateStatus(key, row);
  }

  return await ElMessageBox.confirm(`确定要设置为${key == "status" ? "非法状态" : "禁止"}吗?`, "提示", {
    type: "warning",
    cancelButtonText: "否",
    confirmButtonText: "是"
  })
    .then(() => updateStatus(key, row))
    .catch(() => {
      return false;
    });
};

const updateStatus = (key: keyof typeof switchMap, row) => {
  currEditId.value = row.id;
  enum ServiceName {
    canOtc = "updateOtcProhibit",
    canRecharge = "updateRechargeProhibit",
    canWithdraw = "updateWithdrawProhibit",
    status = "updateStatus",
    transactionStatus = "updateTransactionStatus"
  }
  switchMap[key].loading = true;
  service[ServiceName[key]]({
    memberId: row.id,
    status: row[key] == 0 ? 1 : 0
  })
    .then(() => {
      ElMessage.success("操作成功");
      proTableRef.value.getTableList();
    })
    .finally(() => {
      switchMap[key].loading = false;
    });
};

const onActions = (type: "view" | "invite" | "offline", row) => {
  if (type === "offline") {
    return service.forceUserOffline(row.id).then(() => {
      ElMessage.success("下线成功");
      proTableRef.value.getTableList();
    });
  }

  currRow.value = row;

  if (type == "view") {
    dialog.open = true;
  } else {
    dialog.openInvite = true;
  }
};

const submitInvite = entity => {
  service.addInviter({ id: entity.id, inviterId: entity.inviterId }).then(() => {
    dialog.openInvite = false;
    ElMessage.success("已保存");
  });
};
</script>
