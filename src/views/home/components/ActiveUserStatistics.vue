<!--
 * @Description: 
 * @Date: 2024-08-01 11:41:23
 * @LastEditTime: 2024-08-05 17:18:48
-->
<template>
  <card title="活跃用户数量统计">
    <template #extra>
      <el-radio-group v-model="type" @change="getData">
        <el-radio-button :value="1">日活</el-radio-button>
        <el-radio-button :value="2">月活</el-radio-button>
      </el-radio-group>
    </template>
    <echarts
      :height="300"
      :option="{
        grid: {
          top: 20,
          left: 6,
          right: 6,
          containLabel: true
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          data: data.xAxis
        },
        yAxis: {
          type: 'value'
        },
        dataZoom: [
          {
            show: true,
            type: 'slider',
            start: 0,
            end: 100,
            height: 15
          },
          {
            type: 'inside'
          }
        ],
        series: [
          {
            data: data.series,
            type: 'bar',
            barWidth: '40%',
            itemStyle: { color: '#0079fc' }
          }
        ]
      }"
      @init-success="
        instance => {
          chartRef = instance;
          instance.showLoading();
        }
      "
    />
  </card>
</template>

<script setup lang="ts">
import { getOnlineHistory } from "@/api/modules/home";
import dayjs from "dayjs";
import { reactive, ref } from "vue";
import Card from "./Card.vue";

const type = ref<1 | 2>(1);

const chartRef = ref();

const data = reactive({
  xAxis: [],
  series: []
});

const getData = () => {
  chartRef.value?.showLoading();
  getOnlineHistory(type.value)
    .then((res: any) => {
      console.log(res, "res");
      data.xAxis = res.data.map(item => {
        return type.value === 1 ? dayjs(item.date).format("M.D") : dayjs(item.date).format("YYYY.M");
      });
      data.series = res.data.map(item => item.num);
    })
    .finally(() => {
      chartRef.value?.hideLoading();
    });
};

getData();
</script>

<style scoped lang="scss">
.card {
  height: 400px;
}
</style>
