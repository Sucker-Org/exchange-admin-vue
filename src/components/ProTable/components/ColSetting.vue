<!--
 * @Description: 
 * @Date: 2024-04-07 09:54:32
 * @LastEditTime: 2024-07-16 14:07:18
-->
<template>
  <!-- 列设置 -->
  <el-drawer v-model="open" title="列设置" size="450px">
    <div class="table-main">
      <el-table :data="colSetting" :border="true" row-key="prop" default-expand-all :tree-props="{ children: '_children' }">
        <el-table-column prop="label" align="center" label="列名" />
        <el-table-column v-slot="scope" prop="isShow" align="center" label="显示">
          <el-switch v-model="scope.row.isShow"></el-switch>
        </el-table-column>
        <el-table-column v-slot="scope" prop="sortable" align="center" label="排序">
          <el-switch v-model="scope.row.sortable"></el-switch>
        </el-table-column>
        <template #empty>
          <div class="table-empty">
            <img src="@/assets/images/notData.png" alt="notData" />
            <div>暂无可配置列</div>
          </div>
        </template>
      </el-table>
    </div>
  </el-drawer>
</template>

<script setup lang="ts" name="ColSetting">
import { ColumnProps } from "@/components/ProTable/interface";
import { computed } from "vue";

const props = defineProps<{ modelValue?: Boolean; colSetting: ColumnProps[] }>();

const emit = defineEmits(["update:modelValue"]);

const open = computed({
  get: () => {
    return props.modelValue;
  },
  set: v => emit("update:modelValue", v)
});

const openColSetting = () => {
  emit("update:modelValue", true);
};

defineExpose({
  openColSetting
});
</script>

<style scoped lang="scss">
.cursor-move {
  cursor: move;
}
</style>
