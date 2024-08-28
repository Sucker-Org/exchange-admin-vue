/*
 * @Description:会员管理类型集合
 * @Date: 2024-05-31 15:54:18
 * @LastEditTime: 2024-05-31 15:59:35
 */
export type UpdateStatus = {
  status: 0 | 1;
  memberId: number | string;
};

export type UpdateTarnStatus = UpdateStatus & {
  detail?: string;
};
