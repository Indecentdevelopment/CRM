//调拨单
import * as type from '../type'
import api from '@/vuex/api'
import router from '@/router/index'
const state = {
	oldVersion: '', // 本地旧版本
	newVersion: '', // 获取的最新版本
	isUpdateVersion: false // 是否更新版本
}
const actions = {
	setOldVersion: ({
		commit
	}, data) => {
		commit(type.SET_OLD_VERSION, data)
	},
	getNewVersion: ({
		commit,
		state
	}, data) => {
		api.getVersion().then(res => {
			commit(type.GET_NEW_VERSION, res.data)
			if (res.data !== state.oldVersion) {
				commit(type.SET_IS_UPDATE_VERSION, true)
			} else {
				commit(type.SET_IS_UPDATE_VERSION, false)
			}
		})
	}
}
const getters = {
	isUpdateVersion: state => state.isUpdateVersion
}
const mutations = {
	[type.SET_OLD_VERSION](state, data) {
		state.oldVersion = data
	},

	[type.GET_NEW_VERSION](state, data) {
		state.newVersion = data
	},
	[type.SET_IS_UPDATE_VERSION](state, data) {
		state.isUpdateVersion = data
	}
}
export default {
	state,
	actions,
	getters,
	mutations
}