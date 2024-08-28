import { ColumnProps } from "@/components/ProTable/interface";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-06-04 18:13:50
 */
export const tableColumns = (coinTypeOptions): ColumnProps[] => [
  {
    prop: "memberId",
    label: "用户ID"
  },
  {
    prop: "username",
    label: "用户名称"
  },
  {
    prop: "account",
    label: "用户账户标识",
    isShow: false,
    search: {
      el: "input",
      props: {
        placeholder: "手机号、用户ID、用户名"
      }
    }
  },
  {
    prop: "mobilePhone",
    label: "手机号",
    copyable: true
  },
  {
    prop: "coinId",
    label: "代币名称",
    enum: coinTypeOptions,
    search: {
      el: "select"
    }
  },
  {
    prop: "balance",
    label: "余额",
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
  }
];
