<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-06-06 13:55:35
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns" :request-api="fetchData">
      <template #type="{ row }">
        <span>{{ TransactionTypeEnum[row.type] }}</span>
      </template>
      <template #operation="{ row }">
        <el-button size="small" type="success" @click="handleShowDetail(row)">查看邀请人数</el-button>
      </template>
    </pro-table>
    <pro-dialog-page v-model="dialog.open" title="邀请人数">
      <div style="height: 60vh">
        <pro-table ref="proDetailTableRef" :columns="config.detailTableColumns" :request-api="getDetailData" />
      </div>
    </pro-dialog-page>
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/invitation";
import { TransactionTypeEnum } from "@/enums";
import { useTableFetch } from "@/hooks";
import { reactive, ref } from "vue";
import * as config from "./config";
const proDetailTableRef = ref();
const dialog = reactive({
  open: false,
  loading: false,
  id: "",
  detail: {}
});

const proTableRef = ref();

const { fetchData } = useTableFetch(service.getInviteList);

const getDetailData = async params => {
  const res = await service.getInfo({ page: params.pageNum, limit: params.pageSize, id: dialog.id });
  return {
    data: {
      ...res.data,
      list: res.data.content,
      total: res.data.totalElements
    }
  };
};
const handleShowDetail = async row => {
  dialog.open = true;
  dialog.id = row.id;
  if (proDetailTableRef.value) {
    proDetailTableRef.value.getTableList();
  }
};
</script>
