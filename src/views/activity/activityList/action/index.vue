<!--
 * @Description: 
 * @Date: 2024-05-31 11:15:27
 * @LastEditTime: 2024-07-17 15:51:47
-->
<template>
  <pro-dialog-page v-model="open" @on-open="onOpen" @on-close="onClose">
    <div class="table-box content">
      <pro-form
        :input-width="config.formConfig['input-width']"
        ref="proFormRef"
        :label-width="config.formConfig['label-width']"
        v-model="form"
        :show-action="false"
        :readonly="readOnly"
        :items="config.formItems(coinTypeOptions)"
        :label-style="{
          fontWeight: 600
        }"
      />
      <pro-form
        :input-width="config.formConfig['input-width']"
        ref="midProFormRef"
        :label-width="config.formConfig['label-width']"
        v-model="form"
        :show-action="false"
        :required="true"
        :readonly="readOnly"
        :items="dynamicFormItems"
        :label-style="{
          fontWeight: 600
        }"
      />
      <pro-form
        :input-width="config.formConfig['input-width']"
        ref="endProFormRef"
        :label-width="config.formConfig['label-width']"
        v-model="form"
        :show-action="false"
        :required="true"
        :readonly="type == 'view'"
        :items="config.endFormItems(coinTypeOptions)"
        :label-style="{
          fontWeight: 600
        }"
      >
        <template #bannerImageUrl-input-box>
          <div v-if="readOnly">
            <el-image :src="form.bannerImageUrl"></el-image>
          </div>
          <div v-else><imgUpload v-model:imageUrl="form.bannerImageUrl"></imgUpload></div>
        </template>
        <template #smallImageUrl-input-box>
          <div v-if="readOnly">
            <el-image :src="form.smallImageUrl"></el-image>
          </div>
          <div v-else><imgUpload v-model:imageUrl="form.smallImageUrl"></imgUpload></div>
        </template>
        <template #content-input-box>
          <div v-if="readOnly" v-html="form.content"></div>
          <wang-editor v-else v-model:value="form.content"></wang-editor>
        </template>
      </pro-form>
      <el-button @click="showPwdDialog" type="primary" class="formBtn" v-if="type !== 'view'">提交</el-button>
    </div>
    <el-dialog v-model="pwdVisiable" title="请输入登录密码" append-to-body>
      <el-form>
        <el-form-item label="">
          <el-input placeholder="请输入登录密码" v-model="form.password" type="password"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="onCancel">取消</el-button>
        <el-button @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </pro-dialog-page>
</template>
<script setup lang="ts">
import * as service from "@/api/modules/activity/list";
import { getCoinTypeOptions } from "@/api/modules/options";
import imgUpload from "@/components/Upload/Img.vue";
import wangEditor from "@/components/WangEditor/index.vue";
import { ElMessage } from "element-plus";
import md5 from "md5";
import { computed, ref } from "vue";
import * as config from "./config";
const proFormRef = ref();
const midProFormRef = ref();
const endProFormRef = ref();
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  type: { type: String },
  id: { type: String || Number }
});
const readOnly = computed(() => {
  return props.type === "view";
});
const emit = defineEmits(["update:modelValue", "onOpen", "onClose", "closeDialog"]);
const open = computed({
  get: () => {
    return props.modelValue;
  },
  set: v => {
    emit("update:modelValue", v);
  }
});
const coinTypeOptions = ref<{ label: string; value: string }[]>([]);
const getCoinsOptions = () => {
  getCoinTypeOptions().then(res => {
    coinTypeOptions.value = res.data
      .map(option => ({ label: option.unit, value: option.name != "全部" ? option.unit : "" }))
      .reverse();
  });
};

getCoinsOptions();
const dynamicFormItems = computed(() => {
  const itemsMap = {
    5: config.miningFormItems,
    6: config.lockFormItems(form.value, coinTypeOptions.value),
    7: config.HDZFormItems(coinTypeOptions.value)
  };
  return itemsMap[form.value.type] ?? {};
});
const form = ref({
  title: "",
  detail: "",
  status: 0,
  step: 0,
  acceptUnit: "",
  type: 6,
  leveloneCount: 0,
  startTime: "",
  totalSupply: 0,
  price: 0,
  amountScale: 0,
  priceScale: 0,
  maxLimitAmout: 0,
  minLimitAmout: 0,
  limitTimes: 0,
  holdLimit: 0,
  holdUnit: "",
  progress: 0,
  unit: "",
  noticeLink: "",
  activityLink: "",
  settings: "",
  // 云矿机锁仓部分
  miningPeriod: 0,
  miningDays: 0,
  miningDaysprofit: 0,
  miningUnit: "",
  miningInviteprofit: 0,
  miningInviteunit: "",
  miningInviteDays: 0,
  miningInviteDaysprofit: 0,
  miningInviteUnit: "",
  miningInviteDayslimit: 0,
  miningInviteDaysprofitlimit: 0,
  miningInviteDaysunit: "",
  miningInviteDayslimitunit: "",
  miningInviteDayslimitprofit: 0,
  miningInvite: 0,
  miningInvitelimit: 0,
  // 锁仓
  lockedUnit: null,
  releaseType: 0,
  releasePercent: 0,
  releaseAmount: 0,
  lockedPeriod: 0,
  lockedDays: 0,
  lockedFee: 0,
  releaseTimes: 0,
  // 尾巴
  bannerImageUrl: "",
  smallImageUrl: "",
  content: "",
  // 密码
  password: ""
});
// 最后一步输入密码
const pwdVisiable = ref(false);
const showPwdDialog = () => {
  pwdVisiable.value = true;
};
const password = ref("");
const handleSubmit = () => {
  const api = props.type === "add" ? service.addAct : service.editActInfo;
  api({ ...form.value, password: md5(form.value.password) }).then(() => {
    emit("closeDialog");
    ElMessage.success("操作成功");
    pwdVisiable.value = false;
  });
};
const onCancel = () => {
  form.value.password = "";
  password.value = "";
  pwdVisiable.value = false;
};
const onOpen = () => {
  if (props.type === "add") {
    return;
  }
  init();
};
const onClose = () => {
  proFormRef.value.resetFields();
  midProFormRef.value.resetFields();
  endProFormRef.value.resetFields();
  return;
};

const init = async () => {
  service.getDetail(props.id).then(res => {
    form.value = res.data as any;
  });
};
</script>
<style lang="scss" scoped>
$grid-columns: 1;
.form {
  display: grid;
  grid-template-columns: repeat($grid-columns, 1fr);
  grid-gap: 0 50px;
  align-items: flex-start;
}
.explain {
  font-size: 10px;
  color: rgb(255 0 0);
}
.formBtn {
  width: 500px;
  margin: 0 160px;
}
.table-box.content {
  display: grid;
  place-content: center;
}
</style>
