export type StatisticsParams = {
  types: 0 | 1 | 2 | 3 | 4 | 5 | 6; //0法币成交量 1法币成交额 2币币交易手续费统计 3币币交易成交量统计 4币币交易成交额统计 5充币 6提币
  days: 1 | 3 | 7; //1昨天 3三天 7一周
  unit?: string;
};
