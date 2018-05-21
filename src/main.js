// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import store from './vuex/index'
//import login from './pages/login/login'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import vueSignature from "vue-signature"             // 用户签名插件

import './config/index'

import echarts from 'echarts'

Vue.use(vueSignature)
Vue.use(ElementUI)
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
