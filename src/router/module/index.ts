import { RouteRecordRaw } from "vue-router";
export default function autoloadModuleRoutes() {
    let routes = [] as RouteRecordRaw[];
    const modules:any = import.meta.glob("./**.ts", { eager: true })
    Object.keys(modules).forEach((k) => {
        routes.push(modules[k].default);
    });
    return routes;
}
