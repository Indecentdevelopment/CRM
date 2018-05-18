<template>
	<div class="reportForm">
		<!-- 头部 顶部 -->
		<my-header></my-header>
		<!--顶部切换按钮-->
		<div class="switch">
			<img src="../../assets/images/personal/qiehuan.png"/>
		</div>
		<!--功能输入区域-->
		<div class="start">
			<span>开始时间：</span>
			<input type="date" />
		</div>
		<div class="start">
			<span>结束时间：</span>
			<input type="date" />
		</div>
		<div class="control clearfix">
		    <p class="fl">状态:</p>
		    <select class="otype fl">
		        <option value="全部">全部</option>
		        <option value="已预约">已预约</option>
		        <option value="服务中">服务中</option>
		        <option value="已取消">已取消</option>
		        <option value="已完成">已完成</option>
		    </select>
		    <p class="fl">来源:</p>
		    <select class="osource fl">
		        <option value="ALL">全部</option>
		        <option value="PRE">洗车预约</option>
		        <option value="SCode">小程序</option>
		        <option value="CRM">CRM</option>
		    </select>
		</div>
		<div class="query">查询</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
    import Header from '@/components/header'
    import api from '@/vuex/api'
	import "./reportForm.sass"
	export default {
		data() {
			return {
                isLoading: true,
                shopId: '',
            }
        },
        created () {
        	
        },
        methods: {
        	GetReportData(){
        		let shopid = this.shopId = window.localStorage.getItem('shopId')
        	
        	
        	
	        	api.GetReportData({
	        		
	        	}).then(res=>{
	        		console.log(res.data)
	        	})
        	}
        },
		components: {
            myHeader: Header
		}
	}
</script>