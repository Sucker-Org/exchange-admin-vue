<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-07-05 17:59:00
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns" :request-api="fetchData">
      <template #tableHeader>
        <el-button type="primary" icon="circle-plus" @click="onActions('create')">添加币种</el-button>
      </template>
      <template #operation="{ row }">
        <el-button type="success" icon="search" size="small" @click="onActions('view', row)"> 查看 </el-button>
        <el-button type="primary" icon="edit-pen" size="small" @click="onActions('update', row)"> 编辑 </el-button>
      </template>
    </pro-table>
    <pro-form-dialog v-model="dialog.openView" mode="view" width="30%" :align-center="true">
      <pro-descriptions
        :title="['基本信息', '数值信息', '状态信息']"
        :items="descriptionsItems"
        :data="dialog.info"
        :column="1"
        :gap="20"
        :label-style="{
          width: '80px',
          fontWeight: 600,
          display: 'inline-flex'
        }"
      />
    </pro-form-dialog>
    <pro-dialog-page v-model="dialog.openAddEdit" :title="dialog.title" @on-close="dialog.activeStep = 0">
      <pro-steps-form
        v-model="dialog.info"
        v-model:active="dialog.activeStep"
        :steps="config.stepFormItems(dialog.mode)"
        :form-props="{
          style: {
            width: '30%'
          }
        }"
        @finish="submit"
      />
    </pro-dialog-page>
  </div>
</template>

<script setup lang="tsx">
import * as service from "@/api/modules/coin";
import { ProFormItem } from "@/components/ProForm";
import { useTableFetch } from "@/hooks";
import { ElMessage } from "element-plus";
import { computed, reactive, ref } from "vue";
import * as config from "./config";

const proTableRef = ref();

const dialog = reactive({
  title: "添加币种",
  openAddEdit: false,
  openView: false,
  mode: "create",
  activeStep: 0,
  info: {}
});

const { fetchData } = useTableFetch(service.getCoinByPage);

const descriptionsItems = computed(() => {
  return config.stepFormItems().map((step, index) => {
    if (index < 2) return step.form.items;
    return step.form.items.map((item: ProFormItem) => ({
      ...item,
      render: () => {
        const { options = [] } = item;
        const option = (options as any[])?.find(option => option.value == dialog.info[item?.field ?? ""]);
        return option ? <el-text type={option.value ? "success" : "danger"}> {option.label} </el-text> : "--";
      }
    }));
  });
});

const onActions = (type: "create" | "view" | "update", row = {}) => {
  dialog.info = row;
  dialog.mode = type;
  if (type === "create" || type === "update") {
    dialog.title = `${type === "create" ? "添加" : "编辑"}币种`;
    dialog.openAddEdit = true;
  }
  if (type === "view") {
    dialog.openView = true;
  }
};

const submit = entity => {
  const serviceName = dialog.mode == "update" ? "updateCoin" : "addCoin";
  service[serviceName](entity).then(() => {
    ElMessage.success("保存成功");
    dialog.openAddEdit = false;
    proTableRef.value.getTableList();
  });
};
</script>
