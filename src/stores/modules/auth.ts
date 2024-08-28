/*
 * @Description:
 * @Date: 2024-04-07 09:54:32
 * @LastEditTime: 2024-07-25 14:38:49
 */
import { getAuthButtonListApi } from "@/api/modules/login";
import { getAuthMenuListApi } from "@/api/modules/menu";
import { AuthState } from "@/stores/interface";
import { getAllBreadcrumbList, getFlatMenuList, getShowMenuList } from "@/utils";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "geeker-auth",
  state: (): AuthState => ({
    // 按钮权限列表
    authButtonList: {},
    // 菜单权限列表
    authMenuList: [],
    // 当前页面的 router name，用来做按钮权限筛选
    routeName: ""
  }),
  getters: {
    // 按钮权限列表
    authButtonListGet: state => state.authButtonList,
    // 菜单权限列表 ==> 这里的菜单没有经过任何处理
    authMenuListGet: state => state.authMenuList,
    // 菜单权限列表 ==> 左侧菜单栏渲染，需要剔除 isHide == true
    showMenuListGet: state => getShowMenuList(state.authMenuList),
    // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
    flatMenuListGet: state => getFlatMenuList(state.authMenuList),
    // 递归处理后的所有面包屑导航列表
    breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList)
  },
  actions: {
    // Get AuthButtonList
    async getAuthButtonList() {
      const { data } = await getAuthButtonListApi();
      this.authButtonList = data;
    },
    // Get AuthMenuList
    async getAuthMenuList() {
      const { data = [] } = await getAuthMenuListApi();

      const dataSource: any[] = [];

      const dataDeepFlat = (arr: any[]) => {
        if (!arr.length) {
          return;
        }
        arr.forEach((item: any) => {
          const menu = { ...item };
          const children = menu?.childList && menu.childList.length ? [...menu?.childList] : [];
          delete menu.childList;
          dataSource.push(menu);
          if (children?.length) {
            dataDeepFlat(children);
          }
        });
      };

      dataDeepFlat(data);

      const getPath = menu => {
        let path: string = menu.path;

        const formatPath = path => (path && typeof path == "string" ? (path[0] == "/" ? path : `/${path}`) : "");

        return (() => {
          const deepFind = m => {
            const parent = dataSource.find((item: any) => item.id === m.pid) ?? {};
            path = `${formatPath(parent?.path)}${formatPath(path)}`;
            return parent?.pid ? deepFind(parent) : path;
          };
          return deepFind(menu);
        })();
      };

      const menusStructureProcessing = menus => {
        return menus.map(menu => ({
          id: menu.id,
          path: getPath(menu),
          component: menu.component,
          meta: {
            icon: menu.icon,
            title: menu.name,
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: false,
            isKeepAlive: menu.isKeepAlive ?? true
          },
          children: menusStructureProcessing(menu.childList ?? [])
        }));
      };
      this.authMenuList = [
        {
          id: 4663,
          path: "/home/index",
          name: "home",
          component: "/home/index",
          meta: {
            icon: "HomeFilled",
            title: "首页",
            isLink: "",
            isHide: false,
            isFull: false,
            isAffix: true,
            isKeepAlive: true
          }
        },
        ...menusStructureProcessing(data)
      ];
      console.log(this.authMenuList, "this.authMenuList");
    },
    // Set RouteName
    async setRouteName(name: string) {
      this.routeName = name;
    }
  }
});
