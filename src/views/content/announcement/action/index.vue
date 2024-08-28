<template>
  <pro-dialog-page v-model="open" @on-open="onOpen" @on-close="onClose">
    <pro-form
      v-if="formShow"
      v-model="form"
      ref="formRef"
      label-position="right"
      :items="config.getFormItems(type, form.announcementClassification)"
      :style="`width: ${type === 'view' ? 'fit-content' : '50%'}; margin: 0 auto`"
      :readonly="type === 'view' ? true : false"
      :label-style="{
        fontWeight: 600
      }"
    >
      <template #isShow-input-box>
        <el-switch
          v-if="type === 'add' || type === 'edit'"
          inactive-text="不显示"
          active-text="显示"
          inline-prompt
          v-model="form.isShow"
        ></el-switch>
        <div v-else>{{ form.isShow ? "显示" : "不显示" }}</div>
      </template>
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
        ></el-image>
        <div v-else>--</div>
      </template>
      <template #content-input-box="row">
        <div v-if="type === 'view'">
          <div v-html="form.content"></div>
        </div>
        <div v-else v-show="row?.sysHelpClassification != 7">
          <WangEditor v-model:value="form.content" height="400px" />
        </div>
      </template>
      <template #actions>
        <div v-if="type !== 'view'">
          <pro-button type="primary" @click="onSubmit">提交</pro-button>
        </div>
      </template>
    </pro-form>
  </pro-dialog-page>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import * as service from "@/api/modules/content/announcement";
import UploadImg from "@/components/Upload/Img.vue";
import WangEditor from "@/components/WangEditor/index.vue";
import { ElMessage } from "element-plus";
import { computed, ref } from "vue";
import * as config from "./config";

const router = useRouter();
const formRef = ref();
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
  },
  isIndex: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(["closeDialog", "update:modelValue"]);

const initForm = {
  author: "",
  name: "",
  content: "",
  lang: "",
  linkUrl: "",
  status: "",
  sysAdvertiseLocation: 0,
  url: "",
  remark: "",
  createTime: "",
  endTime: "",
  isShow: "",
  imgUrl: "",
  announcementClassification: null,
  popUpCount: 0,
  sort: ""
};

const form = ref(initForm);
const formShow = ref(true);
const open = computed({
  get: () => {
    return props.modelValue;
  },
  set: v => {
    emit("update:modelValue", v);
  }
});
// 新增
const onSubmit = () => {
  formRef.value.validate(valid => {
    if (valid) {
      // 提交表单或者执行其他操作，表单数据有效
      console.log("form.value", form.value);
      let requestLabel = "";
      switch (props.type) {
        case "add":
          requestLabel = "add";
          break;
        case "edit":
          requestLabel = "update";
          break;
      }
      service[requestLabel](form.value).then(() => {
        ElMessage.success("操作成功");
        emit("closeDialog");
      });
    } else {
      return ElMessage.error("表单验证未通过，请检查~");
    }
  });
};
const handleImageUrlUpdate = v => {
  console.log("handleImageUrlUpdate", v);

  form.value.imgUrl = v;
};

const onInit = async () => {
  if (props.type == "view" || props.type == "edit") {
    const res = await service.detail(props.id);
    form.value = res.data as any;
  }
};
const onOpen = () => {
  console.log(props);
  formShow.value = true;
  onInit();
};
const onClose = () => {
  if (props.isIndex) {
    router.push("/home/index");
  }
  formRef.value?.resetFields();
  formShow.value = false;
};
</script>
<style lang="scss">
.submitBtn {
  width: 365px;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
