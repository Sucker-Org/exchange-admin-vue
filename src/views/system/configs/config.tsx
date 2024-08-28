/*
 * @Description:
 * @Date: 2024-04-12 16:52:59
 * @LastEditTime: 2024-06-14 10:17:20
 */
import { ProFormItem } from "@/components/ProForm";
import { ColumnProps } from "@/components/ProTable/interface";

export const tableColumns: ColumnProps[] = [
  {
    prop: "keyword",
    label: "关键字",
    isShow: false,
    search: {
      el: "input"
    }
  },
  {
    prop: "configGroup",
    label: "参数组",
    copyable: true
  },
  {
    prop: "configKey",
    label: "参数key",
    copyable: true
  },
  {
    prop: "configName",
    label: "参数名称"
  },
  {
    prop: "configValue",
    label: "参数值"
  },
  {
    prop: "remark",
    label: "备注"
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
    label: "参数组:",
    field: "configGroup",
    required: true
  },
  {
    label: "KEY:",
    field: "configKey",
    required: true
  },
  {
    label: "参数名称:",
    field: "configName",
    required: true
  },
  {
    label: "参数值:",
    field: "configValue",
    required: true
  },
  {
    label: "备注:",
    field: "remark",
    type: "input-textarea",
    inputProps: {
      maxlength: 55,
      "show-word-limit": true
    }
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
  }
];
