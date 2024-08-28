import { ProFormItem } from "@/components/ProForm";
import { ColumnProps } from "@/components/ProTable/interface";
import { AdvertiseTypeEnum, TranDetailOrderStatusEnum } from "@/enums";
import { enumTransformOptions } from "@/utils/transform";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-07-04 16:49:27
 */

export const tableColumns: ColumnProps[] = [
  {
    prop: "orderSn",
    label: "订单编号",
    copyable: true,
    width: 200,
    search: {
      order: 1,
      el: "input"
    }
  },
  {
    prop: "createTime",
    label: "交易时间",
    sortable: true,
    width: 170,
    search: {
      order: 0,
      el: "date-picker",
      props: {
        type: "daterange",
        "value-format": "YYYY/MM/DD"
      }
    }
  },
  {
    prop: "customerName",
    label: "交易人"
  },
  {
    prop: "memberName",
    label: "创建人"
  },
  {
    prop: "unit",
    label: "币种"
  },
  {
    prop: "advertiseType",
    label: "类型",
    search: {
      el: "select"
    },
    enum: enumTransformOptions(AdvertiseTypeEnum),
    render: ({ row }) => AdvertiseTypeEnum[row.advertiseType] ?? "--"
  },
  {
    prop: "number",
    label: "订单数量"
  },
  {
    prop: "money",
    label: "订单金额"
  },
  {
    prop: "fee",
    label: "手续费"
  },
  {
    prop: "payMode",
    label: "支付方式",
    width: 170
  },
  {
    prop: "status",
    label: "订单状态",
    search: {
      el: "select"
    },
    enum: enumTransformOptions(TranDetailOrderStatusEnum, true),
    render: ({ row }) => (
      <el-tag type={TranDetailOrderStatusEnum[row.status]?.type}> {TranDetailOrderStatusEnum[row.status]?.text} </el-tag>
    )
  },
  {
    prop: "operation",
    label: "操作",
    width: 180,
    fixed: "right"
  }
];

export const formItems: ProFormItem[] = [
  {
    label: "订单编号:",
    field: "orderSn"
  },
  {
    label: "订单状态:",
    field: "status",
    renderContent: ({ status }) => (
      <el-tag type={TranDetailOrderStatusEnum[status]?.type}> {TranDetailOrderStatusEnum[status]?.text} </el-tag>
    )
  },
  {
    label: "交易时间:",
    field: "createTime"
  },
  {
    label: "交易人:",
    field: "customerName"
  },
  {
    label: "创建人:",
    field: "memberName"
  },
  {
    label: "币种:",
    field: "unit"
  },
  {
    label: "类型:",
    field: "advertiseType",
    renderContent: ({ advertiseType }) => AdvertiseTypeEnum[advertiseType] ?? "--"
  },
  {
    label: "订单数量:",
    field: "number"
  },
  {
    label: "订单金额:",
    field: "money"
  },
  {
    label: "手续费:",
    field: "fee"
  },
  {
    label: "支付方式:",
    field: "payMode"
  },
  {
    label: "付款时间:",
    field: "payTime"
  },
  {
    label: "订单取消时间:",
    field: "cancelTime"
  },
  {
    label: "放行时间:",
    field: "releaseTime"
  }
];
