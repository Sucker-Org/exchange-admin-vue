/*
 * @Description:
 * @Date: 2024-04-08 14:57:50
 * @LastEditTime: 2024-06-25 17:30:26
 */
import http from "@/api";
import { ResPage } from "@/api/interface";
import { Coin } from "./types";

/**
 * 新增
 * @param data
 * @returns
 */
export const addCoin = data => {
  // return http.post(`/system/coin/create`, data);
  return http.post(`/admin/system/coin/create`, data);
};

/**
 * 分页查询
 * @param params
 * @returns
 */
export const getCoinByPage = params => {
  return http.get<ResPage<Coin> & { content: Coin[]; totalElements: number }>(`/admin/system/coin/page-query`, params);
};

/**
 * 详情
 * @param id
 * @returns
 */
export const getCoinById = id => {
  return http.get(`/system/coin/detail/${id}`);
};

/**
 * 更新币种
 * @param data
 * @returns
 */
export const updateCoin = data => {
  return http.post(`/admin/system/coin/update`, data);
};

/**
 * 币币管理-订单管理列表
 * @param params
 * @returns
 */
export const getCoinOrderByPage = params => {
  return http.get<ResPage<{}>>(`/admin/exchange/exchange-order/page-query`, params);
};

/**
 * 币币管理-订单详情
 * @param id
 * @returns
 */
export const getCoinOrderById = id => {
  return http.get(`/admin/exchange/exchange-order/detail`, { id });
};

/**
 * 币币管理-币币设置列表
 * @param params
 * @returns
 */
export const getCoinSettingListByPage = (params, loading = true) => {
  return http.get(`/admin/exchange/exchange-coin/page-query`, params, { loading });
};

/**
 * 币币设置-导出
 * @returns
 */
export const exportCoinSettingList = () => {
  return http.get(`/admin/exchange/exchange-coin/out-excel`, {}, { responseType: "blob", loadingText: "正在下载数据，请稍候" });
};

/**
 * 币币设置-添加交易对
 * @param data
 * @returns
 */
export const addTransactionPairsCoin = data => {
  return http.post(`/admin/exchange/exchange-coin/add`, data);
};

/**
 * 币币设置-修改交易对
 * @param data
 * @returns
 */
export const updateTransactionPairsCoin = data => {
  return http.post(`/admin/exchange/exchange-coin/alter-rate`, data);
};

/**
 * 币币设置-暂停交易引擎
 * @param data
 * @returns
 */
export const stopTradingEngine = data => {
  return http.post(`/admin/exchange/exchange-coin/stop-trader`, data, { loadingText: "暂停中，请稍候" });
};

/**
 * 币币设置-启动交易引擎
 * @param data
 * @returns
 */
export const startTradingEngine = data => {
  return http.post(`/admin/exchange/exchange-coin/start-trader`, data, { loadingText: "启动中，请稍候" });
};

/**
 * 币币设置-撤销所有委托
 * @param data
 * @returns
 */
export const revokeAllEntrust = data => {
  return http.post(`/admin/exchange/exchange-coin/cancel-all-order`, data, { loadingText: "撤销中，请稍候" });
};

/**
 * 币币设置-重置引擎
 * @param data
 * @returns
 */
export const resetTradingEngine = data => {
  return http.post(`/admin/exchange/exchange-coin/reset-trader`, data, { loadingText: "重置中，请稍候" });
};

/**
 * 币币设置-删除交易对
 * @param symbol
 * @returns
 */
export const delTransactionPairsCoin = data => {
  return http.post(`/admin/exchange/exchange-coin/delete`, data, { loadingText: "删除中，请稍候" });
};

/**
 * 币币设置-获取机器人参数
 * @param symbol
 * @returns
 */
export const getRobotConfig = symbol => {
  return http.get(`/admin/exchange/exchange-coin/robot-config`, { symbol });
};

/**
 * 币币设置-新建机器人参数
 * @param data
 * @returns
 */
export const addRobotConfig = data => {
  return http.post(`/admin/exchange/robot/create-config`, data, { loadingText: "保存中，请稍候" });
};

/**
 * 币币设置-编辑机器人参数
 * @param data
 * @returns
 */
export const editRobotConfig = data => {
  return http.post(`/admin/exchange/robot/alter-config`, data, { loadingText: "保存中，请稍候" });
};

/**
 * 获取控盘机器人最近设置的k线图数据
 * @param symbol
 * @returns
 */
export const getRobotRecentKlineBySymbol = params => {
  return http.get(`/admin/exchange/exchange-coin/robot-recent-kline`, params, { loading: false });
};

/**
 * 获取控盘机器人最近设置的k线列表
 * @param params
 * @returns
 */
export const getRobotRecentKlineList = params => {
  return http.get(`/admin/exchange/exchange-coin/robot-kline-list`, params, { loading: false, showErrorMessage: false });
};

/**
 * 保存K线图数据
 * @param data
 * @returns
 */
export const saveRobotKline = data => {
  return http.post(`/admin/exchange/robot/save-robot-kline`, data);
};
