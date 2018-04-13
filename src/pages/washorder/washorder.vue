<template>
	<div class="washorder">
		
		<!-- 头部 顶部 -->
		<my-header></my-header>
		<div class="loading" v-loading="isLoading">
            <div class="search" v-show="!isDetailOrder">
                <!--输入框部分-->
                <div class="inputbox">
                
                    <div class="inputarr">
                        <!--手机号输入框-->
                        <input type="text" placeholder=" 请输入手机号码" class="inp-phone" v-model="phone" @input="getCarInfo()"/>
                        
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
                        <div class="inp-search" @click="getCarInfo">查找</div>

                        <div class="carInfo" v-show="isOpencarInfo">
                            <div v-for="item in carInfoList" class="item" :key="item.id" @click="detail(item.userId, item.id)">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="detail" v-show="isDetailOrder">
                <img class="head" :src="washCarInfo.headImg" alt="">
                <div class="mobile">{{washCarInfo.mobile}}</div>
                <div class="carNo">{{washCarInfo.carNo}}</div>
                <div class="products">
                    <div class="time">{{query.time}}</div>
                    <div class="box">
                        <div class="item" v-for="(item, i) in washCarInfo.products" :key="item.id">
                            <div class="info">{{item.name}}</div>
                            <input type="radio" :checked="i === 0" :value="item.id">
                        </div>
                    </div>
                </div>
                <div class="btn-box">
                    <button class="appoint">预约</button>
                    <button class="cancel">取消</button>
                </div>
            </div>

            <div class="select-date">
                <div class="title">
                    <img src="/Content/img/r.png" alt="">
                    选择日期
                </div>
                <div class="days">
                    <div class="item active">
                        <div class="showday">4/13</div>
                        <div class="week">今天</div>
                    </div>
                    <div class="item">
                        <div class="showday">4/13</div>
                        <div class="week">今天</div>
                    </div>
                    <div class="item">
                        <div class="showday">4/13</div>
                        <div class="week">今天</div>
                    </div>
                    <div class="item">
                        <div class="showday">4/13</div>
                        <div class="week">今天</div>
                    </div>
                    <div class="item">
                        <div class="showday">4/13</div>
                        <div class="week">今天</div>
                    </div>
                    <div class="item">
                        <div class="showday">4/13</div>
                        <div class="week">今天</div>
                    </div>

                </div>
                <hr class="hr">
                <div class="time">
                    <div class="title">
                        <img src="/Content/img/b.png" alt="">
                        选择时间
                    </div>
                    <div class="time-box">
                        <div class="item">08:15</div>
                        <div class="item">08:15</div>
                        <div class="item">08:15</div>
                        <div class="item">08:15</div>
                        <div class="item">08:15</div>
                        <div class="item">08:15</div>
                        <div class="item">08:15</div>
                        <div class="item">08:15</div>
                        <div class="item">08:15</div>
                        <div class="item">08:15</div>
                        <div class="item">08:15</div>
                    </div>
                </div>
                <div class="btn-box">
                    <button>取消</button>
                    <button>选择</button>
                </div>
            </div>
            

            

            <keyboard-car-no :open="isInputCarNo" @inputWord="inputWord" 
            @close="isInputCarNo=false" @backWord="backWord"></keyboard-car-no>
		</div>
		
		
        
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
    import Header from '@/components/header'
    import keyboardCarNo from '@/components/keyboardCarNo'
    import api from '@/vuex/api'
	import "./washorder.sass"
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
                isInputCarNo: false,  // 是否显示自定义键盘
                inService: true,

                isDetailOrder: false,    // 是否显示洗车预约单详情
                washCarInfo: {},         // 洗车预约单
                query: {
                    time: ''
                }
            }
        },
        computed: {
            ...mapGetters({
                shopData: 'shopData'
            })
        },
        created () {
            Promise.all([this.getShopProv()]).then(res => {
                setTimeout(() => {
                    this.isLoading = false
                }, 500)
            })
            this.query.time = this.$route.query.time
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

            // 点击用户  显示洗车预约详情
            detail (uid, ubid) {
                api.GetWashCarInfo({uid: uid, ubid: ubid, shopId: localStorage.getItem('shopId')}).then(res => {
                    if (res.data.success) {
                        this.washCarInfo = res.data
                        this.isDetailOrder = true
                    } else {
                        this.$message(res.data.errMsg)
                    }
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