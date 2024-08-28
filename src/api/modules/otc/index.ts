/*
 * @Description:
 * @Date: 2024-04-08 14:57:50
 * @LastEditTime: 2024-06-28 16:49:25
 */
import http from "@/api";
import { ResPage } from "@/api/interface";

/**
 * 后台广告-分页查询
 * @param params
 * @returns
 */
export const getAdvertiseByPage = params => {
  return http.get<ResPage<{}>>(`/admin/otc/advertise/page-query`, params);
};

/**
 * 后台广告-详情
 * @param id
 * @returns
 */
export const getAdvertiseById = id => {
  return http.get<ResPage<{}>>(`/admin/otc/advertise/${id}/detail`);
};

/**
 * 后台广告-下架
 * @param ids
 * @returns
 */
export const advertiseWithdraw = ids => {
  return http.post(`/admin/otc/advertise/turnOffAdvertise?id=${ids}`);
};

/**
 * 保证金记录-分页查询
 * @param params
 * @returns
 */
export const getDepositRecordByPage = params => {
  return http.get<ResPage<{}>>(`/admin/business/deposit-record/page-query`, params);
};

/**
 * 认证商家-分页查询
 * @param params
 * @returns
 */
export const getBusinessByPage = params => {
  return http.get<ResPage<{}>>(`/admin/business-auth/apply/page-query`, params);
};

/**
 * 认证商家-详情
 * @param id
 * @returns
 */
export const getBusinessById = id => {
  return http.get<ResPage<{}>>(`/admin/business-auth/apply/detail`, { id }, { loading: false });
};

/**
 * 认证商家-审核
 * @param data
 * @returns
 */
export const auditBusiness = data => {
  return http.put(`/admin/member/audit-business`, data);
};

/**
 * 认证商家-更新广告可发布状态
 * @param data
 * @returns
 */
export const updateAdvertisingReleaseStatus = data => {
  return http.put(`/admin/member/alter-publish-advertisement-status`, data);
};

/**
 * 退保管理-分页查询
 * @param params
 * @returns
 */
export const getSurrenderByPage = params => {
  return http.get<ResPage<{}>>(`/admin/business/cancel-apply/page-query`, params);
};

/**
 *
 * @param id
 * @returns
 */
export const getSurrenderById = id => {
  return http.get(`/admin/business/cancel-apply/detail`, { id }, { loading: false });
};

/**
 * 申诉管理-分页查询
 * @param params
 * @returns
 */
export const getAppealByPage = params => {
  return http.get<ResPage<{}>>(`/admin/otc/appeal/page-query`, params);
};

/**
 * 申诉管理-详情
 * @param id
 * @returns
 */
export const getAppealById = id => {
  return http.get(`/admin/otc/appeal/${id}/detail`);
};

/**
 * 币种管理-分页查询
 * @param params
 * @returns
 */
export const getCoinByPage = params => {
  return http.get<ResPage<{}>>(`/admin/otc/otc-coin/page-query`, params);
};

/**
 * 币种管理-添加
 * @param data
 * @returns
 */
export const addCoin = data => {
  return http.post(`/admin/otc/otc-coin/create`, data);
};

/**
 * 币种管理-编辑
 * @param data
 * @returns
 */
export const editCoin = data => {
  return http.post(`/admin/otc/otc-coin/update`, data);
};

/**
 * 批量删除
 * @param ids
 * @returns
 */
export const delCoins = ids => {
  return http.delete(`/admin/otc/otc-coin/deletes?ids=${ids}`);
};

/**
 * 订单管理-分页查询
 * @param params
 * @returns
 */
export const getOrderPage = params => {
  return http.get<ResPage<{}>>(`/admin/otc/order/page-query`, params);
};

/**
 * 分页获取广告订单
 * @param params
 * @returns
 */
export const getAdvertiseOrderPage = params => {
  return http.get<ResPage<{}>>(`/admin/otc/advertise/${params.id}/orders`, params);
};

/**
 * 商户账号管理
 * @param params
 * @returns
 */
export const getMerchantAccountByPage = params => {
  return http.get<ResPage<{}>>(`/admin/business-auth/merchant`, params);
};

/**
 * 退保审核
 * @param data
 * @returns
 */
export const surrenderReview = data => {
  return http.post(`/admin/business/cancel-apply/check`, data);
};
