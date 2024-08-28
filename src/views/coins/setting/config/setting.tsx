import { ProFormItem } from "@/components/ProForm";

/**
 * 设置
 */
export const setting: ProFormItem[] = [
  {
    label: "操作密钥:",
    type: "input-password",
    field: "password",
    required: true
  },
  {
    label: "交易对:",
    field: "symbol",
    required: true,
    inputProps: {
      disabled: true,
      placeholder: "交易对"
    }
  },
  {
    label: "手续费:",
    type: "input-number",
    field: "fee"
  },
  {
    label: "状态:",
    type: "radio",
    field: "enable",
    initialValue: 1,
    options: [
      {
        label: "上架",
        value: 1
      },
      {
        label: "下架",
        value: 2
      }
    ]
  },
  {
    label: "前端显示:",
    type: "radio",
    field: "visible",
    required: true,
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
        value: 2
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
    label: "最高买单价:",
    field: "maxBuyPrice",
    inputProps: {
      placeholder: "不限制：0.00000000"
    }
  },
  {
    label: "最小挂单额:",
    field: "minTurnover",
    inputProps: {
      placeholder: "不限制：0.00000000"
    }
  },
  {
    label: "排序:",
    type: "input-number",
    field: "sort"
  }
];
