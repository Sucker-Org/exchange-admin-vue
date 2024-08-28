/*
 * @Description: 广告枚举集
 * @Date: 2024-05-29 15:42:35
 * @LastEditTime: 2024-07-02 14:37:49
 */

/**
 * 广告类型
 */
export enum AdvertiseTypeEnum {
  "购买",
  "出售"
}

/**
 * 广告是否可发布
 */
export const PublishAdvertiseStatus = {
  0: {
    text: "禁止发布",
    type: "info"
  },
  1: {
    text: "可发布",
    type: "success"
  }
};

/**
 * 广告状态
 */
export const AdvertiseStatus = {
  0: {
    text: "上架",
    type: "success"
  },
  1: {
    text: "下架",
    type: "info"
  }
};
