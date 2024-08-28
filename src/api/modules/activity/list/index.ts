/*
 * @Author: sjd shi_junda@outlook.com
 * @Date: 2024-05-10 14:26:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-06-14 14:03:34
 */
import http from "@/api";
import { ResPage } from "@/api/interface";

/**
 * 分页查看活动列表
 * @param params
 * @returns
 */
export const getList = params => {
  return http.get<ResPage<{}>>(`/admin/activity/page`, params);
};
/**
 * 查询详情
 * @param id
 * @returns
 */
export const getDetail = id => {
  return http.get<ResPage<{}>>(`/admin/activity/${id}/detail`);
};
/**
 * 活动订单列表
 * @returns
 */
export const getOrderList = params => {
  return http.get<ResPage<{}>>(`/admin/activity/orderList/${params.listId}`, params);
};
/**
 * 新增活动信息
 * @param params
 * @returns
 */
export const addAct = params => {
  return http.post<ResPage<{}>>(`/admin/activity/add`, params);
};
/**
 * 修改活动信息
 * @param params
 * @returns
 */
export const editActInfo = params => {
  return http.put<ResPage<{}>>(`/admin/activity/update`, params);
};
/**
 * 修改活动进度
 * @param id
 * @param progress
 * @returns
 */
export const editActProgress = data => {
  return http.put<ResPage<{}>>(`/admin/activity/updateProgress`, data);
};

/**
 * 同意锁仓
 * @param id
 * @returns
 */
export const distribute = id => {
  return http.post<ResPage<{}>>(`/admin/activity/distribute?oid=${id}`);
};
