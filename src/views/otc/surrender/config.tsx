import type { ProDescriptionsItem } from "@/components/ProDescriptions";
import { ColumnProps } from "@/components/ProTable/interface";
import { OtcStatusEnum } from "@/enums";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-07-02 15:59:23
 */

export const tableColumns: ColumnProps[] = [
  {
    prop: "account",
    isShow: false,
    search: {
      label: "会员信息",
      el: "input",
      props: {
        placeholder: "会员昵称、会员手机号"
      }
    }
  },
  {
    prop: "username",
    label: "会员昵称"
  },
  {
    prop: "email",
    label: "会员邮箱"
  },
  {
    prop: "mobilePhone",
    label: "会员手机号",
    copyable: true
  },
  {
    prop: "coinName",
    label: "保证金币种"
  },
  {
    prop: "amount",
    label: "保证金数量",
    sortable: true
  },
  {
    prop: "cancelApplyTime",
    label: "申请时间",
    sortable: true
  },
  {
    prop: "handleTime",
    label: "审核时间",
    sortable: true
  },
  {
    prop: "status",
    label: "审核状态",
    search: {
      el: "select"
    },
    enum: Object.keys(OtcStatusEnum)
      .filter(key => +key > 3)
      .map(key => ({ label: OtcStatusEnum[key].text, value: key })),
    render: ({ row }) => <el-tag type={OtcStatusEnum[row.status].type}> {OtcStatusEnum[row.status].text} </el-tag>
  },
  {
    prop: "operation",
    label: "操作",
    width: 200,
    fixed: "right"
  }
];

export const descriptionsItems: ProDescriptionsItem[][] = [
  [
    {
      label: "审核状态:",
      field: "status",
      hide: data => data.status === 5,
      render: entity => <el-tag type={OtcStatusEnum[entity?.status]?.type}> {OtcStatusEnum[entity?.status]?.text} </el-tag>
    },
    {
      label: "失败原因:",
      field: "detail",
      hide: data => data.status !== 6
    },
    {
      label: "退保金额:",
      field: "amount"
    },
    {
      label: "申请时间:",
      field: "createTime"
    },
    {
      label: "审核时间:",
      field: "updateTime",
      hide: data => data.status === 5
    },
    {
      label: "退保原因:",
      field: "reason"
    }
  ],
  [
    {
      label: "真实姓名:",
      field: "realName"
    },
    {
      label: "会员昵称:",
      field: "username"
    },
    {
      label: "手机号:",
      field: "mobilePhone"
    },
    {
      label: "邮箱号:",
      field: "email"
    }
  ],
  [
    {
      label: "申诉次数:",
      field: "complainantNum"
    },
    {
      label: "被申诉次数:",
      field: "defendantNum"
    },
    {
      label: "总成交额:",
      field: "money"
    },
    {
      label: "总手续费:",
      field: "fee"
    },
    {
      label: "发布广告数:",
      field: "advertiseNum"
    }
  ]
];
