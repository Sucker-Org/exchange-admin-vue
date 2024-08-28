<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-06-13 14:41:45
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
      :loading="dialog.loading"
      mode="view"
      width="30%"
      :initial-value="dialog.detail"
      :form-items="config.detailFormItems"
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
  loading: false,
  detail: {}
});

const tableColumns = computed(() => config.tableColumns(coinTypeOptions));

const { fetchData } = useTableFetch(service.getAppealByPage);

const getCoinsOptions = () => {
  getCoinTypeOptions().then(res => {
    coinTypeOptions.value = res.data
      .map(option => ({ label: option.unit, value: option.name != "全部" ? option.unit : "" }))
      .reverse();
  });
};

const onView = row => {
  dialog.detail = row;
  dialog.open = true;
  // dialog.loading = true;
  // service
  //   .getAdvertiseById(row.id)
  //   .then(res => {
  //     dialog.detail = res.data;
  //   })
  //   .finally(() => {
  //     dialog.loading = false;
  //   });
};

getCoinsOptions();
</script>
