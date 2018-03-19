import * as type from '../type'
import api from '@/vuex/api'
const state = {
    shopNameList: [],
    shopStaffInfos: [],
    shopNameLoading: false,
    staffInfosLoading: false
}
const actions = {
    getShopName: ({commit}, data) => {
        api.getShopName(data).then(res => {
            commit(type.GET_SHOPNAMELIST, res.data)
        })
    },
    getShopStaffInfos: ({commit}, data) => {
        api.getShopStaffInfos(data).then(res => {
            commit(type.GET_SHOPSTAFFINFOS, res.data.data)
            commit(type.SET_STAFFINFOSLOADING, false)
        })
    },
    setShopnameloading: ({commit}, bool) => {
        commit(type.SET_SHOPNAMELOADING, bool)
    },
    setStaffInfosLoading: ({commit}, bool) => {
        commit(type.SET_STAFFINFOSLOADING, bool)
    }
}
const getters = {
    shopNameList: (state) => {
        let _arr = [], arr = []
        state.shopNameList.map((item, index) => {
            if ((index + 1) % 4 !== 0) {
                _arr.push(item)
                if (index + 1 === state.shopNameList.length) {
                    arr.push(_arr)
                }
            } else {
                _arr.push(item)
                arr.push(_arr)
                _arr = []
            }
        })
        return arr
    },
    shopStaffInfos: state => state.shopStaffInfos,
    shopNameLoading: state => state.shopNameLoading,
    staffInfosLoading: state => state.staffInfosLoading
}
const mutations = {
    [type.GET_SHOPNAMELIST] (state, data) {
        state.shopNameList = data
    },
    [type.GET_SHOPSTAFFINFOS] (state, data) {
        state.shopStaffInfos = data
    },
    [type.SET_SHOPNAMELOADING] (state, bool) {
        state.shopNameLoading = bool
    },
    [type.SET_STAFFINFOSLOADING] (state, bool) {
        state.staffInfosLoading = bool
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}
