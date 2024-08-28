/*
 * @Author: sjd shi_junda@outlook.com
 * @Date: 2024-05-10 15:31:56
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2024-06-14 15:54:08
 * @FilePath: \exchange-admin-vue\src\api\modules\activity\lockOrder\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import http from "@/api";
import { ResPage } from "@/api/interface";

/**
 * 查询锁仓活动
 * @param params
 * @returns
 */
export const getLockActList = params => {
  return http.post<ResPage<{}>>(`/admin/lockOrder/pageLockActivity`, params);
};
/**
 * 查询锁仓活动并且在进行中的活动
 * @param params
 * @returns
 */
export const getLockedList = (params?: any) => {
  return http.get<ResPage<{}>>(`/admin/activity/lockedList`, params);
};
/**
 * 添加锁仓订单
 * @param params
 * @returns
 */
export const addLockOrder = body => {
  return http.post<ResPage<{}>>(`/admin/activity/createLockOrder  `, body);
};
/**
 * 添加锁仓订单/扣除余额
 * @param params
 * @returns
 */
export const addSubBalance = body => {
  return http.post<ResPage<{}>>(`/lockOrder/createSubBalance`, body);
};
/**
 * 修改锁仓订单
 * @param params
 * @returns
 */
export const editSubBalance = body => {
  return http.put<ResPage<{}>>(`/admin/activity/updateLockedOrder`, body);
};

/**
 * 获取锁仓活动订单
 * @param data
 * @returns
 */
export const getLockActivityOrderByPage = data => {
  return http.get<ResPage<{}>>(`/admin/lockOrder/pageLockOrder/${data.id}`, data);
};
