<template>
	<div class="wechatpay">
		
		<!-- 头部 顶部 -->
        <my-header></my-header>
		<div class="code">
			<div class="codeTwoImg">
				<img src="http://www.guo-wei.xin/images/1.png"/>
				<p>请使用微信扫描<br />二维码以完成支付</p>
				<p>请您及时付款，以便订单尽快处理！</p>
				<p>请您在提交订单后及时完成支付，否则订单会自动取消！</p>
				<p>交易单号</p>
				<p>创建时间</p>
			</div>
		</div>
        
	</div>
</template>

<script>
	import Header from '@/components/header'
	import "./wechatpay.sass"
	import api from '@/vuex/api'
	export default {
	    data () {
	        return {
                isLoading: false,       // laoding
	        	otype: '',
	        	ono: '',
	        	ptype: '',
	        	payAmount: '',
	        }
	    },
	    created() {
	    	let route = this.$route
	    	
	    	
	    	this.otype = route.query.otype
	    	this.ono = route.query.ono
	    	
	    	this.GetWechatpay()
	    	console.log(this.otype)
	    	console.log(this.ono)
//	    	this.query.ptype = this.$route.query.ptype
//	    	this.query.payAmount = this.$route.query.payAmount
	    },
        mounted () {
        	
        },
	    methods: {
	    	GetWechatpay(){
	    		api.GetWechatpay({
	    			otype: this.otype,
	    			ono: '888888'
	    		}).then(res => {
//	    			console.log(res.data)
	    		})
	    	}
	    },
	    components:{
	        myHeader: Header
	    }
	}
</script>

<style>
</style>