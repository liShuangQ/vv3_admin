import { createI18n } from 'vue-i18n';
import zh from './lang/zh';
import en from './lang/en';
import { App } from "vue";

const messages = {
  en,
  zh,
};
const language = (navigator.language || 'zh').toLocaleLowerCase(); // 获取浏览器语言
const i18n = createI18n({
  legacy: false,
  locale: language.split('-')[0] || 'zh', // 首先从缓存里拿，没有就用浏览器语言
  fallbackLocale: 'en', // 设置备用语言
  messages,
});


export default i18n

export function setupI18n(app: App) {
  app.use(i18n);
}