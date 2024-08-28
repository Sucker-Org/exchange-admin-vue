/*
 * @Description:
 * @Date: 2024-01-20 18:25:58
 * @LastEditTime: 2024-07-02 17:53:20
 */
import { defineComponent, type FunctionalComponent } from "vue";
import useModelValue from "../hooks/useModelValue";
import { ItemOption } from "../types";
import { Ctx, Props, props } from "./types";

const Checkbox = defineComponent((props: Props, ctx: Ctx) => {
  const data = useModelValue(props.modelValue, ctx);
  return () => (
    <el-checkbox-group v-model={data.value} onChange={(v: unknown) => ctx.emit("valueChange", v)}>
      {props.config.options?.map((option: ItemOption) => <el-checkbox label={option.label} key={option.label} />)}
    </el-checkbox-group>
  );
}) as unknown as FunctionalComponent;

Checkbox.props = props;

export default Checkbox;
