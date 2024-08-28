<!--
 * @Description: 
 * @Date: 2024-05-22 10:21:00
 * @LastEditTime: 2024-07-17 15:55:48
-->
<template>
  <template v-if="value && value != '--'">
    <span class="copyable-value" :style="valueStyle ?? {}">{{ value }}</span>
    <el-icon v-show="!isCopySuccess" class="copy-icon" color="var(--el-color-primary)" @click="onCopy">
      <DocumentCopy />
    </el-icon>
    <el-icon v-show="isCopySuccess" color="var(--el-color-success)">
      <Select />
    </el-icon>
  </template>
  <template v-else> -- </template>
</template>

<script setup lang="ts">
import { DocumentCopy, Select } from "@element-plus/icons-vue";
import copy from "copy-to-clipboard";
import { ElMessage } from "element-plus";
import { ref } from "vue";
export interface CopyableProps {
  value: string | number;
  valueStyle?: Record<string, any>;
}

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<CopyableProps>(), {
  value: ""
});

const isCopySuccess = ref(false);

const onCopy = async () => {
  try {
    await navigator.clipboard.writeText(String(props.value));
    onCopySuccess();
  } catch {
    onCopySuccess();
    copy(String(props.value));
    // ElMessage.error(props.value ? `复制【${props.value}】失败` : "复制失败");
    // isCopySuccess.value = false;
  }
};

const onCopySuccess = () => {
  isCopySuccess.value = true;
  ElMessage.success("复制成功");
  setTimeout(() => {
    isCopySuccess.value = false;
  }, 1000);
};
</script>

<style>
*:has(> .copyable-value) {
  display: inline-flex !important;
  flex-direction: row !important;
  align-items: center !important;
}
</style>

<style scoped lang="scss">
.copyable-value {
  display: inline-block;
  width: fit-content;
  max-width: calc(100% - 20px);
  padding-right: 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.copy-icon {
  cursor: pointer;
}
</style>
