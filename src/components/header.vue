<template>
    <div class="header">
        <img v-show="isShowGoBack" src="../assets/images/header/back.png" class="h-back"  @click="back"/>
        <router-link to="home">
        	<img v-show="isShowGoBack" src="../assets/images/header/home-btn.png" class="h-home" />
       	</router-link>
        <img src="../assets/images/header/refresh.png" class="h-refresh" onclick="window.location.reload();"/>
        <img src="../assets/images/header/logo-black-constant.png" class="h-logo"/>
        <span class="h-landingstate" v-show="isLogin">
        	<span id="passCity" class="passCity">{{shopDataName}}</span>
			<span id="cancellation" class="cancellation" @click="loginOut">注销</span>
        </span>
    </div>
</template>
<script>
import "@/assets/components/header.sass"
import { mapGetters } from 'vuex'
export default {
    data: function () {
        return {
            isShowGoBack: true
        }
    },
    computed: {
	    ...mapGetters({
            isLogin: 'isLogin',   // 是否登录 登录状态
            shopDataName: 'shopDataName'  // 登录之后 保存的shop信息
	    })
    },
    created () {
        let fullPath = this.$router.history.current.fullPath
        if (fullPath === '/home' || fullPath === '/login') {
            this.isShowGoBack = false
        }
    },
    methods: {
        loginOut () {
            this.$store.dispatch('loginOut')
        },
        home(){
        	console.log('123')
        },
        back() {
            this.$router.go(-1)
        }
    }
}
</script>
