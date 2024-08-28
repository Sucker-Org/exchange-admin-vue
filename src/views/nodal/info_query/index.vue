<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-06-05 14:38:22
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

const { fetchData } = useTableFetch(service.getInfoQueryByPage, params => {
  if (params.mobilePhone) {
    params["phone"] = params.mobilePhone;
    delete params.mobilePhone;
  }

  if (params.memberFirstTime) {
    params["startTime"] = params.memberFirstTime[0];
    params["endTime"] = params.memberFirstTime[1];
    delete params.memberFirstTime;
  }

  filterParams.value = params;

  return params;
});

const onExport = () => {
  useDownload(service.memberInfoExport, `信息查询`, filterParams.value);
};
</script>
