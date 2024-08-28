import { ColumnProps } from "@/components/ProTable/interface";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-06-12 17:38:05
 */
export const tableColumns: ColumnProps[] = [
  {
    type: "selection"
  },
  {
    prop: "id",
    label: "编号"
  },
  {
    prop: "title",
    label: "标题",
    search: {
      el: "input"
    }
  },
  {
    prop: "imgUrl",
    label: "图片链接地址",
    type: "image",
    width: 120
  },
  {
    prop: "status",
    label: "状态"
  },
  {
    prop: "isTop",
    label: "是否置顶",
    width: 160
  },
  {
    prop: "createTime",
    label: "创建时间"
  },
  {
    prop: "operation",
    label: "操作",
    width: 260,
    fixed: "right"
  }
];

export const statusEnum = { 0: "正常", 1: "禁止" };
