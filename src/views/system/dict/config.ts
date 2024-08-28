import { ProFormItem } from "@/components/ProForm";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-05-16 16:56:09
 */
export const tableColumns = [
  {
    prop: "bond",
    label: "键"
  },
  {
    prop: "value",
    label: "值"
  },
  {
    prop: "comment",
    label: "描述"
  },
  {
    prop: "operation",
    label: "操作",
    width: 250,
    fixed: "right"
  }
];

export const formItems = (mode): ProFormItem[] => [
  {
    field: "bond",
    label: "键:",
    required: true,
    inputProps: {
      disabled: mode == "update" ? true : false
    }
  },
  {
    field: "value",
    label: "值:",
    required: true
  },
  {
    field: "comment",
    label: "描述:",
    type: "input-textarea",
    inputProps: {
      maxlength: 55,
      "show-word-limit": true
    }
  }
];
