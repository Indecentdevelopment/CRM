<template>
    <div class="invoiceDetails">
    	
    	<!-- 头部 顶部 -->
        <my-header></my-header>
        <div class="loading" v-loading="isLoading">
	        <div class="voucherDetails">
	        	<p class="vouHeder">卡券详情</p>
	        	<ul class="clearfix">
	        		<li class="fl">
	        			<span class="fl vouHerLeft">卡号：</span>
	        			<span class="fl">{{voucherData.code}}</span>
	        		</li>
	        		<li class="fl">
	        			<span class="fl vouHerLeft">卡券名称：</span>
	        			<span class="fl">{{voucherData.name}}</span>
	        		</li>
	        		<li class="fl">
	        			<span class="fl vouHerLeft">剩余金额：</span>
	        			<span class="fl">{{voucherData.amount}}</span>
	        		</li>
	        		<li class="fl">
	        			<span class="fl vouHerLeft">卡券类别：</span>
	        			<span class="fl" v-if="voucherData.cardType">{{voucherData.cardType.typeName}}</span>
	        		</li>
	        		<li class="fl">
	        			<span class="fl vouHerLeft">创建时间：</span>
	        			<span class="fl">{{voucherData.createDate}}</span>
	        		</li>
	        		<li class="fl">
	        			<span class="fl vouHerLeft">过期时间：</span>
	        			<span class="fl">{{voucherData.expirationDate}}</span>
	        		</li>
	        		<li class="fl">
	        			<span class="fl vouHerLeft">开卡店铺：</span>
	        			<span class="fl" v-if="voucherData.shop">{{voucherData.shop.name}}</span>
	        		</li>
	        		<li class="fl">
	        			<span class="fl vouHerLeft">是否有效：</span>
	        			<span class="fl"><span v-if="voucherData.isActivated == true">是</span><span v-if="voucherData.isActivated == false">否</span></span>
	        		</li>
	        	</ul>
	        	<p class="vouHeder">使用记录</p>
	        	<ul class="clearfix">
	        		<li class="fl vouHerRight" v-for="item in cardCouponLogs"  :key="item.id">
	        			<b>时间：</b>{{item.createDate.substring(0, 10)}} &nbsp;&nbsp;&nbsp;&nbsp;<b>说明：</b>{{item.remark}} &nbsp;&nbsp;&nbsp;&nbsp;<b>金额：</b>{{item.useAmount}}
	        			<router-link :to="{path: 'orderDetails', query:{OrderId:item.orderId}}">
	        				<span class="fr vouHerSee">查看</span>
	        			</router-link>
	        		</li>
	        	</ul>
	        </div>
	    </div>
    </div>
</template>
<script>
	import Header from '@/components/header'
	import "./invoiceDetails.sass"
	import api from '@/vuex/api'
	export default {
	    data () {
	        return {
                isLoading: true,  		// loading
                CardCouponId: '',		// 卡劵ID
                voucherData: '',		// 卡劵信息
                cardCouponLogs: '',		// 卡券记录
                
	        }
	    },
	    created() {
	    	let route = this.$route
            this.CardCouponId= route.query.id
            this.obtainInvoice()
            console.log(this.CardCouponId)
	    },
	    methods: {
	    	obtainInvoice(){
	    		this.isLoading = true
	    		api.GetCouponsDetails({
	    			CardCouponId: this.CardCouponId
	    		}).then(res => {
	    			this.voucherData = res.data.card
	    			this.cardCouponLogs = res.data.card.cardCouponLogs
	    			setTimeout(() => {
					    this.isLoading = false
					}, 1000)
	    		})
	    	}
	    },
	    components:{
	        myHeader: Header
	    }
	}
</script>

