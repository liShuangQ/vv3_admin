import { RouteRecordRaw } from "vue-router";

// 全局路由
export const routes = [
    {
        name: "notfound",
        path: "/:any(.*)",
        component: () => import("@/views/errors/404.vue"),
        children: [],
        meta: { title: "404页面", icon: "", show: true },
    },
] as RouteRecordRaw[];
 