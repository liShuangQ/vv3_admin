import vue from "@vitejs/plugin-vue";
import { Plugin } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import vueJsx from "@vitejs/plugin-vue-jsx"
import { setupAutoImportPlugin,setupAutoImportAntd } from "./autoImport";
import { setupMockPlugin } from "./mock";
import { setupLegacyPlugin } from "./legacy";
export function setupPlugins(isBuild: boolean, env: ViteEnv) {
    const plugins: Plugin[] = [vue()];
    plugins.push(vueJsx());
    plugins.push(setupMockPlugin(isBuild));
    plugins.push(setupAutoImportPlugin());
    plugins.push(setupAutoImportAntd());
    plugins.push(eslintPlugin());
    plugins.push(setupLegacyPlugin());
    return plugins;
}
