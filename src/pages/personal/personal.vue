<template>
	<div class="personal">
		<!-- 头部 顶部 -->
		<my-header></my-header>
		<div class="loading" v-loading="isLoading">
			<!--头像框-->
			<div class="headImage">
				<!--设置按钮-->
				<router-link :to="{path: 'personalDataPage',query:{ExhibitionName:'个人设置',name: uesrData.name,mobile: uesrData.mobile,job: uesrData.job,}}">
					<img src="../../assets/images/home/hc-Setup.png" class="head-img"/>
				</router-link>
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
			<router-link :to="{path: 'personalDataPage',query:{ExhibitionName:'店铺信息'}}" class="colorBlack">
				<div class="operationFun">
					<img src="../../assets/images/personal/shop-photos.png"/><span>店铺信息</span>
				</div>
			</router-link>
			<router-link :to="{path: 'personalDataPage',query:{ExhibitionName:'个人绩效'}}" class="colorBlack">
				<div class="operationFun">
					<img src="../../assets/images/personal/score.png"/><span>个人绩效</span>
				</div>
			</router-link>
			<router-link :to="{path: 'personalDataPage',query:{ExhibitionName:'修改密码'}}" class="colorBlack">
				<div class="operationFun">
					<img src="../../assets/images/personal/lock1.png"/><span>修改密码</span>
				</div>
			</router-link>
			<router-link :to="{path: 'reportForm'}" class="colorBlack">
				<div class="operationFun">
					<img src="../../assets/images/personal/keliuliang.png"/><span>报表</span>
				</div>
			</router-link>
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
        	
        	Promise.all([this.GetUserInformation()]).then(res => {
	            setTimeout(() => {
	                this.isLoading = false
	            }, 500)
	        })

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