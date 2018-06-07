import * as type from '../type'
import api from '@/vuex/api'
import router from '@/router/index'
const state = {
    isLogin: false,
    shopData: { // 登录之后的 需要保存的shop信息
        id: JSON.parse(localStorage.getItem('shopId')),
        name: JSON.parse(localStorage.getItem('shopName'))
    }
}
const actions = {
    checkToken ({commit}) {
        api.getMyApplyRequireCount()
        .then(res => {
            //console.log(res)
            if (typeof res.data === Number) {
                commit(type.SET_ISLOGIN, true)
            } else {
                commit(type.SET_ISLOGIN, false)
            }
            
        })
        .catch(err => {
            commit(type.SET_ISLOGIN, false)
            return Promise.reject(err)
        })
    },
    loginOut ({commit}, bool) { // 设置登录状态
        commit(type.SET_ISLOGIN, false)
        localStorage.removeItem('access_token')
        localStorage.removeItem('token_type')
        localStorage.removeItem('shopId')
        localStorage.removeItem('shopName')
        router.push('/login')
    },
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
            }else{
            	console.log("报错了！")
            }
        })
    }
}
const getters = {
    isLogin: state => state.isLogin,
    shopData: state => state.shopData,
    shopDataName: state => state.shopData.name
}
const mutations = {
    [type.SET_ISLOGIN] (state, bool) {
        state.isLogin = bool
    },
    [type.SET_SHOPDATA] (state, data) {
        localStorage.setItem('shopId', JSON.stringify(data.id))
        localStorage.setItem('shopName', JSON.stringify(data.name))
        state.shopData.id = data.id
        state.shopData.name = data.name
        
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}
