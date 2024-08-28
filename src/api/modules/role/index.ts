/*
 * @Description:
 * @Date: 2024-04-08 14:57:50
 * @LastEditTime: 2024-05-11 17:53:30
 */
import http from "@/api";
import { ResPage } from "@/api/interface/index";
import { Role } from "./types";

/**
 * 新增
 * @param data
 * @returns
 */
export const addRole = data => {
  return http.post(`/admin/system/role/save`, data);
};

/**
 * 分页查询
 * @param params
 * @returns
 */
export const getRoleByPage = params => {
  return http.get<ResPage<Role>>(`/admin/system/role/list`, params);
};

/**
 * 详情
 * @param id
 * @returns
 */
export const getRoleById = id => {
  return http.get(`/system/role/info/${id}`);
};

/**
 * 删除
 * @param id
 * @returns
 */
export const delRole = id => {
  // return http.post(`/system/role/delete?id=${id}`);
  return http.post(`/admin/system/role/delete?id=${id}`);
};

/**
 * 编辑
 * @param data
 * @returns
 */
export const updateRole = data => {
  return http.post(`/admin/system/role/update`, data);
};

/**
 * 更新状态
 * @param id
 * @param status
 * @returns
 */
export const updateRoleStatus = (id, status) => {
  return http.get(`/admin/system/role/updateStatus`, { id, status });
};
