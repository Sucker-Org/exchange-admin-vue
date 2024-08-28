/*
 * @Description:
 * @Date: 2024-04-07 09:54:32
 * @LastEditTime: 2024-05-06 18:03:38
 */
// import piniaPersistConfig from "@/stores/helper/persist";
import { defineStore } from "pinia";

export const useUploadStore = defineStore({
  id: "geeker-global",
  // 修改默认值之后，需清除 localStorage 数据
  state: () => ({
    uploadUrl: "/common/upload/oss/image"
  }),
  getters: {},
  actions: {}
  // persist: piniaPersistConfig("geeker-global")
});
