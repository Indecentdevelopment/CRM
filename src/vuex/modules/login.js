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
    setCookie: function ({commit}, data) {
        return (document.cookie = [
            data.key, '=', escape(data.value),
            data.options.expires ? '; expires=' + data.options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            data.options.path    ? '; path=' + data.options.path : '',
            data.options.domain  ? '; domain=' + data.options.domain : '',
            data.options.secure  ? '; secure' : ''
        ].join(''));
    },
    toLogin: ({dispatch, commit}, data) => {
        api.toLogin(data).then(res => {
            // commit(type.GET_SHOPNAMELIST, res.data)
            if (res.status === 200) {
                localStorage.setItem('access_token', JSON.stringify(res.data['access_token']));
                localStorage.setItem('token_type', JSON.stringify(res.data['token_type']));
                // dispatch('setCookie', {
                //     key: 'access_token',
                //     value: res.data['access_token'],
                //     options: { path: '/', expires: new Date(res.data['.expires']) }
                // })
                // dispatch('setCookie', {
                //     key: 'token_type',
                //     value: res.data['token_type'],
                //     options: { path: '/', expires: new Date(res.data['.expires']) }
                // })
                // dispatch('setCookie', {
                //     key: 'shopId',
                //     value: res.data['shopId'],
                //     options: { path: '/', expires: new Date(res.data['.expires']) }
                // })
                // dispatch('setCookie', {
                //     key: 'shopName',
                //     value: res.data['shopName'],
                //     options: { path: '/', expires: new Date(res.data['.expires']) }
                // })
                // dispatch('setCookie', {
                //     key: 'isStaff',
                //     value: res.data['isStaff'],
                //     options: { path: '/', expires: new Date(res.data['.expires']) }
                // })
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
