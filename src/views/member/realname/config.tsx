import { ProFormItem } from "@/components/ProForm";
import { ColumnProps } from "@/components/ProTable/interface";
import { MemberStatusEnum } from "@/enums";
import { enumTransformOptions } from "@/utils/transform";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-07-12 15:18:02
 */

export const tableColumns: ColumnProps[] = [
  {
    prop: "account",
    label: "用户账户标识",
    isShow: false,
    search: {
      el: "input",
      props: {
        placeholder: "会员名称、真实姓名"
      }
    }
  },
  {
    prop: "memberId",
    label: "会员ID",
    copyable: true
  },
  {
    prop: "username",
    label: "会员名称"
  },
  {
    prop: "realName",
    label: "真实姓名"
  },
  {
    prop: "idCard",
    label: "身份证号码",
    copyable: true
  },
  {
    prop: "registrationTime",
    label: "注册时间",
    sortable: true
  },
  {
    prop: "auditStatus",
    label: "状态",
    search: {
      el: "select"
    },
    enum: enumTransformOptions(MemberStatusEnum, true),
    render: ({ row }) => <el-tag type={MemberStatusEnum[row.auditStatus]?.type}>{MemberStatusEnum[row.auditStatus]?.text}</el-tag>
  },
  {
    prop: "operation",
    label: "操作",
    fixed: "right",
    width: 150
  }
];

export const approvalFormItems: ProFormItem[] = [
  {
    label: "是否通过:",
    field: "isPass",
    type: "radio",
    initialValue: true,
    options: [
      {
        label: "通过",
        value: true
      },
      {
        label: "不通过",
        value: false
      }
    ]
  },
  {
    label: "不通过原因:",
    field: "reason",
    type: "input-textarea"
  }
];
