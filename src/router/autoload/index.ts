import { env } from "@/utils";
import { RouteRecordRaw } from "vue-router";
import viewRoutes from "./view";
import autoloadModuleRoutes from "./module";
let routes = [] as RouteRecordRaw[];
//根据文件自动注册? 按布局文件和模块内文件配合手动注册?
if (env.VITE_ROUTER_AUTOLOAD) {
    //按文件位置
    routes = viewRoutes;
} else {
    // 按模块
    routes = autoloadModuleRoutes();
}
export default routes;
