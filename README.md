# vv3

使用 node>16 + pnpm 启动

- 用于学习，也可用于企业项目。
- 管理系统页面鉴权，路由守卫，axios 等实现基本封装，可在其基础上再次封装，加入了 i18n 国际化，可满足基本管理系统需求。

## 主要使用技术

- Vite3.2.7 + TypeScript + Vue3
- TailWindCss + Sass + ant-design-vue + i18n
- Axios + Pinia + vue-router@4

## 运行方式`

`
clone 代码后

1. cd xxx
2. pnpm install
3. 开发 pnpm run dev
4. 生产 pnpm run build

## .env 文件配置说明

- VITE_SKIP_ROUTER_GUARD `是否跳过路由守卫丢失登陆权限等限制，谨慎打开`
- VITE_TOKEN_KEY `在缓存中token的存储获取key`
- VITE_IS_MOCK `是否开启mock`
- VITE_BASE_URL `url`
- VITE_BUILD_NAME `打包包名`
- VITE_CONFINE_DEVELOP `是否开启在调试控制台的时候debug`
- VITE_REAR_MENU `是否开启后台路由权限校验`
- VITE_THROTTLE_TIME `接口节流时的等待时间`
