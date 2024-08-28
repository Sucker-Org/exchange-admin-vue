<!--
 * @Description: 
 * @Date: 2024-04-18 11:18:45
 * @LastEditTime: 2024-06-27 09:48:35
-->
<template>
  <div class="pro-dialog-page">
    <!-- 增加open 和close的钩子，用于清除表单，以前使用watch监听id的变化偶尔会有bug -->
    <el-dialog v-bind="props" v-model="open" fullscreen :show-close="false" @open="emit('onOpen')" @close="emit('onClose')">
      <template #header>
        <div class="header">
          <slot name="title">
            <h4>{{ props.title }}</h4>
          </slot>
          <el-space>
            <slot name="header-tools" />
            <el-icon v-if="closeMode == 'icon'" @click="close"><Close /></el-icon>
            <el-button v-if="closeMode == 'button'" type="info" plain size="small" @click="close">关闭</el-button>
          </el-space>
        </div>
      </template>
      <slot></slot>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { DialogProps } from "element-plus";
import { computed, withDefaults } from "vue";

interface ProDialogPageProps extends DialogProps {
  titleSize?: number;
  titleColor?: string;
  closeMode?: "icon" | "button";
}

const props = withDefaults(defineProps<ProDialogPageProps>(), {
  modelValue: false,
  showClose: true,
  titleSize: 14,
  titleColor: "--el-text-color-primary",
  closeMode: "button"
});

const emit = defineEmits(["update:modelValue", "onOpen", "onClose"]);

const open = computed({
  get: () => {
    return props.modelValue;
  },
  set: v => {
    emit("update:modelValue", v);
  }
});

const title = computed(() => {
  return {
    size: props.titleSize ? `${props.titleSize}px` : "14px",
    color: props.titleColor
  };
});

const close = () => emit("update:modelValue", false);
</script>

<style scope lang="scss">
.el-main > div {
  position: relative !important;
}
.pro-dialog-page > div > .el-overlay-dialog > .el-dialog.is-fullscreen > .el-dialog__header {
  padding: 0 20px;
}
.pro-dialog-page .header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.pro-dialog-page .header > h4 {
  font-size: v-bind("title.size") !important;
  font-weight: 600;
  color: v-bind("title.color") !important;
}
.pro-dialog-page .el-dialog__headerbtn {
  height: 55px;
}
.pro-dialog-page > div {
  position: absolute !important;
  inset: 0;
  .el-overlay {
    position: absolute !important;
  }
  .el-overlay-dialog {
    position: absolute !important;
  }
}
</style>
