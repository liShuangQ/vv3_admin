<template>
  <div class="py-1 h-full flex items-center mr-2">
    <!-- 历史菜单操作 -->
    <a-dropdown>
      <template #overlay>
        <a-menu @click="historyLinkHandle">
          <a-menu-item key="all">
            {{ $t("navbar.historyLinkAll") }}
          </a-menu-item>
          <a-menu-item key="now">
            {{ $t("navbar.historyLinkNow") }}
          </a-menu-item>
          <a-menu-item key="left">
            {{ $t("navbar.historyLinkLeft") }}
          </a-menu-item>
          <a-menu-item key="right">
            {{ $t("navbar.historyLinkRight") }}
          </a-menu-item>
        </a-menu>
      </template>
      <a class="ant-dropdown-link" @click.prevent>
        <img class="abilityIcon" src="../../../public/icon/angle-down.svg" />
      </a>
    </a-dropdown>
    <span class="splitFont">|</span>
    <!-- 刷新页面 -->
    <a-tooltip placement="bottom">
      <template #title>
        <span> {{ $t("navbar.refreshPage") }}</span>
      </template>
      <img
        class="abilityIcon"
        @click="emit('refreshPage')"
        src="../../../public/icon/reset.svg"
      />
    </a-tooltip>
    <!-- 内容全屏 -->
    <a-tooltip placement="bottom">
      <template #title>
        <span> {{ $t("navbar.contentFullScreen") }}</span>
      </template>
      <img
        class="abilityIcon"
        @click="emit('pageFullScreen')"
        src="../../../public/icon/full.svg"
      />
    </a-tooltip>
    <span class="splitFont">|</span>
    <!-- 国际化 永远是菜单最后一项-->
    <a-dropdown class="w-max">
      <a class="ant-dropdown-link" @click.prevent>
        <img
          class="align-text-bottom cursor-pointer abilityIcon"
          style="width: 18px"
          src="../../../public/icon/language.svg"
        />
      </a>
      <template #overlay>
        <a-menu>
          <a-menu-item>
            <div @click="langChange('zh')">中文</div>
          </a-menu-item>
          <a-menu-item>
            <div @click="langChange('en')">English</div>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>
<script setup lang="ts">
import MenuRoute from "@/store/MenuRoute";
import type { MenuProps } from "ant-design-vue";
import router from "@/router";
import user from "@/store/user";
const menuStore = MenuRoute();
const userStore = user();
const emit = defineEmits<{
  (event: "pageFullScreen"): void;
  (event: "refreshPage"): void;
}>();
// 对于历史菜单标签的操作
const historyLinkHandle: MenuProps["onClick"] = (e) => {
    menuStore.handleHistoryMenu(
        router.currentRoute.value.path,
    e.key as "left" | "right" | "now" | "all"
    );
};
// 国际化
const { locale } = useI18n();
locale.value = userStore.info?.lang ?? "zh";
const langChange = (val: string): void => {
    locale.value = val;
};
</script>

<style lang="scss" scoped>
.abilityIcon {
  @apply w-4 cursor-pointer mx-2;
}

.splitFont {
  color: #8a8b8b;
  font-weight: bold;
}
</style>
