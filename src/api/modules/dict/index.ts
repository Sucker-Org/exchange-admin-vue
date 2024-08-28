/*
 * @Description:
 * @Date: 2024-04-08 14:57:50
 * @LastEditTime: 2024-06-13 15:36:42
 */
import http from "@/api";

/**
 * 新增
 * @param data
 * @returns
 */
export const addDict = data => {
  return http.post(`/admin/system/data-dictionary/save`, data);
};

/**
 * 分页查询
 * @param params
 * @returns
 */
export const getDictByPage = params => {
  return http.get(`/admin/system/data-dictionary/list`, params);
};

/**
 * 详情
 * @param id
 * @returns
 */
export const getCoinById = id => {
  return http.get(`/system/coin/detail/${id}`);
};

/**
 * 更新
 * @param data
 * @returns
 */
export const updateDict = data => {
  return http.post(`/admin/system/data-dictionary/update`, data);
};

/**
 * 删除
 * @param id
 * @returns
 */
export const deleteDict = id => {
  return http.delete(`/admin/system/data-dictionary/delete/${id}`);
};
