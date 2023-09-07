<template>
  <div class="py-1 h-full flex items-center w-full overflow-hidden">
    <span v-for="item in menu.historyMenu" :key="item.selectedKeys">
      <a-tag
        class="hover:bg-blue-500 hover:text-white cursor-pointer"
        :class="{ 'bg-blue-500 text-white': $route.path === item.selectedKeys }"
        ><span @click="tagSub(item)" class="mr-1 leading-5">{{
          $t(item.title)
        }}</span>
        <span v-if="item.selectedKeys !== '/index'" @click="tagDel(item)"
          ><close-outlined class="hover:text-red-700" /></span
      ></a-tag>
    </span>
  </div>
</template>

<script setup lang="ts">
import { HistoryMenu } from "#/menu";
import router from "@/router";
import MenuRoute from "@/store/MenuRoute";
const menu = MenuRoute();
const tagSub = (item: HistoryMenu) => {
    router.push({ path: item.selectedKeys });
};
const tagDel = (item: HistoryMenu) => {
    let hm = menu.removeHistoryMenu(item);
    hm &&
    router.push({
        path: hm.selectedKeys,
    });
};
</script>

<style scoped></style>
