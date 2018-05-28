import router from '@/router/index'
import store from '@/vuex/index'
const querystring = require('querystring')

let url = process.env.NODE_ENV !== 'production' ? '/' : 'http://act.tirecool.net/'

// http 请求request 拦截器
axios.interceptors.request.use(
    config => {
        // config.headers.Authorization = 'bearer G5uAPsLAd1_HNMfHMO8PquFBcvd7KaA1r3UO_OLtNN8J6pjdhtET7wtV8W8w1FGohtstIhxmSrQYr1_9-41h0WjQsYTZArHYcUI1C54aCkjQSp2v_f9rLv7_DFPElqiDfl67'
        if (localStorage.access_token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
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
            store.dispatch('loginOut')
            router.push('/')
            // window.tip('请重新登录')
            return
        } else {
            return res
        }
    },
    err => {
    	console.log(err.response.status)
    	if(err.response.status == 400){
    		alert(err.response.data.error_description)
    		console.log(err.response.data.error_description)
    	}else{
	        console.log(err.response)
	        // if (err.response.status === 500) {
	        //     return err.response
	        // }
	        store.dispatch('loginOut')
	        router.push('/login')
	        return Promise.reject(err)
    	}
    	
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
        return axios.post(url + 'Token', querystring.stringify({
            ClientId: '',
            userName: data.userName,
            password: data.password,
            grant_type: 'password'
        }))
    },

    /***************************home**********************************/
    // 获取省 简称
    getShopProv(shopId) {
        return axios.get(url + 'Api/Car/GetShopProv', {
            params: {
                shopId: shopId
            }
        })
    },
    // 获取最下方 服务列表
    getTheService() {
        return axios.get(url + 'api/order/InTheService')
    },
    // 获取他仓求助 消息个数
    getMyApplyRequireCount() {
        return axios.get(url + 'api/ApplyRequire/GetMyApplyRequireCount')
    },
    // 根据输入 查询车辆信息列表
    getCarInfo(data) {
        return axios.get(url + 'Api/Car/GetCarInfo', {
            params: {
                CarNo: data.CarNo,
                Phone: data.Phone,
                cardName: data.cardName,
                shopId: data.shopId
            }
        })
    },
    /***************************服务列表**********************************/

    // 获取订单列表
    getOrderList(data) {
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
    // 点击 免 免单
    freeComplimentary(data) {
        return axios.get(url + 'api/order/freeComplimentary', {
            params: data
        })
    },
    // 点击（编辑后）保存
    saveOrderItem(data) {
        return axios.post(url + 'api/order/saveOrderItem', querystring.stringify(data))
    },
    // 选择/保存技师
    SaveRemark(data) {
        return axios.post(url + 'api/order/SaveRemark', querystring.stringify(data))
    },
    // 检查商品
    CheckGetGoods(data) {
        return axios.get(url + 'api/order/CheckGetGoods', {
            params: data
        })
    },
    // 发送签名 图片
    UserSign(data) {
        return axios.post(url + 'api/car/UserSign', querystring.stringify(data))
    },

    // 更新 技师
    UpdateTec(data) {
        return axios.get(url + 'api/car/UpdateTec', {
            params: data
        })
    },

    // 结束服务
    serviceOver(data) {
        return axios.get(url + 'api/order/serviceOver', {
            params: data
        })
    },

    // 取消 订单
    CancelOrder(data) {
        return axios.get(url + 'api/order/CancelOrder', {
            params: data
        })
    },

    // 使用积分
    useIntegralCard(data) {
        return axios.post(url + 'api/order/useIntegralCard', querystring.stringify(data))
    },

    // 使用卡券 GetCardCoupon
    GetCardCoupon(data) {
        return axios.get(url + 'api/order/GetCardCoupon', {
            params: data
        })
    },

    // 提交使用卡券
    usePackageCard(data) {
        return axios.get(url + 'api/order/usePackageCard', {
            params: data
        })
    },

    // 取消使用卡券
    CancelCardUse(data) {
        return axios.post(url + `api/order/CancelCardUse?id=${data.id}`)
    },

    // 抹零优惠
    judgeMoling(data) {
        return axios.post(url + `api/order/moling?orderId=${data.orderId}&isMoLing=${data.isMoLing}`)
    },

    // 付款
    PreparedPay(data) {
        return axios.get(url + 'api/order/PreparedPay', {
            params: data
        })
    },
    //现金支付
    PayOrder(data) {
        return axios.post(url + 'api/order/PayOrder', querystring.stringify(data))
    },

    /***************************选择技师**********************************/
    // 获取技师信息
    Technician(data) {
        return axios.get(url + 'api/car/Technician', {
            params: data
        })
    },

    /***************************personalPage**********************************/

    // 获取用户信息
    getUserInfo(data) {
        return axios.get(url + 'api/car/GetUserInfo', {
            params: {
                userCarBindId: data.userCarBindId,
                uid: data.uid
            }
        })
    },
    //查看保养履历 跳转到保养履历
    SeeMaintain(data) {
        return axios.get(url + 'api/customerpage/GetCarRecord', {
            params: data
        })
    },
    // 检车用户信息 然后跳转修改车辆信息
    CheckUserInfo(data) {
        return axios.get(url + 'api/car/CheckUserInfo', {
            params: data
        })
    },
    // 删除车辆信息
    DeleteCarInfo(data) {
        return axios.get(url + 'api/car/DeleteCarInfo', {
            params: data
        })
    },
    // 更新用户数据
    UpadateUserInfo(data) {
        return axios.post(url + 'api/car/UpadateUserInfo', querystring.stringify(data))
    },

    /***************************vip 用户升级**********************************/
    GetUserExtendInfo(data) {
        return axios.get(url + 'api/car/GetUserExtendInfo', {
            params: data
        })
    },
    // 升级 会员
    ChooseLeve(data) {
        return axios.post(url + 'api/car/UpdateUserLevel', querystring.stringify(data))
    },
    // 添加标签
    SetUserSign(data) {
        return axios.get(url + 'api/car/SetUserSign', {
            params: data
        })
    },
    //点击确定 提交数据
    UpdateUserExtendInfo(data) {
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
    getallbrand() {
        return axios.get(url + 'api/car/getallbrand')
    },
    // 根据车牌获取所有的车系数据
    GetAllSeriesByBrandName(data) {
        return axios.get(url + 'api/car/GetAllSeriesByBrandName', {
            params: data
        })
    },
    // 根据车牌和车系 获取所有的排量数据
    GetAllDispByBrandAndSeries(data) {
        return axios.get(url + 'api/car/GetAllDispByBrandAndSeries', {
            params: data
        })
    },
    // 根据车牌、车系、排量 获取所有的年款
    GetAllYearByBrandAndSeriesAndDisp(data) {
        return axios.get(url + 'api/car/GetAllYearByBrandAndSeriesAndDisp', {
            params: data
        })
    },
    // 设为车主 、 删除车主
    btnSetting(data) {
        return axios.get(url + 'api/car/Setting', {
            params: data
        })
    },
    // 点击确认 注册信息
    register(data) {
        return axios.post(url + 'api/car/Register', querystring.stringify(data))
    },
    // 搜索车辆信息
    getCar(data) {
        return axios.get(url + 'Api/Car/GetCarType', {
            params: data
        })
    },
    // 根据搜索的车id  获取车辆类型、型号
    GetCarTypeById(data) {
        return axios.get(url + 'Api/Car/GetCarTypeById', {
            params: data
        })
    },


    /***************************产品页 confirm**********************************/
    ProductPush(data) {
        return axios.get(url + 'api/car/ProductPush', {
            params: data
        })
    },

    // 点击服务 获取商品列表
    GetCarProduct(data) {
        return axios.post(url + 'api/car/GetCarProduct', querystring.stringify(data))
    },
    // 点击添加 搜索产品
    getProduct(data) {
        return axios.post(url + 'api/car/GetProduct', querystring.stringify(data))
    },
    // 获取服务列表
    GetCarServiceProduct(data) {
        return axios.post(url + 'api/car/GetCarServiceProduct', querystring.stringify(data))
    },
    // 记账
    GetProductsTotal(data) {
        return axios.post(url + 'api/order/GetProductsTotal', querystring.stringify(data))
    },
    // 创建 单子
    CreateOrder(data) {
        return axios.post(url + 'api/order/CreateOrder', querystring.stringify(data))
    },
    GetUpdateGS(data) {
        return axios.get(url + 'api/order/UpdateGS', {
            params: data
        })
    },


    /*************************** 洗车 **********************************/
    //首页获取预约洗车列表
    GetCleanList(data) {
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
    GetTime(data) {
        return axios.get(url + 'api/customerpage/GetTime', {
            params: data
        })
    },

    // 点击voice
    GetCleanvoicebycarNo(data) {
        return axios.get(url + 'Api/Car/GetCleanvoicebycarNo', {
            params: data
        })
    },

    // 开始预约
    MakeWashOrder(data) {
        return axios.post(url + 'api/car/MakeWashOrder', querystring.stringify(data))
    },

    /***************************产品页   confirm**********************************/
    ProductPush(data) {
        return axios.get(url + 'api/car/ProductPush', {
            params: data
        })
    },

    /***************************快捷查询   queryPrice**********************************/
    //获取产品列表
    GetProducts(data) {
        return axios.post(url + 'Api/Car/GetElseShopProduct', querystring.stringify(data))
    },
    //校验物料编码
    GetCheckCode(data) {
        return axios.get(url + 'Api/Car/CheckProductMatnr', {
            params: data
        })
    },
    /*获取品牌列表*/
    GetThebrand(data) {
        return axios.get(url + 'Api/Car/GetProductBrand', {

        })
    },
    /*获取类别列表*/
    GetThetype(data) {
        return axios.get(url + 'Api/Car/GetProductCategory', {

        })
    },
    /*店铺库存列表*/
    GetStoreStock(data) {
        return axios.post(url + 'Api/Car/GetElseShopProductSub', querystring.stringify(data))
    },
    /**************************************调拨申请单****************************************/
    /*供应商列表*/
    GetSupplierList(data) {
        return axios.get(url + 'api/ApplyRequire/DiliverApply', {
            params: data
        })
    },
    /*******************************************************************************/
    GetCardsList(data) {
        return axios.get(url + 'Api/Car/CheckCardCoupons', {
            params: {
                cardno: data.cardsNo
            }
        })
    },
    GetCardsUsedList(data) {
        return axios.get(url + 'Api/Order/GetCardCouponDetalis', {
            params: {
                CardCouponId: data.CardCouponId
            }
        })
    },
    GetApplyRequireList() {
        return axios.get(url + 'Api/applyrequire/ApplyRequireList', {

        })
    },
    //发送调拨申请
    GetCreateApply(data) {
        return axios.post(url + 'api/ApplyRequire/CreateApply', querystring.stringify(data))
    },
    /****************************************他仓求助*****************************************/
    GetMyApplyRequireList() {
        return axios.get(url + 'api/applyrequire/MyApplyRequireList', {

        })
    },
    /************************************调拨列表**********************************************/
    GetApplyRequireDetail(data) {
        return axios.get(url + 'api/applyrequire/ApplyRequireDetail', {
            params: {
                serial: data.serial
            }
        })
    },
    //订单号
    GetRequireAppDetails(data) {
        return axios.post(url + 'home/RequireAppDetails', querystring.stringify(data))
    },
    //详情
    GetApplyShopAppInfo(data) {
        return axios.post(url + 'home/GetApplyShopAppInfo', querystring.stringify(data))
    },
    //接受申请
    GetReplyPriceForShop(data) {
        return axios.post(url + 'Apply/ReplyPriceForShop', querystring.stringify(data))
    },
    //拒绝申请
    GetReplyReject(data) {
        return axios.post(url + 'Apply/ReplyReject', querystring.stringify(data))
    },
    //接受报价
    GetUpdatePurchaseStatus(data) {
        return axios.post(url + 'Apply/UpdatePurchaseStatus', querystring.stringify(data))
    },
    //退回申请
    GetSendBack(data) {
        return axios.post(url + 'Apply/SendBack', querystring.stringify(data))
    },
    //撤销申请
    GetCheXiao(data) {
        return axios.post(url + 'Apply/CheXiao', querystring.stringify(data))
    },
    //商品出库
    GetStore(data) {
        return axios.post(url + 'Apply/Store', querystring.stringify(data))
    },

    /************************************发票页***********************************************/
    GetInvoiceLis(data) {
        return axios.get(url + 'api/order/InvoiceList', {
            params: {
                uid: data.uid
            }
        })
    },
    //开票接口
    GetUpdateInvoice(data) {
        return axios.get(url + 'api/order/UpdateInvoice', {
            params: {
                oids: data.total,
                invoiceNo: data.invoiceNber
            }
        })
    },
    //发票信息页
    GetCouponsDetails(data) {
        return axios.get(url + 'api/order/GetCardCouponDetalis', {
            params: {
                CardCouponId: data.CardCouponId + ""
            }
        })
    },
    //微信扫码支付
    GetWechatpay(data) {
        return axios.post(url + 'payment/WeChatPays', querystring.stringify(data))
    },

    // 获取支付状态  是否支付成功
    GetOrderStatus(data) {
        return axios.get(url + 'Payment/GetOrderStatus', {
            params: data
        })
    },
    /************************************个人信息设置页******************************************/
    //店员信息
    GetUserInformation(data) {
        return axios.get(url + 'Api/Car/GetMyStaffInfos', {
            params: {

            }
        })
    },
    //获取店铺信息
    GetMyShopInfo(data) {
        return axios.get(url + 'Api/Car/GetMyShopInfo', {
            params: {

            }
        })
    },
    //确定密码
    ComparePwd(data) {
        return axios.get(url + 'Api/Account/ComparePwd', {
            params: {
                oldPwd: data.oldPwd
            }
        })
    },
    //确定修改密码
    ChangePwd(data) {
        return axios.get(url + 'Api/Account/ChangePwd', {
            params: {
                oldpwd: data.oldpwd,
                newpwd: data.newpwd
            }
        })
    },
    //修改个人信息
    ChangeStaffInfo(data) {
        return axios.get(url + 'Api/Account/ChangeStaffInfo', {
            params: {
                Name: data.Name,
                Phone: data.Phone
			}
		})
	},
	//报表
	GetReportData(data){
		return axios.get(url + 'Api/Car/GetReportData',{
			params:{
				shopId: data.shopId,
				start: data.start,
				end: data.end,
				status: data.status,
				source: data.source
			}
		})
	},
	// 获取报表用户列表
	GetReportDataList(data){
		return axios.get(url + 'Api/Car/GetReportDataList',{
			params:{
				shopId: data.shopId,
				start: data.start,
				end: data.end,
				status: data.status,
				curpage: data.curpage,
				source: data.source
			}
		})
	},
	/*************************************获取APP版本号*******************************************/
	getVersion() {
        return axios.get(url + 'api/Account/GetVersion')
    }
	
}

    
