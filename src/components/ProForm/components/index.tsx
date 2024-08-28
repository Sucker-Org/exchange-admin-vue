/*
 * @Description:
 * @Date: 2024-04-08 11:14:23
 * @LastEditTime: 2024-07-04 10:17:20
 */
import Cascader from "./Cascader";
import Checkbox from "./Checkbox";
import Date from "./Date";
import Input from "./Input";
import { Radio, RadioButton } from "./Radio";
import Select from "./Select";
import Text from "./Text";
import Time from "./Time";
import Upload from "./Upload";
import { Props } from "./types";

export const components = {
  "input-text": Input.Text,
  "input-number": Input.Number,
  "input-number-box": Input.NumberBox,
  "input-password": Input.Password,
  "input-textarea": Input.Textarea,
  "time-picker": Time.Picker,
  "time-select": Time.Select,
  text: Text,
  select: Select,
  radio: Radio,
  "radio-button": RadioButton,
  checkbox: Checkbox,
  cascader: Cascader,
  date: Date.Default,
  datetime: Date.DateTime,
  week: Date.Week,
  year: Date.Year,
  month: Date.Month,
  datetimerange: Date.DateTimeRange,
  daterange: Date.DateRange,
  upload: Upload,
  rate: ({ modelValue }: Props) => <el-rate v-model={modelValue} />,
  switch: ({ modelValue, config }: Props) => <el-switch {...config.inputProps} v-model={modelValue} />,
  "color-picker": ({ modelValue }: Props) => <el-color-picker v-model={modelValue} />
};
