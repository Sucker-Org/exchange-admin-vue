import type { ButtonProps } from "element-plus";
import { formProps } from "element-plus";
import { CSSProperties, ExtractPropTypes, PropType } from "vue";
import { JSX } from "vue/jsx-runtime";
import { components } from "./components";

export const props = {
  ...formProps,
  modelValue: {
    type: Object as PropType<ModelValue>
  },
  items: {
    type: Array as PropType<ProFormItem[]>,
    default: []
  },
  textEmpty: {
    type: [Boolean, String],
    default: "--"
  },
  required: {
    type: Boolean
  },
  readonly: {
    type: Boolean,
    default: false
  },
  gridColumns: {
    type: [Number, String],
    default: 1
  },
  inputWidth: {
    type: [String, Number],
    default: "100%"
  },
  labelStyle: {
    type: Object as PropType<CSSProperties>,
    default: {}
  },
  showAction: {
    type: Boolean,
    default: true
  },
  actionAlign: {
    type: String as PropType<"left" | "center" | "right">,
    default: "left"
  },
  submitButtonText: {
    type: String
  },
  resetButtonText: {
    type: String
  }
};

export type ProFormProps = Omit<Partial<ExtractPropTypes<typeof props>>, "rules" | "model" | "requireAsteriskPosition">;

export type ModelValue = { [x: string]: string | number | boolean };

export type ProFormItem = {
  label?: string | ((entity: Record<string, any>) => string);
  field?: string;
  tooltip?: string;
  hide?: boolean | ((entity: Record<string, any>) => boolean);
  rule?: Rule | Rule[] | ((entity: Record<string, any>) => Rule | Rule[]);
  required?: boolean | ((entity) => boolean);
  type?: Type | ((entity, optionMap) => Type);
  inputWidth?: string | number;
  initialValue?: string | number | boolean | ((entity) => string | number | boolean);
  options?: ItemOption[] | ((entity: Record<string, any>) => ItemOption[] | Promise<ItemOption[]>);
  params?: Params;
  inputProps?: Record<string, any> | ((entity, options) => Record<string, any>);
  tools?: Tools;
  style?: {};
  valueEmptyRenderRow?: boolean;
  slot?: string | ((value?: any) => any);
  renderContent?: string | ((entity?: any) => any);
};

export type Type = keyof typeof components;

export type ItemOption = {
  label: string;
  value: string | number | boolean;
  children?: ItemOption[];
  disabled?: boolean;
};

export type Params = {
  inputProps?: Record<string, any>;
  action?: string;
  multiple?: boolean;
  limit?: number;
  tip?: string;
  maxlength?: number;
  showWordLimit?: boolean;
  placeholder?: string;
  disable?: boolean;
  successField?: string;
  successStatus?: string | number;
  returnDataFormat?: "file-path" | "json-parse" | "json-stringify";
  headers?: {};
};

export type Rule = {
  type?: string;
  required?: boolean;
  message?: string;
  trigger?: "blur" | "focus" | "change";
};

type ToolsConfig<T> = {
  [P in keyof T]?: T[P];
};

export type Tools = (ToolsConfig<ButtonProps> & { content: string })[] | Function | JSX.Element;
