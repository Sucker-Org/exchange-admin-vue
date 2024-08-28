<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-05-31 21:16:20
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns" :request-api="fetchData">
      <template #tableHeader>
        <el-button type="primary" icon="circle-plus" @click="onAdd">新增红包</el-button>
      </template>
      <template #operation>
        <el-button type="success" icon="circle-plus" @click="onShow" size="small">查看</el-button>
        <el-button type="primary" icon="circle-plus" @click="onDetail" size="small">查看领取详情</el-button>
        <el-button type="primary" icon="circle-plus" @click="onEdit" size="small">编辑</el-button>
      </template>
    </pro-table>
    <pro-dialog-page v-model="dialog.open" title="添加/编辑红包">
      <el-form
        ref="dialogRef"
        label-width="200px"
        style="width: 800px; margin: 0 auto; margin-left: calc(50% - 450px)"
        :model="dialog.detail"
        :rules="rules"
      >
        <el-form-item label="红包类型:" prop="type">
          <el-radio-group v-model="dialog.detail.type" :disabled="openType == 'show'">
            <el-radio label="0">随机</el-radio>
            <el-radio label="1">定额</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邀请拆分:" prop="invite">
          <el-radio-group v-model="dialog.detail.invite" :disabled="openType == 'show'">
            <el-radio label="0">否</el-radio>
            <el-radio label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="平台红包:" prop="plateform">
          <el-radio-group v-model="dialog.detail.plateform" :disabled="openType == 'show'">
            <el-radio label="0">否</el-radio>
            <el-radio label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="最大可领取额度(随机有效):" prop="maxRand">
          <el-input v-model="dialog.detail.maxRand" :disabled="openType == 'show'"></el-input>
        </el-form-item>
        <el-form-item label="红包总额:" prop="totalAmount">
          <el-input v-model="dialog.detail.totalAmount" :disabled="openType == 'show'"></el-input>
        </el-form-item>
        <el-form-item label="红包数量:" prop="count">
          <el-input v-model="dialog.detail.count" :disabled="openType == 'show'"></el-input>
        </el-form-item>
        <el-form-item label="logo图:" prop="logoImage">
          <upload :image-url="dialog.detail.logoImage" :limit="1" :disabled="openType == 'show'"></upload>
          <!-- <el-input v-model="dialog.detail.logoImage"></el-input> -->
        </el-form-item>
        <el-form-item label="背景图:" prop="bgImage">
          <upload :image-url="dialog.detail.bgImage" :limit="1" :disabled="openType == 'show'"></upload>
          <!-- <el-input v-model="dialog.detail.bgImage"></el-input> -->
        </el-form-item>
        <el-form-item label="红包币种:" prop="unit">
          <el-input v-model="dialog.detail.unit" :disabled="openType == 'show'"></el-input>
        </el-form-item>
        <el-form-item label="有效时间:" prop="expiredHours">
          <el-input v-model="dialog.detail.expiredHours" :disabled="openType == 'show'"></el-input>
        </el-form-item>
        <el-form-item label="红包名称:" prop="name">
          <el-input v-model="dialog.detail.name" :disabled="openType == 'show'"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="submitBtn" v-show="openType !== 'show'">提交</el-button>
        </el-form-item>
      </el-form>
    </pro-dialog-page>
    <pro-dialog-page v-model="reciveDialog.open" title="红包领取详情">
      <recive detail:recive-dialog.data> </recive>
    </pro-dialog-page>
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/envelope";
import * as config from "./config";
import { reactive, ref } from "vue";
import { useTableFetch } from "@/hooks";
import { EnvelopeDetailType } from "./types";
import upload from "@/components/Upload/Img.vue";
import { mockTableData } from "./config";
// import upload from "./upload/index.vue";
import recive from "./recive/index.vue";
const dialog = reactive({
  open: false,
  loading: false,
  detail: {
    bgImage: "",
    count: 0,
    createTime: "",
    detail: "",
    envelopeNo: "",
    expiredHours: 0,
    id: 0,
    invite: 0,
    inviteUser: "",
    inviteUserAvatar: "",
    logoImage: "",
    maxRand: 0,
    memberId: 0,
    name: "",
    plateform: 0,
    receiveAmount: 0,
    receiveCount: 0,
    state: 0,
    totalAmount: 0,
    type: 0,
    unit: ""
  } as EnvelopeDetailType
});

const openType = ref("add");
const onAdd = () => {
  dialog.open = true;
  openType.value = "add";
};
const onEdit = () => {
  dialog.open = true;
  openType.value = "edit";
  dialog.detail = mockTableData[0];
};
const onShow = () => {
  dialog.open = true;
  openType.value = "show";
};
const onDetail = async () => {
  const res = await service.getReceiveList({ id: 1 });
  console.log("[ res ]", res);
};
const dialogRef = ref();
// 编辑新增的提交按钮
const rules = reactive({
  type: [
    { required: true, message: "请选择红包类型", trigger: "change" }
    // { validator: validateEnum, trigger: "change" }
  ],
  invite: [{ required: true, message: "请选择邀请拆分", trigger: "change" }],
  plateform: [{ required: true, message: "请选择平台红包", trigger: "change" }],
  maxQuota: [{ required: true, message: "请输入最大可领取额度", trigger: "blur" }],
  totalAmount: [{ required: true, message: "请输入红包总额", trigger: "blur" }],
  count: [{ required: true, message: "请输入红包数量", trigger: "blur" }],
  unit: [{ required: true, message: "请输入红包币种", trigger: "blur" }],
  expiredHours: [{ required: true, message: "请输入有效时间", trigger: "blur" }],
  name: [{ required: true, message: "请输入红包名称", trigger: "blur" }]
});

const onSubmit = async () => {
  // return;
  try {
    await dialogRef.value.validate();
    const res = await service.onAdd(dialog.detail);
    console.log("[ res ]", res);
    // console.log("表单数据验证通过，准备提交:", dialog.detail);
    // 提交表单逻辑
  } catch (error) {
    console.error("表单数据验证失败:", error);
  }
};

const { fetchData } = useTableFetch(service.getList);
// const getTableData = async (params?: any) => {
//   const res = await service.getList({
//     pageNo: params.pageNum,
//     pageSize: params.pageSize,
//     type: params.type,
//     memberId: params.memberId
//   });
//   return {
//     data: {
//       ...res.data,
//       list: res.data.content,
//       total: res.data.totalElements
//       // list: mockTableData,
//       // total: mockTableData.length
//     }
//   };
// };
// 红包领取详情
const reciveDialog = reactive({
  open: false,
  data: {}
});
</script>
<style lang="scss" scoped>
.submitBtn {
  width: 365px;
}
</style>
