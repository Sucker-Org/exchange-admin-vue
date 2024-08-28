<!--
 * @Description: 
 * @Date: 2024-04-12 15:11:30
 * @LastEditTime: 2024-05-16 17:29:12
-->
<template>
  <div class="table-box">
    <ProTable ref="proTableRef" title="字典列表" :columns="config.tableColumns" :request-api="fetchData">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" icon="circle-plus" @click="onActions('create')">添加字典</el-button>
      </template>
      <template #isShow="{ row }">
        <el-tag :type="row.isShow ? 'primary' : 'info'">{{ row.isShow ? "显示" : "隐藏" }}</el-tag>
      </template>
      <!-- 字典操作 -->
      <template #operation="{ row }">
        <el-button type="primary" icon="edit-pen" size="small" @click="onActions('update', row)"> 编辑 </el-button>
        <pro-button type="danger" icon="delete" size="small" tip="确定要删除吗？" @click="onActions('delete', row)">
          删除
        </pro-button>
      </template>
    </ProTable>
    <pro-form-dialog
      width="30%"
      v-model="dialog.open"
      :mode="dialog.mode"
      :form-items="config.formItems(dialog.mode)"
      :initial-value="dialog.detail"
      :request="submit"
      @close="dialog.detail = {}"
    />
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/dict";
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

const { fetchData } = useTableFetch(service.getDictByPage);

const onActions = (type: "create" | "update" | "delete", row: Record<string, any> = {}) => {
  if (type != "delete") {
    dialog.detail = row;
    dialog.mode = type;
    dialog.open = true;
    return;
  }
  service.deleteDict(row.id).then(() => {
    ElMessage.success("已删除");
    proTableRef.value.getTableList();
  });
};

const submit = entity => {
  service[dialog.mode == "create" ? "addDict" : "updateDict"](entity).then(() => {
    ElMessage.success("已保存");
    dialog.open = false;
    proTableRef.value.getTableList();
  });
};
</script>
