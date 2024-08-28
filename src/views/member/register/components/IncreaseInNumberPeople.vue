<!--
 * @Description: 
 * @Date: 2024-08-01 11:44:38
 * @LastEditTime: 2024-08-05 17:14:07
-->
<template>
  <card
    title="每日新增人数"
    :content-style="{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }"
  >
    <template #extra>
      <el-radio-group v-model="params.type" @change="getData">
        <el-radio-button :value="1">日线图</el-radio-button>
        <el-radio-button :value="2">月线图</el-radio-button>
      </el-radio-group>
    </template>
    <echarts
      width="100%"
      :option="{
        tooltip: {
          trigger: 'axis',
          backgroundColor: 'rgba(0,0,0,0.5)',
          textStyle: {
            color: '#ffffff'
          }
        },
        legend: {
          icon: 'rect',
          top: 50,
          right: 40,
          orient: 'vertical'
        },
        grid: {
          left: 50,
          right: 230,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: xAxisData,
          axisLabel: {
            align: 'center',
            alignMinLabel: 'left',
            alignMaxLabel: 'right'
          }
        },
        yAxis: {
          type: 'value',
          minInterval: 1
        },
        dataZoom: [
          {
            show: true,
            type: 'slider',
            start: 0,
            end: 100,
            height: 20
          },
          {
            type: 'inside'
          }
        ],
        series: seriesData
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
import { getSignupDetail } from "@/api/modules/home";
import { reactive, ref } from "vue";
import Card from "./Card.vue";

const chartRef = ref();

const xAxisData = ref([]);

const seriesData = ref([
  {
    type: "line",
    name: "新增注册数量",
    data: []
  },
  {
    type: "line",
    name: "新增实名人数",
    data: []
  }
]);

const params = reactive<{ type: 1 | 2 }>({
  type: 1 //1日  2月
});

const getData = () => {
  chartRef.value?.showLoading();
  getSignupDetail(params.type)
    .then((res: any) => {
      const data = res.data?.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      xAxisData.value = data.map(item => item.date);
      console.log(xAxisData.value);

      seriesData.value[0].data = data.map(item => item.totalNum);
      seriesData.value[1].data = data.map(item => item.realNum);
      console.log(seriesData.value);
    })
    .finally(() => {
      chartRef.value?.hideLoading();
    });
};
getData();
</script>

<style scoped lang="scss">
.card {
  margin-top: 10px;
}
</style>
