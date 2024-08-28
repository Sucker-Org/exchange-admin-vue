<!--
 * @Description: 
 * @Date: 2024-08-01 11:57:50
 * @LastEditTime: 2024-08-01 16:28:38
-->
<template>
  <card title="待处理事项">
    <div class="item" v-for="item in data" :key="item.title" :style="{ '--color': item.color }">
      <el-space :size="0" style="cursor: pointer">
        <span class="title">{{ item.title }}</span>
        <span class="valueName">待处理数量：</span>
        <span class="value">{{ item.value }}</span>
      </el-space>
      <div class="detail" @click="router.push(item.link)">
        查看
        <el-icon><ArrowRight /></el-icon>
      </div>
    </div>
  </card>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { getTodoList } from "@/api/modules/home";
import { ArrowRight } from "@element-plus/icons-vue";
import { ref } from "vue";
import Card from "./Card.vue";

const router = useRouter();
const data = ref([
  {
    title: "实名认证",
    color: "#266FE8",
    value: 0,
    link: "/member/realname"
  },
  {
    title: "提币审核",
    color: "#F19B4D",
    value: 0,
    link: "/finance/withdrawals"
  },
  {
    title: "商家审核",
    color: "#32CD80",
    value: 0,
    link: "/otc/business"
  },
  {
    title: "OTC申诉",
    color: "#1594FF",
    value: 0,
    link: "/otc/appeal"
  },
  {
    title: "质押审核",
    color: "#E8B426",
    value: 0,
    link: "/finance/pledge"
  },
  {
    title: "退保审核",
    color: "#6D7FF9",
    value: 0,
    link: "/otc/surrender"
  }
]);

const getData = () => {
  getTodoList({}).then(res => {
    data.value[0].value = res.data.realName;
    data.value[1].value = res.data.outCoin;
    data.value[2].value = res.data.merchant;
    data.value[3].value = res.data.otcAppeal;
    data.value[4].value = res.data.memberLoan;
    data.value[5].value = res.data.deposit;
  });
};

getData();
</script>

<style scoped lang="scss">
.item {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: calc(100% - 30px);
  padding: 30px 15px 20px;
}
.item:not(:last-child) {
  border-bottom: #f5f5f5 solid 1px;
}
.item:first-child {
  padding-top: 15px;
}
.title {
  width: 86px;
  height: 24px;
  margin-right: 12px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  color: #ffffff;
  text-align: center;
  background: var(--color);
  border-radius: 0;
}
.valueName {
  font-size: 14px;
  font-weight: 700;
  color: #191919;
}
.value {
  font-size: 18px;
  font-weight: 700;
  color: var(--color);
}
.detail {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 24px;
  font-size: 14px;
  color: #666666;
  cursor: pointer;
  background: rgb(203 203 203 / 20%);
  border-radius: 2px;
  .el-icon {
    margin-left: 3px;
    color: #666666;
  }
}
</style>
