<!--
 * @Description: 
 * @Date: 2024-08-01 11:53:40
 * @LastEditTime: 2024-08-01 16:13:03
-->
<template>
  <card title="快捷入口" :content-style="{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }">
    <div v-for="menu in quickEnter" :key="menu.title">
      <div class="quick-menu" @click="router.push(menu.link)">
        <!-- <el-icon>
          <Edit />
        </el-icon> -->
        <img :src="menu.icon" />
        <span>{{ menu.title }}</span>
      </div>
    </div>
  </card>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import Card from "./Card.vue";
import icon1 from "@/assets/images/kj1.png";
import icon2 from "@/assets/images/kj2.png";
import icon3 from "@/assets/images/kj3.png";
import icon4 from "@/assets/images/kj4.png";
import icon5 from "@/assets/images/kj5.png";
import icon6 from "@/assets/images/kj6.png";

const router = useRouter();

const quickEnter = [
  {
    icon: icon1,
    title: "会员管理",
    link: "/member/manage"
  },
  {
    icon: icon2,
    title: "实名管理",
    link: "/member/realname"
  },
  {
    icon: icon3,
    title: "余额管理",
    link: "/member/balance"
  },
  {
    icon: icon4,
    title: "币种管理",
    link: "/otc/coin"
  },
  {
    icon: icon5,
    title: "币币设置",
    link: "/coins/setting"
  },
  {
    icon: icon6,
    title: "控盘机器人",
    link: "/coins/robot"
  }
];
</script>

<style scoped lang="scss">
.quick-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px;
  cursor: pointer;
  span {
    margin-top: 15px;
  }
}
img {
  width: 54px;
  height: 54px;
}
</style>
