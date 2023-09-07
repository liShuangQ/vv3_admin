<template>
  <div class="w-screen h-screen bg-red-300">
    <div>主页 home</div>
    <div class="bg-blue-500 w-max mb-2">
      <router-link :to="{ name: 'admin.index' }">后台管理</router-link>
    </div>
    <div class="bg-blue-500 w-max">
      <router-link :to="{ name: 'login' }">用户登录</router-link>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<script lang="ts">
export default {
    route: { name: "home" },
};
</script>

<style scoped></style>
