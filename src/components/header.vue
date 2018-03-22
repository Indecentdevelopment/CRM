<template>
    <div class="header">
    	<img src="../assets/images/header/back.png" class="h-back"/>
    	<img src="../assets/images/header/home-btn.png" class="h-home"/>
    	<img src="../assets/images/header/refresh.png" class="h-refresh" onclick="window.location.reload();"/>
    	<img src="../assets/images/header/logo-black-constant.png" class="h-logo"/>
        <span class="h-landingstate" v-show="isLogin">
        	<span id="passCity" class="passCity">银川西</span>
			<span id="cancellation" class="cancellation">注销</span>
        </span>
    </div>
</template>
<script>
import "@/assets/components/header.sass"
import { mapGetters } from 'vuex'
export default {
    data: function () {
        return {
        	
        }
    },
    computed: {
	    ...mapGetters({
	        isLogin: 'isLogin',           // 是否登录 登录状态
	    })
    }
}
</script>
