/*
 * @Description:
 * @Date: 2024-04-08 14:57:50
 * @LastEditTime: 2024-05-15 09:47:03
 */
import http from "@/api";
import { ResPage } from "@/api/interface";

/**
 * 分页查询
 * @param params
 * @returns
 */
export const getStarRecordByPage = params => {
  return http.get<ResPage<{}>>(`/admin/getMemberStarRecord`, params);
};

/**
 * 分页查询
 * @param params
 * @returns
 */
export const getHdcRecordByPage = params => {
  return http.get<ResPage<{}>>(`/admin/getHdcRecord`, params);
};

/**
 * 分页查询
 * @param params
 * @returns
 */
export const getPurchaseRecordsByPage = params => {
  return http.get<ResPage<{}>>(`/admin/getMemberRecord`, params);
};

/**
 * 分页查询
 * @param params
 * @returns
 */
export const getInfoQueryByPage = params => {
  return http.get<ResPage<{}>>(`/admin/getReferre`, params);
};

/**
 * 分页查询
 * @param params
 * @returns
 */
export const getTransactionFeeRewardByPage = params => {
  return http.get<ResPage<{}>>(`/admin/getChargeAwardRecord`, params);
};

/**
 * 分页查询
 * @param params
 * @returns
 */
export const getTeamFeeRewardByPage = params => {
  return http.get<ResPage<{}>>(`/admin/getGroupChargeAward`, params);
};

/**
 * 交易手续费奖励导出
 * @param params
 * @returns
 */
export const chargeAwardRecordExport = params => {
  return http.get(`/admin/export/chargeAwardRecordExport`, params, {
    responseType: "blob",
    loadingText: "正在下载数据，请稍候"
  });
};

/**
 * 团队手续费奖励导出
 * @param params
 * @returns
 */
export const groupChargeAwardExport = params => {
  return http.get(`/admin/export/groupChargeAwardExport`, params, {
    responseType: "blob",
    loadingText: "正在下载数据，请稍候"
  });
};

/**
 * HDC奖励导出
 * @param params
 * @returns
 */
export const hdcAwardExport = params => {
  return http.get(`/admin/export/hdcAwardExport`, params, { responseType: "blob", loadingText: "正在下载数据，请稍候" });
};

/**
 * 信息查询导出
 * @param params
 * @returns
 */
export const memberInfoExport = params => {
  return http.get(`/admin/export/memberInfoExport`, params, { responseType: "blob", loadingText: "正在下载数据，请稍候" });
};

/**
 * 购买记录导出
 * @param params
 * @returns
 */
export const memberRecordExport = params => {
  return http.get(`/admin/export/memberRecordExport`, params, { responseType: "blob", loadingText: "正在下载数据，请稍候" });
};

/**
 * 升星奖励导出
 * @param params
 * @returns
 */
export const memberStarRecordExport = params => {
  return http.get(`/admin/export/memberStarRecordExport`, params, {
    responseType: "blob",
    loadingText: "正在下载数据，请稍候"
  });
};

/**
 * 会员信息导出
 * @param params
 * @returns
 */
export const memberExport = params => {
  return http.get(`/admin/member/export`, params, { responseType: "blob", loadingText: "正在下载数据，请稍候" });
};
