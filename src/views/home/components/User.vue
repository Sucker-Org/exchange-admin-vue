<!--
 * @Description: 
 * @Date: 2024-08-01 11:51:50
 * @LastEditTime: 2024-08-01 17:03:03
-->
<template>
  <card :content-style="{ height: '100%', placeItems: 'unset' }">
    <el-space :size="15" style="justify-content: flex-end">
      <span>{{ dayjs().format("YYYY.MM.DD") }}</span>
      <span>{{ day }}</span>
    </el-space>
    <el-space :size="24">
      <el-avatar :size="96" :icon="UserFilled" :src="Avatar" />
      <el-space :size="17" :direction="'vertical'" alignment="flex-start">
        <h3>{{ userInfo.username }}，早上好！</h3>
        <div class="realName">{{ userInfo.realName }}</div>
      </el-space>
    </el-space>
  </card>
</template>

<script setup lang="ts">
import Avatar from "@/assets/images/avatar.gif";
import { useUserStore } from "@/stores/modules/user";
import { UserFilled } from "@element-plus/icons-vue";
import dayjs from "dayjs";
import { computed } from "vue";
import Card from "./Card.vue";

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);

const day = computed(() => {
  const capital = ["一", "二", "三", "四", "五", "六", "日"];
  const lowercase = +dayjs().day() - 1;
  return `星期${capital[lowercase]}`;
});
</script>

<style scoped lang="scss">
h3 {
  margin: 0;
  font-size: 20px;
}
.realName {
  width: 66px;
  height: 23px;
  font-size: 14px;
  font-weight: 500;
  line-height: 23px;
  color: #027afc;
  text-align: center;
  background: rgb(2 122 252 / 10%);
  border-radius: 2px;
}
.card {
  box-sizing: border-box;
  padding: 35px;
  background: url("@/assets/images/yhbg.png") no-repeat;
  background-size: 100% 100%;
}
</style>
