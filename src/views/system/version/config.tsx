import { ProFormItem } from "@/components/ProForm";
import { ColumnProps } from "@/components/ProTable/interface";

/*
 * @Description:
 * @Date: 2024-07-02 14:07:59
 * @LastEditTime: 2024-07-04 10:40:24
 */
export const tableColumns: ColumnProps[] = [
  {
    label: "ID",
    prop: "id",
    width: 150
  },
  {
    label: "版本号",
    prop: "version"
  },
  {
    label: "系统平台",
    prop: "platform",
    search: {
      el: "select"
    },
    enum: [
      {
        label: "Android",
        value: 0
      },
      {
        label: "iPhone",
        value: 1
      }
    ]
  },
  {
    label: "强制更新",
    prop: "forceUpdate",
    enum: [
      {
        label: "是",
        value: true
      },
      {
        label: "否",
        value: false
      }
    ],
    search: {
      el: "select"
    },
    render: ({ row }) => (
      <el-tag type={row.forceUpdate === true ? "success" : "info"}>{row.forceUpdate === true ? "是" : "否"}</el-tag>
    )
  },
  {
    label: "备注",
    prop: "remark"
  },
  {
    label: "发布时间",
    prop: "publishTime",
    search: {
      order: 0,
      el: "date-picker",
      props: {
        type: "daterange",
        "value-format": "YYYY/MM/DD"
      }
    }
  },
  {
    prop: "operation",
    label: "操作",
    width: 150,
    fixed: "right"
  }
];

export const formItems: ProFormItem[] = [
  {
    label: "版本号:",
    field: "version",
    required: true
  },
  {
    label: "系统平台:",
    field: "platform",
    type: "radio",
    required: true,
    initialValue: 0,
    options: [
      {
        label: "Android",
        value: 0
      },
      {
        label: "iPhone",
        value: 1
      }
    ]
  },
  {
    label: "下载地址:",
    field: "downloadUrl",
    required: true
  },
  {
    label: "备注:",
    field: "remark",
    type: "input-textarea"
  },
  {
    label: "强制更新:",
    field: "forceUpdate",
    type: "switch",
    inputProps: {
      "inline-prompt": true,
      "active-text": "是",
      "inactive-text": "否"
    }
  }
];
