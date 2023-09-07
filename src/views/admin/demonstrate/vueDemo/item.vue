<template>
  <div>
    <div>
      原始
      {{ props.d }}
    </div>
    <div>
      响应1(copy 1)
      {{ copy }}
    </div>
    <div>
      响应2(copy 2)
      {{ copy2 }}
    </div>
  </div>
  <div>
    <a-button size="small" type="primary" @click="copyAdd()">
      copyAdd
    </a-button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  d: { key: string; name: string };
}>();

// props是只读的不可直接修改值操作
// 由于props是只读的,所以再次响应声明,此时的修改会直接影响到父组件数据
let copy = ref(props.d);
let copy2 = toRef(props, "d"); //两种写法一样 都是转换成响应式的, 如果直接赋值的话会报错
const copyAdd = () => {
    copy.value.name += "-";
    copy2.value.name += "-";
};

const getName = () => {
    return {
        faName: props.d.name,
        copy: copy.value.name,
        copy2: copy2.value.name,
    };
};
defineExpose({ getName });
</script>
