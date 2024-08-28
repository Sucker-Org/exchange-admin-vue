<!--
 * @Description: 质押管理
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-06-28 15:57:34
-->
<template>
  <div class="table-box pledge-page">
    <pro-table ref="proTableRef" :columns="config.tableColumns" :request-api="fetchData">
      <template #detailBtn="{ row }">
        <el-button type="success" size="small" icon="view" plain @click="onView(row)">查看</el-button>
      </template>
      <template #operation="{ row }">
        <view v-if="row.status == 2 && !row.canAudit">未到可赎回时间</view>
        <view v-if="row.status == 3">已打款</view>
        <view v-if="row.status == 4">已赎回</view>
        <view v-if="row.status == 5">已拒绝</view>
        <pro-button
          v-if="row.status == 2 && row.canAudit"
          type="primary"
          size="small"
          tip="确定要赎回吗?"
          @click="onAudit(3, row.id)"
        >
          赎回
        </pro-button>
        <pro-button v-if="row.status == 1" type="success" size="small" tip="确定要同意吗?" @click="onAudit(1, row.id)">
          同意
        </pro-button>
        <el-button v-if="row.status == 1" type="danger" size="small" @click="refuse(row)">拒绝</el-button>
      </template>
    </pro-table>
    <el-dialog v-model="openDialog" title="用户收款详情" width="30%">
      <div class="dialog-content">
        <el-space :size="30">
          <el-descriptions :column="1">
            <template v-if="detail.payType == 1">
              <el-descriptions-item label="支付宝账号:">{{ detail?.alipay?.aliNo || "--" }}</el-descriptions-item>
              <el-descriptions-item label="真实姓名:">{{ detail?.alipay?.aliRealName || "--" }}</el-descriptions-item>
            </template>
            <template v-if="detail.payType == 2">
              <el-descriptions-item label="微信账号:">{{ detail?.weChatPay?.wechat || "--" }}</el-descriptions-item>
              <el-descriptions-item label="真实姓名:">{{ detail?.weChatPay?.bankRealName || "--" }}</el-descriptions-item>
            </template>
            <template v-if="detail.payType == 3">
              <el-descriptions-item label="银行类型:">{{ detail?.bankInfo?.bank || "--" }}</el-descriptions-item>
              <el-descriptions-item label="银行卡号:">{{ detail?.bankInfo?.cardNo || "--" }}</el-descriptions-item>
              <el-descriptions-item label="开户支行:">{{ detail?.bankInfo?.branch || "--" }}</el-descriptions-item>
              <el-descriptions-item label="真实姓名:">{{ detail?.bankInfo?.weChatRealName || "--" }}</el-descriptions-item>
            </template>
          </el-descriptions>
          <el-image
            v-if="detail.payType != 3"
            style="width: 180px; height: 180px"
            :src="qrCodeUrl"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="[qrCodeUrl]"
            fit="cover"
          />
        </el-space>
      </div>
    </el-dialog>
    <pro-form-dialog
      v-model="dialog.openApproval"
      title="拒绝"
      :width="'30%'"
      :form-items="config.approvalFormItems"
      :request="submitApproval"
    />
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/finance";
import { useTableFetch } from "@/hooks";
import { computed, reactive, ref } from "vue";
import * as config from "./config";
import { ElMessage } from "element-plus";

const proTableRef = ref();

const openDialog = ref(false);

const detail = ref<{ [x: string]: any }>({});
const dialog = reactive<{ [x: string]: any }>({
  openApproval: false,
  detail: {
    status: 2,
    id: null
  }
});
const { fetchData } = useTableFetch(service.getPledgeByPage, params => {
  if (params.createTime) {
    params["startTime"] = params.createTime[0];
    params["endTime"] = params.createTime[1];
    delete params.createTime;
  }

  return params;
});

const qrCodeUrl = computed(() => {
  if (detail.value.payType == 1) {
    return detail.value?.alipay?.qrCodeUrl;
  }
  if (detail.value.payType == 2) {
    return detail.value?.weChatPay?.qrWeCodeUrl;
  }
  return "";
});

const onView = row => {
  detail.value = row;
  openDialog.value = true;
};

// 同意/赎回
const onAudit = (status, id) => {
  console.log("同意", id);
  service.loanAudit({ id, status }).then(() => {
    ElMessage.success("同意成功");
    proTableRef.value.getTableList();
  });
};
// 拒绝
const refuse = row => {
  console.log(row);
  dialog.openApproval = true;
  dialog.detail.id = row.id;
};
// 拒绝的原因
const submitApproval = data => {
  service.loanAudit({ ...dialog.detail, ...data }).then(() => {
    dialog.openApproval = false;
    dialog.detail.auditStatus = data.isPass ? 2 : 1;
    ElMessage.success("拒绝成功");
    proTableRef.value.getTableList();
  });
};
</script>

<style scoped lang="scss">
.pledge-page {
  :deep(.el-dialog__title) {
    font-weight: 600;
  }
  .dialog-content {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
