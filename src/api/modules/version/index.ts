/*
 * @Description:
 * @Date: 2024-07-02 14:02:16
 * @LastEditTime: 2024-07-04 09:54:18
 */
import http from "@/api";
import { ResPage } from "@/api/interface";

/**
 * 分页获取版本
 * @param params
 * @returns
 */
export const getVersionByPage = params => {
  return http.get<ResPage<{}>>(`/admin/appRevision/getPage`, params);
};

/**
 * 添加版本
 * @param data
 * @returns
 */
export const addVersion = data => {
  return http.post(`/admin/system/appRevision/save`, data);
};

/**
 * 编辑版本
 * @param data
 * @returns
 */
export const editVersion = data => {
  return http.post(`/admin/system/appRevision/update`, data);
};
