/*
 * @Description:
 * @Date: 2024-05-31 10:08:57
 * @LastEditTime: 2024-06-05 14:55:58
 */
/**
 * 会员级别
 */
export const MemberLevelEnum = {
  0: {
    text: "普通用户",
    type: "info"
  },
  1: {
    text: "实名用户",
    type: "success"
  },
  2: {
    text: "认证商家",
    type: "success"
  }
};

/**
 * 实名状态
 */
export const MemberRealNameStatusEnum = {
  0: {
    text: "未认证",
    type: "info"
  },
  1: {
    text: "审核中",
    type: "primary"
  },
  2: {
    text: "已认证",
    type: "success"
  }
};

/**
 * 会员状态
 */
export const MemberStatusEnum = {
  0: {
    text: "待审核",
    color: "#909399",
    type: "info"
  },
  1: {
    text: "审核失败",
    color: "#F56C6C",
    type: "danger"
  },
  2: {
    text: "审核成功",
    color: "#67C23A",
    type: "success"
  },
  3: {
    text: "重新审核",
    color: "#F56C6C",
    type: "info"
  }
};
