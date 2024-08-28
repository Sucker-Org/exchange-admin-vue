<!--
 * @Description: 
 * @Date: 2024-05-11 11:27:27
 * @LastEditTime: 2024-06-14 17:19:40
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns" :request-api="fetchData">
      <template #smallImageUrl="{ row }">
        <el-image
          style="width: 50px; height: 50px"
          :preview-src-list="[row.bannerImageUrl ? row.bannerImageUrl : row.smallImageUrl]"
          :src="row.smallImageUrl"
          preview-teleported
        />
      </template>
      <template #status="{ row }">
        <el-tag v-if="row.status === 1" type="success">显示</el-tag>
        <el-tag v-else type="info">隐藏</el-tag>
      </template>
      <template #operation="{ row }">
        <el-button size="small" type="success" @click="onDetail(row)">查看活动订单</el-button>
      </template>
    </pro-table>
    <pro-dialog-page v-model="dialog.open" :title="dialog.title">
      <detail v-if="dialog.open" ref="detailRef" :open-type="dialog.type" :id="dialog.id" />
    </pro-dialog-page>
  </div>
</template>
<script setup lang="ts">
import * as service from "@/api/modules/activity/order";
import { ref } from "vue";
import * as config from "./config";
import detail from "./lockedActivList/index.vue";
const dialog = ref({
  open: false,
  type: "add",
  title: "",
  id: null,
  detail: {}
});
const proTableRef = ref();

const onDetail = async row => {
  dialog.value.open = true;
  dialog.value.type = "detail";
  dialog.value.title = "锁仓活动订单";
  dialog.value.id = row.id;
};
const fetchData = async () => {
  const res = await service.getLockedList();
  return {
    data: {
      list: res.data
    }
  };
};
</script>
