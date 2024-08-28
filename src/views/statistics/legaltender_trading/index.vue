<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-06-12 10:58:11
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
import { getCoinTypeOptions } from "@/api/modules/options";
import * as service from "@/api/modules/statistics";
import { TransactionTypeEnum } from "@/enums";
import { useTableFetch } from "@/hooks";
import { ref } from "vue";
import * as config from "./config";

const proTableRef = ref();

const coinTypeOptions = ref<{ label: string; value: string }[]>([]);

const { fetchData } = useTableFetch(service.getCoinTransactionStatistics, params => {
  return {
    ...params,
    type: 2
  };
});

const getCoinsOptions = () => {
  getCoinTypeOptions().then(res => {
    coinTypeOptions.value = res.data
      .map(option => ({ label: option.unit, value: option.name != "全部" ? option.unit : "" }))
      .reverse();
  });
};

getCoinsOptions();
</script>
