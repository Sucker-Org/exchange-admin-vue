import { ColumnProps } from "@/components/ProTable/interface";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-06-03 10:58:08
 */
export const tableColumns = (coinTypeOptions): ColumnProps[] => [
  {
    prop: "account",
    label: "账户",
    isShow: false,
    search: {
      el: "input",
      props: {
        placeholder: "会员名称"
      }
    }
  },
  {
    prop: "id",
    label: "编号",
    width: 100
  },
  {
    prop: "username",
    label: "会员名称"
  },
  {
    prop: "unit",
    label: "充币币种",
    width: 200,
    search: {
      el: "select"
    },
    enum: coinTypeOptions
  },
  {
    prop: "address",
    label: "充币地址",
    copyable: true
  },
  {
    prop: "amount",
    label: "充币数量"
  },
  {
    prop: "walletBalance",
    label: "钱包余额",
    type: "money"
  },
  {
    prop: "createTime",
    label: "到账时间",
    width: 200,
    sortable: true
  }
];
