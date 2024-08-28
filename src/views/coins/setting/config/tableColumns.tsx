import { ColumnProps } from "@/components/ProTable/interface";
import { CloseBold, Select } from "@element-plus/icons-vue";

const commomEnum = {
  1: {
    text: "是",
    type: "success"
  },
  2: {
    text: "否",
    type: "info"
  }
};

const renderEngineStatus = (key: 0 | 1 | 2) => {
  const statusEnum = {
    0: {
      text: "无引擎",
      type: "info"
    },
    1: {
      text: "启动中",
      type: "success"
    },
    2: {
      text: "暂停中",
      type: "danger"
    }
  };
  return statusEnum[key] ? <el-tag type={statusEnum[key]?.type}> {statusEnum[key]?.text} </el-tag> : "--";
};

export const tableColumns = (coinOptions): ColumnProps[] => [
  {
    prop: "coinSymbol",
    label: "币种",
    isShow: false,
    enum: coinOptions,
    search: {
      el: "select"
    }
  },
  {
    prop: "baseSymbol",
    label: "结算币种",
    isShow: false,
    enum: coinOptions,
    search: {
      el: "select"
    }
  },
  {
    prop: "symbol",
    label: "交易对",
    width: 100,
    fixed: "left"
  },
  {
    prop: "buy_sell",
    label: "市价买卖",
    width: 100,
    render: ({ row }) => {
      return (
        <el-space>
          <el-icon>
            {row.enableMarketBuy === 0 ? (
              <CloseBold style="color: var(--el-color-danger)" />
            ) : (
              <Select style="color: var(--el-color-success)" />
            )}
          </el-icon>
          /
          <el-icon>
            {row.enableMarketSell === 0 ? (
              <CloseBold style="color: var(--el-color-danger)" />
            ) : (
              <Select style="color: var(--el-color-success)" />
            )}
          </el-icon>
        </el-space>
      );
    }
  },
  {
    prop: "buy_sell",
    label: "可买卖",
    width: 100,
    render: ({ row }) => {
      return (
        <el-space>
          <el-icon>
            {row.enableBuy ? (
              <Select style="color: var(--el-color-success)" />
            ) : (
              <CloseBold style="color: var(--el-color-danger)" />
            )}
          </el-icon>
          /
          <el-icon>
            {row.enableSell ? (
              <Select style="color: var(--el-color-success)" />
            ) : (
              <CloseBold style="color: var(--el-color-danger)" />
            )}
          </el-icon>
        </el-space>
      );
    }
  },
  {
    prop: "visible",
    label: "前台可见",
    width: 120,
    render: ({ row }) => {
      return commomEnum[row.visible] ? (
        <el-text type={commomEnum[row.visible]?.type}> {commomEnum[row.visible]?.text} </el-text>
      ) : (
        "--"
      );
    }
  },
  {
    prop: "exchangeable",
    label: "可交易",
    width: 100,
    render: ({ row }) => {
      return commomEnum[row.exchangeable] ? (
        <el-text type={commomEnum[row.exchangeable]?.type}> {commomEnum[row.exchangeable]?.text} </el-text>
      ) : (
        "--"
      );
    }
  },
  {
    prop: "robotType",
    label: "机器人",
    width: 100,
    render: ({ row }) => {
      const TypeEnum = {
        0: {
          text: "一般",
          type: "info"
        },
        1: {
          text: "控盘",
          type: "success"
        }
      };
      return TypeEnum[row.robotType] ? (
        <el-text type={TypeEnum[row.robotType]?.type}> {TypeEnum[row.robotType]?.text} </el-text>
      ) : (
        "--"
      );
    }
  },
  {
    prop: "settingParams",
    label: "机器人参数",
    width: 100
  },
  {
    prop: "engineStatus",
    label: "交易引擎",
    width: 100,
    render: ({ row }) => renderEngineStatus(row.engineStatus)
  },
  {
    prop: "marketEngineStatus",
    label: "行情引擎",
    width: 100,
    render: ({ row }) => renderEngineStatus(row.marketEngineStatus)
  },
  {
    prop: "enable",
    label: "状态",
    width: 100,
    render: ({ row }) => {
      const statusEnum = {
        1: {
          text: "上架",
          type: "success"
        },
        2: {
          text: "下架",
          type: "info"
        }
      };
      return statusEnum[row.enable] ? (
        <el-text type={statusEnum[row.enable]?.type}> {statusEnum[row.enable]?.text} </el-text>
      ) : (
        "--"
      );
    }
  },
  {
    prop: "publishType",
    label: "发行活动",
    width: 100,
    render: ({ row }) => {
      const publishTypeEnum = {
        1: {
          text: "无活动",
          type: "info"
        },
        2: {
          text: "抢购发行",
          type: "success"
        },
        3: {
          text: "分摊发行",
          type: "success"
        }
      };
      return publishTypeEnum[row.publishType] ? (
        <el-tag type={publishTypeEnum[row.publishType]?.type}> {publishTypeEnum[row.publishType]?.text} </el-tag>
      ) : (
        "--"
      );
    }
  },
  {
    prop: "fee",
    label: "手续费",
    width: 100
  },
  {
    prop: "flag",
    label: "推荐",
    width: 100,
    render: ({ row }) => {
      return commomEnum[row.flag + 1] ? (
        <el-text type={commomEnum[row.flag + 1]?.type}> {commomEnum[row.flag + 1]?.text} </el-text>
      ) : (
        "--"
      );
    }
  },
  {
    prop: "coinScale",
    label: "币种精度",
    width: 100
  },
  {
    prop: "baseCoinScale",
    label: "基币精度",
    width: 100
  },
  {
    prop: "minTurnover",
    label: "最小成交额",
    width: 100
  },
  {
    prop: "minVolume",
    label: "最小下单量",
    width: 100
  },
  {
    prop: "maxVolume",
    label: "最大下单量",
    width: 100
  },
  {
    prop: "fee",
    label: "卖单最低价",
    width: 100
  },
  {
    prop: "fee",
    label: "卖单最高价",
    width: 100
  },
  {
    prop: "operation",
    label: "操作",
    width: 480,
    fixed: "right"
  }
];
