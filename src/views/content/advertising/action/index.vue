<!--
 * @Description: 
 * @Date: 2024-05-09 16:56:38
 * @LastEditTime: 2024-07-16 15:39:35
-->
<template>
  <pro-dialog-page v-model="open" @on-open="onOpen" @on-close="onClose">
    <pro-form
      v-model="form"
      ref="formRef"
      label-position="right"
      :items="config.formItems"
      :style="`width: ${type === 'view' ? 'fit-content' : '50%'}; margin: 0 auto`"
      :readonly="type === 'view'"
      :show-action="type === 'add' || type === 'edit'"
      :label-style="{
        fontWeight: 600
      }"
      @submit="formSubmit"
    >
      <template #url-input-box>
        <UploadImg
          v-if="type === 'add' || type === 'edit'"
          :image-url="form.url"
          :disabled="false"
          @update:image-url="handleImageUrlUpdate"
        />
        <el-image
          v-else-if="form.url"
          style="width: 100px; height: 100px"
          :src="form.url"
          :preview-src-list="[form.url]"
          preview-teleported
        />
        <div v-else>--</div>
      </template>
    </pro-form>
  </pro-dialog-page>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/content/advertising";
import UploadImg from "@/components/Upload/Img.vue";
import { ElMessage } from "element-plus";
import { computed, ref } from "vue";
import * as config from "./config";
const formRef = ref();

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: "add"
  },
  serialNumber: {
    type: String,
    default: null
  }
});
const open = computed({
  get: () => {
    return props.modelValue;
  },
  set: v => {
    emit("update:modelValue", v);
  }
});

interface formType {
  serialNumber?: string | number;
  sort?: number;
  author: string;
  name: string;
  content: string;
  lang: string;
  linkUrl: string;
  status?: string;
  sysAdvertiseLocation?: number;
  url: string;
  remark: string;
  startTime: string;
  endTime: string;
}
const form = ref<formType>({
  author: "",
  name: "",
  content: "",
  lang: "",
  linkUrl: "",
  url: "",
  remark: "",
  startTime: "",
  endTime: ""
});

// 新增
const emit = defineEmits(["closeDialog", "update:modelValue"]);

const formSubmit = entity => {
  const name = props.type == "add" ? "add" : props.type == "edit" ? "update" : "";

  if (!name) return;

  service[name](entity).then(() => {
    ElMessage.success("操作成功");
    emit("closeDialog");
  });
};

const handleImageUrlUpdate = v => {
  form.value.url = v;
};

const onOpen = () => onInit();

const onClose = () => formRef.value.resetFields();

const onInit = async () => {
  if (props.type == "view" || props.type == "edit") {
    const res = await service.detail({ serialNumber: props.serialNumber });
    form.value = res.data as any;
  }
};
</script>
<style lang="scss">
.submitBtn {
  width: 365px;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
