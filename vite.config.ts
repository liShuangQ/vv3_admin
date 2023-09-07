import { ConfigEnv, loadEnv } from "vite";
import alias from "./vite/alias";
import { parseEnv } from "./vite/utils";
import { setupPlugins } from "./vite/plugins";
// https://vitejs.dev/config/

export default ({ command, mode }: ConfigEnv) => {
  
    // 当前是否在生产模式
    const isBuild = command === "build";
    // 提取.env文件内容(全是字符串类型) loadEnv(mode, root)
    const root = process.cwd();
    // 把.env内类型转成原有类型
    const env = parseEnv(loadEnv(mode, root));

    return {
        plugins: setupPlugins(isBuild, env),
        resolve: {
            alias,
        },
        // 配置生产环境服务器路径
        base: isBuild ? `/${env.VITE_BUILD_NAME}/` : "/",
        // base: "/",
        // 生产环境
        build: {
            outDir: env.VITE_BUILD_NAME,
            sourcemap:false,
            target: 'es2015',
            rollupOptions: {
                emptyOutDir: false,
                output: {
                    manualChunks(id: string) {
                        if (id.includes("node_modules")) {
                            return id
                                .toString()
                                .split("node_modules/")[1]
                                .split("/")[0]
                                .toString();
                        }
                    },
                },
            },
        },
        //开发环境设置
        server: {
            proxy: {
                // 选项写法  实际要访问api 会替换成 target
                // "/api": {
                //   target: "http://jsonplaceholder.typicode.com",
                //   changeOrigin: true,
                //   rewrite: (path: string) => path.replace(/^\/api/, ""),
                // },
            }
        },
    };
};
