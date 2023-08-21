<template>
  <div>
    <h1>
      当前有 {{ modules.length }} 个文件，当文件key出现次数大于等于
      <a-input-number
        id="inputNumber"
        v-model:value="showNum"
        :min="1"
        :max="modules.length"
        size="small"
      />时认定为公共配置？
      <a-button type="primary" size="small" @click="showConfigDetails()"
        >确定</a-button
      >
    </h1>
    <h1>
      tip：相反则是小于上方数字的key为定制配置，
      每次重新获取数据时要刷新整个网页！！！
    </h1>
    <div>
      <h2>公共配置</h2>
      <pre>{{ publics }}</pre>
    </div>
    <div>
      <h2>定制配置</h2>
      <pre>{{ privates }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
// const modulesFiles: any = import.meta.globEager("./configs/*.js");
const modulesFiles: any = import.meta.glob("./configs/*.js", { eager: true });
let modules: any = [];
Object.keys(modulesFiles).forEach((e) => {
  modules.push([e, modulesFiles[e].default]);
});
let ALL_KEYS: any = {};
// 第一遍 添加出全部的key
modules.forEach((e: any, i: any) => {
  Object.entries(e[1]).forEach(([k, v]) => {
    if (!ALL_KEYS.hasOwnProperty(k)) {
      ALL_KEYS[k] = {
        appear: [],
        num: 0,
      };
    }
  });
});
// 第二遍 添加出每个key的出现路径内容和次数
modules.forEach((e: any, i: any) => {
  Object.entries(e[1]).forEach(([k, v]) => {
    ALL_KEYS[k].num += 1;
    ALL_KEYS[k].appear.push({
      fileName: e[0].split("/").pop(),
      value: v,
    });
  });
});

let showNum = ref<number>(0);
let publics = ref<any>([]);
let privates = ref<any>([]);
let temporary: any = [];
const showConfigDetails = () => {
  publics.value = [];
  privates.value = [];
  Object.entries(ALL_KEYS).forEach(([k, v]) => {
    if (ALL_KEYS[k].num >= showNum.value) {
      let all = ALL_KEYS[k].appear.map((e: any) => {
        return e.value;
      });
      let out: any = [];
      new Set(all).forEach((e: any) => {
        let n = 0;
        all.forEach((e1: any) => {
          if (e === e1) {
            n += 1;
          }
        });
        out.push([e, n]);
      });
      publics.value.push({
        key: k,
        values: out.map((e: any) => {
          return `   ${e[0]}   出现了${e[1]}次`;
        }),
      });
    }
    if (ALL_KEYS[k].num < showNum.value) {
      ALL_KEYS[k].appear.forEach((e: any) => {
        temporary.push({
          key: k,
          info: [`在文件 ${e.fileName} 中的值为 ${e.value}`],
        });
      });
    }
  });
  let all = new Set(
    temporary.map((e: any) => {
      return e.key;
    })
  );
  all.forEach((e: any) => {
    let cache: any = {
      key: e,
      info: [],
    };
    temporary.forEach((e1: any) => {
      if (e === e1.key) {
        cache.info.push(e1.info[0]);
      }
    });
    privates.value.push(cache);
  });
};
</script>

<style lang="less" scoped></style>
