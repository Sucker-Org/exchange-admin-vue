import { ProDescriptionsItem } from "@/components/ProDescriptions";
import { ProFormItem } from "@/components/ProForm";
import { ColumnProps } from "@/components/ProTable/interface";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-07-30 14:55:59
 */
export const tableColumns = (coinOptions): ColumnProps[] => [
  {
    prop: "account",
    label: "用户账户标识",
    isShow: false,
    search: {
      el: "input",
      props: {
        placeholder: "ID、会员名称、手机号、邮箱、真实姓名"
      }
    }
  },
  {
    prop: "memberId",
    label: "会员ID",
    copyable: true
  },
  {
    prop: "username",
    label: "会员名称",
    width: 130
  },
  {
    prop: "realName",
    label: "真实姓名"
  },
  {
    prop: "mobilePhone",
    label: "手机号码",
    width: 150,
    copyable: true
  },
  {
    prop: "email",
    label: "会员邮箱",
    width: 130,
    copyable: true
  },
  {
    prop: "unit",
    label: "币种名称",
    enum: coinOptions,
    search: {
      el: "select"
    }
  },
  {
    prop: "address",
    label: "钱包地址"
  },
  {
    prop: "balance",
    label: "可用余额",
    type: "money"
  },
  {
    prop: "frozenBalance",
    label: "冻结余额",
    type: "money"
  },
  {
    prop: "systemBalance",
    label: "系统冻结",
    type: "money"
  }
  // {
  //   prop: "operation",
  //   label: "操作",
  //   width: 250,
  //   fixed: "right"
  // }
];

export const formItems: ProFormItem[] = [
  {
    slot: "top-info"
  },
  {
    label: "可用余额:",
    field: "balance",
    type: "input-number"
  },
  {
    label: "冻结余额:",
    field: "frozenBalance",
    type: "input-number"
  },
  {
    label: "系统冻结:",
    field: "systemBalance",
    type: "input-number"
  },
  {
    label: "手机号:",
    field: "phone",
    required: true
  },
  {
    label: "验证码:",
    field: "operCode",
    required: true
  },
  {
    label: "备注:",
    field: "remark",
    type: "input-textarea",
    inputProps: {
      maxlength: 55,
      "show-word-limit": true
    },
    required: true
  }
];

export const descriptionsItems: ProDescriptionsItem[] = [
  {
    label: "会员ID:",
    field: "memberId"
  },
  {
    label: "真实姓名:",
    field: "realName"
  },
  {
    label: "手机号:",
    field: "mobilePhone"
  },
  {
    label: "邮箱:",
    field: "email"
  },
  {
    label: "当前币种:",
    field: "unit"
  },
  {
    label: "钱包地址:",
    field: "address"
  }
];
