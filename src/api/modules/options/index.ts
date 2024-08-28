/*
 * @Description:
 * @Date: 2024-05-17 10:23:18
 * @LastEditTime: 2024-06-06 14:46:51
 */
import http from "@/api";
import { ResultData } from "@/api/interface";

/**
 * 提币审核-状态
 * @returns
 */
export const getWithdrawalReviewStatusOptions = () => {
  return http.get<ResultData<any[]>>(`/admin/drop/finance/withdraw`);
};

/**
 * 交易类型
 * @returns
 */
export const getTransactionTypeOptions = () => {
  return http.get<{ id: number; name: string }[]>(`/admin/drop/finance/type`);
};

/**
 * 会员类型
 * @returns
 */
export const getMemberTypeOptions = () => {
  return http.get<any[]>(`/admin/drop/finance/member/level`);
};

/**
 * 币种类型
 * @returns
 */
export const getCoinTypeOptions = () => {
  return http.get<{ id: number; name: string; nameCn: string; unit: string }[]>(`/admin/drop/finance/coin`);
};

/**
 * 退保管理-会员状态
 * @returns
 */
export const getSurrenderStatusOptions = () => {
  return http.get<ResultData<any[]>>(`/admin/drop/finance/cancel-apply`);
};

/**
 * 认证商家-会员状态
 * @returns
 */
export const getCertifiedMerchantStatusOptions = () => {
  return http.get<ResultData<any[]>>(`/admin/sys/admin/drop/finance/business-aut`);
};

/**
 * 实名认证-审核类型
 * @returns
 */
export const getRealnameAuditTypeOptions = () => {
  return http.get<ResultData<any[]>>(`/admin/drop/finance/audit`);
};

/**
 * 获取交易对下拉列表数据
 * @returns
 */
export const getTransactionPairsOptions = () => {
  return http.get<{ id: number; name: string }[]>(`/admin/drop/finance/symbol`);
};
