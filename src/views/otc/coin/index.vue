<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-06-24 14:11:36
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="tableColumns" :request-api="fetchData">
      <template #tableHeader>
        <el-button type="primary" icon="circle-plus" @click="onAction('add')">添加币种</el-button>
        <pro-button
          type="danger"
          icon="delete"
          tip="确定要删除所选币种吗?"
          :disabled="!proTableRef?.selectedListIds.length"
          @click="onDeletes"
        >
          批量删除
        </pro-button>
      </template>
      <template #operation="{ row }">
        <el-button type="primary" icon="edit-pen" size="small" @click="onAction('edit', row)"> 编辑 </el-button>
      </template>
    </pro-table>
    <pro-form-dialog
      v-model="dialog.open"
      width="30%"
      :title="dialog.title"
      :initial-value="dialog.detail"
      :form-items="config.formItems(coinTypeOptions)"
      :form-props="{ required: true }"
      :request="submit"
      @close="dialog.detail = {}"
      @value-change="valueChange"
    />
  </div>
</template>

<script setup lang="ts">
import { getCoinTypeOptions } from "@/api/modules/options";
import * as service from "@/api/modules/otc";
import { useTableFetch } from "@/hooks";
import { ElMessage } from "element-plus";
import { computed, reactive, ref } from "vue";
import * as config from "./config";
const proTableRef = ref();

const coinTypeOptions = ref<{ label: string; value: string; name: string; nameCn: string }[]>([]);

const dialog = reactive({
  open: false,
  title: "",
  detail: {} as any
});

const { fetchData } = useTableFetch(service.getCoinByPage);

const tableColumns = computed(() => config.tableColumns(coinTypeOptions));

const getCoinsOptions = () => {
  getCoinTypeOptions().then(res => {
    coinTypeOptions.value = res.data
      .map(option => ({ label: option.unit, value: option.unit, name: option.name, nameCn: option.nameCn }))
      .reverse();
    // coinOptions.unit = [...coinTypeOptions.value];
  });
};

getCoinsOptions();

const valueChange = (entity, key) => {
  coinTypeOptions.value.map(item => {
    if (item.label == entity[key] && key == "unit") {
      dialog.detail.unit = item.label;
      dialog.detail.name = item.name;
      dialog.detail.nameCn = item.nameCn;
    }
  });
};

const onAction = (type: "add" | "edit", row?: Record<string, any>) => {
  if (type == "edit") {
    dialog.detail = { ...row };
  }
  dialog.title = type == "add" ? "添加币种" : "编辑币种";
  dialog.open = true;
};

const submit = entity => {
  service[entity.id ? "editCoin" : "addCoin"](entity).then(() => {
    ElMessage.success("已保存");
    dialog.open = false;
    proTableRef.value.getTableList();
  });
};

const onDeletes = () => {
  service.delCoins(proTableRef.value.selectedListIds).then(() => {
    ElMessage.success("删除成功");
    proTableRef.value.getTableList();
  });
};
</script>
