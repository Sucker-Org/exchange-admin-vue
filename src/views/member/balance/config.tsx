import { ColumnProps } from "@/components/ProTable/interface";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-07-30 13:57:01
 */
export const tableColumns = (coinOptions): ColumnProps[] => [
  {
    prop: "account",
    label: "用户账户标识",
    isShow: false,
    search: {
      el: "input",
      props: {
        placeholder: "会员名称、真实姓名、手机号、邮箱"
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
    prop: "email",
    label: "邮箱",
    copyable: true
  },
  {
    prop: "mobilePhone",
    label: "手机号",
    copyable: true
  },
  {
    prop: "realName",
    label: "真实姓名"
  },
  {
    prop: "unit",
    enum: coinOptions,
    search: {
      el: "select"
    },
    label: "币种名称"
  },
  {
    prop: "address",
    label: "钱包地址",
    copyable: true
  },
  {
    prop: "balance",
    label: "可用余额",
    type: "money"
  },
  {
    prop: "frozenBalance",
    label: "冻结余额",
    type: "money"
  },
  {
    prop: "allBalance",
    label: "总余额",
    type: "money"
  },
  {
    prop: "operation",
    label: "操作",
    width: 250,
    fixed: "right"
  }
];
