/*

 * @LastEditors: sjd shi_junda@outlook.com
 * @LastEditTime: 2024-05-10 17:44:49
 * @FilePath: \exchange-admin-vue\src\views\envelope\envelopeList\types.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface EnvelopeDetailType {
  bgImage: string;
  count: number;
  createTime: string; // 假设这是一个ISO格式的日期字符串
  detail: string;
  envelopeNo: string;
  expiredHours: number;
  id: number;
  invite: number;
  inviteUser: string;
  inviteUserAvatar: string;
  logoImage: string;
  maxRand: number;
  memberId: number;
  name: string;
  plateform: number;
  receiveAmount: number;
  receiveCount: number;
  state: number;
  totalAmount: number;
  type: number;
  unit: string;
}
