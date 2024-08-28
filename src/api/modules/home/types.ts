/*
 * @Description:
 * @Date: 2024-08-01 15:52:07
 * @LastEditTime: 2024-08-05 11:58:03
 */
export interface OnlineData {
  currentNum: number;
  lastHourNum: number;
  lastTenNum: number;
}

export interface TodoData {
  deposit: number;
  memberLoan: number;
  merchant: number;
  otcAppeal: number;
  outCoin: number;
  realName: number;
}

export interface WithdrawalStatisticsParams {
  type: 1 | 2;
  start: string;
  end: string;
}

export interface TurnoverFeeStatisticsParams {
  type: 0 | 2;
  start: string;
  end: string;
}
