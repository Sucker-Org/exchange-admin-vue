import { ColumnProps } from "@/components/ProTable/interface";
import { userStarOptions } from "@/options";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-05-31 12:01:01
 */
export const tableColumns: ColumnProps[] = [
  {
    prop: "memberPhone",
    label: "用户手机号",
    copyable: true,
    search: {
      order: 1,
      el: "input"
    }
  },
  {
    prop: "memberStar",
    label: "购买星级",
    sortable: true,
    enum: userStarOptions,
    search: {
      order: 2,
      el: "select"
    },
    render: ({ row }) => (
      <el-text type="primary" style={{ fontWeight: 600 }}>
        {row.memberStar}
      </el-text>
    )
  },
  {
    prop: "money",
    label: "购买金额",
    type: "money"
  },
  {
    prop: "number",
    label: "奖励金额",
    type: "money"
  },
  {
    prop: "proportion",
    label: "奖励比例"
  },
  {
    prop: "toMemberPhone",
    label: "邀请人手机号",
    copyable: true
  },
  {
    prop: "toMemberStar",
    label: "奖励人星级",
    sortable: true,
    render: ({ row }) => (
      <el-text type="primary" style={{ fontWeight: 600 }}>
        {row.toMemberStar}
      </el-text>
    )
  },
  {
    prop: "createTime",
    label: "发放时间",
    sortable: true,
    search: {
      order: 0,
      el: "date-picker",
      props: {
        type: "daterange",
        "value-format": "YYYY-MM-DD"
      }
    }
  }
];
