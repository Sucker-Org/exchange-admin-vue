/*
 * @Description:
 * @Date: 2024-01-20 18:25:58
 * @LastEditTime: 2024-06-21 15:33:55
 */
import { ElRadio, ElRadioButton } from "element-plus";
import { PropType, defineComponent, type FunctionalComponent } from "vue";
import useModelValue from "../hooks/useModelValue";
import { ItemOption } from "../types";
import { Ctx, Props, props } from "./types";

const Base = defineComponent((props: Props & { type: "radio" | "radio-button" }, ctx: Ctx) => {
  const data = useModelValue(props.modelValue, ctx);

  return () => (
    <el-radio-group
      v-model={data.value}
      clearable
      {...props.config.inputProps}
      onChange={(v: unknown) => ctx.emit("valueChange", v)}
    >
      {props.config?.options?.map((option: ItemOption) => {
        const RenderElement = props.type === "radio" ? ElRadio : ElRadioButton;
        return (
          <RenderElement value={option.value} key={option.label}>
            {option.label}
          </RenderElement>
        );
      })}
    </el-radio-group>
  );
}) as unknown as FunctionalComponent;

Base.props = {
  ...props,
  type: {
    type: String as PropType<"radio" | "radio-button">
  }
};

export const Radio = props => <Base {...props} type="radio" />;

export const RadioButton = props => <Base {...props} type="radio-button" />;
