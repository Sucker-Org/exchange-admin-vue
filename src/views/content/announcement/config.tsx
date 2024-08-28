import { ColumnProps } from "@/components/ProTable/interface";
import { enumTransformOptions } from "@/utils/transform";
/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-06-12 17:39:51
 */
enum ValueEnum {
  一般公告,
  活动公告,
  充提公告,
  系统公告,
  上币公告,
  投票公告,
  弹窗公告,
  其他
}

const popUpCountEnum = {
  0: {
    text: "不弹出",
    type: "info"
  },
  1: {
    text: "只弹一次",
    type: "success"
  },
  2: {
    text: "一直弹出",
    type: "success"
  }
};
export const tableColumns: ColumnProps[] = [
  {
    type: "selection"
  },
  {
    prop: "id",
    label: "编号"
  },
  {
    prop: "announcementClassification",
    label: "公告类型",
    search: {
      order: 3,
      el: "select"
    },
    enum: enumTransformOptions(ValueEnum),
    render: ({ row }) => {
      return ValueEnum[row.announcementClassification] ? <el-tag>{ValueEnum[row.announcementClassification]}</el-tag> : "--";
    }
  },
  {
    prop: "title",
    label: "标题",
    search: {
      order: 1,
      el: "input"
    }
  },
  {
    prop: "description",
    label: "摘要"
  },
  {
    prop: "imgUrl",
    label: "图片地址",
    type: "image"
  },
  {
    prop: "isShow",
    label: "是否显示",
    search: {
      order: 2,
      el: "select"
    },
    enum: [
      {
        label: "显示",
        value: true
      },
      {
        label: "不显示",
        value: false
      }
    ]
  },
  {
    prop: "isTop",
    label: "是否置顶",
    width: 100
  },
  // {
  //   prop: "lang",
  //   label: "语言"
  // },
  {
    prop: "popUpCount",
    label: "弹窗方式",
    width: 110,
    // search: {
    //   order: 4,
    //   el: "select"
    // },
    // enum: enumTransformOptions(popUpCountEnum, false),
    render: ({ row }) => {
      return popUpCountEnum[row.popUpCount] ? (
        <el-tag type={popUpCountEnum[row.popUpCount]?.type}>{popUpCountEnum[row.popUpCount]?.text}</el-tag>
      ) : (
        "--"
      );
    }
  },
  {
    prop: "operation",
    label: "操作",
    width: 260,
    fixed: "right"
  }
];
