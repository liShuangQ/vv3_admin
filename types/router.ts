import "vue-router";
declare module "vue-router" {
  interface RouteMeta {
    auth?: boolean; //验证必须登录
    guest?: boolean; //只有游客才可访问
    show?: boolean; //路由是否在菜单中显示
    title?: string; //菜单标题
    icon?: string; //菜单图标
    permissions?: string[];//访问权限
  }
}
