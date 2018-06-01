<template>
    <div class="impcarinfo">
        <!-- 头部 顶部 -->
		<my-header></my-header>
		<div class="loading" v-loading="isLoading">
	        <!-- 修改车型、快捷查询 -->
	        <div class="type">
	            <div class="edit active" data-value="edit" @click="changePage('edit')">
	                {{queryOperaZh}}
	            </div>
	            <div class="search" data-value="search" @click="changePage('search')">快捷查询</div>
	        </div>
	        <div class="content" v-show="page==='edit'">
	            <div class="message" v-show="queryOpera === 'update'">
	                 ERP车型参考:{{initData.hintMessage}}
	            </div>
	
	            <!-- 用户信息 -->
	            <div class="user" v-if="queryOpera === 'new'">
	                <input class="name" v-model="initData.name" placeholder="客户姓名">
	                <input class="mobile" v-model="initData.mobile" placeholder="客户电话">
	            </div>
	
	            <!-- 车辆信息选择 -->
	            <div class="car-info">
	                <select class="brand" :disabled="isSupplement" v-model="initData.brand" @change="changeBrand">
	                    <option value="其他">品牌</option>
	                    <option v-for="(item, i) in carInfo.brand" :key="i" :value="item">{{item}}</option>
	                </select>
	                <select class="series" :disabled="isSupplement" v-model="initData.series" @change="changeSeries">
	                    <option value="其他-其他" selected>车系</option>
	                    <option v-for="(item, i) in carInfo.series" :value="item" :key="i">
	                        {{item}}
	                    </option>
	                </select>
	                <select class="displacement" :disabled="isSupplement" v-model="initData.displacement" @change="changeDisplacement">
	                    <option value="其他">排量</option>
	                    <option v-for="(item, i) in carInfo.displacement" :value="item" :key="i">
	                        {{item}}
	                    </option>
	                </select>
	                <select class="year" :disabled="isSupplement" v-model="initData.year" @change="changeYear">
	                    <option value="其他">年款</option>
	                    <option v-for="(item, i) in carInfo.year" :value="item" :key="i">
	                        {{item}}
	                    </option>
	                </select>
	            </div>
	
	            <!-- 车牌号 -->
	            <div class="carNum">
	                
	                <select class="prov" v-model="initData.prov">
	                    <option value="京">京</option>
	                    <option value="津">津</option>
	                    <option value="沪">沪</option>
	                    <option value="渝">渝</option>
	                    <option value="川">川</option>
	                    <option value="粤">粤</option>
	                    <option value="鄂">鄂</option>
	                    <option value="云">云</option>
	                    <option value="鲁">鲁</option>
	                    <option value="晋">晋</option>
	                    <option value="闽">闽</option>
	                    <option value="浙">浙</option>
	                    <option value="皖">皖</option>
	                    <option value="辽">辽</option>
	                    <option value="豫">豫</option>
	                    <option value="湘">湘</option>
	                    <option value="赣">赣</option>
	                    <option value="甘">甘</option>
	                    <option value="冀">冀</option>
	                    <option value="陕">陕</option>
	                    <option value="苏">苏</option>
	                    <option value="吉">吉</option>
	                    <option value="青">青</option>
	                    <option value="贵">贵</option>
	                    <option value="黑">黑</option>
	                    <option value="桂">桂</option>
	                    <option value="新">新</option>
	                    <option value="蒙">蒙</option>
	                    <option value="藏">藏</option>
	                    <option value="宁">宁</option>
	                    <option value="琼">琼</option>
	                    <option value="其他">其他</option>
	                </select>
	                <input class="carNo" v-model="initData.carNo" placeholder="车牌号">
	                <i class="fa fa-camera-retro fa-3x"></i>
	            </div>
	            <!-- 补充车型 -->
	            <div class="add-series">
	                <div class="checkbox">
	                    <input type="checkbox" v-model="isSupplement">
	                    <div>补充车型</div>
	                </div>
	                <input class="info" type="text" :disabled="!isSupplement" v-model="supplement" placeholder="如：奥迪-A6-4.0L-2015">
	            </div>
	            <div class="vinNo">
	                <input type="text" placeholder="车架号" v-model="initData.vin">
	            </div>
	            <div class="btn">
	                <button @click="register">确定</button>
	            </div>
	
	            <div class="tbsj" v-show="isTbsj">
	                <div class="info">数据同步失败！</div>
	                <button class="tongbu" @click="tongbu()">重新同步</button>
	            </div>
	
	            
	        </div>
	
	        <div class="search-page" v-show="page === 'search'">
	            <div class="search-box">
	                <input class="search-text" placeholder="输入品牌或车系 如(奥迪或A8)" v-model="searchText">
	                <button @click="getCar">搜索</button>
	            </div>
	            
	
	            <div class="content">
	                <div v-for="item in getCarData" :key="item.id" class="item" @click="GetCarTypeById(item.id)">
	                    <div class="brand-name">{{item.brandName}}</div>
	                    <div class="series-name">{{item.seriesName}}</div>
	                </div>
	            </div>
	        </div>
	
	        <!-- user info -->
	        <div class="user-info" v-if="queryOpera === 'update'" >
	            <div>
	                <span class="name">{{initData.name}}</span>
	                <span class="mobile">{{initData.mobile}}</span>
	            </div>
	            
	            <div class="user" v-for="item in carPeoples" :key="item.uid">
	                <div class="head-img"><img src="../../assets/images/impCarInfo/mans.png"/></div>
	                <div v-if="item.isTrue" class="theOwner">车主</div>
	                <div v-else>
	                    <button @click="btnSetting(item.ucBindId, 1)">删</button>
	                    <button @click="btnSetting(item.ucBindId, 0)">设为车主</button>
	                </div>
	            </div>
	        </div>
		</div>	
    </div>
