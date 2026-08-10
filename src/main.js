import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from 'element-ui/lib/locale/lang/en'
import ElementLocale from 'element-ui/lib/locale'
import VCharts from 'v-charts'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control
import { translate, translateTitle } from '@/utils/i18n'

Vue.prototype.$t = function(key) {
  return translate(key, this.$store ? this.$store.getters.language : 'en')
}

Vue.prototype.$translateTitle = function(title) {
  return translateTitle(title, this.$store ? this.$store.getters.language : 'en')
}

const language = store.getters.language || 'en'
const elementLocale = language === 'zh' ? zhLocale : enLocale
ElementLocale.use(elementLocale)

Vue.use(ElementUI, { locale: elementLocale })
Vue.use(VCharts)

Vue.config.productionTip = false

store.watch(state => state.app.language, (lang) => {
  ElementLocale.use(lang === 'zh' ? zhLocale : enLocale)
  setTimeout(() => {
    window.location.reload()
  }, 0)
}, { sync: true })

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
