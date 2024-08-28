/*
 * @Description:
 * @Date: 2024-04-10 14:12:16
 * @LastEditTime: 2024-07-05 18:00:46
 */
import { ProFormItem } from "@/components/ProForm";
import { ProStep } from "@/components/ProStepsForm";
import { ColumnProps } from "@/components/ProTable/interface";

// 表格配置项
export const tableColumns: ColumnProps[] = [
  {
    prop: "keyword",
    label: "",
    isShow: false,
    search: {
      el: "input",
      props: {
        placeholder: "币名称(中英文)、冷钱包地址/充值地址"
      }
    }
  },
  {
    prop: "nameCn",
    label: "中文名称"
  },
  {
    prop: "name",
    label: "英文名称"
  },
  {
    prop: "accountType",
    label: "账户类型",
    render: ({ row }) => (row.accountType ? "账户模式" : "地址模式")
  },
  {
    prop: "coldWalletAddress",
    label: "冷钱包地址",
    copyable: true
  },
  {
    prop: "depositAddress",
    label: "充值地址",
    copyable: true
  },
  {
    prop: "status",
    label: "状态",
    search: {
      el: "select"
    },
    enum: [
      {
        label: "全部",
        value: ""
      },
      {
        label: "启用",
        value: 1
      },
      {
        label: "禁用",
        value: 0
      }
    ],
    render: ({ row }) => <el-tag type={row.status == 0 ? "danger" : "success"}>{row.status == 0 ? "禁用" : "启用"}</el-tag>
  },
  {
    prop: "operation",
    label: "操作",
    width: 250,
    fixed: "right"
  }
];

export const formItems: ProFormItem[] = [
  {
    label: "中文名称:",
    field: "nameCn",
    required: true
  },
  {
    label: "英文名称:",
    field: "name",
    required: true
  },
  {
    label: "币种单位:",
    field: "unit",
    required: true,
    hide: entity => (entity.id ? true : false)
  },
  {
    label: "币种简介:",
    field: "information",
    type: "input-textarea"
  },
  {
    label: "详情链接:",
    field: "infolink",
    required: true
  },
  {
    label: "账户类型:",
    field: "accountType",
    type: "radio",
    initialValue: 1,
    options: [
      {
        label: "账户模式(如：EOS)",
        value: 1
      },
      {
        label: "地址模式(如：BTC)",
        value: 0
      }
    ]
  },
  {
    label: "充值:",
    field: "canRecharge",
    type: "radio",
    initialValue: 1,
    options: [
      {
        label: "开放",
        value: 1
      },
      {
        label: "禁止",
        value: 0
      }
    ]
  },
  {
    label: "RPC:",
    field: "enableRpc",
    type: "radio",
    initialValue: 1,
    options: [
      {
        label: "开放",
        value: 1
      },
      {
        label: "禁止",
        value: 0
      }
    ]
  },
  {
    label: "提现:",
    field: "canWithdraw",
    type: "radio",
    initialValue: 1,
    options: [
      {
        label: "启用",
        value: 1
      },
      {
        label: "禁用",
        value: 0
      }
    ]
  },
  {
    label: "最小充值数:",
    field: "minRechargeAmount",
    required: true,
    type: "input-number"
  },
  {
    label: "最小手续费:",
    field: "minTxFee",
    required: true,
    type: "input-number"
  },
  {
    label: "最大手续费:",
    field: "maxTxFee",
    required: true,
    type: "input-number"
  },
  {
    label: "最小提币量:",
    field: "minWithdrawAmount",
    required: true,
    type: "input-number"
  },
  {
    label: "最大提币量:",
    field: "maxWithdrawAmount",
    required: true,
    type: "input-number"
  },
  {
    label: "自动转账:",
    field: "canTransfer",
    type: "radio",
    initialValue: 1,
    options: [
      {
        label: "启用",
        value: 1
      },
      {
        label: "禁用",
        value: 0
      }
    ]
  },
  {
    label: "状态:",
    field: "status",
    type: "radio",
    initialValue: 1,
    options: [
      {
        label: "启用",
        value: 1
      },
      {
        label: "禁用",
        value: 0
      }
    ]
  },
  {
    label: "阀值:",
    field: "withdrawThreshold",
    required: true
  },
  {
    label: "人民币汇率:",
    field: "cnyRate",
    required: true
  },
  {
    label: "美元汇率:",
    field: "usdRate",
    required: true
  },
  {
    label: "排序:",
    field: "sort",
    type: "input-number-box"
  }
];

