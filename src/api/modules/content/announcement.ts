/*
 * @Author: sjd shi_junda@outlook.com
 * @Date: 2024-05-08 10:48:32
 * @LastEditors: sjd shi_junda@outlook.com
 * @LastEditTime: 2024-05-30 20:17:42
 * @FilePath: \exchange-admin-vue\src\api\modules\content\advertising.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from "@/api";
import { ResPage } from "@/api/interface";

/**
 * 创建系统公告
 * @param data
 * @returns
 */
export const add = data => {
  return http.post(`/admin/system/announcement/create`, data);
};
/**
 * 分页查询系统公告
 * @param data
 * @returns
 */
export const list = params => {
  return http.get<ResPage<{}>>(`/admin/system/announcement/page-query`, params);
};
/**
 * 所有系统公告
 * @param params
 * @returns
 */
export const all = params => {
  // return http.get<ResPage<any> & { content: []; totalElements: number }>(`/cms/system-advertise/all`, params);
  return http.get(`/admin/cms/system-help/all`, params);
};
/**
 * 系统公告详情
 * @param id
 * @returns
 */
export const detail = id => {
  // return http.get(`/admin/system/announcement/detail`, id);
  return http.get(`/admin/system/announcement/${id}/detail`);
};
/**
 * 更新系统公告
 * @param body
 * @returns
 */
export const update = body => {
  return http.post(`/admin/system/announcement/update`, body);
};
/**
 * 批量删除
 * @param ids
 * @returns
 */
export const deletes = params => {
  return http.post(`/admin/system/announcement/deletes`, params);
};
/**
 * 公告置顶
 * @param serialNum
 * @returns
 */
export const top = params => {
  return http.post<ResPage<{}>>(`/admin/system/announcement/top`, params);
};
