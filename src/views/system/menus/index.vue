<!--
 * @Description: 
 * @Date: 2024-04-07 09:54:32
 * @LastEditTime: 2024-06-03 09:39:08
-->
<template>
  <div class="table-box">
    <ProTable ref="proTable" title="菜单列表" :indent="20" :columns="columns" :pagination="false" :request-api="getMenuData">
      <!-- 表格 header 按钮 -->
      <template #tableHeader>
        <el-button type="primary" icon="circle-plus" @click="onAddBtn(0)">添加菜单</el-button>
      </template>
      <!-- 菜单图标 -->
      <template #icon="{ row }">
        <el-icon v-if="row.icon && row.icon != '--'" :size="18">
          <component :is="row.icon" />
        </el-icon>
        <span v-else>--</span>
      </template>
      <template #menuType="{ row }">
        {{ MenuTypeEnum[row.menuType] }}
      </template>
      <template #isShow="{ row }">
        <el-tag :type="row.isShow ? 'success' : 'info'">{{ row.isShow ? "显示" : "隐藏" }}</el-tag>
      </template>
      <!-- 菜单操作 -->
      <template #operation="{ row }">
        <el-button type="success" icon="plus" size="small" @click="onAddBtn(row.id)"> 添加 </el-button>
        <el-button type="primary" icon="edit-pen" size="small" @click="onEditBtn(row)"> 编辑 </el-button>
        <pro-button type="danger" icon="delete" size="small" tip="确定要删除吗？" @click="onDelMenu(row.id)"> 删除 </pro-button>
      </template>
    </ProTable>
    <add-or-edit-dialog
      ref="dialogRef"
      v-model="dialog.open"
      :tree="menuTree"
      :title="dialog.title"
      :initial-value="menuInfo"
      @close="menuInfo = {}"
      @finish="onStartSave"
    />
  </div>
</template>

<script setup lang="ts" name="menuMange">
import * as service from "@/api/modules/menu";
import { ColumnProps } from "@/components/ProTable/interface";
import { ElMessage } from "element-plus";
import { reactive, ref } from "vue";
import AddOrEditDialog from "./AddOrEditDialog.vue";

const proTable = ref();

const dialog = reactive({
  open: false,
  title: ""
});

const dialogRef = ref();

const menuTree = ref([
  {
    id: 0,
    name: "主目录",
    childList: []
  }
]);

const menuInfo = ref<{ [x: string]: any }>({});

enum MenuTypeEnum {
  "M" = "目录",
  "C" = "菜单",
  "A" = "按钮"
}

// 表格配置项
const columns: ColumnProps[] = [
  { prop: "name", label: "菜单名称", width: 220, align: "left" },
  { prop: "icon", label: "菜单图标" },
  { prop: "path", label: "菜单路径" },
  { prop: "component", label: "组件路径" },
  { prop: "menuType", label: "类型" },
  { prop: "isShow", label: "显隐" },
  { prop: "operation", label: "操作", width: 250, fixed: "right" }
];

const onAddBtn = pid => {
  if (pid) {
    menuInfo.value.pid = pid;
  }
  dialog.title = "添加菜单";
  dialog.open = true;
};

const onEditBtn = row => {
  menuInfo.value = { ...row };
  delete menuInfo.value.children;
  dialog.title = "编辑菜单";
  dialog.open = true;
};

const onDelMenu = id => {
  service.delMenu(id).then(() => {
    ElMessage.success("删除成功");
    proTable.value.getTableList();
  });
};

const getMenuData = async () => {
  const res = (await service.getMenuTree()) as Record<string, any>;
  menuTree.value[0].childList = res.data;

  const menustructProcessing = menus => {
    return menus.map(item => {
      const menu = {
        ...item,
        children: menustructProcessing(item.childList || [])
      };
      delete menu.childList;
      return menu;
    });
  };

  return {
    data: menustructProcessing(res.data)
  };
};

const onStartSave = async entity => {
  const serviceName = menuInfo.value.id ? "updateMenu" : "addMenu";
  dialogRef.value.loading = true;
  service[serviceName](entity)
    .then(() => {
      ElMessage.success("已保存");
      dialog.open = false;
      proTable.value.getTableList();
    })
    .finally(() => {
      dialogRef.value.loading = false;
    });
};
</script>
