import * as type from '../type'
import api from '@/vuex/api'
const state = {
    shopNameList: [],
    shopStaffInfos: []
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
        })
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
    shopStaffInfos: state => state.shopStaffInfos
}
const mutations = {
    [type.GET_SHOPNAMELIST] (state, data) {
        state.shopNameList = data
    },
    [type.GET_SHOPSTAFFINFOS] (state, data) {
        state.shopStaffInfos = data
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}
