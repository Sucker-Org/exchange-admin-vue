/*
 * @Description:
 * @Date: 2024-01-20 18:25:58
 * @LastEditTime: 2024-06-20 16:55:44
 */
import { computed, defineComponent, type FunctionalComponent } from "vue";
import useModelValue from "../hooks/useModelValue";
import { Ctx, Props, props } from "./types";
import { getPlaceholder } from "./utils";

const renderElement = (props, type, ctx) => {
  const data = useModelValue(props.modelValue, ctx);

  const slots = computed(() => {
    return (props.config?.inputProps || {})?.append
      ? {
          append: () => props.config?.inputProps.append
        }
      : {};
  });

  return (
    <el-input
      v-model={data.value}
      type={type}
      clearable
      placeholder={getPlaceholder(props.config)}
      {...props.config?.inputProps}
      onInput={(v: unknown) => ctx.emit("valueChange", v)}
      v-slots={slots.value}
    />
  );
};

const Input = {
  Text: defineComponent((props: Props, ctx: Ctx) => {
    return () => renderElement(props, "text", ctx);
  }) as unknown as FunctionalComponent,
  Number: defineComponent((props: Props, ctx: Ctx) => {
    return () => renderElement(props, "number", ctx);
  }) as unknown as FunctionalComponent,
  NumberBox: defineComponent((props: Props, ctx: Ctx) => {
    const data = useModelValue(props.modelValue, ctx);
    return () => (
      <el-input-number {...props.config?.inputProps} v-model={data.value} onInput={(v: unknown) => ctx.emit("valueChange", v)} />
    );
  }) as unknown as FunctionalComponent,
  Password: defineComponent((props: Props, ctx: Ctx) => {
    return () => renderElement(props, "password", ctx);
  }) as unknown as FunctionalComponent,
  Textarea: defineComponent((props: Props, ctx: Ctx) => {
    return () => renderElement(props, "textarea", ctx);
  }) as unknown as FunctionalComponent
};

Object.values(Input).forEach(com => {
  (com as unknown as FunctionalComponent).props = props;
});

export default Input;
