import { ColumnProps } from "@/components/ProTable/interface";
/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-06-13 17:47:58
 */
export const tableColumns: ColumnProps[] = [
  {
    prop: "title",
    label: "标题"
  },
  {
    prop: "smallImageUrl",
    label: "小图",
    type: "image"
  },
  {
    prop: "status",
    label: "显示"
  },
  {
    prop: "step",
    label: "进度",
    render: ({ row }) =>
      stepEnum[row.step] ? <el-text type={stepEnum[row.step]?.type}> {stepEnum[row.step]?.label} </el-text> : "--"
  },
  {
    prop: "leveloneCount",
    label: "一级邀请"
  },
  {
    prop: "type",
    label: "类型",
    render: ({ row }) => typeEnum[row.type] ?? ""
  },
  {
    prop: "startTime",
    label: "开始时间"
  },
  {
    prop: "endTime",
    label: "结束时间"
  },
  // {
  //   prop: "noticeLink",
  //   label: "公告链接"
  // },
  // {
  //   prop: "activityLink",
  //   label: "活动链接"
  // },
  {
    prop: "createTime",
    label: "创建时间"
  },
  {
    prop: "operation",
    label: "操作",
    width: 180,
    fixed: "right"
  }
];

type stepEnumType = Readonly<{
  label: string;
  readonly type: import("element-plus/es/utils").EpPropMergeType<
    StringConstructor,
    "success" | "warning" | "info" | "primary" | "danger",
    unknown
  >;
}>;
export const stepEnum: stepEnumType[] = [
  {
    label: "未开始",
    type: "warning"
  },
  {
    label: "进行中",
    type: "success"
  },
  {
    label: "派发中",
    type: "primary"
  },
  {
    label: "已结束",
    type: "info"
  }
];

export const typeEnum = {
  6: "锁仓释放",
  7: "hdz质押"
};
