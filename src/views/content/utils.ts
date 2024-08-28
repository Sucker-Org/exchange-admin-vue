/*
 * @Author: sjd shi_junda@outlook.com
 * @Date: 2024-05-15 13:49:00
 * @LastEditors: sjd shi_junda@outlook.com
 * @LastEditTime: 2024-05-15 14:35:48
 * @FilePath: \exchange-admin-vue\src\views\content\utils.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const transformAdQuery = params => {
  // console.log("params", params);
  const query = {
    params: {
      limit: params.pageSize || undefined,
      page: params.pageNum || undefined,
      direction: params.direction || undefined,
      property: params.property || undefined
    },
    screen: {}
  };

  Object.keys(params).forEach(key => {
    if (!params.query.hasOwnProperty(key)) {
      params.screen[key] = params[key];
    }
  });

  return query;
};
