/*
 * @Description:
 * @Date: 2024-05-21 17:29:19
 * @LastEditTime: 2024-07-04 15:44:43
 */
import { ColumnProps } from "@/components/ProTable/interface";

export const tableColumns: ColumnProps[] = [
  {
    prop: "memberId",
    label: "ID",
    width: 180
  },
  {
    prop: "mobilePhone",
    label: "手机号",
    width: 180
  },
  {
    prop: "type",
    label: "类型",
    width: 180,
    render: ({ row }) => <el-tag type={row.type ? "primary" : "success"}> {row.type ? "充值" : "提现"} </el-tag>
  },
  {
    prop: "transactionNumber",
    label: "交易哈希",
    copyable: true
  },
  {
    prop: "address",
    label: "交易地址",
    copyable: true
  },
  {
    prop: "dealTime",
    label: "交易时间"
  }
];
