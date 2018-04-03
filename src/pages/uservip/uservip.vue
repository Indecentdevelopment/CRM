<template>
	<div class="uservip">
		
	<!-- 头部 顶部 -->
		<my-header></my-header>
		
	<!--内容-->
        <div class="content">

            <div class="userName">
                <input type="text" v-model="userExtendInfo.name">
            </div>

            <!-- 性别 -->
            <div class="sex">
                <input type="radio" value="True" name="sex" v-model="userExtendInfo.gender">
                <label for="">男</label>
                <input type="radio" value="False" name="sex" v-model="userExtendInfo.gender">
                <label for="">女</label>
            </div>

            <!-- 会员等级 -->
            <div class="level">
                <div>当前会员级别：</div>
                <div class="level-info">
                    {{userExtendInfo.discount}}
                </div>
            </div>

            <!-- 升级 -->
            <div class="upgrade" v-if="userExtendInfo.level==='无卡'">
                <input type="button" value="升为金卡" @click="ChooseLeve('金卡')">
                <input type="button" value="升为钻卡" @click="ChooseLeve('钻卡')">
                <input type="button" value="升为白金卡" @click="ChooseLeve('白金卡')">
            </div>
            <div class="upgrade" v-if="userExtendInfo.level==='金卡'">
                <input type="button" value="升为金卡" disabled>
                <input type="button" value="升为钻卡" @click="ChooseLeve('钻卡')">
                <input type="button" value="升为白金卡" @click="ChooseLeve('白金卡')">
            </div>
            <div class="upgrade" v-if="userExtendInfo.level==='钻卡'">
                <input type="button" value="升为金卡" disabled>
                <input type="button" value="升为钻卡" disabled>
                <input type="button" value="升为白金卡" @click="ChooseLeve('白金卡')">
            </div>
            <div class="upgrade" v-if="userExtendInfo.level==='白金卡'">
                <input type="button" value="升为金卡" disabled>
                <input type="button" value="升为钻卡" disabled>
                <input type="button" value="升为白金卡" disabled>
            </div>

            <!-- 电话 -->
            <div class="mobile">
                <input placeholder="手机号" v-model="userExtendInfo.mobile">
            </div>

            <!-- 地址 -->
            <div class="address">
                <input placeholder="地址" v-model="userExtendInfo.address">
            </div>

            <!-- 标签 -->
            <div class="sign" >
                <div class="item" v-for="item in userExtendInfo.userSign" :key="item.id">
                    {{item.sign}}
                    <div class="DelUserSign" @click="DelUserSign(item)"></div>
                </div>
                <div class="add-sign item" @click="ShowOrHiddenSign()">
                    标签
                    <span v-show="!isShowSign"> &nbsp;+</span>
                    <span v-show="isShowSign"> &nbsp;-</span>
                </div>
            </div>

            <!-- 确认按钮 -->
            <button class="submit" @click="btnSubmit">确定</button>

            <!-- 二维码 -->
            <div class="qecode">
                <img id="qecode-img" src="" alt="">
                <div class="info">
                    用户扫描此二维码即可绑定微信
                </div>
            </div>
        </div>

        <swiper class="sign-swiper" :options="swiperOption" ref="mySwiper" v-show="isShowSign">
            <!-- slides -->
            <swiper-slide>
                <div class="title">
                    {{userExtendInfo.signAName}}
                </div>
                <div class="sign-box">
                    <div class="sign-item" v-for="item in userExtendInfo.signA" :key="item.id" @click="ShouSign(item)">
                        {{item.sign}}
                    </div>
                </div>
            </swiper-slide>

            <swiper-slide>
                <div class="title">
                    {{userExtendInfo.signBName}}
                </div>
                <div class="sign-box">
                    <div class="sign-item" v-for="item in userExtendInfo.signB" :key="item.id" @click="ShouSign(item)">
                        {{item.sign}}
                    </div>
                </div>
            </swiper-slide>

            <swiper-slide>
                <div class="title">
                    {{userExtendInfo.signCName}}
                </div>
                <div class="sign-box">
                    <div class="sign-item" v-for="item in userExtendInfo.signC" :key="item.id" @click="ShouSign(item)">
                        {{item.sign}}
                    </div>
                </div>
            </swiper-slide>

            <swiper-slide>
                <div class="title">
                    {{userExtendInfo.signDName}}
                </div>
                <div class="sign-box">
                    <div class="sign-item" v-for="item in userExtendInfo.signD" :key="item.id" @click="ShouSign(item)">
                        {{item.sign}}
                    </div>
                </div>
            </swiper-slide>

            <swiper-slide>
                <div class="title">
                    {{userExtendInfo.signEName}}
                </div>
                <div class="sign-box">
                    <div class="sign-item" v-for="item in userExtendInfo.signE" :key="item.id" @click="ShouSign(item)">
                        {{item.sign}}
                    </div>
                </div>
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
		

		
	</div>
