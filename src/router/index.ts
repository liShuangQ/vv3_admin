import { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router"; //createWebHistory
import { routes } from "./routes";
import layoutRoutes from "./autoload/index";
import guard from "./guard";
import {env} from "@/utils";

const router = createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes: [...routes, ...layoutRoutes],
});
export const setupRouter = async (app: App) => {
    if (!env.VITE_ROUTER_AUTOLOAD){
        guard(router);
    }
    app.use(router);
};
export default router;
