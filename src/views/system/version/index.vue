<!--
 * @Description: 
 * @Date: 2024-04-07 09:54:32
 * @LastEditTime: 2024-07-04 15:00:09
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" title="版本管理" :columns="config.tableColumns" :request-api="fetchData">
      <template #tableHeader>
        <el-button type="primary" icon="circle-plus" @click="onBtn('create', {})"> 添加 </el-button>
      </template>
      <template #operation="{ row }">
        <el-button type="primary" icon="edit-pen" size="small" @click="onBtn('update', row)"> 编辑 </el-button>
      </template>
    </pro-table>
    <pro-form-dialog
      v-model="dialog.open"
      :mode="dialog.mode"
      :width="'30%'"
      :form-items="config.formItems"
      :initial-value="dialog.detail"
      :request="submitForm"
    />
  </div>
</template>

<script setup lang="ts" name="roles">
import * as service from "@/api/modules/version";
import { useTableFetch } from "@/hooks";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import * as config from "./config";

const proTableRef = ref();
const dialog = reactive({
  open: false,
  mode: "create",
  detail: {}
});
const { fetchData } = useTableFetch(service.getVersionByPage, params => {
  if (params.publishTime) {
    params["startTime"] = params.publishTime[0];
    params["endTime"] = params.publishTime[1];
    delete params.publishTime;
  }
  return params;
});

const onBtn = (type: "create" | "update", row: Record<string, any> = {}) => {
  dialog.detail = { ...row };
  dialog.mode = type;
  dialog.open = true;
};

const submitForm = entity => {
  service[entity.id ? "editVersion" : "addVersion"](entity).then(() => {
    ElMessage.success("保存成功");
    dialog.open = false;
    proTableRef.value.getTableList();
  });
};
</script>
