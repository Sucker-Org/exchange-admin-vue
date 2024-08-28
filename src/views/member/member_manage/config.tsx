import { ColumnProps } from "@/components/ProTable/interface";
import { MemberLevelEnum, MemberRealNameStatusEnum } from "@/enums";
import { enumTransformOptions } from "@/utils/transform";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-06-18 11:41:22
 */

export const tableColumns: ColumnProps[] = [
  {
    prop: "equipmentNumber",
    label: "用户账户标识",
    isShow: false,
    search: {
      el: "input",
      props: {
        placeholder: "ID、手机号、邮箱"
      }
    }
  },
  {
    prop: "id",
    label: "会员ID",
    copyable: true,
    width: 120
  },
  {
    prop: "registrationTime",
    label: "注册时间",
    sortable: true,
    width: 170,
    search: {
      order: 1,
      el: "date-picker",
      props: {
        type: "daterange",
        "value-format": "YYYY/MM/DD"
      }
    }
  },
  {
    prop: "username",
    label: "会员名称",
    width: 130
  },
  {
    prop: "realName",
    label: "真实姓名",
    width: 130,
    search: {
      el: "input"
    }
  },
  {
    prop: "mobilePhone",
    label: "手机号",
    width: 150,
    copyable: true
  },
  {
    prop: "idNumber",
    label: "身份证号",
    copyable: true,
    width: 180,
    search: {
      el: "input"
    }
  },
  {
    prop: "email",
    label: "会员邮箱",
    width: 130,
    copyable: true
  },
  {
    prop: "memberLevel",
    label: "会员类型",
    width: 100,
    search: {
      el: "select"
    },
    enum: enumTransformOptions(MemberLevelEnum, true),
    render: ({ row }) => <el-text type={MemberLevelEnum[row.memberLevel]?.type}>{MemberLevelEnum[row.memberLevel]?.text}</el-text>
  },
  {
    prop: "realNameStatus",
    label: "认证状态",
    width: 100,
    search: {
      el: "select"
    },
    enum: enumTransformOptions(MemberRealNameStatusEnum, true),
    render: ({ row }) => (
      <el-text type={MemberRealNameStatusEnum[row.realNameStatus]?.type}>
        {MemberRealNameStatusEnum[row.realNameStatus]?.text}
      </el-text>
    )
  },
  {
    prop: "loginStatus",
    label: "登录状态",
    width: 100,
    search: {
      el: "select"
    },
    enum: [
      {
        label: "全部",
        value: ""
      },
      {
        label: "上线",
        value: 1
      },
      {
        label: "下线",
        value: 0
      }
    ],
    render: ({ row }) => {
      const StatusEnum = {
        0: {
          text: "下线",
          type: "info"
        },
        1: {
          text: "上线",
          type: "success"
        }
      };
      return StatusEnum[row.loginStatus] ? (
        <el-text type={StatusEnum[row.loginStatus]?.type}>{StatusEnum[row.loginStatus]?.text}</el-text>
      ) : (
        "--"
      );
    }
  },
  {
    prop: "registrationIp",
    label: "注册IP",
    copyable: true,
    isShow: false,
    search: {
      el: "input"
    }
  },
  {
    prop: "loginIp",
    label: "登录IP",
    copyable: true,
    isShow: false,
    search: {
      el: "input"
    }
  },
  {
    prop: "canOtc",
    label: "otc交易"
  },
  {
    prop: "canRecharge",
    label: "可充值"
  },
  {
    prop: "canWithdraw",
    label: "可提现"
  },
  {
    prop: "transactionStatus",
    label: "可交易"
  },
  {
    prop: "status",
    label: "状态"
  },
  {
    prop: "operation",
    label: "操作",
    width: 310,
    fixed: "right"
  }
];
