/*
 * @Author: sjd shi_junda@outlook.com
 * @Date: 2024-05-09 16:56:38
 * @LastEditors: sjd shi_junda@outlook.com
 * @LastEditTime: 2024-05-10 17:47:42
 * @FilePath: \exchange-admin-vue\src\views\envelope\envelopeList\config.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { ColumnProps } from "@/components/ProTable/interface";
import { reactive } from "vue";

export const tableColumns: ColumnProps[] = [
  {
    prop: "id",
    label: "编号",
    search: {
      el: "input"
    }
  },
  {
    prop: "invite",
    label: "邀请"
  },
  {
    prop: "inviteUser",
    label: "邀请用户"
  },
  {
    prop: "inviteUserAvatar",
    label: "邀请用户头像"
  },
  {
    prop: "logoImage",
    label: "logo"
  },
  {
    prop: "maxRand",
    label: "最大距离"
  },
  {
    prop: "name",
    label: "红包名字"
  },
  {
    prop: "plateform",
    label: "平台"
  },
  {
    prop: "receiveAmount",
    label: "获取数量"
  },
  {
    prop: "state",
    label: "状态"
  },
  {
    prop: "totalAmount",
    label: "全部数量"
  },
  {
    prop: "type",
    label: "种类"
  },
  {
    prop: "unit",
    label: "单位"
  },
  {
    prop: "expiredHours",
    label: "过期时间"
  },
  {
    prop: "envelopeNo",
    label: "红包编号"
  },
  {
    prop: "bgImage",
    label: "背景图"
  },
  {
    prop: "count",
    label: "红包数量"
  },
  {
    prop: "createTime",
    label: "创建时间",
    search: {
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
    width: 300
  }
];
export const mockTableData = reactive([
  {
    bgImage: "",
    count: 0,
    createTime: "",
    detail: "",
    envelopeNo: "",
    expiredHours: 0,
    id: 0,
    invite: 0,
    inviteUser: "",
    inviteUserAvatar: "",
    logoImage: "",
    maxRand: 0,
    memberId: 0,
    name: "",
    plateform: 0,
    receiveAmount: 0,
    receiveCount: 0,
    state: 0,
    totalAmount: 0,
    type: 0,
    unit: ""
  }
]);
