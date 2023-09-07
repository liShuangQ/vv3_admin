<template>
  <div class="bg-white flex justify-between items-center h-full">
    <div>
      <!-- 消息 -->
      <a-badge :count="count" :offset="[4, -1]" class="mr-4">
        <a class="text-black">{{ $t("navbar.message") }}</a>
      </a-badge>
      <!-- 帮助 -->
      <span class="mr-4"> {{ $t("navbar.help") }}</span>
      <!-- 用户操作 -->
      <a-avatar :src="userStore.info?.headPortrait" />
      <a-dropdown class="text-black ml-2">
        <a class="ant-dropdown-link" @click.prevent>
          {{ userStore.info?.name }}
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a class="text-black mr-4" @click="allFull()">{{
                $t("navbar.fullScreen")
              }}</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="hookLock()">{{
                $t("navbar.hookLock")
              }}</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="showModal()">{{
                $t("navbar.userInfo")
              }}</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;" @click="userLogOut()">{{
                $t("navbar.logOut")
              }}</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
    <div>
      <a-modal
        v-model:visible="infoVisible"
        :title="$t('navbar.userInfo')"
        :footer="null"
      >
        <p>{{ $t("navbar.name") }} : {{ userStore.info?.name }}</p>
        <p>{{ $t("navbar.age") }} : {{ userStore.info?.age }}</p>
      </a-modal>
      <a-modal
        v-model:visible="lockVisible"
        :footer="null"
        :keyboard="false"
        :maskClosable="false"
        :closable="!locking"
        :title="$t('navbar.hookLock')"
      >
        <a-input-search
          v-if="!locking"
          v-model:value="lockPassWord"
          :placeholder="$t('navbar.setHookLockPlaceholder')"
          :enter-button="$t('navbar.HookLockLock')"
          size="large"
          @search="onPassWord()"
        />
        <a-input-search
          v-else
          v-model:value="inputLockPassWord"
          :placeholder="$t('navbar.openHookLockPlaceholder')"
          :enter-button="$t('navbar.HookLockOpen')"
          size="large"
          @search="openBlock()"
        />
      </a-modal>
    </div>
  </div>
</template>

<script setup lang="ts">
import user from "@/store/user";
import { message } from "ant-design-vue";
//获取用户信息
const userStore = user();
//消息
let count = ref<number>(1);
//用户操作
let infoVisible = ref<boolean>(false);
const showModal = () => {
    infoVisible.value = true;
};
const userLogOut = () => {
    userStore.userLogOut();
};
// 整个管理系统全屏
const allFull = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    }
    // else if ( element.webkitRequestFullScreen ) {
    //   element.webkitRequestFullScreen()
    // } else if ( element.mozRequestFullScreen ) {
    //   element.mozRequestFullScreen()
    // } else if ( element.msRequestFullscreen ) {
    //   element.msRequestFullscreen()
    // }
};
// 挂机锁
let lockVisible = ref<boolean>(false);
let lockPassWord = ref<string>("");
let inputLockPassWord = ref<string>("");
let locking = ref<boolean>(false);
const hookLock = (): void => {
    lockVisible.value = true;
    return;
};
const onPassWord = (): void => {
    locking.value = true;
    return;
};
const openBlock = (): void => {
    if (lockPassWord.value === inputLockPassWord.value) {
        lockVisible.value = false;
        locking.value = false;
        lockPassWord.value = "";
        inputLockPassWord.value = "";
    } else {
        message.warning("密码输入错误");
    }
    return;
};
</script>

<style scoped></style>
