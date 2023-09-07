import { App } from "vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import * as AntdIconsVue from "@ant-design/icons-vue";
import setAntVueConfig from "./config"
setAntVueConfig()
export default function setupAntd(app: App) {
    for (const [key, component] of Object.entries(AntdIconsVue)) {
        app.component(key, component);
    }
    // app.use(Antd);
}

