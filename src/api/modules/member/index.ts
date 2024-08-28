/*
 * @Description:
 * @Date: 2024-04-08 14:57:50
 * @LastEditTime: 2024-07-30 13:43:28
 */
import http from "@/api";
import { ResPage } from "@/api/interface";
import { UpdateStatus, UpdateTarnStatus } from "./types";

/**
 * 查询
 * @param params
 * @returns
 */
export const getAssetModifyingRecords = walletId => {
  return http.get(`/admin/walletModify/operLogs/${walletId}`);
};

/**
 *
 * @param data
 * @returns
 */
export const updatUserAsset = data => {
  return http.put(`/admin/member/member-wallet/modify`, data);
};

/**
 *
 * @param phone
 * @returns
 */
export const getVerificationCode = params => {
  return http.get(`/admin/walletModify/getCode`, params);
};

/**
 * 分页查询资产
 * @param params
 * @returns
 */
export const getAssetByPage = params => {
  return http.get<ResPage<{}>>(`/admin/system/member-wallet/memberPage`, params);
};

/**
 * 分页查询会员列表
 * @param params
 * @returns
 */
export const getMemberByPage = params => {
  return http.get<ResPage<{}>>(`/admin/member/page-query`, params);
};

/**
 *
 * @param id
 * @returns
 */
export const getMemberById = id => {
  return http.get<ResPage<{}>>(`/admin/member/detail?id=${id}`);
};

/**
 * 分页查询余额管理
 * @param params
 * @returns
 */
export const getBalanceByPage = params => {
  return http.get<ResPage<{}>>(`/admin/system/member-wallet/balance/${params.type}`, params);
};

/**
 * 实名管理
 * @param params
 * @returns
 */
export const getRealNameByPage = params => {
  return http.get<ResPage<{}>>(`/admin/member/member-application/page-query`, params);
};
/**
 * 实名管理详情
 * @param params
 * @returns
 */
export const getRealNameDetail = params => {
  return http.get<ResPage<{}>>(`/admin/member/member-application/detail`, params);
};

/**
 * 增加邀请人
 * @param id
 * @param inviterId
 * @returns
 */
export const addInviter = params => {
  return http.post(`/admin/member/setInviter`, params);
};

/**
 * 重置地址
 * @param uid
 * @param unit
 * @returns
 */
export const resetAddress = (uid, unit) => {
  return http.put(`/admin/system/member-wallet/reset-address`, { uid, unit });
};

/**
 * 锁定钱包
 * @param unit
 * @param memberId
 * @returns
 */
export const lockWallet = (memberId, unit) => {
  return http.post(`/admin/member/member-wallet/lock-wallet`, { memberId, unit });
};

/**
 * 解锁钱包
 * @param unit
 * @param memberId
 * @returns
 */
export const unLockWallet = (memberId, unit) => {
  return http.post(`/admin/member/member-wallet/unlock-wallet`, { memberId, unit });
};

/**
 * 充币
 * @param data
 * @returns
 */
export const recharge = data => {
  return http.post(`/admin/system/member-wallet/recharge`, data);
};

/**
 * 禁止/允许交易
 * @param data
 * @returns
 */
export const updateTransactionStatus = (data: UpdateTarnStatus) => {
  return http.put(`/admin/member/alter-transaction-status`, data);
};

/**
 * 禁用/解禁
 * @param data
 * @returns
 */
export const updateStatus = (data: UpdateStatus) => {
  return http.put(`/admin/member/alter-status`, data);
};

/**
 * OTC交易-禁用/解禁
 * @param data
 * @returns
 */
export const updateOtcProhibit = (data: UpdateStatus) => {
  return http.put(`/admin/member/otcProhibit`, data);
};

/**
 * 可充值-禁用/解禁
 * @param data
 * @returns
 */
export const updateRechargeProhibit = (data: UpdateStatus) => {
  return http.put(`/admin/member/rechargeProhibit`, data);
};

/**
 * 可提现-禁用/解禁
 * @param data
 * @returns
 */
export const updateWithdrawProhibit = (data: UpdateStatus) => {
  return http.put(`/admin/member/withdrawProhibit`, data);
};

/**
 * 授权代理商
 * @param data
 * @returns
 */
export const authorizedAgent = data => {
  return http.post(`/member/alter-member-superpartner`, data);
};

/**
 * 会员信息导出
 * @param params
 * @returns
 */
export const memberExport = params => {
  return http.get(`/admin/member/export`, params, { responseType: "blob", loadingText: "正在下载数据，请稍候" });
};

/**
 * 获取用户资产列表
 * @param params
 * @returns
 */
export const getUserAssetsByPage = params => {
  return http.get(`/admin/member/detail/wallet`, params);
};

/**
 * 强制下线
 * @param id
 * @returns
 */
export const forceUserOffline = id => {
  return http.post(`/admin/member/force-offline/${id}`);
};

/**
 * 实名审核
 * @param data
 * @returns
 */
export const realnameApproval = data => {
  return http.post(`/admin/member/member-application/pass`, data);
};
