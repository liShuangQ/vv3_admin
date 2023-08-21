<template>
  <a-layout class="h-full">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      :style="{ overflow: 'auto' }"
    >
      <div class="logo">{{ $t("tit.Admin") }}</div>
      <Menu ref="MenuRef"></Menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="p-0 h-10 flex justify-between bg-white">
        <div class="flex items-center">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined
            v-else
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menuSearch></menuSearch>
        </div>
        <div class="mr-6 h-full">
          <navbar></navbar>
        </div>
      </a-layout-header>
      <a-layout-content>
        <div
          class="h-auto pl-2 bg-white flex justify-between"
          style="border: 1px solid #e5e7eb; border-bottom: 2px solid #e5e7eb"
        >
          <historyLink></historyLink>
          <ability
            @pageFullScreen="pageFullScreen"
            @refreshPage="refreshPage"
          ></ability>
        </div>
        <div
          style="height: calc(100% - 2.5rem + 4px)"
          class="bg-white w-full box-border p-[16px] overflow-auto"
        >
          <!-- :key="$router.currentRoute.value.fullPath" -->
          <router-view
            #default="{ Component }"
            :class="
              full
                ? 'overflow-auto h-full w-full bg-white fixed top-0 left-0'
                : 'overflow-auto h-full w-full bg-white'
            "
          >
            <Transition
              appear
              enter-active-class="animate__animated animate__fadeIn"
            >
              <component v-if="refreshPageValue" :is="Component"></component>
            </Transition>
          </router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
export default {
  // 登录才可进入
  route: {
    meta: {
      auth: true,
    },
  },
};
</script>
<script lang="ts" setup>
import { message } from "ant-design-vue";
import i18n from "@/plugins/i18n";
const Menu = defineAsyncComponent(() => import("./admin/menu.vue"));
const navbar = defineAsyncComponent(() => import("./admin/navbar.vue"));
const historyLink = defineAsyncComponent(
  () => import("./admin/historyLink.vue")
);
const menuSearch = defineAsyncComponent(() => import("./admin/menuSearch.vue"));
const ability = defineAsyncComponent(() => import("./admin/ability.vue"));

const { t } = i18n.global;
let collapsed = ref<boolean>(false);
let MenuRef = ref(null);

// ability 组件操作
let full = ref<boolean>(false); // 是否页面全屏
const setFullFun = (e: any) => {
  if (e.keyCode === 27) {
    full.value = false;
    document.removeEventListener("keyup", setFullFun);
  }
};
const pageFullScreen = () => {
  full.value = true;
  message.info(t("navbar.fullScreenTit"));
  document.addEventListener("keyup", setFullFun);
};

let refreshPageValue = ref<boolean>(true);
const refreshPage = () => {
  refreshPageValue.value = false;
  nextTick(() => {
    refreshPageValue.value = true;
  });
  return;
};
</script>
<style scoped>
.animate__fadeIn {
  animation-duration: 0.8s;
}

.trigger {
  font-size: 18px;
  /* line-height: 100%; */
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.logo {
  line-height: 32px;
  text-align: center;
  margin: 16px;
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
}

.trigger:hover {
  color: #1890ff;
}

.site-layout .site-layout-background {
  background: #fff;
}
</style>
