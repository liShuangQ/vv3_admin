import { createApp } from "vue";
import App from "./App.vue";
import router, { setupRouter } from "@/router";
import { setupPlugins } from "./plugins";
// ------store文件夹中除了这3个应均为pinia------
import setGlobalProperties from "./store/globalProperties";
import globalVars from "./store/globalVars";
import setDirective from './store/directive'
//-------------------------------------------

const bootstrap = async () => {
    const app = createApp(App);
    // 挂app方式（不太推荐）
    setGlobalProperties(app)
    // 依赖注入方式（推荐）
    app.provide('globalVars', globalVars)
    // 自定义全局指令
    setDirective(app)
    // 插件
    setupPlugins(app);
    // 路由
    setupRouter(app);
    await router.isReady(); //等路由处理好在挂载页面
    app.mount("#app");
};
bootstrap();
