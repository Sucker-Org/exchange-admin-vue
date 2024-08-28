/*
 * @Description:
 * @Date: 2024-06-12 13:47:35
 * @LastEditTime: 2024-06-12 15:48:11
 */
import { ProFormItem } from "@/components/ProForm";
// import * as contentConfig from "../../contentConfig";

export const formItems: ProFormItem[] = [
  {
    label: "名称:",
    field: "name",
    required: true,
    inputProps: {
      maxlength: 15,
      "show-word-limit": true
    }
  },
  // {
  //   label: "广告语言:",
  //   field: "lang",
  //   type: "select",
  //   required: true,
  //   options: contentConfig.langOption
  // },
  {
    label: "状态:",
    field: "status",
    type: "radio",
    initialValue: 0,
    required: true,
    options: [
      {
        label: "上线",
        value: 0
      },
      {
        label: "下线",
        value: 1
      }
    ]
  },
  {
    label: "广告位置:",
    field: "sysAdvertiseLocation",
    type: "select",
    required: true,
    options: [
      { value: 0, label: "app首页轮播" },
      { value: 1, label: "pc首页轮播" },
      { value: 2, label: "pc分类广告" }
    ]
  },
  {
    label: "开始时间:",
    field: "startTime",
    type: "datetime",
    required: true,
    inputProps: {
      "value-format": "YYYY-MM-DD HH:mm:ss"
    }
  },
  {
    label: "结束时间:",
    field: "endTime",
    type: "datetime",
    required: true,
    inputProps: {
      "value-format": "YYYY-MM-DD HH:mm:ss"
    }
  },
  {
    label: "广告图地址:",
    field: "url"
  },
  {
    label: "排序:",
    field: "sort",
    type: "input-number-box"
  },
  {
    label: "跳转地址:",
    field: "linkUrl"
  },
  {
    label: "备注:",
    field: "remark",
    type: "input-textarea",
    inputProps: {
      maxlength: 55,
      "show-word-limit": true
    }
  }
];
