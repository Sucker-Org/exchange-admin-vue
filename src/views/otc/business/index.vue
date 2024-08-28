<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-06-06 18:20:51
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns" :request-api="fetchData">
      <template #operation="{ row }">
        <el-button
          v-if="row.certifiedBusinessStatus == 1"
          type="warning"
          icon="reading"
          size="small"
          @click="onAction('audit', row.id)"
        >
          审核
        </el-button>
        <el-button v-else type="success" icon="search" size="small" @click="onAction('view', row.id)"> 查看 </el-button>
        <pro-button
          v-if="row.publishAdvertise"
          type="danger"
          icon="CloseBold"
          size="small"
          tip="确定要禁止发布吗?"
          @click="onReleaseStatus(row.memberId, 0)"
        >
          禁止发布
        </pro-button>
        <el-button v-else type="success" icon="Select" size="small" @click="onReleaseStatus(row.memberId, 1)">
          允许发布
        </el-button>
      </template>
    </pro-table>
    <pro-form-dialog
      width="30%"
      v-model="dialog.open"
      footer-align="center"
      :title="dialog.title"
      :loading="dialog.loading"
      :form-items="config.detailFormItems(dialog.title != '商家信息' ? true : false)"
      :form-props="{ readonly: true }"
      :initial-value="dialog.detail"
    >
      <template #footer>
        <template v-if="dialog.title != '商家信息'">
          <el-button type="danger" @click="onAuditRequest(0)">不通过</el-button>
          <el-button type="success" @click="onAuditRequest(1)">审核通过</el-button>
        </template>
      </template>
    </pro-form-dialog>
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/otc";
import { useTableFetch } from "@/hooks";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import * as config from "./config";

const proTableRef = ref();

const dialog = reactive<{ [x: string]: any }>({
  title: "商家信息",
  open: false,
  loading: false,
  detail: {}
});

const { fetchData } = useTableFetch(service.getBusinessByPage, params => {
  if (params.certifiedBusinessCheckTime) {
    params["startTime"] = params.certifiedBusinessCheckTime[0];
    params["endTime"] = params.certifiedBusinessCheckTime[1];
    delete params.certifiedBusinessCheckTime;
  }

  return params;
});

const onAction = (type: "audit" | "view", id: number) => {
  dialog.title = type == "audit" ? "商家审核信息确认" : "商家信息";
  dialog.open = true;
  getDetail(id);
};

const getDetail = id => {
  dialog.loading = true;
  service
    .getBusinessById(id)
    .then(res => {
      dialog.detail = res.data;
    })
    .finally(() => {
      dialog.loading = false;
    });
};

const onAuditRequest = (status: 0 | 1) => {
  service.auditBusiness({ id: dialog.detail.memberId, status }).then(() => {
    ElMessage.success("操作成功");
    dialog.open = false;
    proTableRef.value.getTableList();
  });
};

const onReleaseStatus = (id, status) => {
  service.updateAdvertisingReleaseStatus({ id, status }).then(() => {
    ElMessage.success("操作成功");
    proTableRef.value.getTableList();
  });
};
</script>
