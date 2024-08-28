<!--
 * @Description: 
 * @Date: 2024-04-17 18:09:46
 * @LastEditTime: 2024-06-14 16:29:24
-->
<template>
  <pro-dialog-page v-model="open" title="会员详情">
    <pro-descriptions class="base" title="基础信息" :items="config.descriptionsItems" :data="rowData" :column="5" />
    <pro-descriptions title="用户资产">
      <div class="pro-table-container">
        <pro-table
          ref="proTableAssetRef"
          :columns="config.tableColumns"
          :tool-button="false"
          :init-param="{ id: rowData?.id }"
          :request-api="assets.fetchData"
        >
          <template #operation="{ row }">
            <!-- <el-button type="primary" size="small" @click="onActions(1, row)">{{ ActionsType[1] }}</el-button> -->
            <template v-if="row.isLock">
              <el-button type="success" size="small" icon="unlock" @click="onActions(2, row)"> {{ ActionsType[2] }} </el-button>
            </template>
            <template v-else>
              <pro-button type="danger" size="small" icon="lock" tip="确定要锁定吗?" @click="onActions(3, row)">
                {{ ActionsType[3] }}
              </pro-button>
            </template>
            <!-- <el-button type="info" size="small" @click="onActions(4, row)">{{ ActionsType[4] }}</el-button> -->
          </template>
        </pro-table>
      </div>
    </pro-descriptions>
    <pro-descriptions title="交易记录">
      <div class="pro-table-container">
        <pro-table
          ref="proTableRef"
          :columns="config.tranRecordsTableColumns"
          :tool-button="false"
          :init-param="{ memberId: rowData?.id }"
          :request-api="fetchData"
        >
          <template #type="{ row }">
            <span>{{ TransactionTypeEnum[row.type] }}</span>
          </template>
        </pro-table>
      </div>
    </pro-descriptions>
  </pro-dialog-page>
  <pro-form-dialog
    style="width: 200px"
    v-model="dialog.open"
    width="20%"
    :title="dialog.title"
    :form-items="config.rechargeFormItems"
    :initial-value="{
      unit: currRow.coinId,
      address: currRow.address
    }"
    :request="submitRecharge"
  />
</template>

<script setup lang="ts">
import { getTransactionOrFeeByPage } from "@/api/modules/finance";
import * as service from "@/api/modules/member";
import { TransactionTypeEnum } from "@/enums";
import { useTableFetch } from "@/hooks";
import { ElMessage } from "element-plus";
import { computed, PropType, reactive, ref } from "vue";
import * as config from "./config";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  rowData: {
    type: Object as PropType<{ [x: string]: any }>
  }
});

const emit = defineEmits(["update:modelValue"]);

const open = computed({
  get: () => {
    return props.modelValue;
  },
  set: v => {
    emit("update:modelValue", v);
  }
});

const currRow = ref<{ [x: string]: any }>({});

const dialog = reactive({
  open: false,
  title: "锁仓"
});

enum ActionsType {
  "锁仓",
  "充币",
  "解锁",
  "锁定",
  "重置地址"
}

const proTableAssetRef = ref();

const assets = useTableFetch(service.getUserAssetsByPage);

const { fetchData } = useTableFetch(getTransactionOrFeeByPage);

const onActions = (type, row) => {
  currRow.value = { ...row };

  if (type === 0 || type === 1) {
    dialog.open = true;
    dialog.title = ActionsType[type];
    return;
  }

  const serviceMap = {
    2: "unLockWallet",
    3: "lockWallet",
    4: "resetAddress"
  };

  service[serviceMap[type]](props.rowData?.id, row.coinId).then(() => {
    ElMessage.success("操作成功");
    proTableAssetRef.value.getTableList();
  });
};

const submitRecharge = entity => {
  const data = { ...entity, uid: props.rowData?.id };
  delete data.address;
  service.recharge(data).then(() => {
    ElMessage.success("已充值");
    dialog.open = false;
  });
};
</script>

<style scoped lang="scss">
:deep(.el-dialog__body) {
  height: calc(100% - 85px);
}
.base :deep(.copyable-value) {
  max-width: unset;
}
.pro-table-container {
  height: 50vh;
}
.pro-table-container > :deep(.card) {
  padding: 0;
  border: 0;
  border-radius: 0;
  box-shadow: unset;
}
</style>
