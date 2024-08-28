<!--
 * @Description: 
 * @Date: 2024-04-07 09:54:32
 * @LastEditTime: 2024-08-05 14:37:00
-->
<template>
  <div class="home grid-container">
    <User class="card-1" />
    <OnlineHeadcountStatistics class="card-2" />
    <QuickEnter class="card-3" />
    <RegisterStatistics class="card-4" />
    <ActiveUserStatistics class="card-5" />
    <Todo class="card-6" />
    <RechargeWithdrawalStatistics class="card-7" />
    <TurnoverFeeStatistics class="card-8" />
    <PlatformNotice class="card-9" />
  </div>
</template>

<script setup lang="ts" name="home">
import {
  ActiveUserStatistics,
  OnlineHeadcountStatistics,
  PlatformNotice,
  QuickEnter,
  RechargeWithdrawalStatistics,
  RegisterStatistics,
  Todo,
  TurnoverFeeStatistics,
  User
} from "./components";
</script>

<style scoped lang="scss">
.home {
  display: grid;
  grid:
    "card1 card1 card1 card2 card2 card2 card2 card2 card3 card3 card3 card3"
    "card1 card1 card1 card2 card2 card2 card2 card2 card3 card3 card3 card3"
    "card4 card4 card4 card4 card5 card5 card5 card5 card3 card3 card3 card3"
    "card4 card4 card4 card4 card5 card5 card5 card5 card6 card6 card6 card6"
    "card7 card7 card7 card7 card7 card7 card7 card7 card6 card6 card6 card6"
    "card7 card7 card7 card7 card7 card7 card7 card7 card6 card6 card6 card6"
    "card7 card7 card7 card7 card7 card7 card7 card7 card6 card6 card6 card6"
    "card7 card7 card7 card7 card7 card7 card7 card7 card9 card9 card9 card9"
    "card8 card8 card8 card8 card8 card8 card8 card8 card9 card9 card9 card9"
    "card8 card8 card8 card8 card8 card8 card8 card8 card9 card9 card9 card9"
    "card8 card8 card8 card8 card8 card8 card8 card8 card9 card9 card9 card9";
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr));
  gap: 10px;

  /* grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr); */
  .card-1 {
    grid-area: card1;
  }
  .card-2 {
    grid-area: card2;
  }
  .card-3 {
    grid-area: card3;
  }
  .card-4 {
    grid-area: card4;
  }
  .card-5 {
    grid-area: card5;
  }
  .card-6 {
    grid-area: card6;
  }
  .card-7 {
    grid-area: card7;
  }
  .card-8 {
    grid-area: card8;
  }
  .card-9 {
    grid-area: card9;
  }
  .card-10 {
    grid-area: card10;
  }
}

@media screen and (width <= 1350px) {
  .home {
    display: unset;
  }
  .card {
    margin-bottom: 5px;
  }
}
</style>
