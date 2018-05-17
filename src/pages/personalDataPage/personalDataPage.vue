<template>
	<div class="personalDataPage">
		<!-- 头部 顶部 -->
		<my-header></my-header>
		<!--头像框-->
		<div class="headImage">
			<!--头像-->
			<div class="headImg">
				<img src="../../assets/images/index/user-img.png"/>
			</div>
		</div>
		<!--店铺信息-->
		<div class="shopData" v-show="ExhibitionName == '店铺信息'">
			<div class="shopList">
				 &nbsp; &nbsp;<img src="../../assets/images/personal/shop-photos.png"/> &nbsp;&nbsp;店铺名称：{{shopData.name}}
			</div>
			<div class="shopList">
				 &nbsp; &nbsp;<img src="../../assets/images/personal/address.png"/> &nbsp;&nbsp;地址：{{shopData.addressDetails}}
			</div>
			<div class="shopList">
				 &nbsp; &nbsp;<img src="../../assets/images/personal/contact.png"/> &nbsp;&nbsp;店内热线：{{shopData.phone}}
			</div>
		</div>
		<!--个人绩效-->
		<div class="shopData" v-show="ExhibitionName == '个人绩效'">
			<div class="shopList">
				 &nbsp; &nbsp;<img src="../../assets/images/personal/score.png"/> &nbsp;&nbsp;销售业绩： 2100000元
			</div>
			<div class="shopList">
				 &nbsp; &nbsp;<img src="../../assets/images/personal/service.png"/> &nbsp;&nbsp;服务业绩： 3000元
			</div>
			<div class="shopList">
				 &nbsp; &nbsp;<img src="../../assets/images/personal/vip.png"/> &nbsp;&nbsp;新会员数： 33人
			</div>
			<div class="shopList">
				 &nbsp; &nbsp;<img src="../../assets/images/personal/keliuliang.png"/> &nbsp;&nbsp;客流数： 128人
			</div>
		</div>
		<!--修改密码-->
		<div class="shopData" v-show="ExhibitionName == '修改密码'">
			<div class="shopList">
				&nbsp; &nbsp;旧密码：<input type="text" placeholder="请输入旧密码" /><p class="fr" v-show="usedPassword == ''">请输入旧密码</p>
			</div>
			<div class="shopList">
				&nbsp; &nbsp;新密码：<input type="text" placeholder="请输入新密码" /><p class="fr" v-show="newPassword == ''">请输入新密码</p>
			</div>
			<div class="shopList">
				&nbsp; &nbsp;确认密码：<input type="text" placeholder="请再次输入新密码" /><p class="fr" v-show="newPassword != newPassword">与上方密码不一致</p>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
    import Header from '@/components/header'
    import api from '@/vuex/api'
	import "./personalDataPage.sass"
	export default {
		data() {
			return {
                isLoading: true,
                shopData: '',				// 店铺信息
                achievements: '',			// 个人绩效
//              shopData: '',				// 店铺信息
                ExhibitionName: '',			// 展示 url信息
                usedPassword: '',			// 旧密码
                newPassword: '',			// 新密码
            }
        },
        created () {
        	let route = this.$route
            this.ExhibitionName = route.query.ExhibitionName
            
            if(this.ExhibitionNamea == "店铺信息"){
            	this.GetMyShopInfo()
            }else if(this.ExhibitionNamea == "店铺信息"){
            	
            }else if(this.ExhibitionNamea == "店铺信息"){
            	
            }
            
        	
        },
        methods: {
        	GetMyShopInfo(){
        		api.GetMyShopInfo({
                })
                .then( res => {
                	this.shopData = res.data
                })
                .catch(err => Promise.reject(err))
        	}
        },
		components: {
            myHeader: Header
		}
	}
</script>