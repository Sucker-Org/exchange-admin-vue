/*
 * @Description:
 * @Date: 2024-04-19 10:33:42
 * @LastEditTime: 2024-05-10 13:51:36
 */
import http from "@/api";
import { ResPage } from "@/api/interface";
// 红包列表
export const getList = params => {
  return http.get<ResPage<{}>>(`/admin/system/red-envelope/page-query`, params);
};
// 红包领取列表
export const getReceiveList = params => {
  return http.get<ResPage<{}>>(`/admin/system/red-envelope/receive-detail`, params);
};
// 红包详情
export const getDetail = params => {
  return http.get<ResPage<{}>>(`/admin/system/red-envelope/receive-detail`, params);
};
// 新增红包
export const onAdd = params => {
  return http.post<ResPage<{}>>(`/admin/system/red-envelope/add`, params);
};
// 修改红包
export const onEdit = params => {
  return http.get<ResPage<{}>>(`/admin/system/red-envelope/modify`, params);
};
