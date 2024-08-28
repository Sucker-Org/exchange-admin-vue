import { ColumnProps } from "@/components/ProTable/interface";
import { enumTransformOptions } from "@/utils/transform";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-05-29 14:30:35
 */
const MemberStarEnum = {
  0: {
    text: "普通会员",
    type: "warning"
  },
  1: {
    text: "黄金会员",
    type: "success"
  },
  2: {
    text: "铂金会员",
    type: "primary"
  },
  3: {
    text: "钻石会员",
    type: "danger"
  }
};
export const tableColumns: ColumnProps[] = [
  {
    prop: "id",
    label: "ID"
  },
  {
    prop: "account",
    label: "会员信息",
    copyable: true,
    isShow: false,
    search: {
      label: "会员信息",
      el: "input",
      props: {
        placeholder: "ID、手机号、真实姓名"
      }
    }
  },
  {
    prop: "mobilePhone",
    label: "手机号",
    copyable: true
  },
  {
    prop: "realName",
    label: "真实姓名"
  },
  {
    prop: "memberStar",
    label: "商家等级",
    search: {
      el: "select"
    },
    enum: enumTransformOptions(MemberStarEnum, true),
    render: ({ row }) =>
      row.memberStar == null ? (
        "--"
      ) : (
        <el-tag type={MemberStarEnum[row.memberStar]?.type}>{MemberStarEnum[row.memberStar]?.text}</el-tag>
      )
  },
  {
    prop: "totalBalance",
    label: "CNHD资产",
    type: "money"
  },
  {
    prop: "canUseBalance",
    label: "可用CNHD资产",
    type: "money"
  },
  {
    prop: "frozenBalance",
    label: "冻结CNHD资产",
    type: "money"
  },
  {
    prop: "publishAdvertise",
    label: "是否可发布",
    search: {
      el: "select"
    },
    enum: [
      {
        label: "全部",
        value: ""
      },
      {
        label: "是",
        value: 1
      },
      {
        label: "否",
        value: 0
      }
    ],
    render: ({ row }) => <el-tag type={row.publishAdvertise ? "success" : "info"}>{row.publishAdvertise ? "是" : "否"}</el-tag>
  },
  {
    prop: "operation",
    label: "操作",
    fixed: "right",
    width: 160
  }
];
