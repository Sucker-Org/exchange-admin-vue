import { ColumnProps } from "@/components/ProTable/interface";
/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-05-31 17:38:29
 */

export const tableColumns: ColumnProps[] = [
  // {
  //   type: "selection"
  // },
  // {
  //   prop: "activityId",
  //   label: "活动id"
  // },
  {
    prop: "id",
    label: "ID"
  },
  {
    prop: "memberId",
    label: "用户id"
  },

  // {
  //   prop: "activityName",
  //   label: "活动名称"
  // },
  {
    prop: "amount",
    label: "获得币种数量",
    width: 120
  },
  {
    prop: "baseSymbol",
    label: "结算单位"
  },
  {
    prop: "coinSymbol",
    label: "币单位"
  },
  {
    prop: "createTime",
    label: "创建时间"
  },
  {
    prop: "freezeAmount",
    label: "冻结资产数量",
    width: 120
  },
  {
    prop: "price",
    label: "获得币种价格",
    width: 120
  },
  //0：临时 1：未成交 2：已成交 3：撤销
  {
    prop: "state",
    label: "状态",
    render: ({ row }) => stateEnum[row.state] ?? ""
  },
  {
    prop: "turnover",
    label: "成交额"
  },
  // (0:未知，1：首发抢购，2：首发分摊，3：持仓瓜分，4：自由认购，5：云矿机， 6：锁仓释放 7:hdz质押）
  {
    prop: "type",
    label: "类型",
    render: ({ row }) => typeEnum[row.type] ?? ""
  },
  {
    prop: "operation",
    label: "操作",
    width: 180,
    fixed: "right"
  }
];

export const stateEnum = {
  0: "临时",
  1: "未成交",
  2: "已成交",
  3: "撤销"
};
export const stateTypeEnum = {
  0: "warning",
  1: "info",
  2: "success",
  3: "danger"
};
export const typeEnum = {
  0: "未知",
  1: "首发抢购",
  2: "首发分摊",
  3: "持仓瓜分",
  4: "自由认购",
  5: "云矿机",
  6: "锁仓释放",
  7: "hdz质押"
};
export const enums = {
  state: {
    0: "临时",
    1: "未成交",
    2: "已成交",
    3: "撤销"
  }
};
