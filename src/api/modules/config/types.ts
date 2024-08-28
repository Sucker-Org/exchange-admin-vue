/*
 * @Description:
 * @Date: 2024-04-12 16:46:19
 * @LastEditTime: 2024-04-12 17:08:38
 */
export interface Config {
  configGroup: string;
  configKey: string;
  configName: string;
  configValue: string;
  createTime: number;
  id?: number;
  remark: string;
  status: 0 | 1;
  updateTime: number;
}
