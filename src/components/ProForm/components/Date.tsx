/*
 * @Description:
 * @Date: 2024-01-20 18:25:58
 * @LastEditTime: 2024-06-21 11:16:16
 */
import { FunctionalComponent } from "vue";
import useModelValue from "../hooks/useModelValue";
import { Ctx, Props, props } from "./types";
import { getPlaceholder } from "./utils";

const renderElement = (props: Props, type = "date", ctx: Ctx) => {
  const data = useModelValue(props.modelValue, ctx);
  const placeholder = getPlaceholder(props.config as any);
  return (
    <el-date-picker
      v-model={data.value}
      type={type}
      clearable
      placeholder={placeholder}
      start-placeholder={placeholder[0]}
      end-placeholder={placeholder[1]}
      {...props.config?.inputProps}
      onChange={(v: unknown) => ctx.emit("valueChange", v)}
    />
  );
};

const Date = {
  Default: (props, ctx) => renderElement(props, "date", ctx),
  DateRange: (props, ctx) => renderElement(props, "daterange", ctx),
  DateTime: (props, ctx) => renderElement(props, "datetime", ctx),
  DateTimeRange: (props, ctx) => renderElement(props, "datetimerange", ctx),
  Week: (props, ctx) => renderElement(props, "week", ctx),
  Year: (props, ctx) => renderElement(props, "year", ctx),
  Month: (props, ctx) => renderElement(props, "month", ctx)
};

Object.values(Date).forEach(com => {
  (com as unknown as FunctionalComponent).props = props;
});

export default Date;
