<template>
    <div class="index">

        <!-- 头部 顶部 -->
        <my-header></my-header>

        <!-- 登录弹窗 -->
        <div class="login" v-show="openLogin">
            <img src="../../assets/images/index/user-img.png" class="user-img">
            <div class="login-form">
                <input name="ClientId" hidden>
                <input name="userName" value="crm189" hidden>
                <input class="password" type="password" v-model="password">
                <input name="grant_type" value="password" hidden>
                <div class="submit" @click="toLogin">登录</div>
            </div>
        </div>

        <!-- 切换城市 -->
        <div class="city clearfix" :class="{switching: isSwitchCity}">
        	<div class="city-btn fr">
				<span class="">
					当前城市：
				</span>
				<span class="currentCity">
					{{currentCity}}
				</span>
				<span class="switch" @click="citySwitching">
					[切换]
				</span>
			</div>
            <div v-show="isSwitchCity" class="city-list">
                <div class="city-item" @click="citySwitch($event)">青岛市</div>
                <div class="city-item" @click="citySwitch($event)">济南市</div>
                <div class="city-item" @click="citySwitch($event)">潍坊市</div>
                <div class="city-item" @click="citySwitch($event)">北京市</div>
                <div class="city-item" @click="citySwitch($event)">南京市</div>
                <div class="city-item" @click="citySwitch($event)">上海市</div>
                <div class="city-item" @click="citySwitch($event)">天津市</div>
                <div class="city-item" @click="citySwitch($event)">苏州市</div>
                <div class="city-item" @click="citySwitch($event)">厦门市</div>
            </div>
        </div>

        <!-- 内容部分 -->
        <div class="content">
            <div v-for="(group, index) in shopNameList" :key="index" class="group">
            	<div v-for="item in group" :key="item.id" class="item" :class="{active: activeItem === item.id}" @click="getShopStaffInfos($event, index, item.id)">
                    <div class="box">
                        <div class="name">{{item.name}}</div>
                        
                    </div>
                    <i class="sign"></i>
                </div>
                <div v-if="activeGroup===index" class="shop-bg">
                    <div v-for="(item, index) in shopStaffInfos" :key="index" class="item" @click="login($event, item.userName)">
                        <div class="user-name">{{item.firstName}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Header from '@/components/header'
import "./login.sass"
export default {
    data: function () {
        return {
            currentCity: '青岛市',  // 当前城市名字
            isSwitchCity: false, // 是否正在选择城市
            openLogin: false,      // 是否正在登录
            userName: '',         // 登录时 用户名
            password: '',         // 登录时 密码
            activeGroup: new Number(), // 当前活动的shopName组
            activeItem: new Number()   // 当前活动的元素
        }
    },
    computed: {
        ...mapGetters({
            isLogin: 'isLogin',           // 是否登录 登录状态
            shopNameList: 'shopNameList', // shopName 数据列表
            shopStaffInfos: 'shopStaffInfos', // shopStaffInfo 数据列表
            shopNameLoading: 'shopNameLoading', // 是否正在获取shopName loading
            staffInfosLoading: 'staffInfosLoading' // 是否正在获取staffInfos loading
        })
    },
    created () {
        this.getShopName()
    },
    mounted () {
        document.addEventListener('click', (event) => {
            if (!event.target.matches(['.switch', '.city-list'])) {
                this.isSwitchCity = false
            }
        })
    },
    methods:{
        citySwitching () {
            this.isSwitchCity = true
        },
        // 选择城市
        citySwitch (event) {
            this.currentCity = event.target.innerHTML
            this.isSwitchCity = false
            this.getShopName()
        },
        login (event, userName) {
            this.openLogin = true
            this.userName = userName
        },
        toLogin () {
            this.openLogin = false
            this.$store.dispatch('toLogin', {
                userName: this.userName,
                password: this.password
            })
        },
        getShopName () {
            this.$store.dispatch('getShopName', this.currentCity)
        },
        // 点击shopName 获取shopStaffInfo数据
        getShopStaffInfos (event, index, shopId) {
            this.activeItem = shopId
            this.activeGroup = index
            this.$store.dispatch('getShopStaffInfos', shopId)
            this.$store.dispatch('setStaffInfosLoading', true)
        }
    },
    components:{
        myHeader: Header
    }
}
</script>
