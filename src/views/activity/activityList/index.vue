<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns" :request-api="fetchData">
      <template #tableHeader>
        <el-button type="primary" icon="circle-plus" @click="onActions('add')">新增</el-button>
      </template>
      <template #noticeLink="{ row }">
        <el-link @click="onOpen(row.noticeLink)" :href="row.noticeLink" target="_blank">{{ row.noticeLink }}</el-link>
      </template>
      <template #activityLink="{ row }">
        <el-link @click="onOpen(row.activityLink)" :underline="false" :href="row.activityLink" target="_blank">{{
          row.activityLink
        }}</el-link>
      </template>
      <template #status="{ row }">
        <el-tag v-if="row.status === 1" type="success">显示</el-tag>
        <el-tag v-else type="info">隐藏</el-tag>
      </template>
      <template #step="{ row }">
        {{ row.step }}
      </template>
      <template #unit="{ row }">
        {{ row.totalSupply + "/" + row.unit }}
      </template>
      <template #operation="{ row }">
        <el-button size="small" type="success" @click="onOrderList(row)">活动订单列表</el-button>
        <el-button size="small" type="success" @click="onActions('view', row.id)">详情</el-button>
        <el-button size="small" type="primary" @click="onActions('edit', row.id)">编辑</el-button>
      </template>
    </pro-table>
    <!-- 详情页 -->
    <action
      ref="detailRef"
      :title="dialog.title"
      v-model="dialog.open"
      :type="dialog.type"
      @close-dialog="closeDialog"
      :id="dialog.id"
    />
    <orderList
      ref="orderListlRef"
      :title="orderListDialog.title"
      v-model="orderListDialog.open"
      @close-dialog="closeDialog"
      :id="orderListDialog.id"
    >
    </orderList>
    <el-dialog v-model="progressdialog.open" :title="progressdialog.title">
      <el-form>
        <el-form-item label="修改进度值:">
          <el-slider v-model="progressdialog.progress" show-input />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="progressdialog.open = false">取消</el-button>
        <el-button @click="onEditProgress" type="primary">确定</el-button>
      </template>
    </el-dialog>
    <div style="font-size: 12px">
      <p>注意：此页面新建活动仅仅是为了将所有活动聚合以供展示，实际活动的业务与此处无关</p>
      <p>活动发起先行条件：</p>
      <p>【抢购】与【分摊】需要在【币币设置】中新建交易对时对活动进行设置</p>
      <p>【持仓瓜分】与【认购】需要在【活动管理】中新建新的活动</p>
      <br />
      <p>1、抢购：所有用户【抢购】指定数量的币，首次上线交易对可指定该类别，需要在【币币设置】中添加新交易对时确定活动内容</p>
      <p>2、分摊：所有用户【平分】指定数量的币，首次上线交易对可指定该类别，需要在【币币设置】中添加新交易对时确定活动内容</p>
      <p>3、持仓瓜分：任意时段可发起的活动，活动前，快照用户持仓量，根据用户持仓量瓜分指定数量的币</p>
      <p>4、认购：一般做首发类型的活动，属于IEO认购类型，所有用户抢购指定数量的币</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import * as service from "@/api/modules/activity/list";
import { useTableFetch } from "@/hooks";
import { ElMessage } from "element-plus";
import { ref } from "vue";
import action from "./action/index.vue";
import * as config from "./config";
import orderList from "./orderList/index.vue";
const dialog = ref({
  title: "详情",
  open: false,
  type: "add",
  id: ""
});
const orderListDialog = ref({
  title: "活动订单列表",
  open: false,
  id: undefined
});
const proTableRef = ref();

const { fetchData } = useTableFetch(service.getList, params => {
  if (params.createTime) {
    params["startTime"] = params.createTime[0];
    params["endTime"] = params.createTime[1];
  }
  delete params.createTime;
  return params;
});

const closeDialog = () => {
  dialog.value.open = false;
  proTableRef.value.getTableList();
};
const onOrderList = async row => {
  orderListDialog.value.open = true;
  orderListDialog.value.id = row.id;
};

const onActions = (type: "add" | "view" | "edit", id = "") => {
  enum Title {
    "add" = "新增",
    "view" = "详情",
    "edit" = "编辑"
  }
  dialog.value.title = Title[type];
  dialog.value.type = type;
  dialog.value.id = id;
  dialog.value.open = true;
};

const onOpen = link => {
  let url = link;
  if (!/^https?:\/\//i.test(link)) {
    url = `https://${link}`;
  }
  window.open(url);
};
const progressdialog = ref({
  title: "",
  open: false,
  id: undefined,
  progress: 0
});
const onEditProgress = () => {
  const form = {
    id: progressdialog.value.id,
    progress: progressdialog.value.progress
  };
  service.editActProgress(form).then(() => {
    ElMessage.success("修改成功");
    progressdialog.value.open = false;
    proTableRef.value.search();
  });
};
</script>
