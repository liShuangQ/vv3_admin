<template>
  <div>
    <div><h1 class="text-red-500">子:</h1></div>
    <div>
      父传子结果 :
      <div>
        <h1 class="inline-block">{{ props.text }}</h1>
      </div>
      <div>
        <h1 class="inline-block">{{ props.obj }}</h1>
      </div>
    </div>
    <div>父触发子方法结果 : {{ num }}</div>
    <div>
      子触发父方法 :<a-button
        size="small"
        type="primary"
        @click="emit('handleFather', '+')"
        >子触发父方法</a-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
// ['change', 'update']
const props = withDefaults(
  defineProps<{
    text: string;
    obj?: { name: string }[]; // 是否必传
  }>(),
  {
    text: "默认值",
    obj: () => {
      return [{ name: "" }];
    },
  }
);
// let props = defineProps<{
//   aa: string;
// }>();

let emit = defineEmits<{ (event: "handleFather", a: string): void }>();

let num = ref<number>(0);
const numAdd = (): void => {
  num.value++;
};

defineExpose({
  numAdd,
});
</script>

<style scoped></style>