</template>

<script>
    import 'swiper/dist/css/swiper.css'
    import { swiper, swiperSlide } from 'vue-awesome-swiper'
    import Header from '@/components/header'
    import api from '@/vuex/api'
	import "./uservip.sass"
	export default {
	    data () {
	        return {
	        	query: {                // 路由参数
                    userId: '',
                    cid: ''
                },
                userExtendInfo: {},     // 用户初始数据
                isShowSign: false,      // 是否显示标签列表
                swiperOption: {         // swiper option
                    // loop : true,
                    pagination: {
                        el: '.swiper-pagination',
                    },
                    speed: 500
                }
	        }
        },
        created () {
            this.query.userId = this.$route.query.uid
            this.query.cid = this.$route.query.cid
            this.GetUserExtendInfo()
        },
        mounted () {
           
            
        },
	    methods: {
			GetUserExtendInfo () {
                api.GetUserExtendInfo({
                    userId: this.query.userId,
                    cid: this.query.cid
                }).then(res => {
                    this.userExtendInfo = res.data
                    document.getElementById('qecode-img')
                    .setAttribute('src',`/api/car/GetBindQRCodeImg?userCarBindId=${this.userExtendInfo.userCarBindId2}&shopid=${this.userExtendInfo.shopId}`)
                })
            },
            
            // 升级 金卡、钻卡、白金卡
            ChooseLeve (level) {
                if (confirm("确定升级为" + level + "吗？")) {
                    api.ChooseLeve({
                        UserId: this.userExtendInfo.userId,
                        Level: level
                    }).then(res => {
                        if (res.data.success) {
                            alert('升级成功')
                            this.GetUserExtendInfo()
                        } else {
                            alert(res.data.errMsg)
                        }
                    })
                }
                
            },
            // 显示、隐藏 标签
            ShowOrHiddenSign () {
                this.isShowSign = !this.isShowSign
            },
            // 点击添加sign标志
            ShouSign (item) {
                let userSign = this.userExtendInfo.userSign
                if (JSON.stringify(userSign).includes(JSON.stringify(item))) {
                    userSign.map((val, index) => {
                        if (val.sign === item.sign) {
                            this.userExtendInfo.userSign.splice(index, 1)
                        }
                    })
                } else {
                    if (userSign.length < 5) {
                        this.userExtendInfo.userSign.push(item)
                    } else {
                        alert('最多可支持五个身份标签')
                    }
                }
                api.SetUserSign({
                    uid: this.userExtendInfo.userId,
                    sign: item.id
                }).then(res => {
                    if (!res.data) {
                        alert('添加失败')
                    }
                })
                
            },
            // 删除 sign
            DelUserSign (item) {
                let userSign = this.userExtendInfo.userSign
                userSign.map((val, index) => {
                    if (val.sign === item.sign) {
                        this.userExtendInfo.userSign.splice(index, 1)
                    }
                })
                api.DelUserSign({
                    uid: this.userExtendInfo.userId,
                    sign: item.id
                }).then(res => {
                    if (!res.data) {
                        alert('删除失败')
                    }
                })
            },
            // 确定
            btnSubmit () {
                let partten = /^1[3-9]\d{9}$/
                if (!this.userExtendInfo.name) {
                    alert('姓名不可为空')
                    return
                }
                if (this.userExtendInfo.name.length > 20) {
                    alert('用户名最多允许20位')
                    return
                }
                if (!this.userExtendInfo.mobile) {
                    alert('手机不可为空')
                    return
                }
                if (this.userExtendInfo.mobile.length !== 11 || !partten.test(this.userExtendInfo.mobile)) {
                    alert('手机号格式不正确')
                    return
                }
                api.UpdateUserExtendInfo({
                    UserId: this.userExtendInfo.userId,
                    Name: this.userExtendInfo.name,
                    Gender: this.userExtendInfo.gender,
                    Mobile: this.userExtendInfo.mobile,
                    UserCarBindId: this.userExtendInfo.userCarBindId,
                    Address: this.userExtendInfo.address,
                    Level: this.userExtendInfo.level
                }).then(res => {
                    this.$router.push({
                        path: 'personalPage',
                        query: {
                            userCarBindId: res.data.activitionCar,
                            uid: res.data.userId
                        }
                    })
                })
            },
	    },
	    components:{
            myHeader: Header,
            swiper,
            swiperSlide
	    }
	}
</script>

<style>
</style>