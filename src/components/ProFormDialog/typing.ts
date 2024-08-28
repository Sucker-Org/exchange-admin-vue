/*
 * @Description:
 * @Date: 2024-04-11 14:42:16
 * @LastEditTime: 2024-06-26 09:23:32
 */
import type { ProFormItem, ProFormProps } from "@/components/ProForm";
import { dialogProps } from "element-plus";
import type { ExtractPropTypes, PropType } from "vue";

export const proFormDialogProps = {
  ...dialogProps,
  mode: {
    type: String as PropType<"create" | "update" | "view">
  },
  loading: {
    type: Boolean,
    default: false
  },
  formProps: {
    type: Object as PropType<FormProps>
  },
  formItems: {
    type: Object as PropType<ProFormItem[]>,
    default: []
  },
  cancelBtnText: {
    type: String,
    default: "取消"
  },
  saveBtnText: {
    type: String,
    default: "保存"
  },
  initialValue: {
    type: [Object as PropType<Record<string, any>>, Function as PropType<() => Promise<Record<string, any>>>]
  },
  validate: {
    type: Function as PropType<(ref, entity: Record<string, any>) => Promise<boolean>>
  },
  request: {
    type: Function as PropType<(entity: Record<string, any>) => Promise<void>>
  },
  footerAlign: {
    type: String as PropType<"left" | "center" | "right">,
    default: "right"
  },
  footerTopBorder: {
    type: Boolean,
    default: true
  }
};

export type FormProps = Omit<ProFormProps, "showAction" | "readonly" | "items">;

export type ProFormDialogProps = ExtractPropTypes<typeof proFormDialogProps>;

export enum TitleEnum {
  "create" = "添加",
  "update" = "编辑",
  "view" = "查看"
}
