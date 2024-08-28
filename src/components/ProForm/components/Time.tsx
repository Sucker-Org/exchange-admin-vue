/*
 * @Description:
 * @Date: 2024-01-20 18:25:58
 * @LastEditTime: 2024-04-18 17:53:28
 */
import { FunctionalComponent, defineComponent } from "vue";
import useModelValue from "../hooks/useModelValue";
import { Ctx, props } from "./types";
import { getPlaceholder } from "./utils";

const Time = {
  Picker: defineComponent((props, ctx: Ctx) => {
    const data = useModelValue(props.modelValue, ctx);
    return () => (
      <el-time-picker
        v-model={data.value}
        clearable
        placeholder={getPlaceholder(props.config)}
        {...props.config?.inputProps}
        onChange={(v: unknown) => ctx.emit("valueChange", v)}
      />
    );
  }) as unknown as FunctionalComponent<any>,
  Select: defineComponent((props, ctx: Ctx) => {
    const data = useModelValue(props.modelValue, ctx);
    return () => (
      <el-time-select
        v-model={data.value}
        clearable
        placeholder={getPlaceholder(props.config)}
        {...props.config?.inputProps}
        onChange={(v: unknown) => ctx.emit("valueChange", v)}
      />
    );
  }) as unknown as FunctionalComponent<any>
};

Time.Picker.props = props;
Time.Select.props = props;

export default Time;
