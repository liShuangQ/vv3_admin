import {App} from "vue";
import {createRouter, createWebHashHistory} from "vue-router"; //createWebHistory
import {routes} from "./routes";
import autoloadModuleRoutes from "./module/index";
import guard from "./guard";

const router = createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes: [...routes, ...autoloadModuleRoutes()],
});
export const setupRouter = async (app: App) => {
    guard(router);
    app.use(router);
};
export default router;
