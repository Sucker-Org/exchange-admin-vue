import { ColumnProps } from "@/components/ProTable/interface";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-05-14 14:32:40
 */
export const tableColumns: ColumnProps[] = [
  {
    prop: "memberId",
    label: "会员ID"
  },
  {
    prop: "type",
    label: "交易类型",
    search: {
      el: "select"
    }
  },
  {
    prop: "symbol",
    label: "手续费类型"
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
    prop: "fee",
    label: "交易手续费"
  }
];
