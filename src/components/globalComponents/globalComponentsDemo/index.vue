<template>
  <div>
    <h2>演示全局组件注册 : {{ props.text }}</h2>
  </div>
</template>

<script lang="ts" setup>
let props = defineProps({
  text: String,
});
</script>

<style scoped></style>
