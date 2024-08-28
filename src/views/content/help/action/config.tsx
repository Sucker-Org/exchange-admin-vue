/*
 * @Description:
 * @Date: 2024-07-10 16:49:33
 * @LastEditTime: 2024-07-17 14:52:07
 */
import { ProFormItem } from "@/components/ProForm";

export const getFormItems = (openType): ProFormItem[] => [
  {
    label: "标题:",
    field: "title",
    inputProps: {
      maxlength: 15,
      "show-word-limit": true
    },
    required: true
  },
  {
    label: "分类:",
    field: "sysHelpClassification",
    type: "select",
    options: [
      { label: "新手入门", value: 0 },
      { label: "常见问题", value: 1 },
      { label: "交易指南", value: 2 },
      { label: "币种资料", value: 3 },
      { label: "行情技术", value: 4 },
      { label: "条款协议", value: 5 },
      { label: "其他", value: 6 },
      { label: "APP二维码", value: 7 }
    ],
    required: true
  },
  {
    label: "创建时间:",
    field: "createTime",
    type: "text",
    hide: openType === "add" || openType === "edit"
  },
  {
    label: "图片地址:",
    field: "imgUrl",
    type: "text"
  },
  {
    label: "排序:",
    field: "sort",
    type: "input-number-box"
  },
  // 0正常1非法
  {
    label: "状态:",
    field: "status",
    type: "radio",
    options: [
      {
        label: "正常",
        value: 0
      },
      {
        label: "禁止",
        value: 1
      }
    ]
  },
  {
    label: "内容:",
    field: "content"
  }
];
