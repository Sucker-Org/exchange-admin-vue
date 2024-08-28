<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-06-06 11:27:54
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns" :request-api="fetchData">
      <template #operation="{ row }">
        <el-button type="primary" icon="edit" size="small" @click="onUpdateAction(row)">修改</el-button>
      </template>
    </pro-table>
    <pro-form-dialog
      title="修改参数"
      v-model="openDialog"
      width="30%"
      :form-items="config.formItems"
      :initial-value="formInitialValue"
      :request="submitForm"
    />
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/invitation";
import { useTableFetch } from "@/hooks";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import * as config from "./config";

const proTableRef = ref();
const openDialog = ref(false);
const formInitialValue = ref({});

const { fetchData } = useTableFetch(service.getInviteRankList, params => {
  if (params.createTime) {
    params["startTime"] = params.createTime[0];
    params["endTime"] = params.createTime[1];
    delete params.createTime;
  }

  return params;
});

const onUpdateAction = row => {
  formInitialValue.value = row;
  openDialog.value = true;
};

const submitForm = data => {
  service.updateInfo(data).then(() => {
    ElMessage.success("修改成功");
    openDialog.value = false;
    proTableRef.value.search();
  });
};
</script>
