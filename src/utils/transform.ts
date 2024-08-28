import { isObject } from "@vueuse/core";

/*
 * @Description 枚举转选项列表
 * @Date: 2024-05-15 17:12:58
 * @LastEditTime: 2024-07-02 17:57:21
 */
type Enum<T> =
  | (T extends Record<string, any> ? (T extends any[] ? never : T) : Record<string, any>)
  | Record<string, string | { text: string; [x: string]: any }>;

export function enumTransformOptions<T>(
  enums: Enum<T>,
  isWhole?: boolean
): { label: string; value: string | number | boolean }[] {
  const options: { label: string; value: string | number | boolean }[] = [];

  if (!isObject(enums)) {
    console.warn("Incorrect data format");
    return options;
  }

  if (Object.keys(enums).length) {
    Object.keys(enums).forEach(key => {
      // 兼容通过enum关键字声明的枚举对象
      const isHas = options.some(item => item.label === key);
      if (!isHas) {
        const label = typeof enums[key] == "string" ? enums[key] : Object.keys(enums).length ? (enums[key] as any).text : "";
        options.push({ label, value: key });
      }
    });
  }

  return isWhole ? [{ label: "全部", value: "" }, ...options] : options;
}

/**
 * 转化连续字符
 * @param value
 * @param config
 * @returns
 */
export function transformConsecutiveChar(
  value: string,
  config: {
    match: string;
    min: number;
    convert: string | ((length: number) => string);
  }
) {
  const { match, min, convert } = config;
  const reg = new RegExp(`${match}{${min},}`);
  const matchValue = reg.exec(value);
  matchValue?.forEach(item => {
    const { length } = item.split("");
    if (typeof convert === "function") {
      value = value.replace(item, convert(length) ?? "");
    } else {
      const isHasLength = convert.includes("length") && convert !== "length";
      const newChar = isHasLength ? convert.replace("length", `${length}`) : convert;
      value = value.replace(item, newChar);
    }
  });

  return value;
}
