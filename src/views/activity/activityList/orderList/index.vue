<!--
 * @Description: 
 * @Date: 2024-05-31 14:34:55
 * @LastEditTime: 2024-06-14 16:54:30
-->
<template>
  <pro-dialog-page v-model="open">
    <div class="order-list-box">
      <pro-table v-if="props.id && open" ref="proTableRef" :columns="config.tableColumns" :request-api="fetchData">
        <template #operation="{ row }">
          <pro-button :disabled="row.state != 1" type="success" size="small" tip="确定要同意锁仓吗?" @click="onActions(row.id)">
            同意锁仓
          </pro-button>
        </template>
      </pro-table>
    </div>
  </pro-dialog-page>
</template>
<script setup lang="ts">
import * as service from "@/api/modules/activity/list";
//import { useTableFetch } from "@/hooks";
import { useTableFetch } from "@/hooks";
import { computed } from "vue";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import * as config from "./config";
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  id: {
    type: Number || String,
    default: null
  }
});
const emit = defineEmits(["closeDialog", "update:modelValue"]);
const open = computed({
  get: () => {
    return props.modelValue;
  },
  set: v => {
    emit("update:modelValue", v);
  }
});
const proTableRef = ref();
const { fetchData } = useTableFetch(service.getOrderList, params => {
  if (!props.id) {
    return {
      data: null
    };
  }
  if (params.roleNames) {
    params["roles"] = params.roleNames;
    delete params.roleNames;
  }

  return { listId: props.id, ...params };
});
const onActions = id => {
  service.distribute(id).then(() => {
    ElMessage.success("操作成功");
    proTableRef.value.getTableList();
  });
};
// const getTableData = async params => {
//   const res = await fetchData(params);
//   return res;
// };
</script>

<style scoped lang="scss">
:deep(.el-dialog__body) {
  height: calc(100% - 85px);
}
.order-list-box {
  height: 70vh;
}
.order-list-box :deep(.card) {
  padding: 0;
  border: 0;
  border-radius: 0;
  box-shadow: unset;
}
</style>
