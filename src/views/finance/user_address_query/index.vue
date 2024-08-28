<!--
 * @Description: 
 * @Date: 2024-05-21 16:57:13
 * @LastEditTime: 2024-05-22 10:54:20
-->
<template>
  <div class="user_address_query">
    <el-card>
      <el-form :inline="true">
        <el-form-item label="地址:">
          <el-input v-model="queryAddress" placeholder="请输入地址" />
        </el-form-item>
        <el-form-item>
          <el-button :disabled="queryAddress ? false : true" type="primary" icon="search" @click="onSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-row :gutter="10" class="query-content">
      <el-col :span="24" class="card-height">
        <pro-table
          ref="proTableRef"
          :columns="tableColumns"
          :tool-button="false"
          :init-param="queryParams"
          :request-api="async params => (params.address ? fetchData(params) : null)"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { tableColumns } from "./config";
import * as service from "@/api/modules/finance";
import { useTableFetch } from "@/hooks";

const queryAddress = ref("");

const queryParams = ref<{ address: null | string }>({
  address: null
});

const proTableRef = ref();

const { fetchData } = useTableFetch(service.searchUserAddress);

const onSearch = () => {
  queryParams.value.address = queryAddress.value;
};
</script>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 0;
}
.user_address_query {
  height: 100%;
}
.query-content {
  height: calc(100% - (71.99px + 15px));
  margin-top: 10px;
  .card-height {
    height: 100%;
  }
}
</style>
