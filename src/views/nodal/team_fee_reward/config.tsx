import { ColumnProps } from "@/components/ProTable/interface";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-06-06 15:16:00
 */
export const tableColumns: ColumnProps[] = [
  {
    prop: "memberPhone",
    label: "手续费用户手机号",
    copyable: true,
    search: {
      el: "input"
    }
  },
  {
    prop: "money",
    label: "总手续费"
  },
  {
    prop: "proportion",
    label: "奖励比例"
  },
  {
    prop: "number",
    label: "奖励数量"
  },
  {
    prop: "toMemberId",
    label: "奖励用户ID"
  },
  {
    prop: "toMemberPhone",
    label: "奖励用户手机号",
    copyable: true,
    search: {
      el: "input"
    }
  },
  {
    prop: "toMemberStar",
    label: "奖励用户星级",
    sortable: true,
    render: ({ row }) => (
      <el-text type="primary" style={{ fontWeight: 600 }}>
        {row.toMemberStar}
      </el-text>
    )
  },
  {
    prop: "createTime",
    label: "领取奖励时间",
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
