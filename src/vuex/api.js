const querystring = require('querystring')

let url = process.env.NODE_ENV !== 'production' ? '/Api/' : 'http://act.tirecool.net/Api/'

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
        return axios.get(url + 'Car/GetShopName', {
            params: {
                RegionsName: data
            }
        })
    },
    // 获取shopStateInfo
    getShopStaffInfos: (shopId) => {
        return axios.get(url + 'Car/GetShopStaffInfos', {
            params: {
                ShopId: shopId
            }
        })
    },

    /***************************登录**********************************/

    // 登录
    toLogin: (data) => {
        return axios.post('/Token',querystring.stringify({
            ClientId: '',
            userName: data.userName,
            password: data.password,
            grant_type: 'password'
        }))
    }
}
