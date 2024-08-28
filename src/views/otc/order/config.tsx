import { ProFormItem } from "@/components/ProForm";
import { ColumnProps } from "@/components/ProTable/interface";
import { AdvertiseTypeEnum, OtcOrderStatusEnum } from "@/enums";
import { advertiseTypeOptions } from "@/options";
import { enumTransformOptions } from "@/utils/transform";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-06-06 11:00:30
 */

export const tableColumns = (coinOptions): ColumnProps[] => [
  {
    prop: "orderSn",
    label: "订单编号",
    copyable: true
  },
  {
    prop: "createTime",
    label: "交易时间",
    sortable: true,
    search: {
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
    label: "币种",
    enum: coinOptions,
    search: {
      el: "select"
    }
  },
  {
    prop: "advertiseType",
    label: "类型",
    search: {
      el: "select"
    },
    enum: advertiseTypeOptions,
    render: ({ row }) => AdvertiseTypeEnum[row.advertiseType] ?? "--"
  },
  {
    prop: "number",
    label: "订单数量",
    sortable: true
  },
  {
    prop: "money",
    label: "订单金额",
    sortable: true
  },
  {
    prop: "fee",
    label: "手续费",
    sortable: true
  },
  {
    prop: "payMode",
    label: "支付方式"
  },
  {
    prop: "status",
    label: "订单状态",
    search: {
      el: "select"
    },
    enum: enumTransformOptions(OtcOrderStatusEnum, true),
    render: ({ row }) => <el-tag type={OtcOrderStatusEnum[row.status]?.type}> {OtcOrderStatusEnum[row.status]?.text} </el-tag>
  },
  {
    prop: "operation",
    label: "操作",
    width: 200,
    fixed: "right"
  }
];

export const formItems: ProFormItem[] = [
  {
    field: "orderSn",
    label: "订单编号:"
  },
  {
    field: "status",
    label: "订单状态:",
    renderContent: ({ status }) => <el-tag type={OtcOrderStatusEnum[status]?.type}> {OtcOrderStatusEnum[status]?.text} </el-tag>
  },
  {
    field: "createTime",
    label: "交易时间:"
  },
  {
    field: "customerName",
    label: "交易人:"
  },
  {
    field: "memberName",
    label: "创建人:"
  },
  {
    field: "unit",
    label: "币种:"
  },
  {
    field: "advertiseType",
    label: "类型:",
    renderContent: ({ advertiseType }) => AdvertiseTypeEnum[advertiseType] ?? "--"
  },
  {
    field: "number",
    label: "订单数量:"
  },
  {
    field: "money",
    label: "订单金额:"
  },
  {
    field: "fee",
    label: "手续费:"
  },
  {
    field: "payMode",
    label: "支付方式:"
  }
];
