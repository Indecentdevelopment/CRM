<template>
    <div class="server-list">
    	
    	<!-- 头部 顶部 -->
        <my-header></my-header>
        
        <!---->
        <div class="transactionType">
        	<el-tabs v-model="activeName" type="border-card"  @tab-click="handleClick"  >
			    <el-tab-pane v-for="items in stateArr" :label = items></el-tab-pane>
			</el-tabs>
	    	<div class="noNrder" v-show="orderList == ''">暂未找到相关订单！</div> 
	    	<div class="about">
	    		<div class="about-conten"  v-for="item in orderList">
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
</template>
<script>
	import Header from '@/components/header'
	import "./serverList.sass"
	import api from '@/vuex/api'
	export default {
	    data () {
	        return {
	        	activeName: 0,
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
	    		api.getOrderList({
                	status: this.status
               }).then( res => {
                	this.orderList = res.data.repairsModel
                })
	    	},
	    	//切换订单状态
			handleClick(tab, event) {
		        let state = tab.$options.propsData.label
		        this.status = state
		        this.getOrderList()
			}
	    },
	    components:{
	        myHeader: Header
	    }
	}
</script>

