/*
 * @Description:
 * @Date: 2024-08-01 15:42:50
 * @LastEditTime: 2024-08-05 11:58:15
 */
import http from "@/api";
import { OnlineData, TodoData, TurnoverFeeStatisticsParams, WithdrawalStatisticsParams } from "./types";

/**
 * 当前在线人数
 * @param params
 * @returns
 */
export const getCurrentOnline = params => {
  return http.get<OnlineData>(`/admin/home/collect/online`, params);
};

/**
 *
 * @param params
 * @returns
 */
export const getTodoList = params => {
  return http.get<TodoData>(`/admin/home/collect/pend`, params);
};

/**
 * 活跃用户数量统计
 * @param type
 * @returns
 */
export const getOnlineHistory = (type: 1 | 2) => {
  return http.get(`/admin/home/collect/onlineHistory`, { type }, { loading: false });
};

/**
 * 注册统计
 * @param type
 * @returns
 */
export const getSignupStatistics = (type: 1 | 2) => {
  return http.get(`/admin/home/collect/signup`, { type });
};
/**
 * 注册统计详情
 * @param type
 * @returns
 */
export const getSignupDetail = (type: 1 | 2) => {
  return http.get(`/admin/home/collect/signup/detail`, { type });
};

/**
 * 充值和提现统计
 * @param type
 * @returns
 */
export const getRechargeWithdrawalStatistics = (params: WithdrawalStatisticsParams) => {
  return http.get(`/admin/home/collect/chargeWithdrawCollect`, params, { loading: false });
};

/**
 * 成交量和手续费统计
 * @param params
 * @returns
 */
export const getTurnoverFeeStatistics = (params: TurnoverFeeStatisticsParams) => {
  return http.get(`/admin/home/otc-statistics-num-chart`, params, { loading: false });
};
