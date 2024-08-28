<!--
 * @Description: 
 * @Date: 2024-04-07 09:54:32
 * @LastEditTime: 2024-07-17 16:25:38
-->
<template>
  <RenderTableColumn v-bind="column" />
</template>

<script setup lang="tsx" name="TableColumn">
import ProCopyable from "@/components/ProCopyable/index.vue";
import { ColumnProps, HeaderRenderScope, RenderScope } from "@/components/ProTable/interface";
import { filterEnum, formatValue, handleProp, handleRowAccordingToProp } from "@/utils";
import { inject, ref, useSlots } from "vue";
import { formatMoney } from "../utils";

defineProps<{ column: ColumnProps }>();

const slots = useSlots();

const enumMap = inject("enumMap", ref(new Map()));

// 渲染表格数据
const renderCellData = (item: ColumnProps, scope: RenderScope<any>) => {
  const data =
    enumMap.value.get(item.prop) && item.isFilterEnum
      ? filterEnum(handleRowAccordingToProp(scope.row, item.prop!), enumMap.value.get(item.prop)!, item.fieldNames)
      : formatValue(handleRowAccordingToProp(scope.row, item.prop!));

  if (item.type == "money" && (data == 0 || data == "--")) {
    return "0.00";
  }

  return item.type == "money" && !Number.isNaN(+data) ? formatMoney(data) : data;
};

// 获取 tag 类型
const getTagType = (item: ColumnProps, scope: RenderScope<any>) => {
  return (
    filterEnum(handleRowAccordingToProp(scope.row, item.prop!), enumMap.value.get(item.prop), item.fieldNames, "tag") || "primary"
  );
};

const RenderTableColumn = (item: ColumnProps) => {
  return (
    <>
      {item.isShow && (
        <el-table-column
          {...item}
          align={item.align ?? "center"}
          showOverflowTooltip={item.showOverflowTooltip ?? item.prop !== "operation"}
        >
          {{
            default: (scope: RenderScope<any>) => {
              if (item._children) return item._children.map(child => RenderTableColumn(child));
              if (item.render) return item.render(scope);
              if (slots[handleProp(item.prop!)]) return slots[handleProp(item.prop!)]!({ ...scope, row: { ...scope.row } });
              if (item.tag) return <el-tag type={getTagType(item, scope)}>{renderCellData(item, scope)}</el-tag>;
              return item.copyable ? <ProCopyable value={renderCellData(item, scope)} /> : renderCellData(item, scope);
            },
            header: (scope: HeaderRenderScope<any>) => {
              if (item.headerRender) return item.headerRender(scope);
              if (slots[`${handleProp(item.prop!)}Header`]) return slots[`${handleProp(item.prop!)}Header`]!(scope);
              return item.label;
            }
          }}
        </el-table-column>
      )}
    </>
  );
};
</script>

<style>
.el-table .el-table__cell.is-center > .cell.el-tooltip:has(> .copyable-value) {
  justify-content: center;
}
.el-table .el-table__cell.is-left > .cell.el-tooltip:has(> .copyable-value) {
  justify-content: left;
}
.el-table .el-table__cell.is-right > .cell.el-tooltip:has(> .copyable-value) {
  justify-content: right;
}
</style>
