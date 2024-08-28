<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-05-23 15:29:18
-->
<template>
  <div>
    <div class="card">
      <pro-descriptions title="图表统计">
        <el-tabs v-model="activeName" @tab-click="tabClick">
          <el-tab-pane v-for="item in tabsOptions" :key="item.name" :label="item.title" :name="item.name">11 </el-tab-pane>
        </el-tabs>
      </pro-descriptions>
    </div>
    <!-- <div class="card" style="margin-top: 10px">2222</div> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const activeName = ref("1");
const tabsOptions = ref([
  {
    title: "币币交易额",
    name: "1"
  },
  {
    title: "平台币币订单量",
    name: "2"
  },
  {
    title: "平台注册量",
    name: "3"
  },
  {
    title: "平台实名量",
    name: "4"
  }
]);
const tabClick = cnt => {
  console.log(cnt);
  console.log(cnt.paneName);
};
</script>

<style scoped lang="scss"></style>
