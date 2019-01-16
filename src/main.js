import Vue from 'vue'
import App from './app'
import router from './router'
import Element from 'element-ui'
import ZarmVue from 'zarm-vue'
import 'zarm-vue/zarm-vue.default.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/reset.css'
import './styles/index.scss'
require('es6-promise').polyfill()

Vue.use(ZarmVue)
Vue.use(Element, { size: 'medium' })
Vue.config.productionTip = false

new Vue({ // eslint-disable-line
  el: '#app',
  router,
  render: h => h(App)
})
