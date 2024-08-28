/*
 * @Description:
 * @Date: 2024-04-07 15:59:38
 * @LastEditTime: 2024-06-13 15:36:35
 */
import http from "@/api";
import { ResPage } from "@/api/interface";
import { Config } from "./types";

export const getConfigByPage = params => {
  return http.get<ResPage<Config>>(`/admin/system/config/page`, params);
};

export const addConfig = data => {
  return http.post(`/admin/system/config/save`, data, { loading: false });
};

export const updateConfig = data => {
  return http.post(`/admin/system/config/update`, data, { loading: false });
};

export const delConfig = id => {
  return http.delete(`/admin/system/config/deleteById/${id}`);
};
