import { ColumnProps } from "@/components/ProTable/interface";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-06-06 10:36:08
 */
export const tableColumns: ColumnProps[] = [
  {
    prop: "id",
    label: "记录ID",
    copyable: true
  },
  {
    prop: "createTime",
    label: "创建时间",
    sortable: true,
    search: {
      el: "date-picker",
      props: {
        type: "daterange",
        "value-format": "YYYY/MM/DD"
      }
    }
  },
  {
    prop: "memberId",
    label: "用户ID"
  },
  {
    prop: "username",
    label: "用户名"
  },
  {
    prop: "realName",
    label: "真实姓名"
  },
  {
    prop: "idNumber",
    label: "身份证号",
    copyable: true
  },
  {
    prop: "email",
    label: "邮箱",
    copyable: true
  },
  {
    prop: "mobilePhone",
    label: "手机号",
    copyable: true
  },
  {
    prop: "amount",
    label: "押金",
    type: "money",
    sortable: true
  },
  {
    prop: "status",
    label: "状态",
    search: {
      el: "select"
    },
    enum: [
      {
        label: "缴纳",
        value: 0
      },
      {
        label: "赎回",
        value: 1
      }
    ],
    render: ({ row }) => <el-tag type={row.status ? "success" : "info"}> {row.status ? "赎回" : "缴纳"} </el-tag>
  }
];
