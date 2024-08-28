import { ColumnProps } from "@/components/ProTable/interface";
import { userStarOptions } from "@/options";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-06-06 15:51:19
 */
export const tableColumns: ColumnProps[] = [
  {
    prop: "mobilePhone",
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
    search: {
      el: "select"
    },
    enum: userStarOptions,
    render: ({ row }) => (
      <el-text type="primary" style={{ fontWeight: 600 }}>
        {row.memberStar}
      </el-text>
    )
  },
  {
    prop: "type",
    label: "购买方式"
  },
  {
    prop: "count",
    label: "购买份数"
  },
  {
    prop: "currentHdz",
    label: "HDZ价格"
  },
  {
    prop: "cnhd",
    label: "CNHD数量"
  },
  {
    prop: "firstCreateTime",
    label: "初次购买时间",
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