export const stepFormItems = (mode = "create"): ProStep[] => [
  {
    title: "基本信息填写",
    form: {
      items: [
        {
          label: "中文名称:",
          field: "nameCn",
          required: true
        },
        {
          label: "英文名称:",
          field: "name",
          required: true,
          inputProps: {
            disabled: mode === "update"
          }
        },
        {
          label: "币种单位:",
          field: "unit",
          required: true,
          inputProps: {
            disabled: mode === "update"
          }
        },
        {
          label: "币种简介:",
          field: "information",
          type: "input-textarea",
          inputProps: {
            maxlength: 200,
            "show-word-limit": true,
            "input-style": {
              height: "100px"
            }
          }
        },
        {
          label: "详情链接:",
          field: "infolink",
          required: true
        }
      ]
    }
  },
  {
    title: "数值信息填写",
    form: {
      items: [
        {
          label: "最小充值数:",
          field: "minRechargeAmount",
          required: true,
          type: "input-number"
        },
        {
          label: "最小手续费:",
          field: "minTxFee",
          required: true,
          type: "input-number"
        },
        {
          label: "最大手续费:",
          field: "maxTxFee",
          required: true,
          type: "input-number"
        },
        {
          label: "最小提币量:",
          field: "minWithdrawAmount",
          required: true,
          type: "input-number"
        },
        {
          label: "最大提币量:",
          field: "maxWithdrawAmount",
          required: true,
          type: "input-number"
        },
        {
          label: "阀值:",
          field: "withdrawThreshold",
          required: true
        },
        {
          label: "人民币汇率:",
          field: "cnyRate",
          required: true
        },
        {
          label: "美元汇率:",
          field: "usdRate",
          required: true
        },
        {
          label: "排序:",
          field: "sort",
          type: "input-number-box"
        }
      ]
    }
  },
  {
    title: "状态信息设置",
    form: {
      items: [
        {
          label: "状态:",
          field: "status",
          type: "radio",
          initialValue: 1,
          required: true,
          options: [
            {
              label: "启用",
              value: 1
            },
            {
              label: "禁用",
              value: 0
            }
          ]
        },
        {
          label: "账户类型:",
          field: "accountType",
          type: "select",
          required: true,
          options: [
            {
              label: "账户模式(如：EOS)",
              value: 1
            },
            {
              label: "地址模式(如：BTC)",
              value: 0
            }
          ]
        },
        {
          label: "充值:",
          field: "canRecharge",
          type: "select",
          required: true,
          options: [
            {
              label: "开放",
              value: 1
            },
            {
              label: "禁止",
              value: 0
            }
          ]
        },
        {
          label: "RPC:",
          field: "enableRpc",
          type: "select",
          required: true,
          options: [
            {
              label: "开放",
              value: 1
            },
            {
              label: "禁止",
              value: 0
            }
          ]
        },
        {
          label: "提现:",
          field: "canWithdraw",
          type: "select",
          required: true,
          options: [
            {
              label: "启用",
              value: 1
            },
            {
              label: "禁用",
              value: 0
            }
          ]
        },
        {
          label: "自动转账:",
          field: "canTransfer",
          type: "select",
          required: true,
          options: [
            {
              label: "启用",
              value: 1
            },
            {
              label: "禁用",
              value: 0
            }
          ]
        }
      ]
    }
  }
];
