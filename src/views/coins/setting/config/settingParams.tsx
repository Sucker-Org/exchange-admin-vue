/*
 * @Description:
 * @Date: 2024-06-03 16:07:22
 * @LastEditTime: 2024-06-05 11:57:32
 */
import { ProFormItem } from "@/components/ProForm";

/**
 * 机器人参数
 */
export const settingParams: ProFormItem[] = [
  {
    label: "交易对:",
    field: "coinName",
    required: true,
    inputProps: {
      disabled: true,
      placeholder: "交易对"
    }
  },
  {
    label: "启动机器人:",
    type: "radio",
    field: "isHalt",
    required: true,
    initialValue: false,
    options: [
      {
        label: "启动",
        value: false
      },
      {
        label: "暂停",
        value: true
      }
    ]
  },
  {
    label: "最低交易量:",
    type: "input-number",
    field: "startAmount",
    required: true
  },
  {
    label: "交易量随机因子(1%):",
    field: "randRange0",
    required: true
  },
  {
    label: "交易量随机因子(9%):",
    field: "randRange1",
    required: true
  },
  {
    label: "交易量随机因子(20%):",
    field: "randRange2",
    required: true
  },
  {
    label: "交易量随机因子(20%):",
    field: "randRange3",
    required: true
  },
  {
    label: "交易量随机因子(20%):",
    field: "randRange4",
    required: true
  },
  {
    label: "交易量随机因子(20%):",
    field: "randRange5",
    required: true
  },
  {
    label: "交易量随机因子(10%):",
    field: "randRange6",
    required: true
  },
  {
    label: "价格精度要求:",
    type: "input-number",
    field: "scale",
    required: true
  },
  {
    label: "数量精度要求:",
    type: "input-number",
    field: "amountScale",
    required: true
  },
  {
    label: "买卖盘最高差价:",
    type: "input-number",
    field: "maxSubPrice",
    required: true
  },
  {
    label: "初始订单数(>24):",
    type: "input-number",
    field: "initOrderCount",
    required: true
  },
  {
    label: "价格变化步长(%):",
    field: "priceStepRate",
    required: true
  },
  {
    label: "下单时间间隔(毫秒)",
    field: "runTime",
    required: true
  }
];
