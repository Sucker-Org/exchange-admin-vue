/*
 * @Description:
 * @Date: 2024-05-31 10:16:15
 * @LastEditTime: 2024-06-06 14:36:43
 */
export const PayTypeEnum = {
  1: {
    text: "支付宝",
    type: "primary"
  },
  2: {
    text: "微信",
    type: "success"
  },
  3: {
    text: "银行卡",
    type: "success"
  }
};

export const PledgeStatusEnum = {
  1: {
    text: "审核中",
    type: "warning"
  },
  2: {
    text: "待赎回",
    type: "info"
  },
  3: {
    text: "已打款",
    type: "success"
  },
  4: {
    text: "已赎回",
    type: "success"
  },
  5: {
    text: "已拒绝",
    type: "danger"
  }
};

/**
 * 法币交易明细订单状态
 */
export const TranDetailOrderStatusEnum = {
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
 * 提币审核状态
 */
export const WithdrawalStatusEnum = {
  0: {
    text: "待审核",
    type: "info"
  },
  1: {
    text: "待放币",
    type: "info"
  },
  2: {
    text: "已失败",
    type: "danger"
  },
  3: {
    text: "已成功",
    type: "success"
  }
};
