/*
 * @Description:
 * @Date: 2024-05-17 16:33:40
 * @LastEditTime: 2024-05-17 16:33:43
 */
export function formatMoney(value: number | string) {
  if (value === null || value === undefined) return "0.00";
  let [integer, decimal] = Number(value).toString().split(".");
  integer = integer.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,");
  return decimal ? `${integer}.${decimal}` : integer;
}
