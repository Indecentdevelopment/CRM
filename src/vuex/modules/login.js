import * as type from '../type'
import api from '@/vuex/api'
const state = {
    isLogin: false
}
const actions = {
    toLogin: ({commit}, data) => {
        api.toLogin(data).then(res => {
            // commit(type.GET_SHOPNAMELIST, res.data)
            console.log(res)
        })
    }
}
const getters = {
    isLogin: state => state.isLogin
}
const mutations = {
    [type.SET_ISLOGIN] (state, bool) {
        state.isLogin = bool
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}
