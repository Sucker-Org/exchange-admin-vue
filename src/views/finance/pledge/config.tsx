/*
 * @Description:
 * @Date: 2024-04-19 18:21:53
 * @LastEditTime: 2024-06-05 10:18:25
 */
import { ColumnProps } from "@/components/ProTable/interface";
import { PayTypeEnum, PledgeStatusEnum } from "@/enums";
import { formatDate } from "@/utils/date";
import { enumTransformOptions } from "@/utils/transform";
import { ProFormItem } from "@/components/ProForm";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-04-23 16:39:14
 */
export const tableColumns: ColumnProps[] = [
  {
    prop: "memberId",
    label: "用户ID",
    copyable: true,
    search: {
      el: "input"
    }
  },
  {
    prop: "money",
    label: "CNY"
  },
  {
    prop: "number",
    label: "CNHD"
  },
  {
    prop: "status",
    label: "状态",
    search: {
      order: 2,
      el: "select"
    },
    enum: enumTransformOptions(PledgeStatusEnum, true),
    render: ({ row }) => <el-tag type={PledgeStatusEnum[row.status]?.type}> {PledgeStatusEnum[row.status]?.text} </el-tag>
  },
  {
    prop: "createTime",
    label: "开始时间",
    sortable: true,
    search: {
      order: 1,
      el: "date-picker",
      props: {
        type: "daterange",
        "value-format": "YYYY/MM/DD"
      }
    },
    render: ({ row }) => formatDate(row.createTime) || "--"
  },
  {
    prop: "endDate",
    label: "可赎回时间",
    sortable: true,
    render: ({ row }) => formatDate(row.endDate) || "--"
  },
  {
    prop: "updateTime",
    label: "最后操作时间",
    sortable: true,
    render: ({ row }) => formatDate(row.updateTime) || "--"
  },
  {
    prop: "payType",
    label: "收款方式",
    enum: enumTransformOptions(PayTypeEnum, true),
    search: { el: "select" },
    render: ({ row }) => <el-tag type={PayTypeEnum[row.payType]?.type}> {PayTypeEnum[row.payType]?.text} </el-tag>
  },
  {
    prop: "detailBtn",
    label: "用户收款信息详情"
  },
  {
    prop: "operation",
    label: "操作",
    width: 260,
    fixed: "right"
  }
];

export const approvalFormItems: ProFormItem[] = [
  {
    label: "拒绝原因:",
    field: "reason",
    type: "input-textarea",
    required: true
  }
];
