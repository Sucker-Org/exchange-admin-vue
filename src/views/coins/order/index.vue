<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-07-16 13:48:57
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="tableColumns" :init-param="initParam" :request-api="fetchData">
      <template #tableHeader>
        <el-radio-group v-model="initParam.completed">
          <el-radio-button :value="false">当前委托</el-radio-button>
          <el-radio-button :value="true">历史委托</el-radio-button>
        </el-radio-group>
      </template>
      <template #operation="{ row }">
        <el-button type="success" icon="search" size="small" @click="onView(0, row)"> 详情 </el-button>
        <el-button type="primary" icon="search" size="small" @click="onView(1, row)"> 明细 </el-button>
      </template>
    </pro-table>
    <pro-form-dialog
      v-model="dialog.open"
      title="订单详情"
      mode="view"
      width="fit-content"
      :align-center="true"
      :form-items="config.detailFormItems"
      :form-props="{ gridColumns: 1 }"
      :initial-value="dialog.detail"
    />
    <pro-dialog-page v-model="dialog.openPage" title="订单明细" @on-close="dialog.detailedRecords = []">
      <template v-if="!dialog.detailedRecords.length">
        <el-empty style="margin-top: 100px" />
      </template>
      <template v-else>
        <el-row :gutter="20">
          <el-col v-for="item in dialog.detailedRecords" :key="item.id" :span="6">
            <el-card>
              <template #header>
                <pro-copyable :value="item.orderId" :value-style="{ fontWeight: 600 }" />
              </template>
              <pro-descriptions
                :column="1"
                :data="item"
                :items="[
                  { label: '交易数量:', field: 'amount' },
                  { label: '交易价格:', field: 'price' },
                  { label: '总手续费:', field: 'fee' },
                  { label: '下单时间:', field: 'time' }
                ]"
              >
                <template #amount>
                  <el-text type="primary" style="font-weight: 600">{{ item.amount }}</el-text>
                </template>
                <template #time>
                  {{ formatDate(item.time) || "--" }}
                </template>
              </pro-descriptions>
            </el-card>
          </el-col>
        </el-row>
      </template>
    </pro-dialog-page>
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/coin";
import { getCoinTypeOptions } from "@/api/modules/options";
import { useTableFetch } from "@/hooks";
import { formatDate } from "@/utils/date";
import { computed, reactive, ref } from "vue";
import * as config from "./config";

const proTableRef = ref();

const initParam = ref({
  completed: false
});

const coinTypeOptions = ref<{ label: string; value: string }[]>([]);

const dialog = reactive<Record<string, any>>({
  open: false,
  openPage: false,
  loading: false,
  detail: {},
  detailedRecords: []
});

const tableColumns = computed(() => config.tableColumns(coinTypeOptions));

const { fetchData } = useTableFetch(service.getCoinOrderByPage, params => {
  if (params.time) {
    params["startTime"] = params.time[0];
    params["endTime"] = params.time[1];
  }
  delete params.time;
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

const onView = (type, row) => {
  if (type == 0) {
    dialog.detail = row;
    dialog.open = true;
    return;
  }

  dialog.openPage = true;
  dialog.loading = true;
  service
    .getCoinOrderById(row.orderId)
    .then(res => {
      dialog.detailedRecords = res.data;
    })
    .finally(() => {
      dialog.loading = false;
    });
};
</script>

<style scoped lang="scss">
:deep(.el-card__header) {
  width: 100%;
}
</style>
