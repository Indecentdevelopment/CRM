<template>
	<div class="seekHelp">
		<!-- 头部 顶部 -->
		<my-header></my-header>
		<!--列表-->
		<div class="">
			<div class="orderList clearfix" v-for="item in orderLists" :key="item.id" >
				<p class="fl">需求单号：{{item.serial}}</p>
				<p class="fl">订单状态：{{item.providerStatus}}</p>
				<p class="fl">请求门店：{{item.currentShopName}}</p>
				<p class="fl">订单状态：{{item.createDateTime}}</p>
				<router-link :to="{
					path: 'allocationDetailed',
					query:{
						id:item.id,
						serial:item.serial,
						currentShopName:item.currentShopName
					}
				}">
					<span class="fr" @click="details">详情</span>
				</router-link>
			</div>
			<div class="seekHelp-footer">如需要查看更多调拨信息请在crm后台调拨列表查看</div>
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
				isLoading: true,
				orderLists: '',		//产品详情
				orderParameter: ''		//产品参数
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
					this.orderLists = res.data.applyShopModels
					this.orderParameter = res.data
				})
			},
			details(){
				
			}
		},
		components: {
			myHeader: Header
		}
	}
</script>