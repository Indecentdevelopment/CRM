<template>
	<div class="reportForm">
		<!-- 头部 顶部 -->
		<my-header></my-header>
		<!--顶部切换按钮-->
		<div class="switch" v-show="imgControl">
			<img src="../../assets/images/personal/liebiao.png" @click="controlImg" v-show="dataSheet" />
			<img src="../../assets/images/personal/qiehuan.png" @click="getUserList" v-show="userList" />
		</div>
		<!--功能输入区域-->
		<div class="start">
			<span>开始时间：</span>
			<input type="date" v-model="startDate" />
		</div>
		<div class="start">
			<span>结束时间：</span>
			<input type="date" v-model="endDate" />
		</div>
		<div class="control clearfix">
		    <p class="fl">状态:</p>
		    <select class="otype fl" v-model="status">
		        <option value="全部">全部</option>
		        <option value="已预约">已预约</option>
		        <option value="服务中">服务中</option>
		        <option value="已取消">已取消</option>
		        <option value="已完成">已完成</option>
		    </select>
		    <p class="fl">来源:</p>
		    <select class="osource fl" v-model="source">
		        <option value="ALL">全部</option>
		        <option value="PRE">洗车预约</option>
		        <option value="SCode">小程序</option>
		        <option value="CRM">CRM</option>
		    </select>
		</div>
		<div class="query" @click="GetReportData">查询</div>
		<!--数据表-->
		<div class="echarts" v-show="dataSheet">
			<div id="myChart" :style="{width: '450px', height: '400px'}"></div>
		</div>
		<!--用户列表-->
		<div class="userList" v-show="userList">
			<div class="userData clearfix">
	        	<div class="useRighr fr">
	        		<p class="fl">姓名：</p>
	        		<p class="fl">手机号：</p>
	        		<p class="fl">车牌号：</p>
	        		<p class="fl">工作状态：</p>
	        		<p class="fl">时间：</p>
	        		<p class="fl clearfix">
	        			<!--<router-link :to="{path: 'orderDetails', query:{}}">-->
	        			<span class="fr">详情</span>
	        			<!--</router-link>-->
	        		</p>
	        	</div>
	        </div>
	        
	        <!--分页-->
	        <div class="block">
			    <el-pagination
			      @size-change="handleSizeChange"
			      @current-change="handleCurrentChange"
			      :current-page.sync="currentPage3"
			      :page-size="1"
			      layout="prev, pager, next, jumper"
			      :total="10"
			      pager-count="3">
			    </el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
    import Header from '@/components/header'
    import api from '@/vuex/api'
	import "./reportForm.sass"
	import echarts from 'echarts'
	export default {
		data() {
			return {
                isLoading: true,
                shopId: '',
                startDate: '',				// 开始时间
                endDate: '',				// 结束时间
                status: '全部',				// 状态
                source: 'ALL',				// 来源
                arrdate: [],				// 日期
                arrcount: [],				// 
                arrtotal: [],				// 
                imgControl: false,			// img控制
                dataSheet: false,			// 数据表控制
                userList: false,			// 用户列表
                currentPage3: 1,
                curpage: '1',				// 页数
            }
        },
        mounted(){
		    
		},
        created () {
        	
        },
        methods: {
        	controlImg(){
        		this.dataSheet = false
        		this.userList = true
        	},
        	handleSizeChange(val) {
		        console.log(`每页 ${val} 条`);
	      	},
	      	handleCurrentChange(val) {
	        	console.log(`当前页: ${val}`);
	      	},
        	GetReportData(){
        		let shopid = this.shopId = window.localStorage.getItem('shopId')
        		if(this.startDate == ''){
        			alert('开始时间不可为空！')
        			return false
        		}
        		if(this.endDate == ''){
        			alert('结束时间不可为空！')
        			return false
        		}
	        	api.GetReportData({
	        		shopId: shopid,
					start: this.startDate,
					end: this.endDate,
					status: this.status,
					source: this.source
	        	}).then(res=>{
	        		if (res.data == null) {
	                    alert("数据异常")
	                    return false
	            	}
	        		this.imgControl = true
	        		this.dataSheet = true
	        		this.userList = false
	    			let rep = res.data.reports
	        		this.arrdate = []
	        		this.arrcount = []
	        		this.arrtotal = []
	        		rep.forEach((item, index) =>{
	        			this.arrdate.push(item.date)
	        			this.arrcount.push(item.count)
	        			this.arrtotal.push(item.total)
	                });
	                this.drawLine()
	        	})
		        
        	},
        	// echarts图表
        	drawLine(el){
		        // 基于准备好的dom，初始化echarts实例
		        let myChart = this.$echarts.init(document.getElementById('myChart'))
		        let colors = ['#ffda01', '#bfbfbf']
		        console.log(this.arrdate)
		        // 绘制图表
		        myChart.setOption({
		            color: colors,
				    tooltip : {
				        trigger: 'axis',
	                    axisPointer: {
	                        type: 'cross'
	                    }
				    },
				    grid: {
	                    right: '20%'
	                },
				    legend: {
				        data:['订单量','订单金额']
				    },
				    calculable : true,
				    xAxis : [
				    	{
	                        type: 'category',
	                        axisTick: {
	                            alignWithLabel: true
	                        },
	                        data: this.arrdate
	                    }
					],
				    yAxis : [
				        {
                        type: 'value',
                        name: '订单',
                        min: 0,
//                      max: 250,
                        position: 'left',
                        axisLine: {
                            lineStyle: {
                                color: colors[0]
                            }
                        },
	                        axisLabel: {
	                            formatter: '{value}'
	                        }
	                    },
	                    {
	                        type: 'value',
	                        name: '',
	                        min: 0,
//	                        max: 250,
	                        position: 'right',
	                        offset: 80,
	                        axisLine: {
	                            lineStyle: {
	                                color: colors[1]
	                            }
	                        },
	                        axisLabel: {
	                            formatter: '{value}'
	                        }
	                    }
				    ],
				    series : [
				        {
	                        name: '订单量',
	                        type: 'bar',
	                        data: this.arrcount
                    	},
				        {
	                        name: '订单金额',
	                        type: 'bar',
	                        yAxisIndex: 1,
	                        data: this.arrtotal
	                    }
				    ]
		        });
		    },
        	getUserList(){
        		this.dataSheet = true
        		this.userList = false
        		let shopid = this.shopId = window.localStorage.getItem('shopId')
        		api.GetReportDataList({
	        		shopId: shopid,
					start: this.startDate,
					end: this.endDate,
					status: this.status,
					curpage: this.curpage,
					source: this.source
        		}).then(res=>{
        			
        		})
        	}
        },
		components: {
            myHeader: Header
		}
	}
</script>