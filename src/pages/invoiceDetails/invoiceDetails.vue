<template>
    <div class="invoiceDetails">
    	
    	<!-- 头部 顶部 -->
        <my-header></my-header>
        <div class="voucherDetails">
        	<p>卡券详情</p>
        	<ul class="clearfix">
        		<li class="fl">
        			<span class="fl">卡号：</span>
        			<span class="fl">{{item.code}}</span>
        		</li>
        		<li class="fl">
        			<span class="fl">卡券名称：</span>
        			<span class="fl">{{item.name}}</span>
        		</li>
        		<li class="fl">
        			<span class="fl">剩余金额：</span>
        			<span class="fl">{{item.amount}}</span>
        		</li>
        		<li class="fl">
        			<span class="fl">卡券类别：</span>
        			<span class="fl">{{item.cardType.typeName}}</span>
        		</li>
        		<li class="fl">
        			<span class="fl">创建时间：</span>
        			<span class="fl">{{item.createDate}}</span>
        		</li>
        		<li class="fl">
        			<span class="fl">过期时间：</span>
        			<span class="fl">{{item.expirationDate}}</span>
        		</li>
        		<li class="fl">
        			<span class="fl">开卡店铺：</span>
        			<span class="fl">{{item.shop.name}}</span>
        		</li>
        		<li class="fl">
        			<span class="fl">是否有效：</span>
        			<span class="fl">{{item.code}}</span>
        		</li>
        	</ul>
        	<p>使用记录</p>
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
                id: '',			    	// 卡劵ID
                
	        }
	    },
	    created() {
	    	let route = this.$route
            this.id = route.query.id
            this.obtainInvoice()
	    },
	    methods: {
	    	obtainInvoice(){
	    		api.GetCouponsDetails
	    	}
	    },
	    components:{
	        myHeader: Header
	    }
	}
</script>

