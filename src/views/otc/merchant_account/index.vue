<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-05-21 14:18:04
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns" :request-api="fetchData">
      <template #operation="{ row }">
        <pro-button
          v-if="row.publishAdvertise"
          type="danger"
          icon="CloseBold"
          size="small"
          tip="确定要禁止发布吗?"
          @click="onReleaseStatus(row, 0)"
        >
          禁止发布
        </pro-button>
        <el-button v-else type="success" icon="Select" size="small" @click="onReleaseStatus(row, 1)"> 允许发布 </el-button>
      </template>
    </pro-table>
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/otc";
import { useTableFetch } from "@/hooks";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import * as config from "./config";

const proTableRef = ref();

const { fetchData } = useTableFetch(service.getMerchantAccountByPage);

const onReleaseStatus = (row, status) => {
  service.updateAdvertisingReleaseStatus({ id: row.id, status }).then(() => {
    ElMessage.success("操作成功");
    proTableRef.value.getTableList();
  });
};
</script>
