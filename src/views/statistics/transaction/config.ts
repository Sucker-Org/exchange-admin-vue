import { ColumnProps } from "@/components/ProTable/interface";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-06-06 11:01:08
 */
export const tableColumns = (coinOptions): ColumnProps[] => [
  {
    prop: "createTime",
    label: "时间",
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
    prop: "symbol",
    label: "交易对",
    enum: coinOptions,
    search: {
      el: "select"
    }
  },
  {
    prop: "direction",
    label: "买/卖",
    render: ({ row }) => (row.direction ? "卖" : "买")
  },
  {
    prop: "cnhdAmount",
    label: "CNHD"
  },
  {
    prop: "averagePrice",
    label: "均价"
  },
  {
    prop: "tradeAmount",
    label: "数量",
    sortable: true
  }
];
