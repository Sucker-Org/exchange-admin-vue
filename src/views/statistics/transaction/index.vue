<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-06-05 10:37:26
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns(coinOptions)" :request-api="fetchData" />
  </div>
</template>

<script setup lang="ts">
import { getTransactionPairsOptions } from "@/api/modules/options";
import * as service from "@/api/modules/statistics";
import { useTableFetch } from "@/hooks";
import { ref } from "vue";
import * as config from "./config";

const proTableRef = ref();

const coinOptions = ref<{ label: string; value: string }[]>([]);

const { fetchData } = useTableFetch(service.getTransactionByPage, params => {
  if (params.createTime) {
    params["startTime"] = params.createTime[0];
    params["endTime"] = params.createTime[1];
  }

  delete params.createTime;

  return params;
});

const getCoinsOptions = () => {
  getTransactionPairsOptions().then(res => {
    coinOptions.value = res.data.map(option => ({ label: option.name, value: option.name != "全部" ? option.name : "" }));
  });
};

getCoinsOptions();
</script>
