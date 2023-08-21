import { Menu } from "#/menu";
const routeData: Menu[] = [
  { //  -- path, meta.title, meta.parentPaths 影响MenuRouter的默认历史菜单中清除到没有清除选项时候的默认菜单，改变时对应修改--
    name: "admin.index",
    path: "/index",
    component: () => import("@/views/admin/dashboard/index.vue"),
    meta: {
      title: "menu.home",
      icon: "home-outlined",
      show: true,
      parentPaths: [],
    },
  },
  {
    name: "menuOne",
    path: "/menuOne",
    component: null,
    meta: {
      title: "menu.menuOne",
      icon: "pie-chart-outlined",
      show: true,
      parentPaths: [],
    },
    children: [
      {
        name: "menuTwo",
        path: "/menuTwo",
        component: null,
        meta: { title: "menu.menuTwo", icon: "", show: true, parentPaths: [] },
        children: [
          {
            name: "formDemo",
            path: "/formDemo",
            component: () => import("@/views/admin/demonstrate/antdDemo/formdemo.vue"),
            meta: {
              title: "menu.formDemo",
              icon: "",
              show: true,
              parentPaths: ["/menuOne", "/menuTwo"],
            },
          },
          {
            name: "tableDemo",
            path: "/tableDemo",
            component: () => import("@/views/admin/demonstrate/antdDemo/tabledemo.vue"),
            meta: {
              title: "menu.tableDemo",
              icon: "",
              show: true,
              parentPaths: ["/menuOne", "/menuTwo"],
            },
          },
        ],
      },
    ],
  },
  {
    name: "componentDemo",
    path: "/componentDemo",
    component: null,
    meta: {
      title: "menu.components",
      icon: "api-outlined",
      show: true,
      parentPaths: [],
    },
    children: [
      {
        name: "antdFormDemo",
        path: "/antdFormDemo",
        component: () => import("@/views/admin/demonstrate/antdFormDemo/index.vue"),
        meta: {
          title: "menu.antdFormDemo",
          icon: "",
          show: true,
          parentPaths: ["/componentDemo"],
        },
      },
      {
        name: "antdTableDemo",
        path: "/antdTableDemo",
        component: () => import("@/views/admin/demonstrate/antdTableDemo/index.vue"),
        meta: {
          title: "menu.antdTableDemo",
          icon: "",
          show: true,
          parentPaths: ["/componentDemo"],
        },
      },
    ],
  },
  {
    name: "vueCodeDemo",
    path: "/vueCodeDemo",
    component: null,
    meta: {
      title: "menu.vueCodeDemo",
      icon: "api-outlined",
      show: true,
      parentPaths: [],
    },
    children: [
      {
        name: "vueDemo",
        path: "/vueDemo",
        component: () => import("@/views/admin/demonstrate/vueDemo/index.vue"),
        meta: {
          title: "menu.vueDemo",
          icon: "",
          show: true,
          parentPaths: ['/vueCodeDemo'],
        },
      },
      {
        name: "tsxDemo",
        path: "/tsxDemo",
        component: () => import("@/views/admin/demonstrate/tsxDemo/index"),
        meta: {
          title: "menu.tsxDemo",
          icon: "",
          show: true,
          menuHidden: false,
          parentPaths: ['/vueCodeDemo'],
        },
      },
      {
        name: "functionalDemo",
        path: "/functionalDemo",
        component: () => import("@/views/admin/demonstrate/functionalDemo/index.vue"),
        meta: {
          title: "menu.functionalDemo",
          icon: "",
          show: true,
          menuHidden: false,
          parentPaths: ['/vueCodeDemo'],
        },
      },
    ],
  },
  {
    name: "ifamedemo",
    path: "/ifamedemo",
    component: () => import("@/views/admin/demonstrate/ifame/index.vue"),
    meta: {
      url: "https://www.baidu.com/",
      title: "menu.ifamedemo",
      icon: "desktop-outlined",
      show: true,
      menuHidden: false,
      parentPaths: [],
    },
  },
  {
    name: "v2ElementCreateCode",
    path: "/v2ElementCreateCode",
    component: () => import("@/views/admin/demonstrate/v2ElementCreateCode/index.vue"),
    meta: {
      title: "menu.v2ElementCreateCode",
      icon: "desktop-outlined",
      show: true,
      parentPaths: [],
    },
  },
  {
    name: "contrastConfig",
    path: "/contrastConfig",
    component: () => import("@/views/admin/demonstrate/contrastConfig/index.vue"),
    meta: {
      title: "menu.contrastConfig",
      icon: "desktop-outlined",
      show: true,
      parentPaths: [],
    },
  },
  {
    name: "cssDemos",
    path: "/cssDemos",
    component: () => import("@/views/admin/demonstrate/cssDemos/index.vue"),
    meta: {
      title: "menu.cssDemos",
      icon: "desktop-outlined",
      show: true,
      menuHidden: true,
      parentPaths: [],
    },
  },
];
export default routeData;
