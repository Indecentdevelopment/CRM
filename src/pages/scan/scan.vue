<template>
    <div class="scan">
        <!-- 头部 顶部 -->
		<my-header></my-header>
        <div class="loading" v-loading="isLoading">
	        <div class="code">
	            <img id="code-img" src="">
	            <div class="update" @click="updateCode">刷新</div>
	            <div class="msg">请扫描二维码以绑定微信信息</div>
	            <button class="jump" @click="jump()">跳过</button>
	        </div>
    	</div>
    </div>
</template>
<script>
import Header from '@/components/header'
import api from '@/vuex/api'
import './scan.sass'
export default {
    data () {
        return {
        	isLoading: true,
            query: {
                bindId: ''       // userCarBindId
            },
        }
    },
    created () {
        this.query.bindId = this.$route.query.userCarBindId
    },
    mounted () {
        let codeImg = document.getElementById('code-img')
        codeImg.setAttribute('src', `/api/car/GetBindQRCodeImg?userCarBindId=${this.query.bindId}&shopId=${localStorage.getItem('shopId')}`)
    },
    methods: {
        // 刷新二维码
        updateCode () {
            let codeImg = document.getElementById('code-img')
            codeImg.setAttribute('src', `/api/car/GetBindQRCodeImg?userCarBindId=${this.query.bindId}
            &shopId=${localStorage.getItem('shopId')}&random=${Math.random()}`)
        },
        // 跳过
        jump () {
            this.$router.push({
                path: 'Confirm',
                query: {
                    userCarBindId: this.query.bindId
                }
            })
        }
    },
    components:{
        myHeader: Header
    }
}
</script>

