/*
 * @Description:
 * @Date: 2024-04-10 14:12:16
 * @LastEditTime: 2024-06-13 16:18:27
 */
import { ProFormItem } from "@/components/ProForm";
import { ColumnProps } from "@/components/ProTable/interface";

// 表格配置项
export const tableColumns = (roleOptions): ColumnProps[] => [
  {
    prop: "username",
    label: "账号"
  },
  {
    prop: "realName",
    label: "昵称",
    search: {
      el: "input"
    }
  },
  {
    prop: "roleNames",
    label: "角色",
    search: {
      el: "select"
    },
    enum: roleOptions,
    render: ({ row }) => row.roleNames || "--"
  },
  {
    prop: "mobilePhone",
    label: "手机号",
    copyable: true
  },
  {
    prop: "email",
    label: "邮箱",
    copyable: true
  },
  {
    prop: "status",
    label: "状态",
    search: {
      el: "select"
    },
    enum: [
      { label: "正常", value: 0 },
      { label: "禁用", value: 1 }
    ]
  },
  {
    prop: "operation",
    label: "操作",
    width: 250,
    fixed: "right"
  }
];

export const formItems = (roleOptions): ProFormItem[] => [
  {
    label: "昵称:",
    field: "realName",
    required: true
  },
  {
    label: "账号:",
    field: "username",
    required: true
  },
  {
    label: "密码:",
    field: "password",
    required: true,
    hide: entity => (entity.id ? true : false)
  },
  {
    label: "邮箱:",
    field: "email"
  },
  {
    label: "手机号:",
    field: "mobilePhone",
    required: true
  },
  {
    label: "角色:",
    field: "roleId",
    required: true,
    type: "select",
    options: roleOptions
  },
  {
    label: "状态:",
    field: "status",
    type: "radio",
    initialValue: 0,
    options: [
      {
        label: "有效",
        value: 0
      },
      {
        label: "禁用",
        value: 1
      }
    ]
  }
];
