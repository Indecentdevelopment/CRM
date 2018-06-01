<template>
    <div class="invoice">
    	
    	<!-- 头部 顶部 -->
        <my-header></my-header>
        <div class="loading" v-loading="isLoading">
	        <div class="userSelection clearfix">
	        	<p class="fl">总金额：<b>{{totalTotal}}</b></p>
	        	<span class="fr" @click="ticketOpening">开票</span>
	        	<input type="text" class="fr" v-model="invoiceNber" />
	        </div>
	        
	        <div class="userData clearfix" v-for="item in userDetails">
	        	<div class="useLeft fl">
	        		<input type="checkbox" :id="item.orderId" :value="item.orderId" name="total" v-model="total" @change="totalTotalFn()"/>
	        	</div>
	        	<div class="useRighr fr">
	        		<p class="fl">姓名：{{item.name}}</p>
	        		<p class="fl">手机号：{{item.mobile}}</p>
	        		<p class="fl">车牌号：{{item.carNo}}</p>
	        		<p class="fl">实付款：{{item.price}}</p>
	        		<p class="fl">{{item.status == '已预约'?'预约时间：':'下单时间：'}}{{item.preDate}}</p>
	        		<p class="fl clearfix">
	        			<router-link :to="{path: 'orderDetails', query:{OrderId:item.orderId}}">
	        			<span class="fr">详情</span>
	        			</router-link>
	        		</p>
	        	</div>
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
                userDetails: [],		//用户信息
                total: [],				//总额数组
                totalTotal: 0,			//总额求和
                oids: '',				//orderId
                invoiceNber: ''			//发票号
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
                })
	    	},
	    	totalTotalFn(){
                this.totalTotal = 0
                this.userDetails.map((item, index) => {
                    if (this.total.includes(item.orderId)) {
                        this.totalTotal += item.price * 1
                    }
                })
	    		this.totalTotal = this.totalTotal.toFixed(3)
	    	},
	    	//开票
	    	ticketOpening(){
	    		console.log(this.invoiceNber)
	    		console.log(this.total.join())
	    		if(this.invoiceNber != ''){
	    			api.GetUpdateInvoice({
	                    oids: this.total.join(),
	                    invoiceNo: this.invoiceNber
	                }).then(res => {
	                	console.log(res.data)
//	                	if (res.data.success) {
//							alert("开票成功")
//						} else {
//							alert(res.data.msg)
//						}
	                })
	    		}else {
		        	alert('请填写正确的发票号！')
		      	}
	    	}
	    },
	    components:{
	        myHeader: Header
	    }
	}
</script>

