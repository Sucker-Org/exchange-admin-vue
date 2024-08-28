<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-06-28 16:03:05
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns(coinTypeOptions)" :request-api="fetchData">
      <template #tableHeader>
        <pro-button
          type="danger"
          icon="closeBold"
          tip="确定不通过吗?"
          :disabled="!proTableRef?.selectedListIds.length"
          @click="onAudit(false, proTableRef?.selectedListIds)"
        >
          一键审核不通过
        </pro-button>
        <!-- <pro-button
          type="success"
          icon="position"
          tip="确定要放币吗?"
          :disabled="!proTableRef?.selectedListIds.length"
          @click="onStartReleaseCoins"
        >
          一键放币
        </pro-button> -->
      </template>
      <template #operation="{ row }">
        <el-button v-if="row.status" type="success" size="small" icon="search" @click="onTableAction(row)">查看</el-button>
        <el-button v-else type="primary" size="small" icon="reading" @click="onTableAction(row)">审核</el-button>
      </template>
    </pro-table>
    <pro-dialog-page
      v-model="dialogOpen"
      title="审核详情"
      @on-close="
        () => {
          currRow = {};
          detail = {};
        }
      "
    >
      <template v-if="!detail.isAuto" #header-tools>
        <template v-if="detail?.status == 0">
          <pro-button type="danger" icon="closeBold" size="small" tip="确定不通过吗?" @click="onAudit(false, [detail.id])">
            不通过
          </pro-button>
          <pro-button type="success" icon="select" size="small" @click="onAudit(true, [detail.id])">通过</pro-button>
        </template>
        <!-- <template v-if="detail?.status == 1">
          <pro-button type="danger" icon="position" size="small" tip="确定要放币吗?" @click="onStartReleaseCoins">
            开始放币
          </pro-button>
        </template> -->
      </template>
      <el-steps :active="detail?.status" simple>
        <el-step title="待审核" />
        <el-step title="转账中" icon="refresh" />
        <el-step v-if="detail?.status == 2" title="交易失败" icon="closeBold" />
        <el-step v-else title="交易成功" icon="select" />
      </el-steps>
      <pro-descriptions title="提币信息" :data="detail" :items="config.descriptionsItems" :column="4" style="margin-top: 20px" />
      <pro-descriptions title="交易记录" style="margin-top: 10px">
        <pro-table
          ref="tranRecordsTableRef"
          :height="600"
          :columns="config.transactionRecords(tranTypeOptions)"
          :request-api="params => (currRow.id ? tarnRecord.fetchData({ id: currRow.id, ...params }) : void 0)"
        />
      </pro-descriptions>
    </pro-dialog-page>
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/finance";
import { getCoinTypeOptions, getTransactionTypeOptions } from "@/api/modules/options";
import { useTableFetch } from "@/hooks";
import { ElMessage } from "element-plus";
import { ref, watch } from "vue";
import * as config from "./config";

const proTableRef = ref();

const tranRecordsTableRef = ref();

const currRow = ref<Record<string, any>>({});

const detail = ref<Record<string, any>>({});

const dialogOpen = ref(false);

const coinTypeOptions = ref<{ label: string; value: string }[]>([]);

const tranTypeOptions = ref<{ label: string; value: number }[]>([]);

const { fetchData } = useTableFetch(service.getWithdrawalReviewByPage);

const tarnRecord = useTableFetch(service.getWithdrawDetailTarnRecordById);

const getCoinsOptions = () => {
  getCoinTypeOptions().then(res => {
    coinTypeOptions.value = res.data
      .map(option => ({ label: option.unit, value: option.name != "全部" ? option.unit : "" }))
      .reverse();
  });
};

getCoinsOptions();

const getTranTypeOptions = () => {
  getTransactionTypeOptions().then(res => {
    tranTypeOptions.value = res.data.map(option => ({ label: option.name, value: option.id }));
  });
};

getTranTypeOptions();

const onTableAction = row => {
  currRow.value = row;
  dialogOpen.value = true;
  tranRecordsTableRef.value?.getTableList();
};

const onAudit = (pass, ids) => {
  service.withdrawAudit({ pass, ids, remark: "" }).then(() => {
    ElMessage.success("审核成功");
    proTableRef.value.getTableList();
    if (dialogOpen.value) {
      dialogOpen.value = false;
    }
  });
};

//TODO 放币api对接
// const onStartReleaseCoins = () => {
//   ElMessage.warning("敬请期待");
// };

watch(
  () => dialogOpen.value,
  () => {
    if (dialogOpen.value) {
      service.getWithdrawDetailById(currRow.value?.id).then(res => {
        detail.value = res.data;
      });
    }
  }
);
</script>
