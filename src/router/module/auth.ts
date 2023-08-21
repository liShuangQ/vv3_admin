import { RouteRecordRaw } from "vue-router";

export default {
  name: "auth",
  path: "/auth",
  component: () => import("@/layouts/auth.vue"),
  children: [
    {
      name: "login",
      path: "login",
      component: () => import("@/views/auth/login.vue"),
      children: [],
      meta: { guest:true },
    },
  ],
} as RouteRecordRaw;
