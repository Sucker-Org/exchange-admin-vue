import { ColumnProps } from "@/components/ProTable/interface";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-05-20 18:16:35
 */
export const tableColumns = (coinTypeOptions): ColumnProps[] => [
  {
    prop: "symbol",
    label: "币种",
    search: {
      el: "select"
    },
    enum: coinTypeOptions
  },
  {
    prop: "amount",
    label: "交易量"
  },
  {
    prop: "price",
    label: "交易额",
    type: "money"
  }
];
