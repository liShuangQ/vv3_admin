import { RouteRecordRaw } from "vue-router";
import adminRouteData from "../menu/index";
import { Menu } from "#/menu";

// 菜单配置
const menuRoute: Menu = {
  name: "admin",
  path: "/",
  redirect: "/index",
  component: () => import("@/layouts/admin.vue"),
  meta: { title: "后台系统", icon: "Platform", show: true, auth: true, parentPaths:['']},
  children: adminRouteData,
};
// 未拍平 在菜单获取后拍平
let adminRoute = menuRoute; 


export default adminRoute as RouteRecordRaw;
export { menuRoute };
