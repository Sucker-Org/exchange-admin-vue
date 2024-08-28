/*
 * @Description:
 * @Date: 2024-05-30 14:58:39
 * @LastEditTime: 2024-06-05 14:55:53
 */
export const OtcOrderStatusEnum = {
  CANCELED: {
    text: "已取消",
    type: "info"
  },
  UNPAID: {
    text: "未付款",
    type: "info"
  },
  PAID: {
    text: "已付款",
    type: "success"
  },
  COMPLETED: {
    text: "已完成",
    type: "success"
  },
  APPEALING: {
    text: "申诉中",
    type: "warning"
  }
};

/**
 * 商家认证/订单状态
 */
export const OtcStatusEnum = {
  0: {
    text: "未认证",
    type: "info"
  },
  1: {
    text: "待审核",
    type: "info"
  },
  2: {
    text: "审核成功",
    type: "success"
  },
  3: {
    text: "审核失败",
    type: "danger"
  },
  4: {
    text: "保证金不足",
    type: "danger"
  },
  5: {
    text: "待审核",
    type: "info"
  },
  6: {
    text: "审核失败",
    type: "danger"
  },
  7: {
    text: "审核成功",
    type: "success"
  }
};
