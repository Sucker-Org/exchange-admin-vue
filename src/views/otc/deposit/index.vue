<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-05-13 11:58:24
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns" :request-api="fetchData" />
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/otc";
import { useTableFetch } from "@/hooks";
import { ref } from "vue";
import * as config from "./config";

const proTableRef = ref();

const { fetchData } = useTableFetch(service.getDepositRecordByPage, params => {
  if (params.createTime) {
    params["startDate"] = params.createTime[0];
    params["endDate"] = params.createTime[1];
    delete params.createTime;
  }

  return params;
});
</script>
