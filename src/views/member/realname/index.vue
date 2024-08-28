<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-07-12 16:48:04
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns" :request-api="fetchData">
      <template #operation="{ row }">
        <el-button
          v-if="row.auditStatus === 0 || row.auditStatus === 3"
          type="primary"
          icon="reading"
          size="small"
          @click="onAction('approval', row)"
        >
          审核
        </el-button>
        <el-button v-else type="success" icon="search" size="small" @click="onAction('view', row)"> 查看 </el-button>
      </template>
    </pro-table>
    <pro-dialog-page v-model="dialog.open" title="实名信息" @on-close="onDialogPageClose">
      <template #header-tools>
        <el-button type="primary" icon="reading" size="small" @click="dialog.openApproval = true">
          {{ dialog.detail?.auditStatus === 3 ? "重新审核" : "审核" }}
        </el-button>
      </template>
      <div class="top-info">
        <span>客户名称：{{ dialog?.detail?.realName || "--" }}</span>
        <span>身份证号码：{{ dialog?.detail?.idCard || "--" }}</span>
      </div>
      <div class="id-photo-container">
        <div v-for="(item, index) in dialog.detail.idPhotos" :key="index">
          <el-image
            class="id-photo"
            :src="item.src"
            :zoom-rate="1.2"
            :max-scale="7"
            :min-scale="0.2"
            :preview-src-list="dialog.detail.idPhotos.map(photo => photo.src)"
            :initial-index="index"
            fit="cover"
          />
          <p style="font-size: 16px; text-align: center">{{ item.text }}</p>
        </div>
      </div>
      <p class="status-text">
        <span :style="{ color: MemberStatusEnum[dialog.detail?.auditStatus]?.color }">
          {{ MemberStatusEnum[dialog.detail.auditStatus].text || "状态未知" }}
        </span>
      </p>
      <div class="status-text">
        <span class="desc" :style="{ color: MemberStatusEnum[dialog.detail.auditStatus]?.color }">
          {{ dialog.detail.rejectReason }}
        </span>
      </div>
    </pro-dialog-page>
    <pro-form-dialog
      v-model="dialog.openApproval"
      :title="dialog.detail?.auditStatus === 3 ? '重新审核' : '审核'"
      :width="'30%'"
      :form-items="config.approvalFormItems"
      :request="submitApproval"
    />
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/member";
import { MemberStatusEnum } from "@/enums";
import { useTableFetch } from "@/hooks";
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import * as config from "./config";

const proTableRef = ref();

const dialog = reactive<{ [x: string]: any }>({
  open: false,
  openApproval: false,
  type: "view",
  detail: {
    auditStatus: null
  }
});

const { fetchData } = useTableFetch(service.getRealNameByPage);

const getDetail = async id => {
  const res = await service.getRealNameDetail({ id: id });
  return res.data;
};
const onAction = async (type: "approval" | "view", row) => {
  dialog.type = type;
  const detail = (await getDetail(row.id)) as any;
  dialog.detail = detail;
  dialog.detail["idPhotos"] = [
    {
      src: detail.identityCardImgInHand,
      text: "身份证正面"
    },
    {
      src: detail.identityCardImgFront,
      text: "手持证件"
    },
    {
      src: detail.identityCardImgReverse,
      text: "身份证反面"
    }
  ];
  dialog.open = true;
};

const submitApproval = data => {
  service.realnameApproval({ id: dialog.detail.id, ...data }).then(() => {
    dialog.openApproval = false;
    dialog.detail.auditStatus = data.isPass ? 2 : 1;
    ElMessage.success("保存成功");
  });
};

const onDialogPageClose = () => {
  if (dialog.type === "approval") {
    proTableRef.value.getTableList();
  }
  dialog.type = "view";
};
</script>

<style scoped lang="scss">
.top-info {
  display: flex;
  justify-content: space-around;
}
.id-photo-container {
  display: flex;
  justify-content: space-around;
  margin: 50px 0;
  .id-photo {
    width: 260px;
    height: 360px;
    border: 6px dashed #dcdcdc;
  }
}
.status-text {
  display: flex;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  .desc {
    font-size: 12px;
  }
}
</style>
