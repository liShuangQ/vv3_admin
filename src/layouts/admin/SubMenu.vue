<template>
  <a-sub-menu
    v-if="menuInfo.meta.show && !(menuInfo.meta.menuHidden || false)"
    :key="menuInfo.path"
  >
    <template #icon
      ><component v-if="menuInfo.meta.icon" :is="menuInfo.meta.icon"></component
    ></template>
    <template #title>{{ $t(menuInfo.meta.title) }}</template>
    <template v-for="item in menuInfo.children" :key="item.path">
      <template v-if="!item.children || item.children.length === 0">
        <a-menu-item
          v-if="item.meta.show && !(item.meta.menuHidden || false)"
          :key="item.path"
        >
          <template #icon>
            <component v-if="item.meta.icon" :is="item.meta.icon"></component>
          </template>
          {{ $t(item.meta.title) }}
        </a-menu-item>
      </template>
      <template v-else>
        <sub-menu :menu-info="item" :key="item.path" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script setup lang="ts">
const props = defineProps(["menuInfo"]);
</script>

<style scoped></style>
