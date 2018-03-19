import Vue from 'vue'
import Vuex from 'vuex'

import Index from './modules/index' // 首页vuex模块
import Login from './modules/login'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    Index,
    Login
  }
})

export default store
