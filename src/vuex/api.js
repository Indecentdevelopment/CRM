import router from '@/router/index'
import store from '@/vuex/index'
const querystring = require('querystring')

let url = process.env.NODE_ENV !== 'production' ? '/' : 'http://act.tirecool.net/'

// http 请求request 拦截器
axios.interceptors.request.use(
    config => {
        // config.headers.Authorization = 'bearer G5uAPsLAd1_HNMfHMO8PquFBcvd7KaA1r3UO_OLtNN8J6pjdhtET7wtV8W8w1FGohtstIhxmSrQYr1_9-41h0WjQsYTZArHYcUI1C54aCkjQSp2v_f9rLv7_DFPElqiDfl67'
        if (localStorage.access_token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `${JSON.parse(localStorage.token_type)} ${JSON.parse(localStorage.access_token)}`
        } else {
            // this.$router.push('/login')
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)
// http 响应response 拦截器
axios.interceptors.response.use(
    res => {
        if (res.data.code === 401) { // 验证失败
            localStorage.removeItem('currentUser_token')
            console.log('here')
            router.push('/')
            // window.tip('请重新登录')
            return
        } else {
            return res
        }
    },
    err => {
        store.dispatch('loginOut')
        router.push('/login')
        return Promise.reject(err)
    }
)

export default {
   /***************************首页**********************************/

    // 获取shopName
    getShopName: (data) => {
        return axios.get(url + 'Api/Car/GetShopName', {
            params: {
                RegionsName: data
            }
        })
    },
    // 获取shopStateInfo
    getShopStaffInfos: (shopId) => {
        return axios.get(url + 'Api/Car/GetShopStaffInfos', {
            params: {
                ShopId: shopId
            }
        })
    },

    /***************************登录**********************************/

    // 登录
    toLogin: (data) => {
        return axios.post(url + 'Token',querystring.stringify({
            ClientId: '',
            userName: data.userName,
            password: data.password,
            grant_type: 'password'
        }))
    },

    /***************************home**********************************/
    // 获取省 简称
    getShopProv (shopId) {
        return axios.get(url + 'Api/Car/GetShopProv', {
            params: {
                shopId: shopId
            }
        })
    },
    // 获取最下方 服务列表
    getTheService () {
        return axios.get(url + 'api/order/InTheService')
    },
    // 获取他仓求助 消息个数
    getMyApplyRequireCount () {
        return axios.get(url + 'api/ApplyRequire/GetMyApplyRequireCount')
    },
    // 根据输入 查询车辆信息列表
    getCarInfo (data) {
        return axios.get(url + 'Api/Car/GetCarInfo', {
            params: {
                CarNo: data.CarNo,
                Phone: data.Phone,
                cardName: data.cardName,
                shopId: data.shopId
            }
        })
    },

    /***************************personalPage**********************************/

    // 获取用户信息
    getUserInfo (data) {
        return axios.get(url + 'api/car/GetUserInfo', {
            params: {
                userCarBindId: data.userCarBindId,
                uid: data.uid
            }
        })
    },
    // 更新用户数据
    UpadateUserInfo (data) {
        return axios.post(url + 'api/car/UpadateUserInfo', querystring.stringify(data))
    }
}
