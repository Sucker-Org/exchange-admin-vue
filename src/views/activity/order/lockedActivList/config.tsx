import { ProFormItem } from "@/components/ProForm";
import { ColumnProps } from "@/components/ProTable/interface";

/*
 * @Author: sjd shi_junda@outlook.com
 * @Date: 2024-05-15 10:40:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-07-30 15:23:50
 * @FilePath: \exchange-admin-vue\src\views\activity\order\lockedActivList\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

enum PeriodEnum {
  "天",
  "周",
  "月",
  "年"
}

export const tableColumns: ColumnProps[] = [
  {
    prop: "memberId",
    label: "用户ID",
    copyable: true
  },
  {
    prop: "totalLocked",
    label: "锁仓数量",
    type: "money"
  },
  {
    prop: "releaseUnit",
    label: "释放币种"
  },
  {
    prop: "lockedDays",
    label: "持续周期",
    render: ({ row }) => {
      return (
        <>
          <el-text type="primary">{row.lockedDays}</el-text>
          {row.lockedDays == 0 ? "" : PeriodEnum[row.period] || ""}
        </>
      );
    }
  },
  {
    prop: "currentReleaseamount",
    label: "每期释放"
  },
  {
    prop: "totalRelease",
    label: "已释放数量"
  },
  {
    prop: "releasedDays",
    label: "已释放周期",
    render: ({ row }) => {
      return (
        <>
          <el-text type="primary">{row.releasedDays}</el-text>
          {PeriodEnum[row.period] ?? ""}
        </>
      );
    }
  },
  {
    prop: "releaseType",
    label: "释放类型",
    render: ({ row }) => <el-text type="primary">{row.releaseType ? "等比释放" : "等额释放"}</el-text>
  },
  {
    prop: "createTime",
    label: "参与时间"
  },
  {
    prop: "endTime",
    label: "结束时间"
  },
  {
    prop: "operation",
    label: "操作",
    width: 160,
    fixed: "right"
  }
];
export const formItems: ProFormItem[] = [
  {
    label: "获得币种数量:",
    field: "amount",
    type: "input-number"
  },
  {
    label: "领取人ID:",
    field: "memberId"
  }
];
export const editItems = (options): ProFormItem[] => [
  {
    label: "持续周期(" + PeriodEnum[options.period] + "):",
    field: "lockedDays",
    type: "input-number-box",
    required: true,
    slot: "月",
    inputProps: {
      min: 0
    }
  },
  {
    label: "原始周期释放:",
    field: "originReleaseamount",
    type: "input-number-box",
    required: true,
    inputProps: {
      min: 0
    }
  },
  {
    label: "当前周期释放:",
    field: "currentReleaseamount",
    type: "input-number-box",
    required: true,
    inputProps: {
      min: 0
    }
  }
];
