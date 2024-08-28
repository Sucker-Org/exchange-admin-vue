/*
 * @Author: sjd shi_junda@outlook.com
 * @Date: 2024-05-08 10:48:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-05-31 21:14:11
 * @FilePath: \exchange-admin-vue\src\api\modules\content\advertising.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from "@/api";
import { ResPage } from "@/api/interface";

/**
 * 创建系统帮助
 * @param data
 * @returns
 */
export const add = data => {
  return http.post(`/admin/cms/system-help/create`, data);
};
/**
 * 分页查询系统帮助
 * @param data
 * @returns
 */
export const list = params => {
  return http.get<ResPage<{}>>(`/admin/cms/system-help/page-query`, params);
};
/**
 * 系统帮助详情
 * @param id
 * @returns
 */
export const detail = params => {
  return http.get(`/admin/cms/system-help/detail`, params);
  // return http.get(`/admin/cms/system-help/detail/${id}`);
};
/**
 * 更新系统帮助
 * @param params
 * @returns
 */
export const update = params => {
  return http.post(`/admin/cms/system-help/update`, params);
};
/**
 * 批量删除
 * @param ids
 * @returns
 */
export const deletes = ids => {
  return http.post(`/admin/cms/system-help/deletes`, ids);
};
/**
 * 帮助取消
 * @param id
 * @returns
 */
export const down = id => {
  return http.post<ResPage<{}>>(`/admin/cms/system-help/down`, id);
};
/**
 * 帮助置顶
 * @param serialNum
 * @returns
 */
export const top = params => {
  return http.post<ResPage<{}>>(`/admin/cms/system-help/top`, params);
  // return http.post<ResPage<{}>>(`/admin/cms/system-help/top/`);
};
/**
 * 导出系统帮助Excel
 * @param serialNum
 * @returns
 */
export const exportHelp = () => {
  return http.get<ResPage<{}>>(`/cms/system-help/out-excel`);
};
