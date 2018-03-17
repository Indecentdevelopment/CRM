const querystring = require('querystring')

let url = process.env.NODE_ENV !== 'production' ? '/Api/' : 'http://act.tirecool.net/Api/'

export default {
    getShopName: (data) => {
        return axios.get(url + 'Car/GetShopName', {
            params: {
                RegionsName: data
            }
        })
    },
    getShopStaffInfos: (shopId) => {
        return axios.get(url + 'Car/GetShopStaffInfos', {
            params: {
                ShopId: shopId
            }
        })
    }
}
