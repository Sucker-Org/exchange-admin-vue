import { ProDescriptionsItem } from "@/components/ProDescriptions";
import { ColumnProps } from "@/components/ProTable/interface";
import { WithdrawalStatusEnum } from "@/enums";
import { enumTransformOptions } from "@/utils/transform";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-07-04 16:51:03
 */

export const tableColumns = (coinTypeOptions): ColumnProps[] => [
  {
    type: "selection",
    selectable: row => row.status === 0 && row.isAuto == 0
  },
  {
    prop: "unit",
    label: "提现币种",
    search: {
      el: "select"
    },
    enum: coinTypeOptions
  },
  {
    prop: "address",
    label: "提现地址",
    copyable: true,
    search: {
      el: "input"
    }
  },
  {
    prop: "remark",
    label: "备注/Memo"
  },
  {
    prop: "createTime",
    label: "申请时间",
    sortable: true
  },
  {
    prop: "totalAmount",
    label: "提币个数"
  },
  {
    prop: "arrivedAmount",
    label: "实际到账"
  },
  {
    prop: "status",
    label: "状态",
    search: {
      el: "select"
    },
    enum: enumTransformOptions(WithdrawalStatusEnum, true),
    render: ({ row }) =>
      WithdrawalStatusEnum[row?.status] ? (
        <el-tag type={WithdrawalStatusEnum[row.status]?.type}>{WithdrawalStatusEnum[row?.status]?.text}</el-tag>
      ) : (
        "--"
      )
  },
  {
    prop: "isAuto",
    label: "提现方式",
    enum: [
      {
        label: "人工审核提现",
        value: 0
      },
      {
        label: "自动提现",
        value: 1
      }
    ]
  },
  {
    prop: "fee",
    label: "手续费"
  },
  {
    prop: "transactionNumber",
    label: "TXID"
  },
  {
    prop: "memberUsername",
    label: "会员昵称"
  },
  {
    prop: "memberId",
    label: "会员ID",
    copyable: true,
    search: {
      order: 0,
      el: "input"
    }
  },
  {
    prop: "operation",
    label: "操作",
    fixed: "right",
    width: 150
  }
];

export const descriptionsItems: ProDescriptionsItem[] = [
  {
    label: "用户名:",
    field: "memberId"
  },
  {
    label: "真实姓名:",
    field: "memberId"
  },
  {
    label: "提现币种:",
    field: "coinId"
  },
  {
    label: "提现数量:",
    field: "totalAmount"
  },
  {
    label: "提现地址:",
    field: "address",
    copyable: true
  },
  {
    label: "到账数量:",
    field: "arrivedAmount"
  },
  {
    label: "手续费:",
    field: "fee"
  },
  {
    label: "申请时间:",
    field: "createTime"
  }
];

export const transactionRecords = (typeOptions): ColumnProps[] => [
  {
    prop: "memberId",
    label: "会员ID",
    copyable: true
  },
  {
    prop: "type",
    label: "交易类型",
    enum: typeOptions,
    search: {
      el: "select"
    }
  },
  {
    prop: "symbol",
    label: "交易币种"
  },
  {
    prop: "amount",
    label: "交易金额"
  },
  {
    prop: "fee",
    label: "交易手续费"
  },
  {
    prop: "createTime",
    label: "交易时间",
    sortable: true
  }
];
