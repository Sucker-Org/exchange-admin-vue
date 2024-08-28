import { ColumnProps } from "@/components/ProTable/interface";
import { userStarOptions } from "@/options";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-05-28 17:09:46
 */
export const tableColumns: ColumnProps[] = [
  {
    prop: "mobilePhone",
    label: "用户手机号",
    copyable: true,
    search: {
      order: 1,
      el: "input"
    }
  },
  {
    prop: "memberStar",
    label: "用户星级",
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
    prop: "memberStarPeople",
    label: "星级人数"
  },
  {
    prop: "unitNumber",
    label: "单份数量"
  },
  {
    prop: "awardHdc",
    label: "奖励数量"
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
