<template>
  <div class="bg-blue-200">
    <h1>最外层父组件VUE:</h1>
    <div class="box-border p-10">
      <tsx ref="tsxRef" :msg="msg" :num="num" @faNumAdd="faNumAdd"></tsx>
    </div>
    <button @click="test">按钮</button>
  </div>
</template>

<script setup lang="ts">
import tsx from "./tsx";
let num = ref<number>(0);
let msg = ref<string>("我是父组件传的值");
let tsxRef = ref();
const test = (): void => {
    msg.value += "+";
    tsxRef.value.showMe();
};
const faNumAdd = (n: number): void => {
    num.value = num.value + n;
};
</script>

<style scoped></style>
