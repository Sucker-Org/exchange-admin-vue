import { ColumnProps } from "@/components/ProTable/interface";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-05-28 15:18:12
 */
export const tableColumns = (coinTypeOptions): ColumnProps[] => [
  {
    prop: "symbol",
    label: "币种",
    search: {
      order: 1,
      el: "select"
    },
    enum: coinTypeOptions
  },
  {
    prop: "exchangeCoinFree",
    label: "币币交易手续费"
  },
  {
    prop: "withDrawRecordFree",
    label: "提币手续费"
  },
  {
    prop: "totalFree",
    label: "手续费总计"
  },
  {
    prop: "date",
    label: "所属时间(天)",
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
