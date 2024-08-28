import { ColumnProps } from "@/components/ProTable/interface";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-07-04 16:48:35
 */

export const tableColumns = (coinTypeOptions): ColumnProps[] => [
  {
    prop: "account",
    label: "账户",
    isShow: false,
    search: {
      el: "input",
      props: {
        placeholder: "会员名称、真实姓名"
      }
    }
  },
  {
    prop: "transactionNumber",
    label: "TXID"
  },
  {
    prop: "unit",
    label: "币种名称",
    search: {
      el: "select"
    },
    enum: coinTypeOptions
  },
  {
    prop: "totalAmount",
    label: "提币个数"
  },
  {
    prop: "arrivedAmount",
    label: "实际到账数"
  },
  {
    prop: "fee",
    label: "提币手续费"
  },
  {
    prop: "createTime",
    label: "申请时间",
    sortable: true
  },
  {
    prop: "memberUsername",
    label: "会员名称"
  },
  {
    prop: "email",
    label: "邮箱"
  },
  {
    prop: "phone",
    label: "手机号",
    copyable: true,
    search: {
      el: "input"
    }
  },
  {
    prop: "memberRealName",
    label: "真实姓名"
  },
  {
    prop: "address",
    label: "钱包地址",
    copyable: true,
    search: {
      el: "input"
    }
  },
  {
    prop: "createTime",
    label: "审核时间",
    sortable: true
  }
];
