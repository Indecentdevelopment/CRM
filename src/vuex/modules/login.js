import * as type from '../type'
import api from '@/vuex/api'
import router from '@/router/index'
const state = {
    isLogin: false,
    shopData: { // 登录之后的 需要保存的shop信息
        id: JSON.parse(localStorage.getItem('shopId'))
    }
}
const actions = {
    setCookie: function (name,value,expires) {
        var exdate=new Date(expires)
        document.cookie=name+ "=" +escape(value)+
        ((expires==null) ? "" : ";expires="+exdate.toGMTString())
    },
    toLogin: ({dispatch, commit}, data) => {
        api.toLogin(data).then(res => {
            // commit(type.GET_SHOPNAMELIST, res.data)
            if (res.status === 200) {
                dispatch('setCookie', 'access_token', res.data['access_token'], res.data['.expires'])
                dispatch('setCookie', 'token_type', res.data['token_type'], res.data['.expires'])
                dispatch('setCookie', 'shopId', res.data['shopId'], res.data['.expires'])
                dispatch('setCookie', 'shopName', res.data['shopName'], res.data['.expires'])
                dispatch('setCookie', 'isStaff', res.data['isStaff'], res.data['.expires'])
                commit(type.SET_ISLOGIN, true)
                commit(type.SET_SHOPDATA, data.shopData)
                router.push('/home')
            }
        })
    }
}
const getters = {
    isLogin: state => state.isLogin,
    shopData: state => state.shopData
}
const mutations = {
    [type.SET_ISLOGIN] (state, bool) {
        state.isLogin = bool
    },
    [type.SET_SHOPDATA] (state, data) {
        state.shopData.id = data.id
        localStorage.setItem('shopId', JSON.stringify(data.id))
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}
