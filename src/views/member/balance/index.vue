<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-07-30 14:03:10
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns(coinTypeOptions)" :init-param="param" :request-api="fetchData">
      <template #tableHeader>
        <el-radio-group v-model="param.type">
          <el-radio-button :value="1">现货</el-radio-button>
          <el-radio-button :value="2">资金</el-radio-button>
        </el-radio-group>
      </template>
      <template #operation="{ row }">
        <el-button type="primary" icon="edit-pen" size="small" @click="onActions('update', row)"> 修改 </el-button>
        <el-button type="success" icon="search" size="small" @click="onActions('view', row)"> 查看修改记录 </el-button>
      </template>
    </pro-table>
    <pro-form-dialog
      title="修改用户资产"
      v-model="dialog.openForm"
      width="40%"
      :form-items="config.formItems"
      :initial-value="dialog.detail"
      :request="updateSubmit"
    >
      <template #top-info>
        <pro-descriptions
          :data="dialog.detail"
          :items="config.descriptionsItems"
          :column="2"
          :label-style="{ width: '59.62px', display: 'inline-flex', justifyContent: 'end' }"
        />
      </template>
      <template #operCode-input-box="entity">
        <el-space fill :fill-ratio="10" style="flex: 1">
          <el-input v-model="entity.operCode" placeholder="请输入验证码" />
          <el-button
            type="primary"
            :disabled="dialog.countdown ? true : !entity.phone"
            @click="onGetVerificationCode(entity.phone, entity.memberId)"
          >
            {{ dialog.countdown ? `${dialog.countdown}秒后，重新获取` : "获取验证码" }}
          </el-button>
        </el-space>
      </template>
    </pro-form-dialog>
    <modif-records-dialog v-model="dialog.openRecords" :id="currRow?.id" />
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/member";
import { getCoinTypeOptions } from "@/api/modules/options";
import { useTableFetch } from "@/hooks";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import * as config from "./config";
import ModifRecordsDialog from "./ModifRecordsDialog/index.vue";

const proTableRef = ref();

const coinTypeOptions = ref<{ label: string; value: string }[]>([]);

const param = reactive({
  type: 1
});

const dialog = reactive({
  openForm: false,
  openRecords: false,
  detail: {},
  countdown: 0,
  currRow: {}
});

const { fetchData } = useTableFetch(service.getBalanceByPage);

const getCoinsOptions = () => {
  getCoinTypeOptions().then(res => {
    coinTypeOptions.value = res.data
      .map(option => ({ label: option.unit, value: option.name != "全部" ? option.unit : "" }))
      .reverse();
  });
};

const onActions = (type, row) => {
  if (type == "update") {
    dialog.detail = { ...row };
    dialog.openForm = true;
  }
  if (type == "view") {
    dialog.openRecords = true;
    dialog.currRow = row;
  }
};

const updateSubmit = entity => {
  const data = { ...entity, walletId: entity.id };
  delete data.id;
  service.updatUserAsset(data).then(() => {
    ElMessage.success("已保存");
    dialog.openForm = false;
    dialog.detail = {};
    proTableRef.value.getTableList();
  });
};

getCoinsOptions();
</script>
