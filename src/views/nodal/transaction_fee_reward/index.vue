<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-06-05 14:39:22
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns" :request-api="fetchData">
      <template #tableHeader>
        <el-button type="success" icon="promotion" @click="onExport">导出</el-button>
      </template>
    </pro-table>
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/nodal";
import { useDownload, useTableFetch } from "@/hooks";
import { ref } from "vue";
import * as config from "./config";

const proTableRef = ref();

const filterParams = ref({});

const { fetchData } = useTableFetch(service.getTransactionFeeRewardByPage, params => {
  if (params.memberPhone) {
    params["phone"] = params.memberPhone;
    delete params.memberPhone;
  }

  if (params.createTime) {
    params["startTime"] = params.createTime[0];
    params["endTime"] = params.createTime[1];
    delete params.createTime;
  }

  filterParams.value = params;

  return params;
});

const onExport = () => {
  useDownload(service.chargeAwardRecordExport, `交易手续费奖励`, filterParams.value);
};
</script>
