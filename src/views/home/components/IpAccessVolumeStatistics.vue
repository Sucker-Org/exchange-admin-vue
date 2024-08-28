<template>
  <card
    title="IP访问量热力图"
    :content-style="{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', height: '500px' }"
  >
    <echarts
      width="60%"
      :map="{
        name: 'china',
        data: chinaMapData
      }"
      :option="{
        geo: {
          map: 'china',
          layoutCenter: ['60%', '70%'],
          // 如果宽高比大于 1 则宽度为 100，如果小于 1 则高度为 100，保证了不超过 100x100 的区域
          layoutSize: 700
          // label: {
          //   show: true
          // }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} (p / km2)'
        },
        itemStyle: {
          areaColor: '#B2E4FF'
        },
        visualMap: {
          min: 0,
          max: 1000,
          text: ['高访问量', '低访问量'],
          realtime: false,
          calculable: true,
          inRange: {
            color: ['#B2E4FF', '#266FE8']
          }
        }
      }"
    />
    <el-space :direction="'vertical'" :size="30">
      <div class="statistics total">
        <span class="text">今日总访问量：</span>
        <span class="value">{{ "120,000" }}</span>
      </div>
      <div class="statistics error">
        <span class="text">今日异常访问量：</span>
        <span class="value">{{ "120,000" }}</span>
      </div>
      <div class="statistics update">
        <span class="text">更新时间：</span>
        <span class="value">{{ "120,000" }}</span>
      </div>
    </el-space>
  </card>
</template>

<script setup lang="ts">
import Card from "./Card.vue";
import chinaMapData from "./china.json";
</script>

<style scoped lang="scss">
.statistics {
  display: flex;
  width: 300px;
  padding: 15px;
  span {
    word-wrap: normal;
  }
}
.total {
  background-color: #f4fcf8;
}
.error {
  background-color: #f2f8ff;
}
.update {
  background-color: #fefaf6;
}
</style>
