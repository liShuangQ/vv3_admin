<template>
  <div>
    <a-select
      v-model:value="value"
      show-search
      :placeholder="$t('navbar.menuSearch')"
      style="width: 300px"
      size="small"
      :allowClear="false"
      :showArrow="false"
      :maxTagCount="10"
      :options="options"
      :filter-option="filterOption"
      @blur="handleBlur"
      @change="handleChange"
    ></a-select>
  </div>
</template>

<script setup lang="ts">
import MenuRouter from "@/store/MenuRoute";
import router from "@/router";
import i18n from "@/plugins/i18n";
const { t } = i18n.global;
const { locale } = useI18n();
const MenuRouterStore = MenuRouter();
let value = ref<string | undefined>(undefined);
interface Option {
  value: string;
  label: string;
  data: {
    title: string;
    openKeys: string[] | undefined;
  };
}
let options = ref<Option[]>();
const setOptions = () => {
  let d: Option[] = [];
  MenuRouterStore.route.children?.forEach((e) => {
    if (!(e.meta.menuHidden || !e.meta.show)) {
      d.push({
        value: e.path,
        label: t(e.meta.title),
        data: { title: e.meta.title, openKeys: e.meta.parentPaths },
      });
    }
  });
  options.value = d;
};
setOptions();

const handleChange = (
  value: string,
  option: { data: { title: string; openKeys: string[] } }
) => {
  value &&
    MenuRouterStore.addHistoryMenu({
      title: option.data.title,
      selectedKeys: value,
      openKeys: option.data.openKeys,
    });
  router.push({ path: value });
};
const handleBlur = () => {
  value.value = undefined;
};

const filterOption = (
  input: string,
  option: { value: string; label: string }
) => {
  return option.label.indexOf(input) >= 0;
};

// 监听国际化的状态
watch(locale, (newValue) => {
  // console.log(newValue, "语言变化");
  setOptions();
});
</script>
<style lang="scss" scoped></style>
