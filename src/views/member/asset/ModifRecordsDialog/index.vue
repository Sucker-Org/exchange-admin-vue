<!--
 * @Description: 
 * @Date: 2024-04-17 18:09:46
 * @LastEditTime: 2024-04-19 15:46:48
-->
<template>
  <pro-dialog-page v-model="open" title="用户资产修改记录">
    <div class="pro-table-container">
      <pro-table ref="proTableRef" :data="datas" :columns="config.tableColumns" :tool-button="false" :pagination="false" />
    </div>
  </pro-dialog-page>
</template>

<script setup lang="ts">
import * as config from "./config";
import * as service from "@/api/modules/member";
import { computed, ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  id: {
    type: Number
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

const datas = ref<any[]>([]);

const getTableDatas = id => {
  service.getAssetModifyingRecords(id).then(res => {
    datas.value = res.data as [];
  });
};

watch(
  () => props.id,
  id => {
    if (id) {
      getTableDatas(id);
    }
  }
);
</script>

<style scoped lang="scss">
:deep(.el-dialog__body) {
  height: calc(100% - 85px);
}
.pro-table-container {
  height: 100%;
}
.pro-table-container > :deep(.card) {
  padding: 0;
  border: 0;
  border-radius: 0;
  box-shadow: unset;
}
</style>
