import { FormProps as ElFormProps, FormItemProps, StepProps, stepsProps } from "element-plus";
import { CSSProperties, ExtractPropTypes, PropType } from "vue";
import { ProFormItem } from "../ProForm";

/*
 * @Description:
 * @Date: 2024-06-03 11:54:57
 * @LastEditTime: 2024-06-18 16:02:43
 */
export const proStepsFormProps = {
  ...stepsProps,
  modelValue: {
    type: Object as PropType<Record<string, any>>
  },
  simple: {
    type: Boolean,
    default: true
  },
  steps: {
    type: Array as PropType<ProStep[]>,
    default: []
  },
  formProps: {
    type: Object as PropType<FormProps>
  },
  validateMode: {
    type: String as PropType<"step" | "unify">
  },
  actionButtonFull: {
    type: Boolean
  },
  prevButtonText: {
    type: String
  },
  nextButtonText: {
    type: String
  },
  saveButtonText: {
    type: String
  },
  resetButtonText: {
    type: String
  }
} as const;

export interface ProStep extends Partial<StepProps> {
  validate?: () => boolean;
  form: Partial<ElFormProps> & {
    inputWidth?: string;
    items: ProFormItem[];
    style?: CSSProperties;
  };
}

interface FormProps extends Partial<ElFormProps> {
  item: FormItemProps;
}

export type ProStepsFormProps = Partial<ExtractPropTypes<typeof proStepsFormProps>> & {
  onFinish: (v) => void;
};
