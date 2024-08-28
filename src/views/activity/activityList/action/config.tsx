import { ProFormItem } from "@/components/ProForm";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-07-16 11:05:38
 */

export const formConfig = {
  "input-width": "500px",
  "label-width": "160px"
};
export const formItems = (coinOptions): ProFormItem[] => [
  {
    field: "title",
    label: "标题:",
    required: true,
    inputProps: {
      maxlength: 15,
      "show-word-limit": true
    }
  },
  {
    field: "detail",
    label: "活动简介:",
    required: true
  },
  // （决定是否显示在前端）
  // 0.否1.是
  {
    field: "status",
    label: "显示状态:",
    required: true,
    type: "radio",
    initialValue: 0,
    options: [
      {
        label: "不显示",
        value: 0
      },
      {
        label: "显示",
        value: 1
      }
    ]
  },
  // 0：未开始 1：进行中 2：派发中 3：已结束
  {
    field: "step",
    label: "进度:",
    required: true,
    type: "radio",
    options: [
      {
        label: "未开始",
        value: 0
      },
      {
        label: "进行中",
        value: 1
      },
      {
        label: "派发中",
        value: 2
      },
      {
        label: "已结束",
        value: 3
      }
    ]
  },
  {
    field: "acceptUnit",
    label: "接收币种:",
    required: true,
    type: "select",
    options: coinOptions
  },
  // (0:未知，1：首发抢购，2：首发分摊，3：持仓瓜分，4：自由认购，5：云矿机， 6：锁仓释放 7:hdz质押）
  {
    field: "type",
    label: "活动类型:",
    required: true,
    type: "radio",
    options: [
      {
        label: "锁仓释放",
        value: 6
      },
      {
        label: "hdz质押",
        value: 7
      }
    ]
  }
];

export const miningFormItems: ProFormItem[] = [
  // （0：日，1：周，2：月，3：年）
  {
    field: "miningPeriod",
    label: "挖矿周期:",
    type: "radio",
    options: [
      {
        label: "日",
        value: 0
      },
      {
        label: "周",
        value: 1
      },
      {
        label: "月",
        value: 2
      },
      {
        label: "年",
        value: 3
      }
    ]
  },
  {
    field: "miningDays",
    label: "挖矿周期数:"
  },
  {
    field: "miningDaysprofit",
    label: "挖矿周期产出:"
  },
  // {
  //   field: "miningUnit",
  //   label: "云矿机所挖币种",
  //   required: true
  // },
  {
    field: "miningInvite",
    label: "邀请(购买)产能增加:"
  },
  {
    field: "miningInvitelimit",
    label: "产能增加上限:"
  }
];
export const HDZFormItems = (coinOptions): ProFormItem[] => [
  {
    field: "lockedUnit",
    label: "锁仓币种:",
    type: "select",
    options: coinOptions
  }
];
export const lockFormItems = (form, coinOptions): ProFormItem[] => [
  {
    field: "lockedUnit",
    label: "锁仓币种:",
    type: "select",
    options: coinOptions
  },
  {
    field: "releaseType",
    type: "radio",
    label: "锁仓类型:",
    tooltip:
      "等比释放的含义是在剩余未释放量的基础上进行百分比计算，而不是一开始的总数，所以，如果释放周期设置的足够大，那么锁仓释放将是无止境的",
    options: [
      {
        label: "等额释放",
        value: 0
      },
      {
        label: "等比释放",
        value: 1
      }
    ]
  },

  // 等额释放
  {
    field: "releaseAmount",
    label: "周期释放额度:",
    hide: form.releaseType === 0 ? false : true
  },
  // （等比释放）
  // 该数值如输入 0.2则代表每周期释放20%
  {
    field: "releasePercent",
    label: "释放比例:",
    hide: form.releaseType === 1 ? false : true
  },
  {
    field: "lockedPeriod",
    label: "释放周期:",
    type: "radio",
    options: [
      {
        label: "日",
        value: 0
      },
      {
        label: "周",
        value: 1
      },
      {
        label: "月",
        value: 2
      },
      {
        label: "年",
        value: 3
      }
    ]
  },
  {
    field: "lockedDays",
    label: "释放总周期数:",
    tooltip: "等比释放会在最后一个周期全部释放完毕，不管剩余多少"
  },
  {
    field: "lockedFee",
    label: "门槛费:",
    tooltip: "此门槛费用为锁仓特有参数，用户参与该锁仓后，将从余额中扣除该数量的币种"
  },
  {
    field: "releaseTimes",
    label: "释放倍数:",
    tooltip: "释放倍数填写大于0的数值后，”周期释放额度“将失效。周期释放数量将自动以总量/周期数量释放。此数值可为小数，如1.5"
  },
  {
    field: "miningInvite",
    label: "邀请(购买)产能增加:"
  },
  {
    field: "miningInvitelimit",
    label: "产能增加上限:"
  }
];
export const endFormItems = (coinOptions): ProFormItem[] => [
  // prop（0：不限制，>0:限制）
  {
    field: "leveloneCount",
    label: "一级邀请:",
    tooltip: "要求一级邀请人数不能低于该数值，为0则不做要求",
    required: true,
    inputProps: {
      placeholder: "请输入一级邀请"
    }
  },
  // (抢购发行与分摊发行都需要设置)
  {
    field: "startTime",
    label: "活动开始时间:",
    type: "datetime",
    required: true,
    inputProps: {
      "value-format": "YYYY-MM-DD HH:mm:ss"
    }
  },
  {
    field: "endTime",
    label: "结束时间:",
    type: "datetime",
    required: true,
    inputProps: {
      "value-format": "YYYY-MM-DD HH:mm:ss"
    }
  },
  {
    field: "amountScale",
    label: "数量精度:"
  },
  {
    field: "maxLimitAmout",
    label: "最大限购:"
  },
  // 0：不限制
  {
    field: "minLimitAmout",
    label: "最低起购:"
  },
  // （0：不限制）form
  {
    field: "limitTimes",
    label: "限购次数:"
  },
  {
    field: "holdLimit",
    label: "持仓最低要求:"
  },
  {
    field: "holdUnit",
    label: "持仓要求币种:",
    type: "select",
    options: coinOptions
  },
  {
    field: "bannerImageUrl",
    label: "活动图片（banner）:",
    type: "upload"
  },
  {
    field: "smallImageUrl",
    label: "列表展示图片:",
    type: "upload"
  },
  {
    field: "content",
    label: "活动详情:"
  }
];

export enum stateEnum {
  "临时",
  "未成交",
  "已成交",
  "撤销"
}

export enum stateTypeEnum {
  "warning",
  "info",
  "success",
  "danger"
}

export enum typeEnum {
  "未知",
  "首发抢购",
  "首发分摊",
  "持仓瓜分",
  "自由认购",
  "云矿机",
  "锁仓释放",
  "hdz质押"
}
