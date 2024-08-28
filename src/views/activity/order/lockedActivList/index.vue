<!--
 * @Description: 
 * @Date: 2024-05-31 21:13:40
 * @LastEditTime: 2024-06-17 11:02:15
-->
<template>
  <div class="lock-activity-order">
    <pro-table
      ref="proTableRef"
      :columns="config.tableColumns"
      :request-api="async params => await fetchData({ id: props.id, ...params })"
    >
      <template #tableHeader>
        <el-button @click="addOrder" type="primary">添加订单</el-button>
      </template>
      <template #operation="{ row }">
        <el-button @click="onEdit(row)" type="primary" size="small">修改</el-button>
      </template>
    </pro-table>
    <pro-form-dialog
      v-model="addVisible"
      title="订单信息"
      width="30%"
      mode="create"
      :form-items="config.formItems"
      :initial-value="form"
      :request="onAddSubmit"
    />
    <pro-form-dialog
      v-model="editVisible"
      title="修改订单"
      width="40%"
      mode="update"
      :form-items="config.editItems(editForm)"
      :initial-value="editForm"
      :request="onEditSubmit"
    />
  </div>
</template>
<script setup lang="ts">
import * as service from "@/api/modules/activity/order";
import { useTableFetch } from "@/hooks";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import * as config from "./config";

const proTableRef = ref();
const addVisible = ref(false);
const editVisible = ref(false);

const props = defineProps<{
  id: any;
}>();

const { fetchData } = useTableFetch(service.getLockActivityOrderByPage);

const addOrder = () => {
  addVisible.value = true;
};
const form = ref({
  activityId: props.id,
  lockedDays: "",
  originReleaseamount: "",
  currentReleaseamount: ""
});
const editForm = ref<Record<string, any>>({});

const onAddSubmit = entity => {
  service.addLockOrder(entity).then(() => {
    ElMessage.success("添加成功");
    addVisible.value = false;
    proTableRef.value.getTableList();
  });
};
const onEdit = row => {
  editForm.value.id = row.id;
  editForm.value.lockedDays = row.lockedDays;
  editForm.value.originReleaseamount = row.originReleaseamount;
  editForm.value.currentReleaseamount = row.currentReleaseamount;
  editForm.value.period = row.period;
  editVisible.value = true;
};
const onEditSubmit = entity => {
  service.editSubBalance(entity).then(() => {
    ElMessage.success("修改成功");
    editVisible.value = false;
    proTableRef.value.getTableList();
  });
};
</script>

<style scoped lang="scss">
:deep(.el-dialog__body) {
  height: calc(100% - 85px);
}
.lock-activity-order {
  height: 70vh;
}
.lock-activity-order > :deep(.card) {
  padding: 0;
  border: 0;
  border-radius: 0;
  box-shadow: unset;
}
</style>
