<!--
 * @Description: 
 * @Date: 2024-08-01 11:57:50
 * @LastEditTime: 2024-08-01 15:53:24
-->
<template>
  <card title="当前在线人数" :content-style="{ placeItems: 'unset' }">
    <el-space style="justify-content: space-around; padding: 10px 10px 0" :size="20">
      <el-space :size="10" :direction="'vertical'" alignment="flex-start">
        <img src="@/assets/images/zx1.png" />
        <div class="dec">当前在线人数</div>
        <el-space :size="3" alignment="flex-end" class="num">
          <p>{{ data.currentNum }}</p>
          <span>人</span>
        </el-space>
      </el-space>
      <el-space :size="10" :direction="'vertical'" alignment="flex-start">
        <img src="@/assets/images/zx2.png" />
        <div class="dec">过去10分钟在线人数</div>
        <el-space :size="3" alignment="flex-end" class="num">
          <p>{{ data.lastTenNum }}</p>
          <span>人</span>
        </el-space>
      </el-space>
      <el-space :size="10" :direction="'vertical'" alignment="flex-start">
        <img src="@/assets/images/zx3.png" />
        <div class="dec">过去60分钟在线人数</div>
        <el-space :size="3" alignment="flex-end" class="num">
          <p>{{ data.lastHourNum }}</p>
          <span>人</span>
        </el-space>
      </el-space>
    </el-space>
  </card>
</template>

<script setup lang="ts">
import { getCurrentOnline } from "@/api/modules/home";
import { ref } from "vue";
import Card from "./Card.vue";

const data = ref<Record<string, any>>({});

const getData = () => {
  getCurrentOnline({}).then(res => {
    data.value = res.data;
  });
};

getData();
</script>

<style scoped lang="scss">
p {
  margin: 0;
}
img {
  width: 38px;
  height: 38px;
}
.dec {
  font-size: 14px;
  color: #666666;
}
.num {
  /* line-height: 19px; */
  font-weight: 600;
  p {
    font-size: 26px;
    line-height: 24px;
    color: #000000;
  }
  span {
    font-size: 14px;
    color: #000000;
  }
}
</style>
