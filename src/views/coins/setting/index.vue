<!--
 * @Description: 
 * @Date: 2024-04-09 15:00:08
 * @LastEditTime: 2024-06-24 17:40:51
-->
<template>
  <div class="table-box">
    <pro-table ref="proTableRef" :columns="config.tableColumns(coinTypeOptions)" :request-api="fetchData">
      <template #settingParams="{ row }">
        <el-button :type="row.exEngineStatus ? 'success' : 'primary'" size="small" plain @click="onOpenRobotConfigDialog(row)">
          {{ row.exEngineStatus ? "查看" : "新建" }}
        </el-button>
      </template>
      <template #tableHeader>
        <el-button type="primary" icon="circle-plus" @click="dialog.openPage = true">添加交易对</el-button>
        <el-button type="success" icon="promotion" @click="onExport">导出</el-button>
      </template>
      <template #operation="{ row }">
        <el-button type="primary" size="small" icon="setting" @click="onSetting(row)">设置</el-button>
        <template v-if="row.engineStatus === 1">
          <el-button type="danger" size="small" icon="video-pause" @click="onTableActions('stop', row.symbol)">
            暂停引擎
          </el-button>
        </template>
        <template v-if="row.engineStatus === 0 || row.engineStatus === 2">
          <el-button type="success" size="small" icon="video-play" @click="onTableActions('start', row.symbol)">
            启动引擎
          </el-button>
        </template>
        <el-button type="warning" size="small" @click="onTableActions('revoke', row.symbol)">撤销所有委托</el-button>
        <el-button type="info" size="small" icon="setting" @click="onTableActions('reset', row.symbol)">重置引擎</el-button>
        <pro-button type="danger" size="small" icon="delete" @click="onTableActions('del', row.symbol)"> 删除 </pro-button>
      </template>
    </pro-table>
    <pro-form-dialog
      v-model="dialog.openSetting"
      title="修改信息"
      width="30%"
      :initial-value="dialog.info"
      :form-items="config.setting"
      :request="submitEdit"
    />
    <pro-form-dialog
      v-model="dialog.openSettingParams"
      title="机器人参数"
      width="30%"
      :align-center="true"
      :initial-value="{ ...dialog.info, coinName: dialog.currAction.coinName }"
      :form-items="config.settingParams"
      :request="submitRobotConfig"
    />
    <pro-dialog-page v-model="dialog.openPage" title="添加币种" @on-close="activeStep = 0">
      <pro-steps-form
        v-if="dialog.openPage"
        v-model:active="activeStep"
        :steps="config.steps"
        :action-button-full="true"
        @finish="onAddSave"
      />
    </pro-dialog-page>
    <pro-form-dialog v-model="dialog.openPassword" :title="dialog.currAction?.title" mode="view" width="30%">
      <pro-form
        v-model="dialog.currAction"
        :items="[
          { label: ' ', slot: 'tip' },
          {
            label: '交易对:',
            field: 'symbol',
            required: true,
            inputProps: {
              disabled: true
            }
          },
          { label: '操作密钥:', type: 'input-password', field: 'password', required: true }
        ]"
      >
        <template #tip-input-box>
          <el-text type="danger" style="font-size: 12px">{{ dialog.currAction.tip }}</el-text>
        </template>
        <template #actions>
          <pro-button
            plain
            type="primary"
            style="flex: 1"
            :disabled="!dialog.currAction.password"
            :loading="dialog.loading"
            :tip="`确定要立即${dialog.currAction.title.slice(0, 2)}吗?`"
            @click="onStartTableActionService"
          >
            {{ dialog.currAction.title }}
          </pro-button>
        </template>
      </pro-form>
    </pro-form-dialog>
  </div>
</template>

<script setup lang="ts">
import * as service from "@/api/modules/coin";
import { getCoinTypeOptions } from "@/api/modules/options";
import { useDownload, useTableFetch } from "@/hooks";
import { ElMessage } from "element-plus";
import md5 from "md5";
import { reactive, ref } from "vue";
import * as config from "./config";

const proTableRef = ref();

const coinTypeOptions = ref<{ label: string; value: string }[]>([]);

const dialog = reactive<{ [x: string]: any }>({
  info: {},
  loading: false,
  openPage: false,
  openSetting: false,
  openSettingParams: false,
  openPassword: false,
  currAction: {}
});

const activeStep = ref(0);

const { fetchData } = useTableFetch(service.getCoinSettingListByPage);

const getCoinsOptions = () => {
  getCoinTypeOptions().then(res => {
    coinTypeOptions.value = res.data
      .map(option => ({ label: option.unit, value: option.name != "全部" ? option.unit : "" }))
      .reverse();
  });
};

const onAddSave = data => {
  service.addTransactionPairsCoin(data).then(() => {
    ElMessage.success("保存成功");
    dialog.openPage = false;
    proTableRef.value.getTableList();
  });
};

const onExport = () => useDownload(service.exportCoinSettingList, `币币设置`);

const onTableActions = (type: "stop" | "start" | "revoke" | "reset" | "del", symbol) => {
  const config = {
    stop: {
      title: "暂停引擎",
      service: "stopTradingEngine",
      tip: "注意：暂停引擎前，交易对状态需要设置：【可交易】= 是"
    },
    start: {
      title: "启动引擎",
      service: "startTradingEngine",
      tip: "注意：启动引擎前，交易对状态需要设置：【状态】= 上架"
    },
    revoke: {
      title: "撤销所有委托",
      service: "revokeAllEntrust",
      tip: "注意：撤销委托前，请先设置交易对为不可交易"
    },
    reset: {
      title: "重置引擎",
      service: "resetTradingEngine",
      tip: "注意：重置引擎前，请先设置交易对为不可交易"
    },
    del: {
      title: "删除交易对",
      service: "delTransactionPairsCoin",
      tip: "注意：删除交易对前，请先关闭交易引擎,并设置交易对状态为不可交易和下架状态"
    }
  };
  dialog.currAction = { ...config[type], symbol };
  dialog.openPassword = true;
};

const onSetting = row => {
  dialog.info = row;
  dialog.openSetting = true;
};

const submitEdit = data => {
  const password = data.password ? md5(data.password) : "";
  service.updateTransactionPairsCoin({ ...data, password }).then(() => {
    ElMessage.success("保存成功");
    dialog.openSetting = false;
    proTableRef.value.getTableList();
  });
};

/**
 * 启动服务请求
 */
const onStartTableActionService = () => {
  const { symbol, password, service: name, title } = dialog.currAction;
  dialog.loading = true;
  service[name]({ symbol, password: md5(password) })
    .then(() => {
      ElMessage.success(`${title.slice(0, 2)}成功`);
      dialog.openPassword = false;
      proTableRef.value.getTableList();
    })
    .finally(() => {
      dialog.loading = false;
    });
};

const onOpenRobotConfigDialog = row => {
  dialog.openSettingParams = true;
  dialog.currAction["coinName"] = row.symbol;
  if (row.exEngineStatus) {
    service.getRobotConfig(row.symbol).then(res => {
      dialog.info = res.data;
    });
  }
};

const submitRobotConfig = data => {
  const name = Object.keys(dialog.info).length ? "editRobotConfig" : "addRobotConfig";
  service[name]({ ...data, coinName: dialog.currAction.coinName }).then(() => {
    ElMessage.success("保存成功");
    dialog.openSettingParams = false;
  });
};

getCoinsOptions();
</script>
