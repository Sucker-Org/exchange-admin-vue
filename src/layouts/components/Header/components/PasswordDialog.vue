<!--
 * @Description: 
 * @Date: 2024-04-07 09:54:32
 * @LastEditTime: 2024-05-29 11:33:14
-->
<template>
  <pro-form-dialog
    v-model="dialogVisible"
    title="修改密码"
    width="30%"
    :request="submit"
    :form-items="[
      {
        label: '原密码:',
        field: 'oldPassword',
        required: true
      },
      {
        label: '新密码:',
        field: 'newPassword',
        required: true
      }
    ]"
  />
</template>

<script setup lang="ts">
import { updateCurrLoginPassword } from "@/api/modules/other";
import { ElMessage } from "element-plus";
import { ref } from "vue";

const dialogVisible = ref(false);
const openDialog = () => {
  dialogVisible.value = true;
};

const submit = data => {
  updateCurrLoginPassword(data).then(() => {
    ElMessage.success("保存成功");
    dialogVisible.value = false;
  });
};

defineExpose({ openDialog });
</script>
