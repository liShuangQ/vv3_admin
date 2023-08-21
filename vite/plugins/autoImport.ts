import AutoImport from "unplugin-auto-import/vite";
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export function setupAutoImportPlugin() {
    return AutoImport({
        imports: ["vue", "vue-router", "vue-i18n"],
        dts: "types/auto-imports.d.ts",
      });
  }


export function setupAutoImportAntd() {
  return Components({
    resolvers: [AntDesignVueResolver()],
  })
}