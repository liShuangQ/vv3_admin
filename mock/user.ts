import { Random } from "mockjs";
import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/api/user/info",
    method: "post",
    response: () => {
      return {
        code: 0,
        success: true,
        msg: "请求成功",
        data: {
          name: "测试用户",
          age: 19,
          headPortrait: "../../../public/favicon.ico",
          lang:'zh',
          menus: [
            {
              name: "admin.index",
              path: "/index",
              meta: { title: "后台首页"},
            },
            {
              name: "formDemo",
              path: "/formDemo",
              meta: { title: "表单演示"},
            }
          ],
        },
      };
    },
  },
  {
    url: "/api/user/login",
    method: "post",
    response: () => {
      return {
        code: 0,
        success: true,
        msg: "登录成功",
        data: {
          token: Random.string(10),
        },
      };
    },
  },
] as MockMethod[];
