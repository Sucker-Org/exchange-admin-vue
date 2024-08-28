import { ProFormItem } from "@/components/ProForm";
import { ColumnProps } from "@/components/ProTable/interface";
import { enumTransformOptions } from "@/utils/transform";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-06-06 17:37:13
 */
const isPlatformCoinEnum = {
  false: {
    text: "否",
    type: "danger"
  },
  true: {
    text: "是",
    type: "success"
  }
};

const statusEnum = {
  0: {
    text: "正常",
    type: "success"
  },
  1: {
    text: "非法",
    type: "danger"
  }
};

export const tableColumns = (coinTypeOptions): ColumnProps[] => [
  {
    type: "selection"
  },
  {
    prop: "id",
    label: "币种编号"
  },
  {
    prop: "nameCn",
    label: "币种名称"
  },
  {
    prop: "name",
    label: "英文名称"
    // enum: coinTypeOptions,
    // search: {
    //   el: "select"
    // },
    // render: ({ row }) => row.name || "--"
  },
  {
    prop: "unit",
    label: "货币单位",
    enum: coinTypeOptions,
    search: {
      el: "select"
    },
    render: ({ row }) => row.unit || "--"
  },
  {
    prop: "isPlatformCoin",
    label: "是否平台币",
    enum: enumTransformOptions(isPlatformCoinEnum, true),
    search: {
      el: "select"
    },
    render: ({ row }) => (
      <el-tag type={isPlatformCoinEnum[row.isPlatformCoin]?.type}>{isPlatformCoinEnum[row.isPlatformCoin]?.text}</el-tag>
    )
  },
  {
    prop: "jyRate",
    label: "交易手续费率"
  },
  {
    prop: "sellMinAmount",
    label: "卖出广告最低发布数量",
    sortable: true
  },
  {
    prop: "buyMinAmount",
    label: "买入广告最低发布数量",
    sortable: true
  },
  {
    prop: "status",
    label: "状态",
    enum: enumTransformOptions(statusEnum, true),
    search: {
      el: "select"
    },
    render({ row }) {
      return <el-tag type={statusEnum[row.status]?.type}>{statusEnum[row.status]?.text}</el-tag>;
    }
  },
  {
    prop: "operation",
    label: "操作",
    width: 200,
    fixed: "right"
  }
];

export const formItems = (options): ProFormItem[] => [
  {
    label: "货币单位:",
    field: "unit",
    type: "select",
    options: options
  },
  {
    label: "币种名称:",
    field: "nameCn"
  },
  {
    label: "英文名称:",
    field: "name"
  },
  {
    label: "交易手续费率(%):",
    field: "jyRate",
    type: "input-number"
  },
  {
    label: "卖出广告最低发布数量:",
    field: "sellMinAmount",
    type: "input-number"
  },
  {
    label: "买入广告最低发布数量:",
    field: "buyMinAmount",
    type: "input-number"
  },
  {
    label: "状态:",
    field: "status",
    type: "radio",
    initialValue: 0,
    options: [
      {
        label: "正常",
        value: 0
      },
      {
        label: "非法",
        value: 1
      }
    ]
  }
];
