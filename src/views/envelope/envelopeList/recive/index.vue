<!--
 * @Author: sjd shi_junda@outlook.com
 * @Date: 2024-05-07 15:14:47
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-05-31 21:16:15
 * @FilePath: \exchange-admin-vue\src\views\envelope\envelopeList\recive\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <!-- <pro-dialog-page v-model="dialog.open" title="红包领取详情">
  </pro-dialog-page> -->
  {{ props.detail }}
  <el-form ref="dialogRef" label-width="200px" style="width: 800px; margin: 0 auto; margin-left: calc(50% - 450px)"> </el-form>
</template>
<script setup lang="ts">
// import { reactive } from "vue";
const props = defineProps({
  detail: {
    type: Object,
    default: () => ({})
  }
});
</script>
