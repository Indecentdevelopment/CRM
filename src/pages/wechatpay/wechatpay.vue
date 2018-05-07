<template>
	<div class="wechatpay">
		
		<!-- 头部 顶部 -->
        <my-header></my-header>
		<div class="code">
			<div class="codeTwoImg">
				<img src="http://www.guo-wei.xin/images/1.png"/>
				<p class="colorStyle">请使用微信扫描<br />二维码以完成支付</p>
			</div>
			<div class="codeStyleOne">¥ {{transactionData.totalFee}}</div>
			<div class="codeStyleTwo">请您及时付款，以便订单尽快处理！<br /><span>请您在提交订单后及时完成支</span><br />付，否则订单会自动取消！</div>
			<div class="codeStyleThree">交易单号：{{transactionData.orderNo}}<br />创建时间：{{currentTime}}</div>
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
	        	transactionData: '',	//交易信息
	        	currentTime: ''			//当前时间
	        }
	    },
	    created() {
	    	let route = this.$route
	    	this.otype = route.query.otype
	    	this.ono = route.query.ono
	    	this.GetWechatpay()
	    	this.getNowFormatDate()
	    },
        mounted () {
        	
        },
	    methods: {
	    	GetWechatpay(){
	    		api.GetWechatpay({
	    			otype: this.otype,
	    			ono: this.ono
	    		}).then(res => {
	    			this.transactionData = res.data
	    		})
	    	},
	    	//获取当前时间
	    	getNowFormatDate(){
	    		var date = new Date();
			    var seperator1 = "-";
			    var seperator2 = ":";
			    var month = date.getMonth() + 1;
			    var strDate = date.getDate();
			    if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (strDate >= 0 && strDate <= 9) {
			        strDate = "0" + strDate;
			    }
			    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + date.getHours() + seperator2 + date.getMinutes()
			    console.log(currentdate)
			    this.currentTime = currentdate
	    	}
	    },
	    components:{
	        myHeader: Header
	    }
	}
</script>

<style>
</style>