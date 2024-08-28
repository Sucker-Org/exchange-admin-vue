import { ProDescriptionsItem } from "@/components/ProDescriptions";
import { ColumnProps } from "@/components/ProTable/interface";
import { AdvertiseStatus, AdvertiseTypeEnum } from "@/enums";
import { advertiseTypeOptions } from "@/options";
import { enumTransformOptions } from "@/utils/transform";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-06-18 15:52:55
 */
export const tableColumns: ColumnProps[] = [
  {
    prop: "account",
    isShow: false,
    search: {
      label: "广告商信息",
      el: "input",
      props: {
        placeholder: "广告商ID、广告商昵称"
      }
    }
  },
  {
    prop: "memberId",
    label: "广告商ID"
  },
  {
    prop: "createTime",
    label: "创建时间",
    sortable: true
  },
  {
    prop: "username",
    label: "广告商昵称"
  },
  {
    prop: "coinUnit",
    label: "币种"
  },
  {
    prop: "number",
    label: "数量",
    sortable: true
  },
  {
    prop: "price",
    label: "金额",
    sortable: true
  },
  {
    prop: "minLimit",
    label: "限额",
    sortable: true
  },
  {
    prop: "advertiseType",
    label: "类型",
    search: {
      el: "select"
    },
    enum: advertiseTypeOptions,
    render: ({ row }) => AdvertiseTypeEnum[row.advertiseType] ?? "--"
  },
  {
    prop: "payMode",
    label: "支付方式",
    search: {
      el: "input"
    }
  },
  {
    prop: "status",
    label: "状态",
    search: {
      el: "select"
    },
    enum: enumTransformOptions(AdvertiseStatus, true),
    render: ({ row }) => <el-tag type={AdvertiseStatus[row.status]?.type}>{AdvertiseStatus[row.status]?.text}</el-tag>
  },
  {
    prop: "operation",
    label: "操作",
    width: 200,
    fixed: "right",
    align: "left"
  }
];

export const descriptionsItems: ProDescriptionsItem[] = [
  {
    label: "状态:",
    field: "status",
    render: ({ status }) => <el-tag type={status ? "info" : "success"}>{status ? "下架" : "上架"}</el-tag>
  },
  {
    label: "交易类型:",
    field: "advertiseType",
    render: ({ advertiseType }) => AdvertiseTypeEnum[advertiseType] ?? "--"
  },
  {
    label: "交易币种:",
    field: "coin"
  },
  {
    label: "交易货币:",
    field: "localCurrency"
  },
  {
    label: "交易期限:",
    field: "timeLimit"
  },
  {
    label: "买入量:",
    field: "remainAmount"
  },
  {
    label: "国家:",
    field: "country"
  },
  {
    label: "付款方式:",
    field: "payMode"
  },
  {
    label: "最小交易额:",
    field: "minLimit"
  },
  {
    label: "最大交易额:",
    field: "maxLimit"
  },
  {
    label: "固定价格:",
    field: "price"
  },
  {
    label: "自动回复:",
    field: "auto",
    render: ({ auto }) => <el-tag type={auto ? "info" : "success"}>{auto ? "否" : "是"}</el-tag>
  },
  {
    label: "备注信息:",
    field: "remark"
  }
];

export const detailTableColumns: ColumnProps[] = [
  {
    prop: "orderSn",
    label: "订单编号"
  },
  {
    prop: "createTime",
    label: "交易时间",
    sortable: true
  },
  {
    prop: "customerName",
    label: "交易人"
  },
  {
    prop: "number",
    label: "订单数量",
    sortable: true
  },
  {
    prop: "money",
    label: "订单金额",
    sortable: true
  },
  {
    prop: "fee",
    label: "手续费",
    sortable: true
  },
  {
    prop: "payMode",
    label: "支付方式"
  },
  {
    prop: "status",
    label: "订单状态",
    render: ({ row }) => {
      const StatusEnum = {
        // 0: {
        //   text: "已取消",
        //   type: "info"
        // },
        // 1: {
        //   text: "未付款",
        //   type: "info"
        // },
        // 2: {
        //   text: "已付款",
        //   type: "success"
        // },
        // 3: {
        //   text: "已完成",
        //   type: "success"
        // },
        // 4: {
        //   text: "申诉中",
        //   type: "danger"
        // }
        CANCELED: {
          text: "已取消",
          type: "info"
        },
        UNPAID: {
          text: "未付款",
          type: "info"
        },
        PAID: {
          text: "已付款",
          type: "success"
        },
        COMPLETED: {
          text: "已完成",
          type: "success"
        },
        APPEALING: {
          text: "申诉中",
          type: "danger"
        }
      };
      return <el-tag type={StatusEnum[row.status]?.type}> {StatusEnum[row.status]?.text} </el-tag>;
    }
  }
];
