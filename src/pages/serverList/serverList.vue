<template>
    <div class="server-list">
    	
    	<!-- 头部 顶部 -->
        <my-header></my-header>
        <div class="loading" v-loading="isLoading">
	        <!---->
	        <div class="transactionType loading" v-loading="isLoading">
	            <div class="tab">
	                <div class="item" v-for="(item, i) in stateArr" :key="i" :class="{active: status===item}" @click="handleClick(item)">
	                    {{item}}
	                </div>
	            </div>
		    	<div class="noNrder" v-show="orderList == ''">暂未找到相关订单！</div> 
		    	<div class="about">
		    		<div class="about-conten"  v-for="(item,i) in orderList" :key="i">
		    			<div class="about-style">
		    				姓名：{{item.name}}
			    		</div>
			    		<div class="about-style">
			    			手机号：{{item.mobile}}
			    		</div>
			    		<div class="about-style">
		    				车牌号：{{item.carNo}}
			    		</div>
			    		<div class="about-style">
			    			工作状态：{{item.status}}
			    		</div>
			    		<div class="about-style">
		    				下单时间：{{item.preDate}}
			    		</div>
			    		<div class="about-style">
			    			<router-link :to="{ path: '/orderDetails', query: { OrderId: item.orderId }}">
			    				<button class="about-btn">详情</button>
			    			</router-link>
			    		</div>
		    		</div>
		    	</div>
        	</div>
        </div>
    </div>
</template>
<script>
	import Header from '@/components/header'
	import "./serverList.sass"
	import api from '@/vuex/api'
	export default {
	    data () {
	        return {
                isLoading: true,  // loading
	        	status: '已预约',
	        	orderList: [],
	        	stateArr: ['已预约','待确认','待付款','已完成','已取消']
	        }
	    },
	    created() {
	    	this.getOrderList()
	    },
	    methods: {
	    	getOrderList(){
	    		//第一次渲染默认已预约
                this.isLoading = true
	    		api.getOrderList({
                	status: this.status
               }).then( res => {
                   this.isLoading = false
                	this.orderList = res.data.repairsModel
                })
	    	},
	    	//切换订单状态
			handleClick(tab) {
		        this.status = tab
                this.getOrderList()
			}
	    },
	    components:{
	        myHeader: Header
	    }
	}
</script>

