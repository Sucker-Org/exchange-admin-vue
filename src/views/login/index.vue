<!--
 * @Description: 
 * @Date: 2024-04-07 09:54:32
 * @LastEditTime: 2024-05-14 16:24:11
-->
<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <SwitchDark class="dark" />
      <div class="login-left">
        <img class="login-left-img" src="@/assets/images/login_left.png" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="@/assets/images/logo.svg" alt="" />
          <h2 class="logo-text">Huidu-Exchange</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="login">
import SwitchDark from "@/components/SwitchDark/index.vue";
import LoginForm from "./components/LoginForm.vue";
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
