<template>
	<div class="personal">
		<!-- 头部 顶部 -->
		<my-header></my-header>
		<!--头像框-->
		<div class="headImage">
			<!--设置按钮-->
			<img src="../../assets/images/home/hc-Setup.png" class="head-img"/>
			<!--头像-->
			<div class="headImg">
				<img src="../../assets/images/index/user-img.png"/>
			</div>
		</div>
		<!--个人信息-->
		<div class="personalData">
			<p>姓名：{{uesrData.name}}</p>
			<p>手机号：{{uesrData.mobile}}</p>
			<p>职位：{{uesrData.job}}</p>
		</div>
		<!--操作功能-->
		<div class="operationFun">
			<img src="../../assets/images/personal/shop-photos.png"/><span>店铺信息</span>
		</div>
		<div class="operationFun">
			<img src="../../assets/images/personal/score.png"/><span>个人绩效</span>
		</div>
		<div class="operationFun">
			<img src="../../assets/images/personal/lock1.png"/><span>修改密码</span>
		</div>
		<div class="operationFun">
			<img src="../../assets/images/personal/keliuliang.png"/><span>报表</span>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
    import Header from '@/components/header'
    import api from '@/vuex/api'
	import "./personal.sass"
	export default {
		data() {
			return {
                isLoading: true,
                uesrData: ''
            }
       },
        created () {
        	this.GetUserInformation()
        },
        methods: {
        	//获取用户信息
        	GetUserInformation(){
        		api.GetUserInformation({
                })
                .then( res => {
                	this.uesrData = res.data
                })
                .catch(err => Promise.reject(err))
        	}
        },
		components: {
            myHeader: Header
		}
	}
</script>