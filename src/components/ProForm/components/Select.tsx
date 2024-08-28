/*
 * @Description:
 * @Date: 2024-01-20 18:25:58
 * @LastEditTime: 2024-06-20 11:25:59
 */
import { defineComponent, type FunctionalComponent } from "vue";
import useModelValue from "../hooks/useModelValue";
import { ItemOption } from "../types";
import { Ctx, Props, props } from "./types";
import { getPlaceholder } from "./utils";

const Select = defineComponent((props: Props, ctx: Ctx) => {
  const data = useModelValue(props.modelValue, ctx);
  return () => (
    <el-select
      v-model={data.value}
      placeholder={getPlaceholder(props?.config as any)}
      {...props.config?.inputProps}
      clearable
      onChange={(v: unknown) => ctx.emit("valueChange", v)}
    >
      {props.config?.options?.map((option: ItemOption) => <el-option {...option} key={option.value} />)}
    </el-select>
  );
}) as unknown as FunctionalComponent;

Select.props = props;

export default Select;
