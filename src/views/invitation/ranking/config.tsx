/*
 * @Description:
 * @Date: 2024-04-30 14:46:23
 * @LastEditTime: 2024-06-06 11:27:07
 */
import { ProFormItem } from "@/components/ProForm";
import { ColumnProps } from "@/components/ProTable/interface";
export const tableColumns: ColumnProps[] = [
  {
    prop: "rankType",
    label: "邀请排名",
    isShow: false,
    search: {
      el: "select",
      defaultValue: 0
    },
    enum: [
      // {
      //   label: "全部",
      //   value: ""
      // },
      {
        label: "人数排名",
        value: 0
      },
      {
        label: "佣金排名",
        value: 1
      }
    ]
  },
  {
    prop: "memberId",
    label: "会员ID",
    copyable: true
  },
  {
    prop: "userIdentify",
    label: "用户账户标识",
    copyable: true,
    search: {
      el: "input",
      props: {
        placeholder: "手机号/邮箱/用户id"
      }
    }
  },
  {
    prop: "levelOne",
    label: "一级邀请人数"
  },
  {
    prop: "levelTwo",
    label: "二级邀请人数"
  },
  {
    prop: "estimatedReward",
    label: "返佣折合"
  },
  {
    prop: "extraReward",
    label: "额外奖励"
  },
  {
    prop: "operation",
    label: "操作",
    fixed: "right",
    width: "200"
  }
];

export const formItems: ProFormItem[] = [
  // {
  //   label: "ID:",
  //   field: "id",
  //   required: true,
  //   inputProps: {
  //     disabled: true
  //   }
  // },
  {
    label: "返佣折合:",
    field: "estimatedReward",
    required: true
  },
  {
    label: "额外奖励:",
    field: "extraReward",
    required: true
  },
  {
    label: "一级邀请人数:",
    field: "levelOne",
    type: "input-number",
    required: true
  },
  {
    label: "二级邀请人数:",
    field: "levelTwo",
    type: "input-number",
    required: true
  }
];
