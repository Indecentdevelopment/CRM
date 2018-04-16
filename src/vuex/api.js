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
        console.log(err.response)
        if (err.response.status === 500) {
            return err.response
        }
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
    /***************************获取订单**********************************/

    // 获取订单列表
	getOrderList(data){
		return axios.get(url + 'api/order/OrderList', {
			params: {
				status: data.status
			}
		})
    },
    // 获取订单详情
    GetOrderInfo(data) {
        return axios.get(url + 'api/order/GetOrderInfo', {
            params: data
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
    //查看保养履历 跳转到保养履历
    SeeMaintain (data){
    	return axios.get(url + 'api/customerpage/GetCarRecord', {
            params: data
        })
    },
    // 检车用户信息 然后跳转修改车辆信息
    CheckUserInfo (data) {
        return axios.get(url + 'api/car/CheckUserInfo', {
            params: data
        })
    },
    // 删除车辆信息
    DeleteCarInfo (data) {
        return axios.get(url + 'api/car/DeleteCarInfo', {
            params: data
        })
    },
    // 更新用户数据
    UpadateUserInfo (data) {
        return axios.post(url + 'api/car/UpadateUserInfo', querystring.stringify(data))
    },

    /***************************vip 用户升级**********************************/
    GetUserExtendInfo (data) {
        return axios.get(url + 'api/car/GetUserExtendInfo', {
            params: data
        })
    },
    // 升级 会员
    ChooseLeve (data) {
        return axios.post(url + 'api/car/UpdateUserLevel', querystring.stringify(data))
    },
    // 添加标签
    SetUserSign (data) {
        return axios.get(url + 'api/car/SetUserSign', {
            params: data
        })
    },
    //点击确定 提交数据
    UpdateUserExtendInfo (data) {
        return axios.post(url + 'api/car/UpdateUserExtendInfo', querystring.stringify(data))
    },

    /***************************完善车辆信息**********************************/

    // 获取用户 车辆信息
    InitializeRegister(data) {
        return axios.get(url + 'api/car/InitializeRegister', {
            params: {
                opera: 'update',
                id: data.id
            }
        })
    },
    // 获取所有的车牌数据
    getallbrand () {
        return axios.get(url + 'api/car/getallbrand')
    },
    // 根据车牌获取所有的车系数据
    GetAllSeriesByBrandName (data) {
        return axios.get(url + 'api/car/GetAllSeriesByBrandName', {
            params: data
        })
    },
    // 根据车牌和车系 获取所有的排量数据
    GetAllDispByBrandAndSeries (data) {
        return axios.get(url + 'api/car/GetAllDispByBrandAndSeries', {
            params: data
        })
    },
    // 根据车牌、车系、排量 获取所有的年款
    GetAllYearByBrandAndSeriesAndDisp (data) {
        return axios.get(url + 'api/car/GetAllYearByBrandAndSeriesAndDisp', {
            params: data
        })
    },
    // 设为车主 、 删除车主
    btnSetting (data) {
        return axios.get(url + 'api/car/Setting', {
            params: data
        })
    },
    // 点击确认 注册信息
    register (data) {
        return axios.post(url + 'api/car/Register', querystring.stringify(data))
    },
    // 搜索车辆信息
    getCar (data) {
        return axios.get(url + 'Api/Car/GetCarType', {
            params: data
        })
    },
    // 根据搜索的车id  获取车辆类型、型号
    GetCarTypeById (data) {
        return axios.get(url + 'Api/Car/GetCarTypeById', {
            params: data
        })
    },
	
    
    /***************************产品也 confirm**********************************/
    ProductPush(data) {
        return axios.get(url + 'api/car/ProductPush', {
            params: data
        })
    },


    /*************************** 洗车 **********************************/
    //首页获取预约洗车列表
	GetCleanList(data){
		return axios.get(url + 'Api/Car/GetCleanCall', {
            params: data
        })
    },

    // 呼号
    GetCleanvoice() {
        return axios.get(url + 'Api/Car/GetCleanvoice')
    },

    // 详情
    GetCleandetail(data) {
        return axios.get(url + 'Api/Car/GetCleandetail', {
            params: data
        })
    },

    // 下一位
    GetCleanNext(data) {
        return axios.get(url + 'Api/Car/GetCleanNext', {
            params: data
        })
    },

    /*************************** washorder 洗车预约单 **********************************/
    // 获取用户洗车预约详情
    GetWashCarInfo(data) {
        return axios.get(url + 'api/car/GetWashCarInfo', {
            params: data
        })
    },

    // 根据日期 获取时间列表
    GetTime (data) {
        return axios.get(url + 'api/customerpage/GetTime', {
            params: data
        })
    },

    // 点击voice
    GetCleanvoicebycarNo (data) {
        return axios.get(url + 'Api/Car/GetCleanvoicebycarNo', {
            params: data
        })
    },

    // 开始预约
    MakeWashOrder (data) {
        return axios.post(url + 'api/car/MakeWashOrder', querystring.stringify(data))
    }
	
}

    
