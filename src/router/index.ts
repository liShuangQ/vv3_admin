import { App } from "vue";
import { createRouter, createWebHashHistory } from "vue-router"; //createWebHistory
import { routes } from "./routes";
import layoutRoutes from "./autoload/index";
import guard from "./guard";

const router = createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes: [...routes, ...layoutRoutes],
});
export const setupRouter = async (app: App) => {
    guard(router);
    app.use(router);
};
export default router;
