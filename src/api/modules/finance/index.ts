/*
 * @Description:
 * @Date: 2024-04-19 10:33:42
 * @LastEditTime: 2024-05-28 17:50:55
 */
import http from "@/api";
import { ResPage } from "@/api/interface";

/**
 * 交易明细列表/手续费管理列表
 * @param params
 * @returns
 */
export const getTransactionOrFeeByPage = params => {
  return http.get<ResPage<{}>>(`/admin/finance/member-transaction/page-query`, params);
};

/**
 * 充币记录
 * @param params
 * @returns
 */
export const getRechargeCoinRecordByPage = params => {
  return http.get<ResPage<{}>>(`/admin/finance/member-deposit/page-query`, params);
};

/**
 * 法币交易明细列表/OTC管理-订单管理列表
 * @param params
 * @returns
 */
export const getOtcByPage = params => {
  return http.get<ResPage<{}>>(`/admin/otc/order/page-query`, params);
};

/**
 * 质押管理列表
 * @param params
 * @returns
 */
export const getPledgeByPage = params => {
  return http.get<ResPage<{}>>(`/admin/loan/page-query`, params);
};

/**
 * 提币审核/提币明细列表
 * @param params
 * @returns
 */
export const getWithdrawalReviewByPage = params => {
  return http.get<ResPage<{}>>(`/admin/finance/withdraw-record/page-query`, params);
};

/**
 * 查询用户地址
 * @param params
 * @returns
 */
export const searchUserAddress = params => {
  return http.get<ResPage<{}>>(`/admin/finance/member-transaction/address`, params);
};

/**
 * 提币详情
 * @param userId
 * @returns
 */
export const getWithdrawDetailById = id => {
  return http.get<ResPage<{}>>(`/admin/finance/withdraw-record/detail/${id}`);
};

/**
 * 提币详情-交易记录
 * @param userId
 * @returns
 */
export const getWithdrawDetailTarnRecordById = params => {
  return http.get<ResPage<{}>>(`/admin/finance/withdraw-record/detail/${params.id}/orders`, params);
};

/**
 * 提币审核
 * @param data
 * @returns
 */
export const withdrawAudit = data => {
  return http.post(`/admin/finance/withdraw-record/audit-pass`, data);
};
/**
 * 质押审核
 * @param data
 * @returns
 */
export const loanAudit = data => {
  return http.post(`/admin/loan/audit`, data);
};
