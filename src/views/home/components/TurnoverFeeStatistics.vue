<!--
 * @Description: 
 * @Date: 2024-08-01 11:44:38
 * @LastEditTime: 2024-08-05 16:22:17
-->
<template>
  <card :content-style="{ height: '330px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }">
    <template #title>
      <el-radio-group v-model="params.type" @change="getData">
        <el-radio-button :value="0">成交量统计</el-radio-button>
        <el-radio-button :value="2">手续费统计</el-radio-button>
      </el-radio-group>
    </template>
    <template #extra>
      <div>
        <el-date-picker
          v-model="params.date"
          type="daterange"
          start-placeholder="开始"
          end-placeholder="结束"
          value-format="YYYY-MM-DD"
          style="width: 220px"
          @change="getData"
        />
      </div>
    </template>
    <echarts
      width="calc(100% - 350px)"
      :option="{
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          icon: 'rect',
          bottom: 0,
          itemWidth: 11,
          itemHeight: 11
        },
        grid: {
          left: 0,
          right: 0,
          bottom: 50,
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
          type: 'value'
        },
        series: seriesData
      }"
      @init-success="
        instance => {
          chartRef = instance;
          instance.showLoading();
        }
      "
    />
    <el-space :size="20" :direction="'vertical'">
      <div class="list-item" v-for="item in list" :key="item.title" :style="{ background: item.color }">
        <el-space>
          <img :src="item.icon" />
          <div class="text">
            <p>{{ item.title }}</p>
            <h2>{{ item.value }}</h2>
          </div>
        </el-space>
      </div>
    </el-space>
  </card>
</template>

<script setup lang="ts">
import { getTurnoverFeeStatistics } from "@/api/modules/home";
import Icon1 from "@/assets/images/sl1.png";
import Icon2 from "@/assets/images/sl2.png";
import Icon3 from "@/assets/images/sl3.png";
import { reactive, ref } from "vue";
import Card from "./Card.vue";

const chartRef = ref();

const params = reactive<{ type: 0 | 2; date: string[] }>({
  type: 0,
  //date: [dayjs().format("YYYY-MM-DD"), dayjs().format("YYYY-MM-DD")]
  date: ["2018-08-05", "2028-09-13"]
});

const xAxisData = ref([]);

const seriesData = ref([
  {
    type: "line",
    name: "USDT充值数量",
    data: []
  },
  {
    type: "line",
    name: "CNHD充值数量",
    data: []
  },
  {
    type: "line",
    name: "HDC充值数量",
    data: []
  }
]);

const list = ref([
  {
    title: "USDT累计充值数量",
    value: "1231232.53",
    icon: Icon1,
    color: "#f4fcf8"
  },
  {
    title: "CNHD累计充值数量",
    value: "1231232.53",
    icon: Icon2,
    color: "#f2f8ff"
  },
  {
    title: "HDC累计充值数量",
    value: "1231232.53",
    icon: Icon3,
    color: "#fefaf6"
  }
]);

const getData = () => {
  chartRef.value?.showLoading();
  getTurnoverFeeStatistics({ type: params.type, start: params.date[0], end: params.date[1] })
    .then((res: any) => {
      list.value[0].value = res.data.usdt;
      list.value[1].value = res.data.cnhd;
      list.value[2].value = res.data.hdc;
      const data = res.data.items?.sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());
      xAxisData.value = data.map(item => item.day);
      seriesData.value[0].data = data.map(item => item.usdt);
      seriesData.value[1].data = data.map(item => item.cnhd);
      seriesData.value[2].data = data.map(item => item.hdc);
    })
    .finally(() => {
      chartRef.value?.hideLoading();
    });
};

getData();
</script>

<style scoped lang="scss">
.list-item {
  width: 260px;
  padding: 16px 18px;
  border-radius: 5px;
  img {
    width: 50px;
    height: 50px;
  }
  p,
  h2 {
    margin: 0;
  }
  p {
    font-size: 14px;
    color: #666666;
  }
  h2 {
    font-size: 22px;
  }
  .text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 50px;
  }
}
</style>
