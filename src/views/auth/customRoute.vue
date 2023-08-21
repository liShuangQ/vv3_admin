<template>
  <div>
    自定义路由
    <s></s>
    {{ a }}
    <button @click="add()">++</button>
  </div>
</template>

<script lang="ts">
export default {
  // 自定义路由  (开启按照页面自动加载路由情况下)
  route: { path: "/customRoute",name:'customRoute'},
};
</script>
<script lang="ts" setup>

let a = ref(1);
const add = () => {
  a.value++;
};
</script>

<style scoped></style>
