import { ColumnProps } from "@/components/ProTable/interface";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-05-27 18:14:48
 */

export const tableColumns = (typeOptions): ColumnProps[] => [
  {
    prop: "memberId",
    label: "会员ID",
    copyable: true
  },
  {
    prop: "type",
    label: "交易类型",
    search: {
      order: 1,
      el: "select"
    },
    enum: typeOptions
  },
  {
    prop: "amount",
    label: "交易金额"
  },
  {
    prop: "fee",
    label: "交易手续费"
  },
  {
    prop: "createTime",
    label: "交易时间",
    sortable: true,
    search: {
      order: 0,
      el: "date-picker",
      props: {
        type: "daterange",
        "value-format": "YYYY/MM/DD"
      }
    }
  }
];
