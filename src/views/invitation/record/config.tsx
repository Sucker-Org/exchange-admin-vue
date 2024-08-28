/*
 * @Description:
 * @Date: 2024-05-06 15:58:11
 * @LastEditTime: 2024-06-06 10:14:20
 */
import { ColumnProps } from "@/components/ProTable/interface";
export const tableColumns: ColumnProps[] = [
  {
    prop: "id",
    label: "会员ID",
    copyable: true
  },
  {
    prop: "account",
    label: "用户账户标识",
    isShow: false,
    search: {
      el: "input",
      props: {
        placeholder: "手机号、会员名称、id"
      }
    }
  },
  {
    prop: "username",
    label: "会员名称",
    copyable: true
  },
  {
    prop: "mobilePhone",
    label: "手机号",
    copyable: true
  },
  {
    prop: "email",
    label: "邮箱",
    copyable: true
  },
  {
    prop: "promotionCode",
    label: "邀请码"
  },
  {
    prop: "firstLevel",
    label: "一级邀请"
  },
  {
    prop: "secondLevel",
    label: "二级邀请"
  },
  {
    prop: "thirdLevel",
    label: "三级邀请"
  },
  {
    prop: "registrationTime",
    label: "注册时间"
    // search: {
    //   el: "input"
    // }
  },
  {
    prop: "operation",
    label: "操作",
    fixed: "right"
  }
];
export const detailTableColumns: ColumnProps[] = [
  {
    prop: "username",
    label: "会员名称"
  },
  {
    prop: "mobilePhone",
    label: "手机号"
  },
  {
    prop: "email",
    label: "邮箱"
  },
  // {
  //   prop: "promotionCode",
  //   label: "邀请码"
  // },

  {
    prop: "registrationTime",
    label: "注册时间"
    // search: {
    //   el: "input"
    // }
  }
];
