/*
 * @Description:
 * @Date: 2024-01-20 18:25:58
 * @LastEditTime: 2024-07-02 17:37:14
 */
import { computed, defineComponent, type FunctionalComponent, type PropType } from "vue";
import type { ProFormItem } from "../types";
import { Props } from "./types";

const Text = defineComponent((props: Props) => {
  const { inputWidth, inputProps = { style: {} } } = props.config;

  const renderContent = () => {
    const { type, options = [] } = props.config;

    const empty = computed(() => {
      if (props.config.empty === true) {
        return "--";
      }
      if (props.config.empty === false) {
        return "";
      }

      return props.config.empty || "--";
    });

    const modelValue = props.modelValue;

    if ((type == "select" || type == "radio") && options?.length) {
      /**
       * 多选select
       */
      if (Array.isArray(modelValue)) {
        const labels: string[] = [];
        modelValue.forEach(v => {
          options.forEach(option => {
            if (option.value == v) {
              labels.push(option.label);
            }
          });
        });
        return labels.join("、") || empty.value;
      }

      const option = options.find(option => option.value == modelValue);
      return option?.label || empty.value;
    }
    return typeof modelValue == "object" ? empty.value : modelValue || modelValue === 0 ? modelValue : empty.value;
  };

  return () => (
    <div
      style={{
        width: typeof inputWidth == "number" ? `${inputWidth}px` : Number.isNaN(Number(inputWidth)) ? "auto" : `${inputWidth}px`,
        ...(inputProps as Record<string, any>).style
      }}
    >
      {" "}
      {renderContent()}
    </div>
  );
}) as unknown as FunctionalComponent;

Text.props = {
  modelValue: {
    type: [String, Number, Boolean],
    default: ""
  },
  config: {
    type: Object as PropType<ProFormItem & { empty?: boolean | string }>
  }
};

export default Text;
