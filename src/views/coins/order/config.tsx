import { ProFormItem } from "@/components/ProForm";
import { ColumnProps } from "@/components/ProTable/interface";
import { formatDate } from "@/utils/date";
import { enumTransformOptions } from "@/utils/transform";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-07-16 12:01:46
 */
const StatusEnum = {
  TRADING: {
    text: "交易中",
    type: "warning"
  },
  COMPLETED: {
    text: "已完成",
    type: "success"
  },
  CANCELED: {
    text: "已取消",
    type: "info"
  },
  OVER_TIMED: {
    text: "已超时",
    type: "danger"
  }
};

const TypeEnum = {
  LIMIT_PRICE: {
    text: "限价"
  },
  MARKET_PRICE: {
    text: "市场价"
  }
};

enum Direction {
  BUY = "买",
  SELL = "卖"
}

export const tableColumns = (coinOptions): ColumnProps[] => [
  {
    prop: "orderId",
    label: "订单号",
    copyable: true,
    width: 200,
    search: {
      order: 2,
      el: "input"
    }
  },
  {
    prop: "memberId",
    label: "用户ID"
  },
  {
    prop: "coinSymbol",
    label: "币种",
    isShow: false,
    enum: coinOptions,
    search: {
      order: 3,
      el: "select"
    }
  },
  {
    prop: "symbol",
    label: "交易对"
  },
  {
    prop: "amount",
    label: "委托量",
    sortable: true
  },
  {
    prop: "tradedAmount",
    label: "成交量",
    sortable: true
  },
  {
    prop: "type",
    label: "挂单类型",
    enum: enumTransformOptions(TypeEnum, true),
    search: {
      order: 3,
      el: "select"
    }
  },
  {
    prop: "direction",
    label: "订单方向",
    width: 100,
    render: ({ row }) => Direction[row.direction] || "--"
  },
  {
    prop: "orderDirection",
    label: "订单方向",
    search: {
      order: 4,
      el: "select"
    },
    isShow: false,
    enum: enumTransformOptions(Direction, true)
  },
  {
    prop: "price",
    label: "挂单价格",
    sortable: true
  },
  {
    prop: "time",
    label: "挂单时间",
    width: 180,
    sortable: true,
    search: {
      order: 1,
      el: "date-picker",
      props: {
        type: "daterange",
        "value-format": "YYYY/MM/DD"
      }
    },
    render: ({ row }) => (row.time ? formatDate(row.time) : "--")
  },
  {
    prop: "status",
    label: "状态",
    search: {
      order: 5,
      el: "select"
    },
    enum: enumTransformOptions(StatusEnum),
    render: ({ row }) => <el-tag type={StatusEnum[row.status]?.type}>{StatusEnum[row.status]?.text}</el-tag>
  },
  {
    prop: "robotOrder",
    label: "查看机器人",
    isShow: false,
    enum: [
      {
        label: "查看",
        value: 1
      },
      {
        label: "不查看",
        value: 0
      }
    ],
    search: {
      el: "select"
    }
  },
  {
    prop: "operation",
    label: "操作",
    width: 200,
    fixed: "right"
  }
];

export const detailFormItems: ProFormItem[] = [
  {
    field: "orderId",
    label: "订单号:",
    renderContent: entity => <pro-copyable value={entity.orderId} />
  },
  {
    field: "status",
    label: "状态:",
    renderContent: entity => <el-tag type={StatusEnum[entity.status]?.type}>{StatusEnum[entity.status]?.text}</el-tag>
  },
  {
    field: "coinSymbol",
    label: "币种:"
  },
  {
    field: "memberId",
    label: "用户ID:"
  },
  {
    field: "symbol",
    label: "交易对:"
  },
  {
    field: "amount",
    label: "委托量:"
  },
  {
    field: "tradedAmount",
    label: "成交量:"
  },
  {
    field: "baseSymbol",
    label: "结算单位:"
  },
  {
    field: "type",
    label: "挂单类型:",
    renderContent: entity => TypeEnum[entity.type]?.text || "--"
  },
  {
    field: "direction",
    label: "订单方向:",
    renderContent: entity => Direction[entity.direction] || "--"
  },
  {
    field: "price",
    label: "挂单价格:"
  },
  {
    field: "time",
    label: "挂单时间:",
    renderContent: entity => (entity.time ? formatDate(entity.time) : "--")
  },
  {
    field: "feePlatformCoinPrice",
    label: "平台币手续费冻结币时的价格:"
  },
  {
    field: "baseSymbolCnyRate",
    label: "结算币人民币汇率:"
  },
  {
    field: "totalAmount",
    label: "实际下单量:"
  },
  {
    field: "platformFeeRate",
    label: "平台手续费:"
  },
  {
    field: "coinFeeRate",
    label: "币种手续费:"
  }
];

export default {
  test: 11
};
