<template>
	<div class="seekHelp">
		<!-- 头部 顶部 -->
		<my-header></my-header>
		<!--列表-->
		<div class="orderList clearfix"  v-for="(item,i) in applyRequireList" :key="i">
			<p class="fl">产品名称：{{item.productName}}</p>
			<p class="fl">请求时间：{{item.providerDateTime}}</p>
			<p class="fl">调拨数量：{{item.quantity}}</p>
			<p class="fl">调拨类型：{{item.applyType}}</p>
			<router-link :to="{path: 'allocationYes', query:{serial:item.serial}}">
				<span class="fr" @click="details">详情</span>
			</router-link>
		</div>
		<div class="seekHelp-footer">如需要查看更多调拨信息请在crm后台调拨列表查看</div>
		<div v-show="applyRequireList == ''">暂未找到相关订单！</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
    import Header from '@/components/header'
    import keyboardCarNo from '@/components/keyboardCarNo'
    import api from '@/vuex/api'
	import "./applyRequireList.sass"
	export default {
		data() {
			return {
                isLoading: true,
                applyRequireList: [],  // 最下方 服务列表
                currentSerial:''
            }
       },
        created () {
        	Promise.all([]).then(res => {
                setTimeout(() => {
                }, 500)
            })
        	this.getApplyRequireList()
        },
        mounted () {
        },
        methods: {
        	getApplyRequireList(){
        		api.GetApplyRequireList(
        			
        		)
                .then(res => {
                    this.applyRequireList = res.data.applyRequires
                    this.isLoading = false
               		console.log(123)
               		console.log(res.data)
                })
                .catch(err => Promise.reject(err))
        	},
        	//详情
        	details(){
        		
        	}
        },
		components: {
            myHeader: Header
		}
	}
</script>