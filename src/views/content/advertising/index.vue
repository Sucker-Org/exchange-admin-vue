<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns" :row-key="'serialNumber'" :request-api="fetchData">
      <template #tableHeader>
        <el-button type="primary" icon="circle-plus" @click="onActions('add')">新增</el-button>
        <pro-button
          type="danger"
          icon="delete"
          tip="确定要删除吗?"
          :disabled="proTableRef?.selectedListIds.length === 0"
          @click="onDel(proTableRef.selectedListIds)"
        >
          批量删除
        </pro-button>
      </template>
      <template #linkUrl="{ row }">
        <el-link @click="onOpen(row.linkUrl)" :underline="false" target="_blank" v-if="row.linkUrl">点击跳转</el-link>
        <span v-else>暂无</span>
      </template>
      <template #status="{ row }">
        <el-tag :type="row.status === 0 ? 'success' : 'info'">{{ config.statusEnum[row.status] }}</el-tag>
      </template>
      <template #sysAdvertiseLocation="{ row }">
        <el-tag>{{ sysAdvertiseLocationEnum[row.sysAdvertiseLocation] }}</el-tag>
      </template>
      <template #isTop="{ row }">
        <el-switch inactive-text="不置顶" active-text="置顶" inline-prompt v-model="row.isTop" @click="onTopChange(row)" />
      </template>
      <template #operation="{ row }">
        <el-button size="small" type="success" icon="search" @click="onActions('view', row.serialNumber)">详情</el-button>
        <el-button size="small" type="primary" icon="edit" @click="onActions('edit', row.serialNumber)">编辑</el-button>
        <pro-button size="small" type="danger" icon="delete" tip="确定要删除吗?" @click="onDel([row.serialNumber])">
          删除
        </pro-button>
      </template>
    </pro-table>
    <detail
      ref="detailRef"
      :title="adDialog.title"
      v-model="adDialog.open"
      :type="adDialog.type"
      :serial-number="adDialog.serialNumber"
      @close-dialog="closeDialog"
    />
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/content/advertising";
import { useTableFetch } from "@/hooks";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import detail from "./action/index.vue";
import * as config from "./config";
const proTableRef = ref();

const adDialog = ref<{
  open: boolean;
  type: "add" | "edit" | "view";
  title: string;
  serialNumber?: string;
}>({
  open: false,
  type: "add",
  title: ""
});
const sysAdvertiseLocationEnum = {
  0: "app首页轮播",

  1: "pc首页轮播",

  2: "pc分类广告"
};

const { fetchData } = useTableFetch(service.list);

const onActions = (type: "add" | "view" | "edit", serialNumber = "") => {
  enum Title {
    "add" = "新增",
    "view" = "详情",
    "edit" = "编辑"
  }
  adDialog.value.type = type;
  adDialog.value.title = Title[type];
  adDialog.value.serialNumber = serialNumber;
  adDialog.value.open = true;
};

const onTopChange = async row => {
  service.top({ id: row.serialNumber, isTop: row.isTop }).then(() => {
    ElMessage.success("操作成功");
    proTableRef.value.search();
  });
};

const onDel = ids => {
  service.deletes({ ids }).then(() => {
    ElMessage.success("删除成功");
    proTableRef.value.getTableList();
  });
};
const closeDialog = () => {
  adDialog.value.open = false;
  proTableRef.value.getTableList();
};
const onOpen = link => {
  let url = link;
  if (!/^https?:\/\//i.test(link)) {
    url = `https://${link}`;
  }
  window.open(url);
};
</script>
