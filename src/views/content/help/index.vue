<!--
 * @Description: 
 * @Date: 2024-05-09 16:56:38
 * @LastEditTime: 2024-06-13 09:52:54
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns" :request-api="fetchData">
      <template #tableHeader>
        <el-button type="primary" icon="circle-plus" @click="onActions('add')">新增</el-button>
        <pro-button
          type="danger"
          icon="delete"
          tip="确定要删除吗?"
          :disabled="proTableRef?.selectedListIds.length === 0"
          @click="onDel(proTableRef?.selectedListIds)"
        >
          批量删除
        </pro-button>
      </template>
      <template #status="{ row }">
        <el-tag>{{ config.statusEnum[row.status] }}</el-tag>
      </template>
      <template #isTop="{ row }">
        <el-switch
          inactive-text="不置顶"
          active-text="置顶"
          inline-prompt
          v-model="row.isTop"
          @click="onTopChange(row)"
        ></el-switch>
      </template>
      <template #operation="{ row }">
        <el-button size="small" type="success" icon="search" @click="onActions('view', row.id)">查看</el-button>
        <el-button size="small" type="primary" icon="edit" @click="onActions('edit', row.id)">编辑</el-button>
        <pro-button size="small" type="danger" icon="delete" tip="确定要删除吗?" @click="onDel([row.id])">删除</pro-button>
      </template>
    </pro-table>
    <detail
      ref="detailRef"
      v-model="dialog.open"
      :title="dialog.title"
      :type="dialog.type"
      :id="dialog.id"
      @close-dialog="closeDialog"
    />
  </div>
</template>
<script setup lang="ts">
import * as service from "@/api/modules/content/help";
import { useTableFetch } from "@/hooks";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import detail from "./action/index.vue";
import * as config from "./config";
const proTableRef = ref();

const dialog = ref<{
  open: boolean;
  type: string;
  title: string;
  id?: number | string;
}>({
  open: false,
  type: "detail",
  title: "",
  id: undefined
});

const { fetchData } = useTableFetch(service.list);

const onActions = (type: "add" | "view" | "edit", id = "") => {
  enum Title {
    "add" = "新增",
    "view" = "详情",
    "edit" = "编辑"
  }
  dialog.value.type = type;
  dialog.value.title = Title[type];
  dialog.value.id = id;
  dialog.value.open = true;
};

const onDel = ids => {
  service.deletes({ ids }).then(() => {
    ElMessage.success("删除成功");
    proTableRef.value.getTableList();
  });
};
const closeDialog = () => {
  dialog.value.open = false;
  proTableRef.value.getTableList();
};
const onTopChange = row => {
  service.top({ id: row.id, isTop: row.isTop }).then(() => {
    ElMessage.success("操作成功");
    proTableRef.value.search();
  });
};
</script>
