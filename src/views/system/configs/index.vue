<!--
 * @Description: 
 * @Date: 2024-04-12 15:11:30
 * @LastEditTime: 2024-06-13 11:49:48
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" title="配置列表" :columns="config.tableColumns" :request-api="fetchData">
      <template #tableHeader>
        <el-button type="primary" icon="circle-plus" @click="onActions('create')">添加配置</el-button>
      </template>
      <template #operation="{ row }">
        <el-button type="success" icon="search" size="small" @click="onActions('view', row)"> 查看 </el-button>
        <el-button type="primary" icon="edit-pen" size="small" @click="onActions('update', row)"> 编辑 </el-button>
        <pro-button type="danger" icon="delete" size="small" tip="确定要删除吗？" @click="onActions('delete', row)">
          删除
        </pro-button>
      </template>
    </pro-table>
    <pro-form-dialog
      width="35%"
      v-model="dialog.open"
      :mode="dialog.mode"
      :form-items="config.formItems"
      :initial-value="dialog.detail"
      :request="submit"
      @close="dialog.detail = {}"
    />
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/config";
import { useTableFetch } from "@/hooks";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import * as config from "./config";

const proTableRef = ref();

const dialog = reactive({
  mode: "create",
  open: false,
  detail: {}
});

const { fetchData } = useTableFetch(service.getConfigByPage);

const onActions = (type: "create" | "view" | "update" | "delete", row: Record<string, any> = {}) => {
  if (type != "delete") {
    dialog.mode = type;
    dialog.open = true;
  }
  if (type == "view" || type == "update") {
    dialog.detail = row;
  }

  if (type == "delete") {
    service.delConfig(row.id).then(() => {
      ElMessage.success("删除成功");
      proTableRef.value.getTableList();
    });
  }
};

const submit = entity => {
  const serviceName = entity.id ? "updateConfig" : "addConfig";
  service[serviceName](entity).then(() => {
    ElMessage.success("保存成功");
    dialog.open = false;
    proTableRef.value.getTableList();
  });
};
</script>
