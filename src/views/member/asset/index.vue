<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-07-30 14:03:56
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="tableColumns" :request-api="fetchData">
      <!-- <template #operation="{ row }">
        <el-button type="primary" icon="edit-pen" size="small" @click="onActions('update', row)"> 修改 </el-button>
        <el-button type="success" icon="search" size="small" @click="onActions('view', row)"> 查看修改记录 </el-button>
      </template> -->
    </pro-table>
    <!-- <pro-form-dialog
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
    <modif-records-dialog v-model="dialog.openRecords" :id="currRow.id" /> -->
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/member";
import { getCoinTypeOptions } from "@/api/modules/options";
import { useTableFetch } from "@/hooks";
// import * as utils from "@/utils/eleValidate";
// import { ElMessage } from "element-plus";
import { computed, ref } from "vue";
// import ModifRecordsDialog from "./ModifRecordsDialog/index.vue";
import * as config from "./config";

const proTableRef = ref();

const coinTypeOptions = ref<{ label: string; value: string }[]>([]);

// const dialog = reactive({
//   openForm: false,
//   openRecords: false,
//   detail: {},
//   countdown: 0
// });

// const currRow = ref<{ [x: string]: any }>({});

const tableColumns = computed(() => config.tableColumns(coinTypeOptions));

const { fetchData } = useTableFetch(service.getAssetByPage);

const getCoinsOptions = () => {
  getCoinTypeOptions().then(res => {
    coinTypeOptions.value = res.data
      .map(option => ({ label: option.unit, value: option.name != "全部" ? option.unit : "" }))
      .reverse();
  });
};

getCoinsOptions();

// const onActions = (type, row) => {
//   if (type == "update") {
//     dialog.detail = { ...row };
//     dialog.openForm = true;
//   }
//   if (type == "view") {
//     dialog.openRecords = true;
//     currRow.value = row;
//   }
// };

// const onGetVerificationCode = (phone, memberId) => {
//   utils.checkPhoneNumber("", phone, err => {
//     if (err) {
//       return ElMessage.warning("手机号格式有误");
//     }
//     service.getVerificationCode({ phone, memberId }).then(res => {
//       ElMessage.success(res.message);
//       dialog.countdown = 59;
//       const timer = setInterval(() => {
//         dialog.countdown = dialog.countdown - 1;
//         if (!dialog.countdown) {
//           clearTimeout(timer);
//         }
//       }, 1000);
//     });
//   });
// };

// const updateSubmit = entity => {
//   const data = { ...entity, walletId: entity.id };
//   delete data.id;
//   service.updatUserAsset(data).then(() => {
//     ElMessage.success("已保存");
//     dialog.openForm = false;
//     dialog.detail = {};
//     proTableRef.value.getTableList();
//   });
// };
</script>
<style scoped lang="scss">
:deep(td.el-descriptions__cell) {
  width: 50%;
  .el-descriptions__content {
    word-break: break-all;
  }
}
</style>
