import { ColumnProps } from "@/components/ProTable/interface";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-06-12 16:30:59
 */
export const tableColumns: ColumnProps[] = [
  {
    type: "selection"
  },
  {
    prop: "serialNumber",
    label: "编号",
    copyable: true,
    width: 330,
    search: {
      label: "编号",
      el: "input"
    }
  },
  {
    prop: "name",
    label: "名称"
  },
  //	广告位置,0:app首页轮播,1:pc首页轮播,2:pc分类广告,可用值:0,1,2
  {
    prop: "sysAdvertiseLocation",
    label: "位置",
    search: {
      label: "位置",
      el: "select"
    },
    width: 120,
    enum: [
      {
        label: "app首页轮播",
        value: 0
      },
      {
        label: "pc首页轮播",
        value: 1
      },
      {
        label: "pc分类广告",
        value: 2
      }
    ]
  },
  // {
  //   prop: "lang",
  //   label: "语言"
  // },
  {
    prop: "url",
    label: "图片地址",
    type: "image",
    width: 100
  },
  {
    prop: "linkUrl",
    label: "跳转链接"
  },
  // {
  //   prop: "author",
  //   label: "作者"
  // },
  {
    prop: "status",
    label: "状态",
    search: {
      label: "状态",
      el: "select"
    },
    enum: [
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
    prop: "isTop",
    label: "是否置顶",
    width: 160
  },
  {
    prop: "remark",
    label: "备注"
  },
  {
    prop: "",
    label: "时间"
  },
  {
    prop: "operation",
    label: "操作",
    width: 260,
    fixed: "right"
  }
];
export enum statusEnum {
  "上线",
  "下线"
}
