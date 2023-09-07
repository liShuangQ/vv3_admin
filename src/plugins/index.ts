import { App } from "vue";
import setupAntd from "./antdesignvue";
import setupPinia from "./pinia";
import { setupTailWindCss } from "./tailwindcss";
import {setupI18n} from "./i18n";

// 自动注册全局组件  globalComponents
function autoRegisterComponents(app: App) {
    // const components = import.meta.globEager(
    //   "../components/globalComponents/*/index.vue"
    // ) as any
    const components = import.meta.glob(
        "../components/globalComponents/*/index.vue",{eager:true}
    ) as any
    Object.keys(components).forEach((k) => {
        const cache = k.split("/")
        // const name = k.split("/").pop()?.split(".").shift() as string;
        const name = k.split("/")[cache.length -2] as string;
        app.component(name, components[k].default);
    });
}

export function setupPlugins(app: App) {
    setupPinia(app);
    autoRegisterComponents(app);
    setupTailWindCss();
    setupAntd(app); //更改后改为自动引入，当前函数只导入icon
    setupI18n(app);

}
