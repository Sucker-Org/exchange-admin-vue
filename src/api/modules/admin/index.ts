/*
 * @Description:
 * @Date: 2024-04-08 14:57:50
 * @LastEditTime: 2024-06-14 15:08:08
 */
import http from "@/api";
import { ResPage } from "@/api/interface";
import { Admin } from "./types";

/**
 * 新增
 * @param data
 * @returns
 */
export const addAdmin = data => {
  return http.post(`/admin/system/admin/save`, data);
};

/**
 * 分页查询
 * @param params
 * @returns
 */
export const getAdminByPage = params => {
  return http.get<ResPage<Admin>>(`/admin/system/admin/list`, params);
};

/**
 * 详情
 * @param id
 * @returns
 */
export const getAdminById = id => {
  return http.get(`/admin/system/admin/info?id=${id}`);
};

/**
 * 删除
 * @param id
 * @returns
 */
export const delAdmin = id => {
  return http.post(`/admin/system/admin/delete?id=${id}`);
};

/**
 * 编辑
 * @param data
 * @returns
 */
export const updateAdmin = data => {
  return http.post(`/admin/system/admin/update`, data);
};

/**
 * 更新状态
 * @param id
 * @param status
 * @returns
 */
export const updateStatus = (id, status) => {
  return http.post(`/admin/system/admin/updateStatus?id=${id}&status=${status}`);
};
