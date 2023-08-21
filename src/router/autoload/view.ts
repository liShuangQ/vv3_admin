import { RouteRecordRaw } from "vue-router";
import { env } from "../../utils/index";
// vite的api,同步提供遍历文件夹下文件,不可用别名
// 主路由
const layouts = import.meta.glob("../../layouts/*.vue", { eager: true })
// 子路由(嵌套关系)  **遍历到子目录
const views = import.meta.glob("../../views/**/index.vue", { eager: true })
// 获取布局路由
function getRoutes() {
  const layoutRoutes = [] as RouteRecordRaw[];
  Object.entries(layouts).forEach(([file, module]) => {
    const route = getRouteByModule(file, module as any);
    route["children"] = getChildrenRoutes(route);
    layoutRoutes.push(route);
  });
  return layoutRoutes;
}

// 获取布局路由的子路由
function getChildrenRoutes(layoutRoute: RouteRecordRaw) {
  const routes = [] as RouteRecordRaw[];
  Object.entries(views).forEach(([file, module]) => {
    // 根据布局文件名匹配views下同名文件夹下子页面
    // 所以文件夹要严格对应布局文件
    
    if (file.includes(`../views/${layoutRoute.name as string}`)) {
      const route = getRouteByModule(file, module as any);
      routes.push(route);
    }
  });
  return routes;
}

//将提取文件地址处理成路由对象形式
function getRouteByModule(file: string, module: { [key: string]: any }) {
  const name = file.replace(/.+layouts\/|.+views\/|\.vue/gi, "");
  
  const router = {
    // name: name.replace("/", "."),
    name: name,
    path: `/${name}`,
    component: module.default,
  } as RouteRecordRaw;

  //module.default?.route 自定义路由
  //也可 path: "/user/:id"
  //示例: export default {
  //   route: { path: "/user" },
  // };
  return Object.assign(router, module.default?.route);
  
}

const routes = env.VITE_ROUTER_AUTOLOAD
  ? getRoutes()
  : ([] as RouteRecordRaw[]);
export default routes;
// export default getRoutes;
