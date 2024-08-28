<template>
  <pro-dialog-page v-model="open" @on-open="onOpen" @on-close="onClose">
    <pro-form
      v-model="form"
      ref="formRef"
      label-position="right"
      :items="config.getFormItems(type)"
      :style="`width: ${type === 'view' ? 'fit-content' : '50%'}; margin: 0 auto`"
      :readonly="type === 'view'"
      :show-action="type === 'view' ? false : true"
      :label-style="{
        fontWeight: 600
      }"
      @submit="formSubmit"
    >
      <template #imgUrl-input-box>
        <UploadImg
          v-if="type === 'add' || type === 'edit'"
          :image-url="form.imgUrl"
          :disabled="false"
          @update:image-url="handleImageUrlUpdate"
        />
        <el-image
          v-else-if="form.imgUrl"
          style="width: 100px; height: 100px"
          :src="form.imgUrl"
          :preview-src-list="[form.imgUrl]"
          preview-teleported
        />
        <div v-else>--</div>
      </template>
      <template #content-input-box="row">
        <div v-if="type === 'view'" v-html="form.content" />
        <div v-else v-show="row?.sysHelpClassification != 7">
          <WangEditor v-model:value="form.content" height="400px" />
        </div>
      </template>
    </pro-form>
  </pro-dialog-page>
</template>
<script setup lang="ts">
import * as service from "@/api/modules/content/help";
import UploadImg from "@/components/Upload/Img.vue";
import WangEditor from "@/components/WangEditor/index.vue";
import { ElMessage } from "element-plus";
import { computed, ref } from "vue";
import * as config from "./config";

const props = defineProps({
  type: {
    type: String,
    default: "add"
  },
  modelValue: {
    type: Boolean,
    default: false
  },
  id: {
    type: [Number, String],
    default: null
  }
});

const emit = defineEmits(["closeDialog", "update:modelValue"]);

// interface Form {
//   title?: string; // 必填，类型为字符串
//   sysHelpClassification?: number; // 必填，类型为数字
//   id?: any; // 可选，类型为 any，因为这里的类型不确定
//   createTime?: string; // 可选，类型为字符串
//   isShow?: string; // 可选，类型为字符串
//   sort?: string; // 可选，类型为字符串
//   imgUrl?: string; // 可选，类型为字符串
//   content?: string; // 可选，类型为字符串
//   status?: number;
// }

const form = ref<Record<string, any>>({
  title: "",
  sysHelpClassification: undefined,
  id: undefined,
  createTime: "",
  isShow: "",
  sort: "",
  imgUrl: "",
  content: ""
});

// 新增
const formRef = ref();

const open = computed({
  get: () => {
    return props.modelValue;
  },
  set: v => {
    emit("update:modelValue", v);
  }
});

const handleImageUrlUpdate = v => {
  form.value.imgUrl = v;
};
const onInit = () => {
  if (props.type == "view" || props.type == "edit") {
    service.detail({ id: props.id }).then(res => {
      form.value = res.data as any;
    });
  }
};

const formSubmit = data => {
  const name = props.type == "add" ? "add" : props.type == "edit" ? "update" : "";

  if (!name) return;

  service[name](data).then(() => {
    ElMessage.success("操作成功");
    emit("closeDialog");
  });
};

const onOpen = () => onInit();

const onClose = () => formRef.value.resetFields();
</script>
<style lang="scss">
.submitBtn {
  width: 365px;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
