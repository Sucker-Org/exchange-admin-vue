import { ColumnProps } from "@/components/ProTable/interface";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-07-22 09:41:29
 */
export const tableColumns = (coinTypeOptions): ColumnProps[] => [
  {
    prop: "robot",
    label: "机器人订单",
    isShow: false,
    search: {
      el: "select"
    },
    enum: [
      {
        label: "查看",
        value: 0
      },
      {
        label: "不查看",
        value: 1
      }
    ]
  },
  {
    prop: "memberId",
    label: "用户ID"
  },
  {
    prop: "username",
    label: "用户名称"
  },
  {
    prop: "mobilePhone",
    label: "用户手机",
    copyable: true,
    search: {
      el: "input"
    }
  },
  {
    prop: "coinId",
    label: "交易对",
    enum: coinTypeOptions,
    search: {
      el: "select"
    }
  },
  {
    prop: "direction",
    label: "买/卖",
    search: {
      el: "select"
    },
    enum: [
      {
        label: "买入",
        value: 1
      },
      {
        label: "卖出",
        value: 0
      }
    ]
  },
  {
    prop: "price",
    label: "挂单价"
  },
  {
    prop: "amount",
    label: "挂单数量"
  },
  {
    prop: "times",
    label: "挂单时间"
  }
];
