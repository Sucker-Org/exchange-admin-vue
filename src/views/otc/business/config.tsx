import { ProFormItem } from "@/components/ProForm";
import { ColumnProps } from "@/components/ProTable/interface";
import { OtcStatusEnum, PublishAdvertiseStatus } from "@/enums";
import { enumTransformOptions } from "@/utils/transform";

/*
 * @Description:
 * @Date: 2024-04-12 16:55:14
 * @LastEditTime: 2024-05-30 17:38:49
 */

export const tableColumns: ColumnProps[] = [
  {
    prop: "account",
    isShow: false,
    search: {
      label: "会员信息",
      el: "input",
      props: {
        placeholder: "用户ID、会员昵称、真实姓名、手机号、邮箱"
      }
    }
  },
  {
    prop: "memberId",
    label: "ID"
  },
  {
    prop: "username",
    label: "会员昵称"
  },
  {
    prop: "email",
    label: "邮箱",
    copyable: true
  },
  {
    prop: "realName",
    label: "真实姓名"
  },
  {
    prop: "mobilePhone",
    label: "手机号",
    copyable: true
  },
  {
    prop: "memberLevel",
    label: "会员等级",
    sortable: true,
    width: 130
  },
  {
    prop: "certifiedBusinessApplyTime",
    label: "审核时间",
    sortable: true
  },
  {
    prop: "certifiedBusinessCheckTime",
    label: "申请时间",
    sortable: true,
    search: {
      order: 0,
      el: "date-picker",
      props: {
        type: "daterange",
        "value-format": "YYYY-MM-DD"
      }
    }
  },
  {
    prop: "publishAdvertise",
    label: "广告状态",
    width: 130,
    enum: enumTransformOptions(PublishAdvertiseStatus, true),
    search: {
      el: "select"
    },
    render: ({ row }) => (
      <el-tag type={PublishAdvertiseStatus[row.publishAdvertise]?.type}>
        {PublishAdvertiseStatus[row.publishAdvertise]?.text}
      </el-tag>
    )
  },
  {
    prop: "certifiedBusinessStatus",
    label: "审核状态",
    width: 130,
    enum: enumTransformOptions(OtcStatusEnum, true).filter(item => (+item.value as number) <= 3),
    search: {
      el: "select"
    },
    render: ({ row }) => (
      <el-tag type={OtcStatusEnum[row.certifiedBusinessStatus].type}> {OtcStatusEnum[row.certifiedBusinessStatus].text} </el-tag>
    )
  },
  {
    prop: "operation",
    label: "操作",
    fixed: "right",
    width: 200
  }
];

export const detailFormItems = (isShowStatus: boolean): ProFormItem[] => [
  {
    label: "审核状态:",
    field: "status",
    hide: isShowStatus,
    renderContent: entity => (
      <el-tag type={OtcStatusEnum[entity?.status]?.type}> {OtcStatusEnum[entity?.status]?.text || "--"} </el-tag>
    )
  },
  {
    label: "真实姓名:",
    field: "realName"
  },
  {
    label: "保证金:",
    field: "amount"
  },
  {
    label: "手机号:",
    field: "telno"
  },
  {
    label: "微信号:",
    field: "wechat"
  }
];
