/*
 * @Description:
 * @Date: 2024-05-29 11:12:04
 * @LastEditTime: 2024-07-03 18:45:30
 */
import http from "@/api";
import { UpdatePasswordData } from "./types";

/**
 * 更新当前登录的用户密码
 * @param data
 * @returns
 */
export const updateCurrLoginPassword = (data: UpdatePasswordData) => {
  return http.post(`/admin/system/admin/updatePassword`, data);
};
