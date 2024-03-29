import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ViewUI from 'view-design'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import 'view-design/dist/styles/iview.css'
import '@/assets/icons/iconfont.css'
import '@/assets/css/common.less'
import httpApi from './libs/httpRequestUtil'
import dateFormat from 'date-format'
import { hasBtnPermission } from '@/directive/button-permission'

// 注册全局属性
Vue.prototype.axios = httpApi
Vue.prototype.$dateFormat = dateFormat
Vue.prototype.$hasBtnPermission = hasBtnPermission

Vue.use(ViewUI, {
  transfer: true,
  size: 'default',
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
