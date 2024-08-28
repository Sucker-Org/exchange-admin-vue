/*
 * @Description:
 * @Date: 2024-04-07 09:54:32
 * @LastEditTime: 2024-07-25 14:34:39
 */
import http from "@/api";
import { Login } from "@/api/interface/index";
import authButtonList from "@/assets/json/authButtonList.json";

/**
 * 获取验证码
 * @returns
 */
export const getValidateCodeApi = () => {
  return http.get<Login.ResLogin>(`/admin/sysLogin/getValidateCode`);
};

/**
 * @name 登录模块
 */
// 用户登录
export const loginApi = (params: Login.ReqLoginForm) => {
  return http.post<Login.ResLogin>(`/admin/sysLogin/login`, params, { loading: false }); // 正常 post json 请求  ==>  application/json
  //return http.post<Login.ResLogin>(PORT1 + `/login`, params, { loading: false }); // 控制当前请求不显示 loading
  //return http.post<Login.ResLogin>(PORT1 + `/login`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
  // return http.post<Login.ResLogin>(PORT1 + `/login`, qs.stringify(params)); // post 请求携带表单参数  ==>  application/x-www-form-urlencoded
  // return http.get<Login.ResLogin>(PORT1 + `/login?${qs.stringify(params, { arrayFormat: "repeat" })}`); // get 请求可以携带数组等复杂参数
};

export const getKeyApi = () => {
  return http.get(`/admin/sysLogin/getKey`, {});
};

// 获取菜单列表
export const getAuthMenuListApi = () => {
  return http.get<Menu.MenuOptions[]>(`/admin/getMenus`, {});
};

// 获取按钮权限
export const getAuthButtonListApi = () => {
  //return http.get<Login.ResAuthButtons>(PORT1 + `/auth/buttons`, {}, { loading: false });
  // 如果想让按钮权限变为本地数据，注释上一行代码，并引入本地 authButtonList.json 数据
  return authButtonList;
};

// 用户退出登录
export const logoutApi = () => {
  return http.post(`/admin/logout`);
};
