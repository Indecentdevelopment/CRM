<template>
    <div class="invoice">
    	
    	<!-- 头部 顶部 -->
        <my-header></my-header>
        <div class="userSelection clearfix">
        	<p class="fl">总金额：<b>{{totalTotal}}</b></p>
        	<span class="fr">开票</span>
        	<input type="text" class="fr" />
        </div>
        
        <div class="userData clearfix" v-for="item in userDetails">
        	<div class="useLeft fl">
        		<input type="checkbox" :id="item.price" :value="item.price" name="total" v-model="total" @change="totalTotalFn(total)"/>
        	</div>
        	<div class="useRighr fr">
        		<p class="fl">姓名：{{item.name}}</p>
        		<p class="fl">手机号：{{item.mobile}}</p>
        		<p class="fl">车牌号：{{item.carNo}}</p>
        		<p class="fl">实付款：{{item.price}}</p>
        		<p class="fl">{{item.status == '已预约'?'预约时间：':'下单时间：'}}{{item.preDate}}</p>
        		<p class="fl clearfix"><span class="fr">详情</span></p>
        	</div>
        </div>
    </div>
</template>
<script>
	import Header from '@/components/header'
	import "./invoice.sass"
	import api from '@/vuex/api'
	export default {
	    data () {
	        return {
                isLoading: true,  		// loading
                uid: '',			    //获取userInfo时  传参
                userDetails: '',		//用户信息
                total: [],				//总额数组
                totalTotal: 0			//总额求和
	        }
	    },
	    created() {
	    	let route = this.$route
            this.uid = route.query.uid
            this.invoice()
	    },
	    methods: {
	    	invoice(){
                api.GetInvoiceLis({
                    uid: this.uid
                }).then(res => {
                	this.userDetails = res.data.repairsModel
                	console.log(res.data)
                })
	    	},
	    	totalTotalFn(i){
	    		console.log(i)
	    		if(i <= 0){
	    			if(this.total.length == 0){
		    			this.totalTotal = 0
		    		}
		    		if(this.totalTotal == 0){
		    			this.totalTotal = 0
		    		}
	    		}else{
	    			this.totalTotal = parseInt(this.totalTotal) + parseInt(this.total.slice(-1))
	    		}
	    		
	    	}
	    },
	    components:{
	        myHeader: Header
	    }
	}
</script>

