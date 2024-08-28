/*
 * @Description:
 * @Date: 2024-03-01 09:42:28
 * @LastEditTime: 2024-06-20 11:06:28
 */
import type { ProFormItem, Type } from "../types";

export const getPlaceholder = (config: ProFormItem & { type: Type }) => {
  const { params, type = "input-text", label } = config || {};
  if (params?.placeholder) {
    return params.placeholder;
  }

  if (type === "select") {
    return `请选择${label ?? ""}`;
  }
  if (type?.includes("input")) {
    return `请输入${label ?? ""}`;
  }
  if (type?.includes("date")) {
    return type === "datetimerange" ? [`开始时间`, `结束时间`] : `请选择日期`;
  }
  if (type?.includes("time")) {
    return `请选择时间`;
  }
  return `请输入${label ?? ""}`;
};
