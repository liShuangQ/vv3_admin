import { env, store } from "@/utils";
import { info } from "@/apis/user";
import { Router, RouteRecordRaw } from "vue-router";
import user from "@/store/user";
import MenuRouter from "@/store/MenuRoute";
import { toRaw } from "vue";
import i18n from "@/plugins/i18n";
import { Menu } from "#/menu";
import { message } from "ant-design-vue";
class Guard {
    private MenuRouterStore;
    private userStore
    constructor(private router: Router) {
        this.MenuRouterStore = MenuRouter()
        this.userStore = user()
    }
    public run() {
        this.MenuRouterStore.beforeMenuRoute();
        this.router.addRoute(toRaw(this.MenuRouterStore.route) as RouteRecordRaw);
        if (env.VITE_SKIP_ROUTER_GUARD) {
            console.error('VITE_SKIP_ROUTER_GUARD：Please note that there is currently no routing guard operation and it is prohibited to set it in the production environment!')
            return 
        }
        this.router.beforeEach(async (to, from) => {
            if (to.meta.auth && !this.getToken()) {
                // message.warning('当前用户已失效，请重新登录。');
                // 在清除token的时候重新获取用户信息
                this.userStore.clearUserInfo();
                return { name: "login" };
            }
            if (to.meta.guest && this.getToken()) {
                return from;
            }
            // 获取用户信息 （登陆和获取接口分开）
            if (this.getToken() && !this.userStore.info) {
                await info().then((res) => {
                    // 设置用户信息
                    this.userStore.setUserInfo(res.data);
                    if (res.data.lang) {
                        i18n.global.locale.value = (res.data.lang as "zh" | "en");
                    }
                    // ---后台权限菜单---
                    if (env.VITE_REAR_MENU) {
                        this.MenuRouterStore.afterMenuRoute(res.data.menus as Menu[]);
                        this.router.addRoute(toRaw(this.MenuRouterStore.route) as RouteRecordRaw);
                    }
                    // ---设置初始历史标签---
                    this.MenuRouterStore.addHistoryMenu({
                        title: to.meta.title as string,
                        selectedKeys: to.path,
                        openKeys: [""],
                    });
                });
            }
        });
    }
    // 获取token
    private getToken() {
        return store.token();
    }
}

export default (router: Router) => {
    new Guard(router).run();
};
