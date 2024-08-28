import { ColumnProps } from "@/components/ProTable/interface";
import { userStarOptions } from "@/options";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-05-28 17:10:18
 */
export const tableColumns: ColumnProps[] = [
  {
    prop: "memberPhone",
    label: "用户手机号",
    copyable: true,
    search: {
      el: "input"
    }
  },
  {
    prop: "memberStar",
    label: "用户星级",
    sortable: true,
    enum: userStarOptions,
    search: {
      el: "select"
    },
    render: ({ row }) => (
      <el-text type="primary" style={{ fontWeight: 600 }}>
        {row.memberStar}
      </el-text>
    )
  },
  {
    prop: "memberStarPeople",
    label: "星级对应人数"
  },
  {
    prop: "sumAwardNumber",
    label: "奖励基数"
  },
  {
    prop: "sumCount",
    label: "星级奖励总数"
  },
  {
    prop: "ratio",
    label: "奖励比例"
  },
  {
    prop: "number",
    label: "领取奖励数量"
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
