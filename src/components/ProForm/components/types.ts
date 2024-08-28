/*
 * @Description:
 * @Date: 2024-01-20 18:25:58
 * @LastEditTime: 2024-06-21 11:17:22
 */
import type { PropType } from "vue";
import type { ItemOption, ProFormItem } from "../types";
import { components } from "./index";

export type Ctx = {
  attrs: {};
  emit: (eventName: string, params: any) => void;
  slots: unknown;
  expose: (obj: { [x: string]: any }) => void;
};

export type Props = {
  value?: string | number | boolean;
  modelValue?: string | number | boolean;
  config: Omit<ProFormItem, "options"> & { type: keyof typeof components; empty?: boolean | string; options?: ItemOption[] };
  style?: {};
  onValueChange?: (v: unknown) => void;
};

export const props = {
  config: {
    type: Object as PropType<ProFormItem & { empty: boolean | string }>
  }
};
