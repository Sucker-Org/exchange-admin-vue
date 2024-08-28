import { ColumnProps } from "@/components/ProTable/interface";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-06-04 18:11:02
 */

export const tableColumns = (coinOptions, isShowDate): ColumnProps[] => [
  {
    prop: "coinId",
    label: "币种",
    enum: coinOptions,
    search: {
      el: "select"
    }
  },
  {
    prop: "totalBalance",
    label: "总资产",
    type: "money"
  },
  {
    prop: "totalBalanceDif",
    label: "总资产昨日差值",
    type: "money"
  },
  {
    prop: "canUseBalance",
    label: "可用资产",
    type: "money"
  },
  {
    prop: "canUseBalanceDif",
    label: "可用资产昨日差值",
    type: "money"
  },
  {
    prop: "frozenBalance",
    label: "冻结资产",
    type: "money"
  },
  {
    prop: "frozenBalanceDif",
    label: "冻结资产昨日差值",
    type: "money"
  },
  {
    prop: "date",
    label: "日期",
    isShow: isShowDate,
    search: isShowDate
      ? {
          el: "date-picker",
          props: {
            type: "daterange",
            "value-format": "YYYY/MM/DD"
          }
        }
      : {}
  }
];
