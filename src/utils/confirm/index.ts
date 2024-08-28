import { ElMessage, ElMessageBox } from "element-plus";

/*
 * @Author: sjd shi_junda@outlook.com
 * @Date: 2024-05-09 18:08:41
 * @LastEditors: sjd shi_junda@outlook.com
 * @LastEditTime: 2024-05-10 09:39:59
 * @FilePath: \exchange-admin-vue\src\utils\confirm\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 封装了confirm
export const confirmDialog = async (message?: string, success?: string, cancel?: string) => {
  let status: boolean = false;
  try {
    const result = await ElMessageBox.confirm(message || "", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    });
    status = true;
    if (result) {
      if (success) {
        ElMessage({ type: "success", message: success });
      }
    }
  } catch {
    if (cancel) {
      ElMessage({ type: "info", message: cancel });
    }
    status = false;
  }
  // console.log("[ status ]", status);
  return status;
};
