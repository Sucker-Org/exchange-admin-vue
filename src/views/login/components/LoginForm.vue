<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" placeholder="用户名">
        <template #prefix>
          <el-icon class="el-input__icon">
            <user />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="loginForm.password" type="password" placeholder="密码" show-password autocomplete="new-password">
        <template #prefix>
          <el-icon class="el-input__icon">
            <lock />
          </el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-space style="flex: 1">
        <el-input v-model="loginForm.code" placeholder="验证码" />
        <img class="code-img" :src="codeImgSrc" alt="验证码" @click="refreshCodeImage" />
      </el-space>
    </el-form-item>
  </el-form>
  <div class="login-btn">
    <el-button :icon="CircleClose" round size="large" @click="resetForm(loginFormRef)"> 重置 </el-button>
    <el-button :icon="UserFilled" round size="large" type="primary" :loading="loading" @click="login(loginFormRef)">
      登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { Login } from "@/api/interface";
import { getKeyApi, getValidateCodeApi, loginApi } from "@/api/modules/login";
import { HOME_URL } from "@/config";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { useTabsStore } from "@/stores/modules/tabs";
import { useUserStore } from "@/stores/modules/user";
import { getTimeState } from "@/utils";
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import CryptoJS from "crypto-js";
import type { ElForm } from "element-plus";
import { ElNotification } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const tabsStore = useTabsStore();
const keepAliveStore = useKeepAliveStore();

type FormInstance = InstanceType<typeof ElForm>;
const loginFormRef = ref<FormInstance>();
const loginRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
});

const loading = ref(false);
const loginForm = reactive<Omit<Login.ReqLoginForm, "aesUuid">>({
  username: "",
  password: "",
  code: "",
  uuid: ""
});

const codeImgSrc = ref("");

const cryptoPassword = async password => {
  try {
    const res = (await getKeyApi()) as any;
    const secret = CryptoJS.enc.Utf8.parse(res.data?.key);
    return {
      uuid: res.data.aesUuid,
      value: CryptoJS.AES.encrypt(password, secret, {
        iv: CryptoJS.enc.Utf8.parse(""),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      }).toString()
    };
  } catch (err) {
    console.log(err);
  }
};

// login
const login = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (!valid) return;
    const { value, uuid } = (await cryptoPassword(loginForm.password)) as Record<string, string>;
    if (!value || !uuid) {
      return;
    }
    loading.value = true;
    try {
      // 1.执行登录接口
      const { data } = await loginApi({ ...loginForm, password: value, aesUuid: uuid });
      // const { data } = await loginApi({ ...loginForm });
      userStore.setToken(data.token);
      userStore.setUserInfo(data.userInfo.user as any);
      // 2.添加动态路由
      await initDynamicRouter();

      // 3.清空 tabs、keepAlive 数据
      tabsStore.setTabs([]);
      keepAliveStore.setKeepAliveName([]);

      // 4.跳转到首页
      router.push(HOME_URL);
      ElNotification({
        title: getTimeState(),
        message: "欢迎老板登录",
        type: "success",
        duration: 3000
      });
    } catch {
      refreshCodeImage();
    } finally {
      loading.value = false;
    }
  });
};

const refreshCodeImage = () => {
  getValidateCodeApi().then((res: any) => {
    codeImgSrc.value = res.data.code;
    loginForm.uuid = res.data.key;
  });
};

// resetForm
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

onMounted(() => {
  refreshCodeImage();
  // 监听 enter 事件（调用登录）
  document.onkeydown = (e: KeyboardEvent) => {
    e = (window.event as KeyboardEvent) || e;
    if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
      if (loading.value) return;
      login(loginFormRef.value);
    }
  };
});
</script>

<style scoped lang="scss">
@import "../index";
</style>
