import { ProFormItem } from "@/components/ProForm";
import { ColumnProps } from "@/components/ProTable/interface";
import { AdvertiseTypeEnum, OtcOrderStatusEnum } from "@/enums";
import { advertiseTypeOptions } from "@/options";
import { enumTransformOptions } from "@/utils/transform";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-06-12 09:30:37
 */
const StatusEnum = {
  NOT_PROCESSED: {
    text: "已处理",
    type: "info"
  },
  PROCESSED: {
    text: "未处理",
    type: "success"
  }
};

export const tableColumns = (coinOptions): ColumnProps[] => [
  {
    prop: "orderId",
    label: "订单编号"
  },
  {
    prop: "advertiseType",
    label: "广告类型",
    search: {
      el: "select"
    },
    enum: advertiseTypeOptions,
    render: ({ row }) => AdvertiseTypeEnum[row.advertiseType] ?? "--"
  },
  {
    prop: "advertiseCreatorName",
    label: "发布人",
    search: {
      el: "input"
    }
  },
  {
    prop: "adminName",
    label: "承接人"
  },
  {
    prop: "initiatorName",
    label: "申诉人",
    search: {
      el: "input"
    }
  },
  {
    prop: "coinName",
    label: "币种",
    enum: coinOptions,
    search: {
      el: "select"
    },
    render: ({ row }) => row.coinName
  },
  {
    prop: "createTime",
    label: "申诉时间",
    sortable: true,
    width: 170
  },
  {
    prop: "number",
    label: "订单数"
  },
  {
    prop: "money",
    label: "订单金额(元)"
  },
  {
    prop: "payMode",
    label: "支付方式"
  },
  {
    prop: "status",
    label: "是否处理",
    enum: enumTransformOptions(StatusEnum),
    render: ({ row }) => <el-tag type={StatusEnum[row.status]?.type}>{StatusEnum[row.status]?.text}</el-tag>
  },
  {
    prop: "orderStatus",
    label: "订单状态",
    search: { el: "select" },
    enum: enumTransformOptions(OtcOrderStatusEnum, true),
    render: ({ row }) => (
      <el-tag type={OtcOrderStatusEnum[row.orderStatus]?.type}>{OtcOrderStatusEnum[row.orderStatus]?.text}</el-tag>
    )
  },
  {
    prop: "operation",
    label: "操作",
    width: 200,
    fixed: "right"
  }
];

export const detailFormItems: ProFormItem[] = [
  {
    field: "orderId",
    label: "订单编号:"
  },
  {
    field: "orderStatus",
    label: "订单状态:",
    renderContent: entity => (
      <el-tag type={OtcOrderStatusEnum[entity.orderStatus]?.type}>{OtcOrderStatusEnum[entity.orderStatus]?.text}</el-tag>
    )
  },
  {
    field: "advertiseType",
    label: "广告类型:",
    renderContent: entity => AdvertiseTypeEnum[entity.advertiseType] ?? "--"
  },
  {
    field: "advertiseCreatorName",
    label: "发布人:"
  },
  {
    field: "adminName",
    label: "承接人:"
  },
  {
    field: "initiatorName",
    label: "申诉人:"
  },
  {
    field: "coinName",
    label: "币种:"
  },
  {
    field: "number",
    label: "订单数:"
  },
  {
    field: "money",
    label: "订单金额(元):"
  },
  {
    field: "payMode",
    label: "支付方式:"
  },
  {
    field: "createTime",
    label: "申诉时间:"
  },
  {
    field: "status",
    label: "是否处理:",
    renderContent: entity => <el-tag type={entity.status ? "success" : "info"}>{entity.status ? "已处理" : "未处理"}</el-tag>
  },
  {
    field: "remark",
    label: "备注:",
    inputProps: {
      maxlength: 55,
      "show-word-limit": true
    }
  }
];
