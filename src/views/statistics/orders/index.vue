<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-07-22 09:58:11
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns(coinTypeOptions)" :request-api="fetchData" />
  </div>
</template>

<script setup lang="ts">
import { getTransactionPairsOptions } from "@/api/modules/options";
import * as service from "@/api/modules/statistics";
import { useTableFetch } from "@/hooks";
import { ref } from "vue";
import * as config from "./config";

const proTableRef = ref();

const coinTypeOptions = ref<{ label: string; value: string }[]>([]);

const { fetchData } = useTableFetch(service.getOrderByPage, params => {
  if (params.robot === void 0) {
    params.robot = 1;
  }

  return params;
});

const getCoinsOptions = () => {
  getTransactionPairsOptions().then(res => {
    coinTypeOptions.value = res.data.map(option => ({ label: option.name, value: option.name != "全部" ? option.name : "" }));
  });
};

getCoinsOptions();
</script>
