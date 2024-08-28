/*
 * @Author: sjd shi_junda@outlook.com
 * @Date: 2024-05-06 15:58:11
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-05-31 20:49:29
 * @FilePath: \exchange-admin-vue\src\api\modules\invitation\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from "@/api";
import { ResPage } from "@/api/interface";

/**
 * 邀请记录
 * @param params
 * @returns
 */
export const getInviteList = params => {
  return http.get<ResPage<{}>>(`/admin/invite/management/page-query`, params);
};
/**
 * 邀请排名
 * @param params
 * @returns
 */
export const getInviteRankList = params => {
  return http.get<ResPage<{}>>(`/admin/invite/management/rank`, params);
};
/**
 * 根据ID查询一级二级用户
 * @param params
 * @returns
 */
export const getInfo = params => {
  return http.get<ResPage<{}>>(`/admin/invite/management/info`, params);
};
/**
 * 更新邀请信息
 * @param params
 * @returns
 */
export const updateInfo = params => {
  return http.post<ResPage<{}>>(`/admin/invite/management/update-rank`, params);
};
/**
 * 返佣管理
 * @param params
 * @returns
 */
export const rebateRecord = params => {
  return http.get<ResPage<{}>>(`/admin/page-query`, params);
};
