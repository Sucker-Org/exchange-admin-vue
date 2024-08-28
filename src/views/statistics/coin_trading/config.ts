import { ColumnProps } from "@/components/ProTable/interface";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-06-06 10:59:53
 */
export const tableColumns = (coinTypeOptions): ColumnProps[] => [
  {
    prop: "symbol",
    label: "币对",
    search: {
      order: 1,
      el: "select"
    },
    enum: coinTypeOptions,
    render: ({ row }) => row.symbol
  },
  {
    prop: "price",
    label: "交易额",
    type: "money"
  },
  {
    prop: "averagePrice",
    label: "日均价",
    type: "money"
  },
  {
    prop: "date",
    label: "所属时间(天)",
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
