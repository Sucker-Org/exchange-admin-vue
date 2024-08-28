<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-06-03 11:04:21
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns(tranTypeOptions)" :request-api="fetchData">
      <template #type="{ row }">
        <span>{{ TransactionTypeEnum[row.type] }}</span>
      </template>
    </pro-table>
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/finance";
import { getTransactionTypeOptions } from "@/api/modules/options";
import { TransactionTypeEnum } from "@/enums";
import { useTableFetch } from "@/hooks";
import { ref } from "vue";
import * as config from "./config";

const proTableRef = ref();

const tranTypeOptions = ref<{ label: string; value: number }[]>([]);

const { fetchData } = useTableFetch(service.getTransactionOrFeeByPage, params => {
  if (params.createTime) {
    params["startTime"] = params.createTime[0];
    params["endTime"] = params.createTime[1];
    delete params.createTime;
  }

  return params;
});

const getTranTypeOptions = () => {
  getTransactionTypeOptions().then(res => {
    tranTypeOptions.value = res.data.map(option => ({ label: option.name, value: option.id }));
  });
};

getTranTypeOptions();
</script>
