/*
 * @Author: sjd shi_junda@outlook.com
 * @Date: 2024-05-08 10:48:32
 * @LastEditors: sjd shi_junda@outlook.com
 * @LastEditTime: 2024-05-30 19:29:56
 * @FilePath: \exchange-admin-vue\src\api\modules\content\advertising.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from "@/api";
import { ResPage } from "@/api/interface";

/**
 * 创建系统广告
 * @param data
 * @returns
 */
export const add = data => {
  return http.post(`/admin/cms/system-advertise/create`, data);
};
/**
 * 分页查询系统广告
 * @param data
 * @returns
 */
export const list = params => {
  return http.get<ResPage<{}>>(`/admin/cms/system-advertise/page-query`, params);
};
/**
 * 广告置顶
 * @param id
 * @returns
 */
export const top = id => {
  return http.post<ResPage<{}>>(`/admin/cms/system-advertise/top`, id);
};
/**
 * 所有系统广告
 * @param params
 * @returns
 */
export const all = params => {
  // return http.get<ResPage<any> & { content: []; totalElements: number }>(`/cms/system-advertise/all`, params);
  return http.get(`/admin/cms/system-advertise/all`, params);
};
/**
 * 系统广告详情
 * @param id
 * @returns
 */
export const detail = params => {
  // return http.get(`/admin/cms/system-advertise/detail`, data);
  return http.get(`/admin/cms/system-advertise/detail`, params);
};
/**
 * 更新系统广告
 * @param params
 * @returns
 */
export const update = data => {
  return http.post(`/admin/cms/system-advertise/update`, data);
};
/**
 * 批量删除
 * @param ids
 * @returns
 */
export const deletes = params => {
  // return http.post(`/admin/cms/system-advertise/deletes/${ids}`);
  return http.post(`/admin/cms/system-advertise/deletes`, params);
};
