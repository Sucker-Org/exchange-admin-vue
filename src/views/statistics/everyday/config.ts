import { ColumnProps } from "@/components/ProTable/interface";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-06-04 18:16:01
 */
export const tableColumns = (coinTypeOptions): ColumnProps[] => [
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
    prop: "coin",
    label: "代币名称",
    copyable: true,
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
