/*
 * @Description:
 * @Date: 2024-04-07 15:59:38
 * @LastEditTime: 2024-07-26 16:26:30
 */
import http from "@/api";

export const getMenuTree = () => {
  return http.get(`/admin/system/menu/cache/tree`);
};

export const getAuthMenuListApi = () => {
  return http.get<Menu.MenuOptions[]>(`/admin/sysLogin/getMenus`, {}, { loading: false });
};

export const addMenu = data => {
  return http.post(`/admin/system/menu/add`, data, { loading: false });
};

export const updateMenu = data => {
  return http.post(`/admin/system/menu/update`, data, { loading: false });
};

export const delMenu = id => {
  return http.post(`/admin/system/menu/delete/${id}`);
};
