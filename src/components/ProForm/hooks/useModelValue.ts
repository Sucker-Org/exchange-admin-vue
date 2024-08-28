import { computed } from "vue";

/*
 * @Description:
 * @Date: 2024-02-20 16:40:55
 * @LastEditTime: 2024-04-19 10:23:59
 */
export default (value, ctx) => {
  return computed({
    get() {
      return value;
    },
    set(v) {
      ctx.emit("update:modelValue", v);
    }
  });
};
