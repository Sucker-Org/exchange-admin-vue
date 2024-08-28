<!--
 * @Description: 后台广告
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-05-31 18:36:18
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns" :request-api="fetchData">
      <template #operation="{ row }">
        <el-button type="success" icon="search" size="small" @click="onDetail(row)"> 详情 </el-button>
        <pro-button v-if="!row.status" type="danger" icon="bottom" size="small" tip="确定要下架吗?" @click="onWithdraw([row.id])">
          下架
        </pro-button>
      </template>
    </pro-table>
    <pro-dialog-page v-model="dialog.open" title="广告详情" close-mode="button" @on-close="dialog.detail.id = ''">
      <pro-descriptions
        v-loading="dialog.loading"
        title="基础信息"
        :items="config.descriptionsItems"
        :data="dialog.detail"
        :column="5"
      />
      <pro-descriptions title="订单明细" style="margin-top: 10px">
        <div class="pro-table-container">
          <pro-table
            v-if="dialog.detail.id"
            ref="proTableRef"
            :columns="config.detailTableColumns"
            :request-api="async params => await detailFetchData({ ...params, id: dialog.detail.id })"
            :tool-button="false"
            :pagination="true"
          />
        </div>
      </pro-descriptions>
    </pro-dialog-page>
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/otc";
import { useTableFetch } from "@/hooks";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import * as config from "./config";

const proTableRef = ref();

const dialog = reactive<{ [x: string]: any }>({
  open: false,
  loading: false,
  detail: {},
  list: []
});

const { fetchData } = useTableFetch(service.getAdvertiseByPage);

const { fetchData: detailFetchData } = useTableFetch(service.getAdvertiseOrderPage);

const onDetail = row => {
  dialog.detail["id"] = row.id;
  dialog.open = true;
  dialog.loading = true;
  service
    .getAdvertiseById(row.id)
    .then(res => {
      dialog.detail = res.data;
    })
    .finally(() => {
      dialog.loading = false;
    });
};

/**
 * 下架
 */
const onWithdraw = ids => {
  service.advertiseWithdraw(ids).then(() => {
    ElMessage.success("已下架");
    proTableRef.value.getTableList();
  });
};
</script>

<style scoped lang="scss">
.pro-table-container {
  height: 55vh;
}
.pro-table-container > :deep(.card) {
  padding: 0;
  border: 0;
  border-radius: 0;
  box-shadow: unset;
}
</style>
