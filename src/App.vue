<template>
    <a-config-provider :locale="antLang === 'en' ? enUS : zhCN">
        <a-spin
            :spinning="abilityStore.spinning"
            tip="Loading..."
            size="large"
            wrapperClassName="appSpinWrapperClassName"
        >
            <router-view></router-view>
        </a-spin>
    </a-config-provider>
</template>

<script lang="ts" setup>
import user from "@/store/user";
import enUS from "ant-design-vue/es/locale/en_US";
import zhCN from "ant-design-vue/es/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import {env, page} from "./utils/index";
import ability from "@/store/ability";
// 国际化配置
const {locale} = useI18n();
const userStore = user();
dayjs.locale(userStore.info?.lang ?? "zh");
let antLang = ref<string>(userStore.info?.lang ?? "zh");
watch(locale, (newValue) => {
    antLang.value = newValue;
    dayjs.locale(newValue);
});
// 控制台限制
page.confineDevelop(env.VITE_CONFINE_DEVELOP);
// 全局loading
const abilityStore = ability();
</script>
<style lang="scss">
@import url("./styles/app.scss");
</style>
