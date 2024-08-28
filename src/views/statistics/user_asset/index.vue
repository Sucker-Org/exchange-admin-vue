<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-07-01 13:41:16
-->
<template>
  <div class="table-box">
    <pro-table
      ref="proTableRef"
      :columns="config.tableColumns(coinTypeOptions, initParam.type === '2')"
      :init-param="initParam"
      :request-api="fetchData"
    >
      <template #tableHeader>
        <el-radio-group v-model="initParam.type">
          <el-radio-button value="1">实时总资产</el-radio-button>
          <el-radio-button value="2">历史资产统计</el-radio-button>
        </el-radio-group>
      </template>
      <template #totalBalanceDif="{ row }">
        <Difference :value="row.totalBalanceDif" />
      </template>
      <template #canUseBalanceDif="{ row }">
        <Difference :value="row.canUseBalanceDif" />
      </template>
      <template #frozenBalanceDif="{ row }">
        <Difference :value="row.frozenBalanceDif" />
      </template>
    </pro-table>
  </div>
</template>

<script setup lang="tsx">
import { getCoinTypeOptions } from "@/api/modules/options";
import * as service from "@/api/modules/statistics";
import { useTableFetch } from "@/hooks";
// import { formatMoney } from "@/utils";
import { transformConsecutiveChar } from "@/utils/transform";
import { CaretBottom, CaretTop } from "@element-plus/icons-vue";
import { ref } from "vue";
import * as config from "./config";

const proTableRef = ref();

const initParam = ref({ type: "1" });

const coinTypeOptions = ref<{ label: string; value: string }[]>([]);

const { fetchData } = useTableFetch(service.getUserAssetStatistics, params => {
  if (params.date) {
    params["startTime"] = params.date[0];
    params["endTime"] = params.date[1];
  }

  delete params.date;

  return params;
});

const getCoinsOptions = () => {
  getCoinTypeOptions().then(res => {
    coinTypeOptions.value = res.data
      .map(option => ({ label: option.unit, value: option.name != "全部" ? option.unit : "" }))
      .reverse();
  });
};

const Difference = (props: any) => {
  const value = transformConsecutiveChar(props.value, { match: "0", min: 4, convert: "{length}" });
  const sign = Math.sign(+props.value?.replace?.(/,/g, ""));
  return (
    <el-text type={sign == 1 ? "success" : sign == -1 ? "danger" : "info"}>
      {value}
      {sign !== 0 && <el-icon>{sign == 1 ? <CaretTop /> : <CaretBottom />}</el-icon>}
    </el-text>
  );
};

getCoinsOptions();
</script>
