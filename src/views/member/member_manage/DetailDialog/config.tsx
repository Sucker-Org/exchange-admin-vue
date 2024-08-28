/*
 * @Description:
 * @Date: 2024-04-18 14:14:49
 * @LastEditTime: 2024-06-14 11:02:21
 */
import { ProDescriptionsItem } from "@/components/ProDescriptions";
import { ProFormItem } from "@/components/ProForm";
import { ColumnProps } from "@/components/ProTable/interface";
import { MemberRealNameStatusEnum } from "@/enums";

export const tableColumns: ColumnProps[] = [
  {
    prop: "coinId",
    label: "币种"
  },
  {
    prop: "balance",
    label: "可用",
    type: "money"
  },
  {
    prop: "frozenBalance",
    label: "冻结",
    type: "money"
  },
  {
    prop: "toReleased",
    label: "待释放资产",
    type: "money"
  },
  {
    prop: "address",
    label: "地址",
    copyable: true
  },
  {
    prop: "operation",
    label: "操作",
    fixed: "right",
    width: 200
  }
];

export const tranRecordsTableColumns: ColumnProps[] = [
  {
    prop: "memberId",
    label: "会员ID",
    copyable: true
  },
  {
    prop: "type",
    label: "交易类型"
  },
  {
    prop: "amount",
    label: "交易金额",
    type: "money"
  },
  {
    prop: "fee",
    label: "交易手续费",
    type: "money"
  },
  {
    prop: "createTime",
    label: "交易时间",
    sortable: true
  }
];

export const rechargeFormItems: ProFormItem[] = [
  {
    label: "币种:",
    field: "unit",
    type: "text",
    required: true
  },
  {
    label: "充值地址:",
    field: "address",
    type: "text",
    required: true
  },
  {
    label: "充值数量",
    field: "amount",
    type: "input-number-box",
    required: true
  }
];

export const descriptionsItems: ProDescriptionsItem[] = [
  {
    label: "会员ID:",
    field: "id",
    copyable: true
  },
  {
    label: "会员等级:",
    field: "memberLevel"
  },
  {
    label: "会员状态:",
    field: "status",
    render: ({ status }) => {
      if (status || status == 0) {
        return <el-tag type={status ? "danger" : "success"}>{status ? "非法" : "正常"}</el-tag>;
      }
      return "--";
    }
  },
  {
    label: "会员昵称:",
    field: "username"
  },
  {
    label: "真实姓名:",
    field: "realName"
  },
  {
    label: "手机号:",
    field: "mobilePhone",
    copyable: true
  },
  {
    label: "身份证号:",
    field: "idNumber",
    copyable: true
  },
  {
    label: "会员邮箱:",
    field: "email",
    copyable: true
  },
  {
    label: "会员类型:",
    field: "memberLevel",
    render: entity => {
      const memberLevelEnum = [
        {
          label: "普通用户",
          type: "info"
        },
        {
          label: "实名用户",
          type: "success"
        },
        {
          label: "认证商家",
          type: "success"
        }
      ];
      return <el-tag type={memberLevelEnum[entity.memberLevel]?.type}>{memberLevelEnum[entity.memberLevel]?.label}</el-tag>;
    }
  },
  {
    label: "认证状态",
    field: "realNameStatus",
    render: entity => (
      <el-tag type={MemberRealNameStatusEnum[entity.realNameStatus]?.type}>
        {MemberRealNameStatusEnum[entity.realNameStatus]?.text}
      </el-tag>
    )
  },
  {
    label: "otc交易:",
    field: "canOtc",
    render: ({ canOtc }) => {
      if (canOtc || canOtc == 0) {
        return <el-tag type={canOtc ? "success" : "danger"}>{canOtc ? "允许" : "禁止"}</el-tag>;
      }
      return "--";
    }
  },
  {
    label: "可充值:",
    field: "canRecharge",
    render: ({ canRecharge }) => {
      if (canRecharge || canRecharge == 0) {
        return <el-tag type={canRecharge ? "success" : "danger"}>{canRecharge ? "允许" : "禁止"}</el-tag>;
      }
      return "--";
    }
  },
  {
    label: "可提现:",
    field: "canWithdraw",
    render: ({ canWithdraw }) => {
      if (canWithdraw || canWithdraw == 0) {
        return <el-tag type={canWithdraw ? "success" : "danger"}>{canWithdraw ? "允许" : "禁止"}</el-tag>;
      }
      return "--";
    }
  },
  {
    label: "可交易:",
    field: "transactionStatus",
    render: ({ transactionStatus }) => {
      if (transactionStatus || transactionStatus == 0) {
        return <el-tag type={transactionStatus ? "success" : "danger"}>{transactionStatus ? "允许" : "禁止"}</el-tag>;
      }
      return "--";
    }
  },
  {
    label: "邀请者ID:",
    field: "inviterId",
    copyable: true
  },
  {
    label: "邀请者手机:",
    field: "inviterPhone",
    copyable: true
  },
  {
    label: "注册IP:",
    field: "registrationIp"
  },
  {
    label: "注册时间:",
    field: "registrationTime"
  },
  {
    label: "登录IP:",
    field: "loginIp"
  },
  {
    label: "最近登录时间:",
    field: "lastLoginTime"
  }
];
