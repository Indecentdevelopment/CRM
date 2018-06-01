<template>
	<div class="reportForm">
		<!-- 头部 顶部 -->
		<my-header></my-header>
		<div class="loading" v-loading="isLoading">
			<!--顶部切换按钮-->
			<div class="switch" v-show="imgControl">
				<img src="../../assets/images/personal/liebiao.png" @click="controlImg" v-show="dataSheet" />
				<img src="../../assets/images/personal/qiehuan.png" @click="getUserList" v-show="userList" />
			</div>
			<!--功能输入区域-->
			<div class="start">
				<span>开始时间：</span>
				<div class="block">
					<el-date-picker v-model="startDate" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
					</el-date-picker>
				</div>
			</div>
			<div class="start">
				<span>结束时间：</span>
				<div class="block">
					<el-date-picker v-model="endDate" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
					</el-date-picker>
				</div>
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
				<div class="userData clearfix" v-for="item in reports">
		        	<div class="useRighr fr">
		        		<p class="fl">姓名：{{item.name}}</p>
		        		<p class="fl">手机号：{{item.mobile}}</p>
		        		<p class="fl">车牌号：{{item.carNo}}</p>
		        		<p class="fl">工作状态：{{item.orderStatus}}</p>
		        		<p class="fl">时间：{{item.date}}</p>
		        		<p class="fl clearfix">
		        			<router-link :to="{ path: '/orderDetails', query: { OrderId: item.orderId }}">
		        				<span class="fr">详情</span>
		        			</router-link>
		        		</p>
		        	</div>
		        </div>
		        
		        <!--分页-->
		        <div class="paging">
		        	<p @click="before">上一页</p>
		        	<p><span v-model="initial">{{initial}}</span>/<span v-model="endPage">{{endPage}}</span></p>
		        	<p @click="next">下一页</p>
		        	<input type="text" v-model="conPage" />
		        	<p @click="gotxt">转到</p>
				</div>
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
				pickerOptions1: {
					disabledDate(time) {
						return time.getTime < Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}

					}]
				},
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
                reports: [],				// 客户列表
                initial: '1',				// 初始页
                endPage: '',				// 结束页
                conPage: '',				// 跳转页数
            }
        },
        mounted(){
		    this.getNowFormatDate()
		    this.getBeforeWeek()
		},
        created () {
        	
        },
        methods: {
        	//上一页
        	before(){
        		if(this.initial == 1){
        			
        		}else{
        			this.initial --
        			console.log(this.initial)
        			let shopid = this.shopId = window.localStorage.getItem('shopId')
	        		this.dataSheet = false
	        		this.userList = true
	        		api.GetReportDataList({
		        		shopId: shopid,
						start: this.startDate,
						end: this.endDate,
						status: this.status,
						curpage: this.initial,
						source: this.source
	        		}).then(res=>{
	        			this.reports = res.data.reports
	        		})
        		}
        	},
        	//下一页
        	next(){
        		if(this.initial == this.endPage){
        			
        		}else{
        			this.initial ++
        			let shopid = this.shopId = window.localStorage.getItem('shopId')
	        		this.dataSheet = false
	        		this.userList = true
	        		api.GetReportDataList({
		        		shopId: shopid,
						start: this.startDate,
						end: this.endDate,
						status: this.status,
						curpage: this.initial,
						source: this.source
	        		}).then(res=>{
	        			this.reports = res.data.reports
	        		})
        		}
        	},
        	//跳转
        	gotxt(){
        		let shopid = this.shopId = window.localStorage.getItem('shopId')
        		
        		if( this.conPage > this.endPage){
        			alert("超出页码范围!")
        		}else{
        			this.initial = this.conPage
        			api.GetReportDataList({
		        		shopId: shopid,
						start: this.startDate,
						end: this.endDate,
						status: this.status,
						curpage: this.conPage,
						source: this.source
	        		}).then(res=>{
	        			this.reports = res.data.reports
	        		})
        		}
        		
        	},
        	//获取当前时间，格式YYYY-MM-DD
			getNowFormatDate() {
			    var date = new Date();
			    let seperator1 = "-";
			    let year = date.getFullYear();
			    let month = date.getMonth() + 1;
			    let strDate = date.getDate();
			    if (month >= 1 && month <= 9) {
			        month = "0" + month;
			    }
			    if (strDate >= 0 && strDate <= 9) {
			        strDate = "0" + strDate;
			    }
			    var currentdate = year + seperator1 + month + seperator1 + strDate;
			    this.endDate = currentdate
			},
			// 获取上周时间
			getBeforeWeek(){
				let now = new Date();
				let date = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				this.startDate = year + '-' + month + '-' + day;
			},
			// 获取当前客户信息列表
        	controlImg(){
        		let shopid = this.shopId = window.localStorage.getItem('shopId')
        		this.dataSheet = false
        		this.userList = true
        		api.GetReportDataList({
	        		shopId: shopid,
					start: this.startDate,
					end: this.endDate,
					status: this.status,
					curpage: this.curpage,
					source: this.source
        		}).then(res=>{
        			
	        		this.endPage = res.data.pageCount //赋值当前总页数
        			this.reports = res.data.reports
        		})
        	},
        	// 获取数据然后赋值
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
        	// 将数据生成echarts图表
        	drawLine(el){
		        // 基于准备好的dom，初始化echarts实例
		        let myChart = this.$echarts.init(document.getElementById('myChart'))
		        let colors = ['#ffda01', '#bfbfbf']
		        //console.log(this.arrdate)
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
        		
        	}
        },
		components: {
            myHeader: Header
		}
	}
</script>