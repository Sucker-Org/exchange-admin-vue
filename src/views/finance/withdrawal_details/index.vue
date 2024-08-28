<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-06-06 14:51:42
-->
<template>
  <div class="table-box">
    <pro-table :columns="config.tableColumns(coinTypeOptions)" :request-api="fetchData" />
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/finance";
import { getCoinTypeOptions } from "@/api/modules/options";
import { useTableFetch } from "@/hooks";
import { ref } from "vue";
import * as config from "./config";

const coinTypeOptions = ref<{ label: string; value: string }[]>([]);

const { fetchData } = useTableFetch(service.getWithdrawalReviewByPage);

const getCoinsOptions = () => {
  getCoinTypeOptions().then(res => {
    coinTypeOptions.value = res.data
      .map(option => ({ label: option.unit, value: option.name != "全部" ? option.unit : "" }))
      .reverse();
  });
};

getCoinsOptions();
</script>
