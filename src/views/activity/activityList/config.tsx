import { ColumnProps } from "@/components/ProTable/interface";

export const tableColumns: ColumnProps[] = [
  {
    prop: "title",
    label: "标题",
    width: "200px"
  },
  {
    prop: "smallImageUrl",
    label: "列表展示图片",
    type: "image",
    width: 120
  },
  {
    prop: "status",
    label: "显示隐藏",
    width: 120
  },
  // 0：未开始 1：进行中 2：派发中 3：已结束
  {
    prop: "step",
    label: "进度",
    render: ({ row }) =>
      stepOption[row.step] ? <el-text type={stepOption[row.step]?.type}> {stepOption[row.step]?.label} </el-text> : "--"
  },
  {
    prop: "acceptUnit",
    label: "接收币种",
    width: 120
  },
  {
    prop: "leveloneCount",
    label: "一级邀请",
    width: 120
  },
  // (0:未知，1：首发抢购，2：首发分摊，3：持仓瓜分，4：自由认购，5：云矿机， 6：锁仓释放 7:hdz质押）
  {
    prop: "type",
    label: "活动类型",
    width: 120,
    enum: [
      {
        label: "首发抢购",
        value: 1
      },
      {
        label: "首发分摊",
        value: 2
      },
      {
        label: "持仓瓜分",
        value: 3
      },
      {
        label: "自由认购",
        value: 4
      },
      {
        label: "云矿机",
        value: 5
      },
      {
        label: "锁仓释放",
        value: 6
      },
      {
        label: "hdz质押",
        value: 7
      }
    ]
  },
  {
    prop: "unit",
    label: "量/价",
    width: 140
  },
  // {
  //   prop: "noticeLink",
  //   label: "公告链接",
  //   width: 150
  // },
  // {
  //   prop: "activityLink",
  //   label: "链接",
  //   width: 150
  // },
  {
    prop: "detail",
    label: "活动简介",
    width: 150
  },
  {
    prop: "createTime",
    label: "创建时间",
    width: 170
  },
  {
    prop: "startTime",
    label: "活动开始时间",
    width: 170
  },
  {
    prop: "endTime",
    label: "结束时间",
    width: 170
  },
  {
    prop: "operation",
    label: "操作",
    width: 260,
    align: "left",
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
export const stepOption: stepEnumType[] = [
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
  UNKNOWN: "未知",
  IPO_RUSH: "首发抢购",
  IPO_SHARE: "首发分摊",
  PARTITION: "持仓瓜分",
  FREE_SUBSCRIBE: "自由认购",
  MINE: "云矿机",
  LOCK: "锁仓释放",
  HDZ_PLEDGE: "hdz质押"
};

export enum stepEnum {
  "未开始",
  "进行中",
  "派发中",
  "已结束"
}
