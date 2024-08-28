/*
 * @Description:
 * @Date: 2024-04-18 14:14:49
 * @LastEditTime: 2024-05-14 14:35:08
 */
import { ColumnProps } from "@/components/ProTable/interface";
import * as utils from "@/utils/date";

export const tableColumns: ColumnProps[] = [
  {
    prop: "updateTime",
    label: "修改时间",
    sortable: true,
    render: ({ row }) => {
      return utils.formatDate(row.updateTime) || "--";
    }
  },
  {
    prop: "beforeBalance",
    label: "修改前可用余额"
  },
  {
    prop: "balance",
    label: "修改后可用余额"
  },
  {
    prop: "beforeFrozenBalance",
    label: "修改前冻结余额"
  },
  {
    prop: "frozenBalance",
    label: "修改后冻结余额"
  },
  {
    prop: "phone",
    label: "修改人手机"
  },
  {
    prop: "remark",
    label: "备注"
  }
];
