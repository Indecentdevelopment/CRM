<template>
	<div class="persona">
		
		<!-- 头部 顶部 -->
		<my-header></my-header>
		
		<!--个人信息-->
		<div class="personalData">
			<div class="personal-information">
				<div class="personal-user">
					<div class="personal-userImg">
						<img src="../../assets/images/index/user-img.png"/>
					</div>
					<div class="personal-userName">
						<p>王先生QD810175<br />17606318189</p>
						<router-link to="uservip">
							<img src="../../assets/images/personalPage/edit.png" class="personal-userEdit" />
						</router-link>
					</div>
				</div>
				<p class="personal-userInfo">会员卡：{{}}</p>
				<p class="personal-userInfo">卡券：<span @click="">共0张 【查看】</span></p>
				<p class="personal-userInfo">积分：<span @click="">剩余0 【查看】</span></p>
				<p class="personal-userInfo">可开发票订单：<span @click="">【开票】</span></p>
			</div>
		</div>
		
		<!--车辆信息-->
		<div class="personalModels">
			<div class="personal-allCar personal-choose">
				<div class="personal-car">
					<img src="http://crm.maxtire.com.cn/Content/img/CarImg/A - 安驰.png"/>
				</div>
				<p>宝骏<br />京888888</p>
			</div>
			<div class="personal-plusModels">
				<span>＋</span>添加车型
			</div>
			<div class="personal-modifyInfo">
				<p>车型信息：</p>
				<p>车牌号：</p>
				<p>车架号：</p>
				<p>技师备注：<input type="text" class="" /></p>
				<p><button>修改车辆信息</button><button>删除车辆信息</button></p>
				<div class="personal-mArrow"></div>
			</div>
		</div>
		
		<!--选填信息-->
		<div class="personalOptional">
			<div class="optional-input">
				<span>&nbsp;&nbsp;&nbsp;DOT号：</span><input type="text" placeholder="DOT号" />
			</div>
			<div class="optional-input">
				<span>上次保养：</span><input type="text" placeholder="上次保养时间" />
			</div>
			<div class="optional-input">
				<span>当前里程：</span><input type="text" placeholder="请输入..." />
			</div>
			<div class="optional-input">
				<span>月均里程：</span><input type="text" placeholder="请输入..." />
			</div>
			<div class="optional-inpRadio">
				<span class="inpRadio-style">过度磨损：</span>
				<span class="inpRadio-judge">是</span>
				<span class="inpRadio-frame"></span>
			</div>
			<div class="optional-inpRadio inpRadio-border">
				<span class="inpRadio-style">老化开裂：</span>
				
			</div>
			<div class="optional-inpRadio">
				<span class="inpRadio-style">胎侧损伤：</span>
				
			</div>
			<div class="optional-button">
				<button @click="">继续</button>
			</div>
		</div>
		
	</div>
</template>

<script>
	import Header from '@/components/header'
	import "./personalPage.sass"
	export default {
	    data () {
	        return {
	        	
	        }
	    },
	    methods: {
			UserEdit(){
				
			}
	    },
	    components:{
	        myHeader: Header
	    }
	}
</script>

<style>
</style>