</template>
<script>
import Header from '@/components/header'
import api from '@/vuex/api'
import './impCarInfo.sass'
export default {
    data () {
        return {
            page: 'edit',           // 页面选择
            queryId: '',            // 路由参数 id
            queryOpera: '',         // 路由参数 opera
            queryOperaZh: '',       // 根据路由参数 opera 得到中文信息
            initData: {},           // 初始数据
            carPeoples: [],         // 车主信息
            // postCarInfo: {},        // 需要提交的车辆信息
            carInfo: {              // 所有的供选择的车辆信息
                brand: [],          // 车牌
                series: [],          // 车系
                displacement: [],   // 排量
                year: []            // 年款
            },           
            isSupplement: false,    // 是否补充车型
            supplement: '',         // 补充车型信息
            isTbsj: false,          // 是否同步失败
			isLoading: true,
            searchText: '',         // 搜索页面 输入内容
            getCarData: [],         // 搜索出的车辆信息
            sapId: '',              // 重新同步 id
            ubId: '',               // 重新同步 userCarBindId
            cusId: '',              // 重新同步  userId
        }
    },
    created () {
        this.queryId = this.$route.query.id
        this.queryOpera = this.$route.query.opera || 'new'
        
        this.initData.prov = this.$route.query.carnumber
        
        this.getQueryOperaZh()
        this.InitializeRegister()
        
    },
    watch: {
        $route (to, from) {
            this.queryOpera = to.query.opera
            this.getQueryOperaZh()
            this.InitializeRegister()
        }
    },
    methods: {
        changePage (data) {
            this.page = data
        },
        // 根据路由参数 opera 得到中文信息
        getQueryOperaZh () {
            switch (this.queryOpera) {
                case 'update':
                    this.queryOperaZh = '修改车型'
                    break
                case 'add':
                    this.queryOperaZh = '添加车型'
                    break
                case 'new':
                    this.queryOperaZh = '新用户'
                    break
                default:
                    alert('参数有误')
            }
        },
        // 获取初始数据
        InitializeRegister () {
            api.InitializeRegister({id: this.queryId}).then(res => {
                this.initData = res.data
                this.carPeoples = res.data.carPeoples
                // 根据用户基本信息 获取车辆信息
                this.getallbrand()
                if (this.queryOpera === 'update') {
                    this.GetAllSeriesByBrandName()
                    this.GetAllDispByBrandAndSeries()
                    this.GetAllYearByBrandAndSeriesAndDisp()
                } else {
                    this.initData.brand = '其他'
                    this.initData.series = '其他-其他'
                    this.initData.displacement = '其他'
                    this.initData.year = '其他'
                }

                this.initData.prov = this.$route.query.carnumber
                
            })
        },
        // 获取所有的车牌信息
        getallbrand () {
            api.getallbrand().then(res => {
                this.carInfo.brand = res.data
            })
        },
        // 根据车牌 获取所有的车系数据
        GetAllSeriesByBrandName () {
            api.GetAllSeriesByBrandName({brand: this.initData.brand}).then(res => {
                this.carInfo.series = res.data
            })
        },
        // 根据车牌和车系 获取所有的排量数据
        GetAllDispByBrandAndSeries () {
            api.GetAllDispByBrandAndSeries({
                brand: this.initData.brand,
                series: this.initData.series
            }).then(res => {
                this.carInfo.displacement = res.data
            })
        },
        // 根据车牌、车系、排量 获取所有的年款
        GetAllYearByBrandAndSeriesAndDisp () {
            api.GetAllYearByBrandAndSeriesAndDisp({
                brand: this.initData.brand,
                series: this.initData.series,
                disp: this.initData.displacement
            }).then(res => {
                this.carInfo.year = res.data
            })
        },
        // 选择车牌
        changeBrand() {
            this.carInfo.series = []
            this.carInfo.displacement = []
            this.carInfo.year = []
            this.initData.series = '其他-其他'
            this.GetAllSeriesByBrandName()
        },
        // 选择车系
        changeSeries () {
            this.carInfo.displacement = []
            this.carInfo.year = []
            this.initData.displacement = '其他'
            this.GetAllDispByBrandAndSeries()
        },
        // 选择排量
        changeDisplacement () {
            this.carInfo.year = []
            this.initData.year = '其他'
            this.GetAllYearByBrandAndSeriesAndDisp()
        },
        // 选择年款
        changeYear () {
            // this.GetAllYearByBrandAndSeriesAndDisp()
        },
        // 设为车主、删除车主
        btnSetting (ucBindId, op) {
            let opera, msg
            
            if (op === 0) {        // 设为车主
                opera = 'set'
            } else {               // 删除该车主
                opera = 'del'
                msg = '您真的确定要删除吗？'
                if (confirm(msg) === true) {
                    api.btnSetting({id: ucBindId, op: opera}).then(res => {
                        if (res.data.success) {
                            api.GetCarPeople({id: ucBindId}).then(res => {
                                this.carPeoples = res.data.carPeoples
                            })
                        }
                    })
                }
            }
        },
        // search 
        getCar (data) {
            api.getCar({search: this.searchText}).then(res => {
                this.getCarData = res.data.cars
            })
        },
        // 根据搜索的车id  获取车辆类型、型号
        GetCarTypeById (dataId) {
            api.GetCarTypeById({id: dataId}).then(res => {
                this.isSupplement = false
                this.supplement = ''
                this.initData.brand = res.data.brandName
                this.GetAllSeriesByBrandName()
                this.initData.series = res.data.seriesName
                this.GetAllDispByBrandAndSeries()
                this.initData.displacement = '其他'
                this,initData.year = '其他'
                this.page = 'edit'
            })
        },
        // 确认提交
        register () {
            api.register({
                Operating: this.queryOpera,
                CarTypeId: this.initData.carTypeId,
                Name: this.initData.name,
                Mobile: this.initData.mobile,
                Series: this.initData.series,              // 车系
                Year: this.initData.year,                  // 年款
                Displacement: this.initData.displacement,  // 排量
                Brand: this.initData.brand,                // 品牌
                CarNo: this.initData.carNo,               // 车牌
                CarImg: 'aaa',                            // 车 图片
                IsElse: this.isSupplement,                     // 是否补充车型
                ElseCar: this.supplement,                      // 补充车型信息
                vin: this.initData.vin                         // 车架号
            }).then(res => {
                let json = res.data
                if (json.success) {
                    if (json.errValue !=null &&json.errValue.length>0) {
                        // 同步失败 重新同步
                        this.isTbsj = true
                        this.cusId = json.userId
                        this.ubId = json.ubid
                        this.sapId = json.sapId
                    } else {
                        this.$router.push({
                            path: 'personalPage',
                            query: {
                                userCarBindId: json.id,
                                uid: json.userId
                            }
                        })
                    }
                } else {
                    if (json.href == "add") {
                        this.$router.push({
                            path: 'impCarInfo',
                            query: {
                                opera: 'add',
                                id: json.id
                            }
                        })
                    } else {
                        if (typeof (json.errMsg) == "undefined") {
                            alert("操作失败，请重新尝试！")
                        } else {
                            alert(json.errMsg)
                        }
                    }
                }
            })
        },

        // 重新同步
        tongbu () {
            api.CustomerInfoData({Id: this.sapId}).then(res => {
                if (res.data) {
                    this.$Router.push({
                        path: 'personalPage',
                        query: {
                            userCarBindId: this.ubId,
                            uid: this.cusId
                        }
                    })
                } else {
                    alert('同步失败')
                }
            })
        },
    },
    components: {
        myHeader: Header
    }
}
</script>

