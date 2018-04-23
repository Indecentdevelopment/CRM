<template>
	<div class="allocationYes">
		<!-- 头部 顶部 -->
		<my-header></my-header>
		<!--列表-->
		<div class="storeConfirm clearfix" v-for="item in orderStateList" :key="item.id">
			<p class="fl">{{item.shopType}}：{{item.shopName}}</p>
			<p class="fl">订单状态：{{item.providerStatus}}</p>
			<router-link :to="{
					path: 'allocationDetailed',
					query:{
						id:item.id,
						serial:item.serial,
						currentShopName:item.currentShopName
					}
				}">
				<span class="fr">详情</span>
			</router-link>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
    import Header from '@/components/header'
    import api from '@/vuex/api'
	import "./allocationYes.sass"
	export default {
		data() {
			return {
                isLoading: true,
                serial: '',
                orderStateList: ''
            }
       },
        created () {
        	Promise.all([]).then(res => {
                setTimeout(() => {
                }, 500)
            })
        	let route = this.$route
            this.serial = route.query.serial
        	this.orderState()
        	console.log(this.serial)
        },
        mounted () {
        	
        },
        methods: {
        	orderState(){
        		api.GetApplyRequireDetail({
        			serial: this.serial
                }).then(res => {
                	console.log(res.data)
                	this.orderStateList = res.data.applyShopModels
                }).catch(err => Promise.reject(err))
        	}
        },
		components: {
            myHeader: Header
		}
	}
</script>