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
		<!--个人设置-->
		<div class="shopData" v-show="ExhibitionName == '个人设置'">
			<div class="shopList">
				 &nbsp; &nbsp;<img src="../../assets/images/personal/headportrait.png"/> &nbsp;&nbsp;头像 <img src="../../assets/images/index/user-img.png" class="headportrait"/>
			</div>
			<div class="shopList">
				 &nbsp; &nbsp;<img src="../../assets/images/personal/fullname.png"/> &nbsp;&nbsp;姓名：<input class="headInp" type="text" v-model="name" />
			</div>
			<div class="shopList">
				 &nbsp; &nbsp;<img src="../../assets/images/personal/position.png"/> &nbsp;&nbsp;职位：{{job}}
			</div>
			<div class="shopList">
				 &nbsp; &nbsp;<img src="../../assets/images/personal/Telephone.png"/> &nbsp;&nbsp;手机号：<input class="headInp" type="text" v-model="mobile" />
			</div>
			<div class="confirmBtn" @click="confirmDeposit">确认保存</div>
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
				&nbsp; &nbsp;旧密码：<input type="text" placeholder="请输入旧密码" v-model="usedPassword"  /><p class="fr"v-show="usedpas">请输入旧密码</p>
			</div>
			<div class="shopList">
				&nbsp; &nbsp;新密码：<input type="text" placeholder="请输入新密码" @input="newPas()" v-model="newPassword" /><p class="fr" v-show="newpas">请输入新密码</p>
			</div>
			<div class="shopList">
				确认密码：<input type="text" placeholder="请再次输入新密码" @input="conPas()" v-model="confirmPassword" /><p class="fr" v-show="conpas">与上方密码不一致</p>
			</div>
			<div class="confirmBtn" @click="confirmModify">确认修改</div>
			<div class="isModify" v-show="isModify">修改失败</div>
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
                confirmPassword: '',		// 确认密码
                usedpas: false,				// 旧密码提示语
                newpas: false,				// 新密码提示语
                conpas: false,				// 确认密码提示语
                isModify: false,			// 判断是否修改成功
                name: false,				// 姓名
                mobile: false,				// 手机号
                job: false,					// 职位
            }
       },
        created () {
        	let route = this.$route
            this.ExhibitionName = route.query.ExhibitionName
            this.name = route.query.name
            this.mobile = route.query.mobile
            this.job = route.query.job
            
            this.GetMyShopInfo()
//          this.ifPassword()
        	
        },
        methods: {
        	newPas(){
        		if(this.usedPassword == ''){
        			this.usedpas = true
        			console.log(this.usedPassword)
        		}else{
        			this.usedpas = false
        			console.log(this.usedPassword)
        		}
        	},
        	conPas(){
        		if(this.newPassword != this.confirmPassword){
        			this.conpas = true
        		}else{
        			this.conpas = false
        		}
        	},
        	GetMyShopInfo(){
        		api.GetMyShopInfo({
                })
                .then( res => {
                	this.shopData = res.data
                })
                .catch(err => Promise.reject(err))
        	},
        	//确认保存
        	confirmDeposit(){
        		let name = this.name
            	let phone = this.mobile
            	let partten = /^1[3-8]\d{9}$/
            	if (phone.length > 11 || phone.length < 11 || !partten.test(phone)) {
                    alert("手机号格式不正确")
                    return
                }
                api.ChangeStaffInfo({
                	Name: name,
                	Phone: phone
                }).then(res=>{
                	if (res.data) {
                        alert("修改成功")
                        this.$router.push({path: 'personal'})
                    }else{
                        alert("修改失败")                   
                    }
                })
        	},
        	//确认修改
        	confirmModify(){
        		let old = this.usedPassword
        		let pass = this.newPassword
        		let pass2 = this.newPassword
        		if ((old == null || old == '')) {
                    alert("旧密码不能为空！");
                    return;
                }
                if ((pass == null || pass == '')) {
                    alert("新密码不能为空！");                  
                    return ;

                }
                if (old == pass) {
                    alert("新旧密码不能一样");
                    return;
                }
                if ((pass2 == null || pass2 == '')) {
                    alert("请重新输入新密码！");                  
                    return ;
                }
                if (pass!= pass2) {
                    alert("两次输入不一致");                   
                    return;
                }
        		else{
        			api.ComparePwd({
        				oldPwd: old
	        		}).then(res=>{
	        			if(res.data){
	        				api.ChangePwd({
	        					oldpwd: old,
								newpwd: pass
	        				}).then(res=>{
	        					alert("修改成功")
	        					this.$router.push({path: 'personal'})
	        				})
	        				this.isModify = false
	        			}else{
	        				alert("旧密码输入不正确")
	        				this.isModify = true
	        			}
	        		}).catch(err => Promise.reject(err))
        		}
        	}
        },
		components: {
            myHeader: Header
		}
	}
</script>