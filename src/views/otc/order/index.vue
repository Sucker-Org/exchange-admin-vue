<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-06-13 14:40:59
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="tableColumns" :request-api="fetchData">
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
import { getCoinTypeOptions } from "@/api/modules/options";
import * as service from "@/api/modules/otc";
import { useTableFetch } from "@/hooks";
import { computed, reactive, ref } from "vue";
import * as config from "./config";

const proTableRef = ref();

const coinTypeOptions = ref<{ label: string; value: string }[]>([]);

const dialog = reactive({
  open: false,
  detail: {}
});

const tableColumns = computed(() => config.tableColumns(coinTypeOptions));

const { fetchData } = useTableFetch(service.getOrderPage, params => {
  if (params.createTime) {
    params["startTime"] = params.createTime[0];
    params["endTime"] = params.createTime[1];
    delete params.createTime;
  }
  return params;
});

const getCoinsOptions = () => {
  getCoinTypeOptions().then(res => {
    coinTypeOptions.value = res.data
      .map(option => ({ label: option.unit, value: option.name != "全部" ? option.unit : "" }))
      .reverse();
  });
};

getCoinsOptions();

const onView = row => {
  dialog.detail = row;
  dialog.open = true;
};
</script>
