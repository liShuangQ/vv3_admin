<template>
  <div>
    <div>
      <h1 class="text-red-500">父:</h1>
      <div>
        父触发子组件<a-button
          size="small"
          type="primary"
          @click="handleChildrenAdd()"
        >
          触发子组件
        </a-button>
      </div>
      <div>
        子触发父结果:
        <h1 class="inline-block">{{ faText }}</h1>
      </div>
      <div class="border-solid border-spacing-4 border-yellow-700">
        <children
          ref="childrenRef"
          :text="text"
          :obj="childrenObj"
          @handleFather="handleFather"
        ></children>
      </div>
    </div>
    <div class="w-full h-2 bg-red-500 my-9"></div>
    <div>
      <h1>循环组件1:</h1>
      <div>
        <item
          v-for="(item, index) in itemData"
          :ref="(e) => setRef(e, item.key)"
          :key="index"
          :d="item"
        ></item>
      </div>
      <a-button size="small" type="primary" @click="itemAdd()"> ++ </a-button
      >&nbsp;|&nbsp;
      <a-button size="small" type="primary" @click="itemGet()"> get </a-button>
    </div>
    <div class="w-full h-2 bg-red-500 my-9"></div>
    <div>
      <h1>循环组件2:</h1>
      <div>
        <item2
          v-for="(item, index) in itemData2"
          :key="index"
          :d="item"
        ></item2>
      </div>
      <a-button size="small" type="primary" @click="itemAdd2()"> ++ </a-button
      >&nbsp;|&nbsp;
      <a-button size="small" type="primary" @click="itemGet2()"> get </a-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const children = defineAsyncComponent(() => import("./children.vue"));
const item = defineAsyncComponent(() => import("./item.vue"));
const item2 = defineAsyncComponent(() => import("./item2.vue"));
let text = ref<string>("给子组件");
let childrenRef = ref();
let childrenObj = ref<{ name: string }[]>([{ name: "简易数组对象" }]);
let handleChildrenAdd = (): void => {
  text.value += "+";
  childrenRef.value.numAdd();
  childrenObj.value.forEach((e) => {
    e.name += "+";
  });
};

let faText = ref<string>("父组件文字");
let handleFather = (d: string): void => {
  faText.value += d;
};

// 循环组件
let itemData = ref<{ key: string; name: string }[]>([
  { key: "1", name: "普通字符串1" },
  { key: "2", name: "普通字符串2" },
]);
// 如果是非响应式,在下方方法中操作依然会对子组件的数据进行影响,只是视图不会更新!!!
let refs = {}; //循环ref的方式
const setRef = (e: object | null, k: string) => {
  refs[k] = e;
};
const itemAdd = () => {
  itemData.value.forEach((e) => {
    e.name += "+";
  });
};
const itemGet = () => {
  console.log(
    "子组件getName",
    Object.keys(refs).map((k) => {
      return refs[k].getName();
    }),
    "itemData父组件原始",
    toRaw(itemData.value)
  );
};

// 循环组件2
interface Item2Type {
  key: string;
  config: { name: string }[]; // 在此注意config只能是一个对象，如果直接使用数组的话，在子组件对name修改的数据不会成功响应
}
let itemData2 = ref<Item2Type[]>([
  { key: "1", config: [{ name: "复杂类型1" }] },
  { key: "2", config: [{ name: "复杂类型2" }] },
]);
const itemAdd2 = () => {
  itemData2.value.forEach((e) => {
    e.config.forEach((ee) => {
      ee.name += "+";
    });
  });
};
const itemGet2 = () => {
  console.log("itemData2父组件原始", toRaw(itemData2.value));
};
</script>

<style scoped></style>
