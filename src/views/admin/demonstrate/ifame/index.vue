<template>
  <div>
    <iframe :src="url" frameborder="0" class="w-full h-full"></iframe>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
let url = router.currentRoute.value.meta.url as string;
url += "?aa=123";
</script>

<style lang="less" scoped></style>
