/*
 * @Description:
 * @Date: 2024-07-10 16:49:33
 * @LastEditTime: 2024-08-01 16:46:24
 */
import piniaPersistConfig from "@/stores/helper/persist";
import { UserState } from "@/stores/interface";
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "boss-user",
  state: (): UserState => ({
    token: "",
    userInfo: { username: "Boss" }
  }),
  getters: {},
  actions: {
    // Set Token
    setToken(token: string) {
      this.token = token;
    },
    // Set setUserInfo
    setUserInfo(userInfo: UserState["userInfo"]) {
      this.userInfo = userInfo;
    }
  },
  persist: piniaPersistConfig("boss-user")
});
