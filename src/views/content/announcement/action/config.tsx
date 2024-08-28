import { ProFormItem } from "@/components/ProForm";

export const getFormItems = (openType, annoClassification) => {
  const formItems: ProFormItem[] = [
    {
      label: "公告标题:",
      field: "title",
      inputProps: {
        maxlength: 15,
        "show-word-limit": true
      },
      required: true
    },
    {
      label: "公告分类:",
      field: "announcementClassification",
      type: "select",
      options: [
        { label: "一般公告", value: 0 },
        { label: "活动公告", value: 1 },
        { label: "充提公告", value: 2 },
        { label: "系统公告", value: 3 },
        { label: "上币公告", value: 4 },
        { label: "投票公告", value: 5 },
        { label: "弹窗公告", value: 6 },
        { label: "其他", value: 7 }
      ],
      required: true
    },
    {
      label: "创建时间:",
      field: "createTime",
      type: "text",
      hide: openType === "add" || openType === "edit"
    },
    // // 语言
    // {
    //   label: "语言",
    //   field: "lang",
    //   type: "select",
    //   options: [
    //     {
    //       label: "中文",
    //       value: "zh_CN"
    //     }
    //   ],
    //   required: true
    // },
    // 显示不显示
    {
      label: "状态:",
      field: "isShow",
      type: "switch"
    },
    {
      label: "图片地址:",
      field: "imgUrl",
      type: "text"
    },
    // {
    //   label: "排序:",
    //   field: "sort",
    //   type: "text",
    //   required: true
    // },
    {
      label: "弹窗方式:",
      field: "popUpCount",
      type: "select",
      hide: annoClassification != 6,
      options: [
        { label: "不弹出", value: 0 },
        { label: "只弹一次", value: 1 },
        { label: "一直弹出", value: 2 }
      ]
    },
    {
      label: "摘要:",
      field: "description",
      type: "input-text",
      hide: annoClassification != 6,
      inputProps: {
        maxlength: 25,
        "show-word-limit": true
      }
    },
    {
      label: "语言：",
      field: "lang",
      type: "radio",
      hide: true,
      required: false
    },
    {
      label: "排序:",
      field: "sort",
      type: "input-number-box"
    },
    {
      label: "内容:",
      field: "content",
      type: "input-text",
      required: true
    }
  ];
  return formItems;
};
// const statusOption = ["ILLEGAL", "NORMAL"];
// const sysAdvertiseLocationOption = [0, 1, 2];
// const rules = {
//   author: [{ required: true, message: "请输入作者", trigger: "blur" }],
//   name: [{ required: true, message: "请输入名称", trigger: "blur" }],
//   content: [{ required: true, message: "请输入内容", trigger: "blur" }],
//   lang: [{ required: true, message: "请输入语言", trigger: "blur" }],
//   linkUrl: [{ required: true, message: "请输入图片链接地址", trigger: "blur" }],
//   status: [{ required: true, message: "请选择状态", trigger: "change" }],
//   sysAdvertiseLocation: [{ required: true, message: "请选择位置", trigger: "change" }],
//   url: [{ required: true, message: "请输入图地址", trigger: "blur" }],
//   createTime: [{ required: true, message: "请输入创建时间", trigger: "blur" }],
//   endTime: [{ required: true, message: "请输入结束时间", trigger: "blur" }]
// };
