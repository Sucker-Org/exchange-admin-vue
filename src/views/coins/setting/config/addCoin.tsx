/*
 * @Description:
 * @Date: 2024-06-03 16:11:04
 * @LastEditTime: 2024-06-06 17:47:42
 */
import { ProStep } from "@/components/ProStepsForm";

export const steps: ProStep[] = [
  {
    title: "基本信息设置",
    form: {
      inputWidth: "228px",
      items: [
        {
          label: "交易对:",
          field: "symbol",
          required: true,
          inputProps: {
            placeholder: "例：BTC/USDT"
          }
        },
        {
          label: "交易币种:",
          field: "coinSymbol",
          required: true,
          inputProps: {
            placeholder: "例：BTC"
          }
        },
        {
          label: "结算币种:",
          field: "baseSymbol",
          required: true,
          inputProps: {
            placeholder: "例：USDT"
          }
        },
        {
          label: "手续费:",
          field: "fee",
          required: true,
          inputProps: {
            placeholder: "例：0.001"
          }
        },
        {
          label: "币种精度:",
          field: "coinScale",
          required: true,
          inputProps: {
            placeholder: "例：4"
          }
        },
        {
          label: "基币小数精度:",
          field: "baseCoinScale",
          required: true,
          inputProps: {
            placeholder: "例：6"
          }
        },
        {
          label: "最低卖单价:",
          field: "minSellPrice",
          required: true,
          inputProps: {
            placeholder: "不限制：0.00000000"
          }
        },
        {
          label: "最高买单价:",
          field: "maxBuyPrice",
          required: true,
          inputProps: {
            placeholder: "不限制：0.00000000"
          }
        },
        {
          label: "最小下单量:",
          field: "minVolume",
          required: true,
          inputProps: {
            placeholder: "不限制：0.00000000"
          }
        },
        {
          label: "最大下单量:",
          field: "maxVolume",
          required: true,
          inputProps: {
            placeholder: "不限制：0.00000000"
          }
        },
        {
          label: "最小挂单额:",
          field: "minTurnover",
          required: true,
          inputProps: {
            placeholder: "不限制：0.00000000"
          }
        },
        {
          label: "排序:",
          type: "input-number",
          field: "sort",
          required: true
        }
      ]
    }
  },
  {
    title: "币种状态设置",
    form: {
      items: [
        {
          label: "状态:",
          type: "radio",
          field: "enable",
          required: true,
          initialValue: 1,
          options: [
            {
              label: "上架",
              value: 1
            },
            {
              label: "下架",
              value: 0
            }
          ]
        },
        {
          label: "前端显示:",
          type: "radio",
          field: "visible",
          initialValue: 1,
          options: [
            {
              label: "显示",
              value: 1
            },
            {
              label: "隐藏",
              value: 0
            }
          ]
        },
        {
          label: "是否可交易:",
          type: "radio",
          field: "exchangeable",
          required: true,
          initialValue: 1,
          options: [
            {
              label: "允许",
              value: 1
            },
            {
              label: "禁止",
              value: 0
            }
          ]
        },
        {
          label: "市价买:",
          type: "radio",
          field: "enableMarketBuy",
          required: true,
          initialValue: 1,
          options: [
            {
              label: "可买",
              value: 1
            },
            {
              label: "不可买",
              value: 0
            }
          ]
        },
        {
          label: "市价卖:",
          type: "radio",
          field: "enableMarketSell",
          required: true,
          initialValue: 1,
          options: [
            {
              label: "可卖",
              value: 1
            },
            {
              label: "不可卖",
              value: 0
            }
          ]
        },
        {
          label: "可买:",
          type: "radio",
          field: "enableBuy",
          required: true,
          initialValue: true,
          options: [
            {
              label: "允许",
              value: true
            },
            {
              label: "禁止",
              value: false
            }
          ]
        },
        {
          label: "可卖:",
          type: "radio",
          field: "enableSell",
          required: true,
          initialValue: true,
          options: [
            {
              label: "允许",
              value: true
            },
            {
              label: "禁止",
              value: false
            }
          ]
        },
        {
          label: "机器人类型:",
          type: "radio",
          field: "robotType",
          required: true,
          initialValue: 0,
          options: [
            {
              label: "一般",
              value: 0
            },
            {
              label: "控盘",
              value: 1
            }
          ]
        },
        {
          label: "交易引擎:",
          type: "radio",
          field: "engineStatus",
          initialValue: 1,
          options: [
            {
              label: "无引擎",
              value: 0
            },
            {
              label: "启动",
              value: 1
            },
            {
              label: "暂停",
              value: 2
            }
          ]
        },
        {
          label: "行情引擎:",
          type: "radio",
          field: "marketEngineStatus",
          initialValue: 1,
          options: [
            {
              label: "无引擎",
              value: 0
            },
            {
              label: "启动",
              value: 1
            },
            {
              label: "暂停",
              value: 2
            }
          ]
        },
        {
          label: "交易机器人引擎:",
          type: "radio",
          field: "exEngineStatus",
          initialValue: 1,
          options: [
            {
              label: "无引擎",
              value: 0
            },
            {
              label: "启动",
              value: 1
            },
            {
              label: "暂停",
              value: 2
            }
          ]
        },
        {
          label: "机器人用户ID:",
          field: "robotMemberId",
          required: true
        }
      ]
    }
  }
];
