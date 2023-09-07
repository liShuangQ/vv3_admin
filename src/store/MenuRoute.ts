import { defineStore } from "pinia";
import { menuRoute } from "@/router/module/admin";
import { HistoryMenu, Menu } from "#/menu";
import { cloneDeep } from "lodash";
import router from "@/router";

export default defineStore("MenuRouter", {
  state: () => {
    return {
      menu: {} as Menu,
      route: {} as Menu,
      historyMenu: [] as HistoryMenu[],
      // HACK： 清除到没有清除选项时候的默认菜单
      defaultMenu: {openKeys:["/index"],selectedKeys:"/index",title:"menu.home"} as HistoryMenu
    };
  },
  actions: {
    // 前台菜单 过滤
    beforeMenuRoute() {
      // let layout = {
      //   name: "admin",
      //   path: "/",
      //   redirect: "/index",
      //   component: () => import("@/layouts/admin.vue"),
      //   meta: { title: "后台系统", icon: "Platform", show: true, auth: true ,parentPaths:[]},
      //   children: menuRoute.children,
      // };
      this.menu = menuRoute;
      let adminRoute = cloneDeep(menuRoute);
      let adminChildren: Menu[] = [];
      function getRouteData(data: Menu[]) {
        data.forEach((ele) => {
          if ((!ele.children || ele.children.length === 0) && ele.meta.show) {
            adminChildren.push(ele);
            return;
          } else {
            ele.children && ele.meta.show && getRouteData(ele.children);
          }
        });
      }
      adminRoute.children && getRouteData(adminRoute.children);
      adminRoute["children"] = adminChildren;
      this.route = adminRoute;
    },
    // 后台权限过滤
    afterMenuRoute(userData: Menu[]) {
      // let layout = {
      //   name: "admin",
      //   path: "/",
      //   redirect: "/index",
      //   component: () => import("@/layouts/admin.vue"),
      //   meta: { title: "后台系统", icon: "Platform", show: true, auth: true ,parentPaths:[]},
      //   children: menuRoute.children,
      // };
      let adminRoute = cloneDeep(menuRoute);
      let adminChildren: Menu[] = [];
      // 初级处理路由和菜单 (只使用返回的path作为唯一id)
      function getRouteData(data: Menu[]) {
        data.forEach((ele) => {
          if ((!ele.children || ele.children.length === 0) && ele.meta.show) {
            if (userData.find((i) => i.path === ele.path)) {
              adminChildren.push(ele);
            } else {
              ele.meta.show = false;
            }
            return;
          } else {
            ele.children && ele.meta.show && getRouteData(ele.children);
          }
        });
      }
      adminRoute.children && getRouteData(adminRoute.children);

      // 二次处理多余菜单
      let menu = [cloneDeep(adminRoute)];
      let filterMenu = (list: Menu[]) => {
        list.forEach((item) => {
          if (item.children && item.children.length > 0) {
            item.meta.show = filterMenu(item.children);
          }
        });
        return !!list.find((item) => item.meta.show);
      };
      filterMenu(menu);

      this.menu = menu[0];
      adminRoute["children"] = adminChildren;
      this.route = adminRoute;
    },

    // 添加历史菜单
    addHistoryMenu(menu: HistoryMenu) {
      // 如果是其它两个布局路由 不进入历史菜单
      if (
        menu.selectedKeys.indexOf("auth") !== -1 ||
        menu.selectedKeys.indexOf("error") !== -1
      ) {
        return;
      }
      const item: { title: string; selectedKeys: string; openKeys: string[] } =
        {
          openKeys: menu.openKeys,
          selectedKeys: menu.selectedKeys as string,
          title: menu.title as string,
        };
      const isHas = this.historyMenu.some(
        (e) => e.selectedKeys === menu.selectedKeys
      );
      !isHas && this.historyMenu.unshift(item);
      if (this.historyMenu.length > 7) {
        this.historyMenu.pop();
      }
    },
    // 移除点击历史菜单 返回出新的菜单位置
    removeHistoryMenu(menu: HistoryMenu) {
      const index = this.historyMenu.indexOf(menu);
      this.historyMenu.splice(index, 1);
      if (router.currentRoute.value.path === menu.selectedKeys) {  
        const beforeMenu = this.historyMenu[index-1]
        if (beforeMenu) {
          return beforeMenu
        }else{
          this.addHistoryMenu(this.defaultMenu)
          return this.defaultMenu
        }
      }else{
        return null;
      }
    },
    // 历史菜单的其它操作
    handleHistoryMenu(
      selectedKeys: string,
      type: "left" | "right" | "now" | "all"
    ) {
      if (type === "left") {
        let i = 0;
        for (let index = 0; index < this.historyMenu.length; index++) {
          if (this.historyMenu[index].selectedKeys === selectedKeys) {
            i = index;
            break;
          }
        }
        this.historyMenu.splice(0, i);
      }
      if (type === "right") {
        let i = 0;
        for (let index = 0; index < this.historyMenu.length; index++) {
          if (this.historyMenu[index].selectedKeys === selectedKeys) {
            i = index;
            break;
          }
        }
        this.historyMenu.splice(i + 1, this.historyMenu.length);
      }
      if (type === "now") {
        this.historyMenu = [
          this.historyMenu.find((e) => {
            return e.selectedKeys === selectedKeys;
          }) as HistoryMenu,
        ];
      }
      if (type === "all") {
        this.historyMenu = [
          {
            title: "menu.home",
            selectedKeys: "/index",
            openKeys: [""],
          },
        ];
        router.push({ path: "/index" });
      }
    },

    // 清空状态,在退出时使用
    clearState() {
      this.menu = {} as Menu;
      // this.route = {} as Menu;
      this.historyMenu = [];
      setTimeout(() => {
        location.reload();
      }, 500);
    },

  },
});
