<template>
    <div class="server-list">
    	
    	<!-- 头部 顶部 -->
        <my-header></my-header>
        
        <!---->
        <div class="transactionType">
        	<el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
			    <el-tab-pane label="已预约" name="first">
			    	<div class="noNrder">暂未找到相关订单！</div>
			    	<div class="about">
			    		<div class="about-conten">
			    			<div class="about-style">
			    				姓名：{{}}
				    		</div>
				    		<div class="about-style">
				    			手机号：{{}}
				    		</div>
				    		<div class="about-style">
			    				车牌号：{{}}
				    		</div>
				    		<div class="about-style">
				    			工作状态：{{}}
				    		</div>
				    		<div class="about-style">
			    				下单时间：{{}}
				    		</div>
				    		<div class="about-style">
				    			<button class="about-btn" @click="">详情</button>
				    		</div>
			    		</div>
			    	</div>
			    </el-tab-pane>
			    <el-tab-pane label="待确定" name="second">
			    	<div class="noNrder">暂未找到相关订单！</div>
			    	<div class="about">
			    		<div class="about-conten">
			    			<div class="about-style">
			    				姓名：{{}}
				    		</div>
				    		<div class="about-style">
				    			手机号：{{}}
				    		</div>
				    		<div class="about-style">
			    				车牌号：{{}}
				    		</div>
				    		<div class="about-style">
				    			工作状态：{{}}
				    		</div>
				    		<div class="about-style">
			    				下单时间：{{}}
				    		</div>
				    		<div class="about-style">
				    			<button class="about-btn" @click="">详情</button>
				    		</div>
			    		</div>
			    	</div>
			    </el-tab-pane>
			    <el-tab-pane label="待付款" name="third">
			    	<div class="noNrder">暂未找到相关订单！</div>
			    	<div class="about">
			    		<div class="about-conten">
			    			<div class="about-style">
			    				姓名：{{}}
				    		</div>
				    		<div class="about-style">
				    			手机号：{{}}
				    		</div>
				    		<div class="about-style">
			    				车牌号：{{}}
				    		</div>
				    		<div class="about-style">
				    			工作状态：{{}}
				    		</div>
				    		<div class="about-style">
			    				下单时间：{{}}
				    		</div>
				    		<div class="about-style">
				    			<button class="about-btn" @click="">详情</button>
				    		</div>
			    		</div>
			    	</div>
			    </el-tab-pane>
			    <el-tab-pane label="已完成" name="fourth">
			    	<div class="noNrder">暂未找到相关订单！</div>
			    	<div class="about">
			    		<div class="about-conten">
			    			<div class="about-style">
			    				姓名：{{}}
				    		</div>
				    		<div class="about-style">
				    			手机号：{{}}
				    		</div>
				    		<div class="about-style">
			    				车牌号：{{}}
				    		</div>
				    		<div class="about-style">
				    			工作状态：{{}}
				    		</div>
				    		<div class="about-style">
			    				下单时间：{{}}
				    		</div>
				    		<div class="about-style">
				    			<button class="about-btn" @click="">详情</button>
				    		</div>
			    		</div>
			    	</div>
			    </el-tab-pane>
			    <el-tab-pane label="已完成" name="fifth">
			    	<div class="noNrder">暂未找到相关订单！</div>
			    	<div class="about">
			    		<div class="about-conten">
			    			<div class="about-style">
			    				姓名：{{}}
				    		</div>
				    		<div class="about-style">
				    			手机号：{{}}
				    		</div>
				    		<div class="about-style">
			    				车牌号：{{}}
				    		</div>
				    		<div class="about-style">
				    			工作状态：{{}}
				    		</div>
				    		<div class="about-style">
			    				下单时间：{{}}
				    		</div>
				    		<div class="about-style">
				    			<button class="about-btn" @click="">详情</button>
				    		</div>
			    		</div>
			    	</div>
			    </el-tab-pane>
			</el-tabs>
        </div>
    </div>
</template>
<script>
	import Header from '@/components/header'
	import "./serverList.sass"
	export default {
	    data () {
	        return {
	        	activeName: 'first'
	        }
	    },
	    methods: {
			handleClick(tab, event) {

			}
	    },
	    components:{
	        myHeader: Header
	    }
	}
</script>

