<template>
  <div class="w-full grid grid-cols-7 grid-rows-6 gap-x-4 gap-y-6">
    <a-button type="primary" @click="info">Display normal message</a-button>
    <a-button type="primary" @click="httpsDemo(true)">节流请求</a-button>
    <a-button type="primary" @click="httpsDemo(false)">普通请求</a-button>
    <a-button type="primary" @click="add()">添加tab测试</a-button>
    <a-space direction="vertical" :size="12">
      <a-date-picker v-model:value="value1" picker="week" />
    </a-space>
    <div>
      自定义指令：
      <h3 v-format-time="'YYYY-MM-DD hh:mm:ss'">1632475987312</h3>
    </div>
    <div ref="draggable" class="bg-amber-400 w-[200px] h-[200px] fixed cursor-move select-none" :style="style">
      <div>VueUse试用</div>
      <div>{{x}}</div>
      <div>{{y}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Https from "@/hooks/UseHttps";
import { message } from "ant-design-vue";
import type { Dayjs } from "dayjs";
import { page } from "@/utils/index";
import { useDraggable } from '@vueuse/core'
const info = () => {
  message.info("This is a normal message");
};
const httpsDemo = (config: boolean) => {
  interface User {
    name: string;
    age: number;
    headPortrait: string;
  }
  Https.post<User>({
    url: "user/info",
    throttle: config,
    spinning: config,
    data: {},
  })
    .then((res) => {
      message.success(res.msg);
    })
    .catch((err) => {
      console.log(err);
    });
};
let value1 = ref<Dayjs>();

const add = () => {
  page.addTab({
    openKeys: [""],
    selectedKeys: "/cssDemos",
    title: "menu.cssDemos",
    // title: "cssDemos",
  });
  return;
};

const draggable = ref<HTMLElement|null>()
const { x, y, style } = useDraggable(draggable, {
  initialValue: { x: 40, y: 40 },
})
</script>

<style scoped></style>
