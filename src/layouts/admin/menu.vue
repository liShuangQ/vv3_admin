<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
    @click="routerTo"
  >
    <template v-for="item in list" :key="item.path">
      <template v-if="!item.children || item.children.length === 0">
        <a-menu-item
          v-if="item.meta.show && !(item.meta.menuHidden || false)"
          :key="item.path"
        >
          <template #icon>
            <component v-if="item.meta.icon" :is="item.meta.icon"></component>
          </template>
          {{ $t(item.meta.title) }}
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :key="item.path" :menu-info="item" />
      </template>
    </template>
  </a-menu>
</template>
<script lang="ts">
import MenuRouter from "@/store/MenuRoute";
import router from "@/router";
import SubMenu from "./SubMenu.vue";
export default defineComponent({
  components: {
    "sub-menu": SubMenu,
  },
  setup() {
    const collapsed = ref<boolean>(false);
    const menuStore = MenuRouter();
    const list = menuStore.menu.children;
    const routeArr = menuStore.route;

    let selectedKeys = ref<string[]>(["/index"]);
    let openKeys = ref<string[]>([""]);

    const routerTo = (e: { item: object; key: string; keyPath: string[] }) => {
      const goPathData =
        routeArr.children &&
        routeArr.children.find((v) => {
          return v.path === e.key;
        });
      menuStore.addHistoryMenu({
        // title: e.domEvent.path[0].innerText,
        title: goPathData?.meta.title as string,
        selectedKeys: e.key,
        openKeys: e.keyPath,
      });
      router.push({ path: e.key });
    };
    const setMenuPosition = (s: string, o: string[]): void => {
      selectedKeys.value = [s];
      openKeys.value = o;
    };

    // 响应切换菜单的展开
    watch(
      () => router.currentRoute.value.path,
      (newValue) => {
        if (router.currentRoute.value.meta.parentPaths) {
          openKeys.value = router.currentRoute.value.meta
            .parentPaths as string[];
        } else {
          openKeys.value = [""];
        }
        selectedKeys.value = [newValue];
      },
      { immediate: true }
    );

    return {
      list,
      collapsed,
      selectedKeys,
      openKeys,
      routerTo,
      setMenuPosition,
    };
  },
});
</script>
