const querystring = require('querystring')

let url = process.env.NODE_ENV !== 'production' ? '/Api/' : 'http://act.tirecool.net/Api/'

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
