const querystring = require('querystring')

let url = process.env.NODE_ENV !== 'production' ? '/' : 'http://act.tirecool.net/'

// http 请求request 拦截器
axios.interceptors.request.use(
    config => {
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
                CarNo: data.shopProv + data.carNo,
                Phone: data.Phone,
                cardName: data.cardName,
                shopId: data.shopId
            }
        })
    },
    /***************************获取订单**********************************/
	getOrderList(data){
		return axios.get(url + 'api/order/OrderList', {
			params: {
				status: data.status
			}
		})
	}
	/**************************获取订单详情*********************************/
}
