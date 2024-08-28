import { ColumnProps } from "@/components/ProTable/interface";
import { userStarOptions } from "@/options";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-05-28 17:09:55
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
    prop: "memberFirstTime",
    label: "首次购买时间",
    sortable: true,
    search: {
      order: 0,
      el: "date-picker",
      props: {
        type: "daterange",
        "value-format": "YYYY-MM-DD"
      }
    }
  },
  {
    prop: "toMobilePhone",
    label: "邀请人手机号",
    copyable: true,
    sortable: true
  },
  {
    prop: "toMemberFirstTime",
    label: "邀请人首次购买时间",
    sortable: true
  },
  {
    prop: "toMemberStar",
    label: "邀请人星级",
    sortable: true
  }
];
