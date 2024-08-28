<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-06-28 17:21:07
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns" :request-api="fetchData">
      <template #operation="{ row }">
        <el-button v-if="row.status === 5" type="primary" icon="reading" size="small" @click="onAction('audit', row.id)">
          审核
        </el-button>
        <el-button v-else type="success" icon="search" size="small" @click="onAction('view', row.id)"> 查看 </el-button>
      </template>
    </pro-table>
    <pro-form-dialog v-model="dialog.open" title="详情信息" mode="view" width="30%">
      <pro-descriptions
        v-loading="dialog.loading"
        :title="['退保申请', '用户信息', '交易信息']"
        :items="config.descriptionsItems"
        :data="dialog.detail"
        :column="1"
        :gap="20"
        :label-style="{
          width: '80px',
          fontWeight: 600,
          display: 'inline-flex'
        }"
      />
    </pro-form-dialog>
    <pro-form-dialog v-model="dialog.openAudit" title="退保审核" width="30%" footer-align="center">
      <pro-descriptions
        v-loading="dialog.loading"
        :title="['退保申请', '用户信息', '交易信息']"
        :items="config.descriptionsItems"
        :data="dialog.detail"
        :column="1"
        :gap="20"
        :label-style="{
          width: '80px',
          fontWeight: 600,
          display: 'inline-flex'
        }"
      />
      <el-input
        v-model="dialog.rejectReason"
        type="textarea"
        show-word-limit
        maxlength="100"
        placeholder="不通过原因?"
        style="height: 60px; margin-bottom: 20px"
      />
      <template #footer>
        <pro-button type="danger" tip="确定不通过吗?" @click="onAuditRequest(false)">不通过</pro-button>
        <el-button type="success" @click="onAuditRequest(true)">审核通过</el-button>
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
  open: false,
  openAudit: false,
  loading: false,
  detail: {},
  rejectReason: ""
});

const { fetchData } = useTableFetch(service.getSurrenderByPage);

const onAction = (type: "view" | "audit", id) => {
  if (type === "view") {
    dialog.open = true;
  }
  if (type === "audit") {
    dialog.openAudit = true;
  }
  dialog.loading = true;
  service
    .getSurrenderById(id)
    .then(res => {
      dialog.detail = res.data;
      dialog.detail["id"] = id;
    })
    .finally(() => {
      dialog.loading = false;
    });
};

const onAuditRequest = (result: boolean) => {
  service
    .surrenderReview({
      id: dialog.detail.id,
      success: result,
      reason: result ? "" : dialog.rejectReason
    })
    .then(() => {
      ElMessage.success("审核成功");
      dialog.openAudit = false;
      proTableRef.value.getTableList();
    });
};
</script>

<style scoped lang="scss">
:deep(.el-textarea__inner) {
  height: 100%;
}
</style>
