import Vue from 'vue'
import Vuex from 'vuex'

import Index from './modules/index'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    Index
  }
})

export default store
