<!--
 * @Description: 00
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-06-03 11:02:36
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns" :request-api="fetchData">
      <template #operation="{ row }">
        <el-button type="success" icon="search" size="small" @click="onView(row)"> 查看 </el-button>
      </template>
    </pro-table>
    <pro-form-dialog
      v-model="dialog.open"
      title="订单信息"
      width="30%"
      mode="view"
      :form-items="config.formItems"
      :initial-value="dialog.detail"
    />
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/finance";
import { useTableFetch } from "@/hooks";
import { reactive, ref } from "vue";
import * as config from "./config";
//
const proTableRef = ref();

const dialog = reactive({
  open: false,
  detail: {}
});

const { fetchData } = useTableFetch(service.getOtcByPage, params => {
  if (params.createTime) {
    params["startTime"] = params.createTime[0];
    params["endTime"] = params.createTime[1];
    delete params.createTime;
  }

  return params;
});

const onView = row => {
  dialog.detail = row;
  dialog.open = true;
};
</script>
