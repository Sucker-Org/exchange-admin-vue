<!--
 * @Description: 按钮组件模板
 * @Date: 2024-01-20 18:25:58
 * @LastEditTime: 2024-04-18 18:10:07
-->
<template>
  <el-button v-bind="props" @click.stop="onClick">
    <slot>{{ render }}</slot>
  </el-button>
</template>

<script setup name="ProButton" lang="ts">
import type { ButtonProps } from "element-plus";
import { ElMessageBox } from "element-plus";
const emits = defineEmits(["click"]);

/**
 * 兼容element-plus按钮，对api进行扩展
 */
export interface ProButtonProps extends Partial<ButtonProps> {
  // 二次确认提示语
  tip?: string;
  // 前置函数
  tipBefor?: () => boolean;
  render?: string;
}

const props = defineProps<ProButtonProps>();

const onClick = () => {
  let isContinue = true;
  if (props.tipBefor && typeof props.tipBefor === "function") {
    isContinue = props.tipBefor();
  }

  if (props.tip) {
    if (isContinue === true) {
      return ElMessageBox.confirm(props.tip, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          emits("click");
        })
        .catch(err => {
          console.log(err);
        });
    }
  } else {
    emits("click");
  }
};
</script>
