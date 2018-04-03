<template>
	<div class="home">
		
		<!-- 头部 顶部 -->
		<my-header></my-header>
		<div class="loading" v-loading="isLoading">
            <!--输入框部分-->
            <div class="inputbox">
                <!--设置按钮-->
                <div class="setup">
                    <img src="../../assets/images/home/hc-Setup.png" class="setup-img"/>
                </div>
                <div class="inputarr">
                    <!--手机号输入框-->
                    <input type="text" placeholder=" 请输入手机号码" class="inp-phone" v-model="phone" @input="getCarInfo()"/>
                    <!--卡券选择框-->
                    <select class="inp-choiceCard">
                        <option value ="储值卡">储值卡</option>
                        <option value ="买三送一机油卡">买三送一机油卡</option>
                    </select>
                    <!--卡券输入框-->
                    <input type="text" placeholder=" 请输入卡券号" class="inp-inputCard" v-model="cardName" @input="getCarInfo()" />
                    <!--车牌选择框-->
                    <select class="inp-brand" v-model="shopProv">
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
                    <!--车牌输入框-->
                    <input type="text" placeholder=" 请输入或扫描车牌号" class="inp-inputBrand" v-model="carNo" @click="showKeyboard($event)" />
                    <!--搜索按钮-->
                    <div class="inp-search">搜索</div>

                    <div class="carInfo" v-show="isOpencarInfo">
                        <router-link v-for="item in carInfoList" :to="{path: 'personalPage', query:{userCarBindId:item.id,uid:item.userId}}" class="item" :key="item.id">
                            <div class="left">
                                <div class="img">
                                    <img src="../../assets/images/index/user-img.png" alt="" srcset="">
                                </div>
                                <div class="info">
                                    <div class="name">{{item.firstName}}</div>
                                    <div class="phone">{{item.phone}}</div>
                                    <div class="car-type">{{item.carTypeName}}</div>
                                </div>
                            </div>
                            <div class="carNo">
                                <div>{{item.carNumber}}</div>
                            </div>
                        </router-link>
                    </div>
                </div>
			</div>
		</div>
		
		<!--服务功能-->
		<div class="service">
			<router-link class="service-conten" to="serverlist">
				<div class="service-btn">
					<img src="../../assets/images/home/hc-service.png" class="service-img"/>
				</div>
				<p class="service-p">服务列表</p>
			</router-link>
			<div class="service-conten">
				<router-link class="service-conten" to="cleaningCall">
					<div class="service-btn">
						<img src="../../assets/images/home/hc-administration.png" class="service-img"/>
					</div>
					<p class="service-p">洗车管理</p>
				</router-link>
			</div>
			<div class="service-conten">
				<div class="service-btn">
					<img src="../../assets/images/home/hc-checktheprice.png" class="service-img"/>
				</div>
				<p class="service-p">快捷查价</p>
			</div>
		</div>
		<div class="service">
			<div class="service-conten">
				<div class="service-btn">
					<img src="../../assets/images/home/hc-allocation.png" class="service-img"/>
				</div>
				<p class="service-p">调拨列表</p>
			</div>
			<div class="service-conten">
				<div class="service-btn">
					<img src="../../assets/images/home/hc-cardcoupons.png" class="service-img"/>
				</div>
				<p class="service-p">卡券查询</p>
			</div>
			<div class="service-conten">
				<div class="service-btn">
					<img src="../../assets/images/home/hc-seekhelp.png" class="service-img"/>
				</div>
				<p class="service-p">他仓求助</p>
				<div class="prompt">{{myApplyRequireCount}}</div>
			</div>
		</div>
		
		<!--服务中车牌号-->
		<div class="inService">
        	<div class="ins-btn" @click="serviceList">
        		<p class="ins-border"></p>
        		<p class="ins-txt">服务中</p>
        	</div>
        	<ul class="ins-ul">
                <li class="ins-li" v-for="item in serverList" :key="item.orderId"  v-show="inService">
                    <span class="ins-span">{{item.carNo}}</span>
                </li>
        	</ul>
        </div>

        <keyboard-car-no :open="isInputCarNo" @inputWord="inputWord" 
        @close="isInputCarNo=false" @backWord="backWord"></keyboard-car-no>
        
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
    import Header from '@/components/header'
    import keyboardCarNo from '@/components/keyboardCarNo'
    import api from '@/vuex/api'
	import "./home.sass"
	export default {
		data() {
			return {
                isLoading: true,
                shopProv: '', // 省 简称
                carNo: '', // 车牌号
                phone: '', // 电话
                cardName: '', // 储值卡
                myApplyRequireCount: '', // 他仓求助消息数量
                carInfoList: [],  // 根据输入的电话  查询出车辆信息列表
                isOpencarInfo: false, // 是否显示查询出的车辆信息列表
                serverList: [],  // 最下方 服务列表
                inputTimer: '',   // 输入电话号码 事件节流定时器
                isInputCarNo: false  // 是否显示自定义键盘
            }
        },
        computed: {
            ...mapGetters({
                shopData: 'shopData'
            })
        },
        created () {
            Promise.all([this.getShopProv(), this.getTheService(), this.getMyApplyRequireCount()]).then(res => {
                setTimeout(() => {
                    this.isLoading = false
                }, 500)
            })
            // this.getShopProv()
            // this.getTheService()
            // this.getMyApplyRequireCount()
        },
        mounted () {
            document.addEventListener('click', (event) => {
                this.isOpencarInfo = false
            })
        },
        methods: {
            // 获取省 简称
            getShopProv () {
                api.getShopProv(this.shopData.id)
                .then( res => {
                    this.shopProv = res.data
                })
                .catch(err => Promise.reject(err))
            },
            // 根据输入 查询车辆信息列表
            getCarInfo () {
                clearTimeout(this.inputTimer)
                this.inputTimer = setTimeout(() => {
                    api.getCarInfo({
                        CarNo: this.shopProv + this.carNo + '',
                        Phone: this.phone,
                        cardName: this.cardName + '_储值卡',
                        shopId: this.shopData.id
                    })
                    .then( res => {
                        this.isOpencarInfo = true
                        this.carInfoList = res.data
                    })
                    .catch(err => Promise.reject(err))
                }, 500)
            },
            // 获取最下方 服务列表
            getTheService () {
                api.getTheService()
                .then(res => {
                    this.serverList = res.data.repairsModel
                })
                .catch(err => Promise.reject(err))
            },
            //服务车辆列表  显示隐藏
            serviceList (){
            	
            	if(this.inService == true){
            		this.inService = false
            		console.log('false')
            	}else{
            		this.inService = true
            		console.log('true')
            	}
            	
            },
            // 获取他仓求助 消息个数
            getMyApplyRequireCount () {
                api.getMyApplyRequireCount().then(res => {
                    this.myApplyRequireCount = res.data
                })
            },
            // 点击车牌号输入框  显示自定义键盘
            showKeyboard (event) {
                event.target.blur()
                this.isInputCarNo = true
            },
            // 点击键盘
            inputWord (data) {
                this.carNo += data
            },
            // 键盘 撤销
            backWord () {
                let length = this.carNo.length
                this.carNo = this.carNo.substring(0, length - 1)
            }
        },
		components: {
            myHeader: Header,
            keyboardCarNo: keyboardCarNo
		}
	}
</script>