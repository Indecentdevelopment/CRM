<template>
	<div class="seekHelp">
		<!-- 头部 顶部 -->
		<my-header></my-header>
		<!--列表-->
		<div class="" v-show="status === 'order'">
			<div class="orderList clearfix" v-for="item in orderLists.applyShopModels" :key="item.id" >
				<p class="fl">需求单号：{{item.serial}}</p>
				<p class="fl">订单状态：{{item.providerStatus}}</p>
				<p class="fl">请求门店：{{item.currentShopName}}</p>
				<p class="fl">订单状态：{{item.createDateTime}}</p>
				<!-- <router-link :to="{
					path: 'allocationDetailed',
					query:{
						id:item.id,
						serial:item.serial,
						currentShopName:item.currentShopName
					}
				}">
					<span class="fr" @click="details">详情</span>
				</router-link> -->
                <div class="show-detail" @click="showDetails(item)">详情</div>
			</div>
			<div class="seekHelp-footer">如需要查看更多调拨信息请在crm后台调拨列表查看</div>
		</div>

        <div class="form" v-show="status === 'form'">
            <div class="title">调拨单明细</div>
            <div class="form-box">
                <div class="form-item">
                    <div class="info">ID：</div>
                    <div class="val">{{orderData.id}}</div>
                </div>
                <div class="form-item">
                    <div class="info">零采单号：</div>
                    <div class="val">无</div>
                </div>
                <div class="form-item">
                    <div class="info">CRM服务单号：</div>
                    <div class="val">不知</div>
                </div>
                <div class="form-item">
                    <div class="info">Serial号：</div>
                    <div class="val">{{orderData.serial}}</div>
                </div>
                <div class="form-item">
                    <div class="info">申请门店：</div>
                    <div class="val">{{orderData.currentShopName}}</div>
                </div>
                <div class="form-item">
                    <div class="info">申请产品：</div>
                    <div class="val">不知</div>
                </div>
                <div class="form-item">
                    <div class="info">申请数量：</div>
                    <div class="val">不知</div>
                </div>
                <div class="form-item">
                    <div class="info">申请时间：</div>
                    <div class="val">{{orderData.createDateTime}}</div>
                </div>
                <div class="form-item">
                    <div class="info">被调拨方：</div>
                    <div class="val">不知</div>
                </div>
                
                <div class="form-item">
                    <div class="info">预估到店：</div>
                    <div class="block">
						<el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
						</el-date-picker>
					</div>
                </div>
                <div class="form-item">
                    <div class="info">调拨状态：</div>
                    <div class="val">{{orderData.providerStatus}}</div>
                </div>
                <div class="form-item">
                    <div class="info">收货状态：</div>
                    <div class="val">不知</div>
                </div>
                <div class="form-item">
                    <div class="info">备注：</div>
                    <textarea ></textarea>
                </div>
                <div class="form-item">
                    <div class="info">拒绝原因：</div>
                    <textarea ></textarea>
                </div>

                <div class="btn-box">
                    <button>接受申请</button>
                    <button>拒绝申请</button>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Header from '@/components/header'
	import api from '@/vuex/api'
	import "./seekHelp.sass"
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
                status: 'order',         // 当前显示的页面
				isLoading: true,
                orderLists: {},		    // 产品详情
                orderData: {},          // 当前查看的订单
				orderParameter: '',		// 产品参数
				value1: '',						//调拨时间
			}
		},
		created() {
			Promise.all([]).then(res => {
				setTimeout(() => {
					this.isLoading = false
				}, 500)
			})
			this.orderList()
		},
		methods: {
			//获取订单列表
			orderList(){
				api.GetMyApplyRequireList(
					
				).then( res =>{
					this.orderLists = res.data
					this.orderParameter = res.data
				})
			},
			showDetails(item){
                this.status = 'form'
                this.orderData = item
			}
		},
		components: {
			myHeader: Header
		}
	}
</script>