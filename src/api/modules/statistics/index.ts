/*
 * @Description:
 * @Date: 2024-04-19 10:33:42
 * @LastEditTime: 2024-05-22 16:04:44
 */
import http from "@/api";
import { ResPage } from "@/api/interface";
import { StatisticsParams } from "./types";

/**
 * 每日统计
 * @param params
 * @returns
 */
export const getDailyStatisticsByPage = params => {
  return http.get<ResPage<{}>>(`/admin/system/daily/query/balance`, params);
};

/**
 * 交易汇总
 * @param params
 * @returns
 */
export const getTransactionByPage = params => {
  return http.get<ResPage<{}>>(`/admin/system/history/query/trade`, params);
};

/**
 * 挂单明细
 * @param params
 * @returns
 */
export const getOrderByPage = params => {
  return http.get<ResPage<{}>>(`/admin/system/order/query/pend`, params);
};

/**
 * 持仓明细
 * @param params
 * @returns
 */
export const getWarehouseByPage = params => {
  return http.get<ResPage<{}>>(`/admin/system/member-wallet/warehouse`, params);
};

/**
 * 手续费统计
 * @param params
 * @returns
 */
export const getFeeStatistics = params => {
  return http.get<ResPage<{}>>(`/admin/home/collect/fee`, params);
};

/**
 * 充值、提币统计
 * @param params
 * @returns
 */
export const getRechargeWithdrawStatistics = (params: StatisticsParams) => {
  return http.get<ResPage<{}>>(`/admin/finance/statistics/recharge-or-withdraw-amount`, params);
};

/**
 *
 * @param params
 * @returns
 */
export const getCoinTransactionStatistics = params => {
  return http.get<ResPage<{}>>(`/admin/home/collect/coinOrder`, params);
};

/**
 * 用户资产统计
 * @param params
 * @returns
 */
export const getUserAssetStatistics = params => {
  return http.get<ResPage<{}>>(`/admin/home/collect/wallet`, params);
};
