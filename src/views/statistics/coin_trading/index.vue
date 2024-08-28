<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-06-05 10:39:29
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns(coinTypeOptions)" :request-api="fetchData">
      <template #type="{ row }">
        <span>{{ TransactionTypeEnum[row.type] }}</span>
      </template>
    </pro-table>
  </div>
</template>

<script setup lang="ts">
import { getTransactionPairsOptions } from "@/api/modules/options";
import * as service from "@/api/modules/statistics";
import { TransactionTypeEnum } from "@/enums";
import { useTableFetch } from "@/hooks";
import { ref } from "vue";
import * as config from "./config";

const proTableRef = ref();

const coinTypeOptions = ref<{ label: string; value: string }[]>([]);

const { fetchData } = useTableFetch(service.getCoinTransactionStatistics, params => {
  if (params.date) {
    params["startTime"] = params.date[0];
    params["endTime"] = params.date[1];
    delete params.date;
  }

  return {
    ...params,
    type: 1
  };
});

const getCoinsOptions = () => {
  getTransactionPairsOptions().then(res => {
    coinTypeOptions.value = res.data.map(option => ({ label: option.name, value: option.name != "全部" ? option.name : "" }));
  });
};

getCoinsOptions();
</script>
