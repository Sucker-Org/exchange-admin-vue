/*
 * @Description:
 * @Date: 2024-01-20 18:25:58
 * @LastEditTime: 2024-06-21 11:16:10
 */
import { defineComponent, type FunctionalComponent } from "vue";
import useModelValue from "../hooks/useModelValue";
import { Ctx, Props, props } from "./types";
import { getPlaceholder } from "./utils";

const Cascader = defineComponent((props: Props, ctx: Ctx) => {
  const data = useModelValue(props.modelValue, ctx);
  return () => (
    <el-cascader
      v-model={data.value}
      placeholder={getPlaceholder(props.config as any)}
      options={props.config.options}
      clearable
      {...props.config.inputProps}
      onChange={(v: unknown) => ctx.emit("valueChange", v)}
    />
  );
}) as unknown as FunctionalComponent;

Cascader.props = props;

export default Cascader;
