<template>
	<div class="home">
		
		<!-- 头部 顶部 -->
		<my-header></my-header>
		
		<!--输入框部分-->
		<div class="inputbox">
			<!--设置按钮-->
			<div class="setup">
				<img src="../../assets/images/home/hc-Setup.png" class="setup-img"/>
			</div>
			<div class="inputarr">
				<!--手机号输入框-->
				<input type="text" placeholder=" 请输入手机号码" class="inp-phone" @click="phoneLoad"/>
				<!--卡券选择框-->
				<select class="inp-choiceCard">
					<option value ="储值卡">储值卡</option>
					<option value ="买三送一机油卡">买三送一机油卡</option>
				</select>
				<!--卡券输入框-->
				<input type="text" placeholder=" 请输入卡券号" class="inp-inputCard" />
				<!--车牌选择框-->
				<select class="inp-brand">
						<option value="京">京</option>
	                    <option value="津">津</option>
	                    <option value="沪">沪</option>
	                    <option value="渝">渝</option>
	                    <option value="川">川</option>
	                    <option value="粤">粤</option>
	                    <option value="鄂">鄂</option>
	                    <option value="云">云</option>
	                    <option value="鲁">鲁</option>
	                    <option value="晋">晋</option>
	                    <option value="闽">闽</option>
	                    <option value="浙">浙</option>
	                    <option value="皖">皖</option>
	                    <option value="辽">辽</option>
	                    <option value="豫">豫</option>
	                    <option value="湘">湘</option>
	                    <option value="赣">赣</option>
	                    <option value="甘">甘</option>
	                    <option value="冀">冀</option>
	                    <option value="陕">陕</option>
	                    <option value="苏">苏</option>
	                    <option value="吉">吉</option>
	                    <option value="青">青</option>
	                    <option value="贵">贵</option>
	                    <option value="黑">黑</option>
	                    <option value="桂">桂</option>
	                    <option value="新">新</option>
	                    <option value="蒙">蒙</option>
	                    <option value="藏">藏</option>
	                    <option value="宁">宁</option>
	                    <option value="琼">琼</option>
	                    <option value="其他">其他</option>
					</select>
				<!--车牌输入框-->
				<input type="text" placeholder=" 请输入或扫描车牌号" class="inp-inputBrand" />
				<!--搜索按钮-->
				<div class="inp-search">搜索</div>
			</div>
		</div>
		
		<!--服务功能-->
		<div class="service">
			<div class="service-conten">
				<div class="service-btn">
					<img src="../../assets/images/home/hc-service.png" class="service-img"/>
				</div>
				<p class="service-p">服务列表</p>
			</div>
			<div class="service-conten">
				<div class="service-btn">
					<img src="../../assets/images/home/hc-administration.png" class="service-img"/>
				</div>
				<p class="service-p">洗车管理</p>
			</div>
			<div class="service-conten">
				<div class="service-btn">
					<img src="../../assets/images/home/hc-checktheprice.png" class="service-img"/>
				</div>
				<p class="service-p">快捷查价</p>
			</div>
		</div>
		<div class="service">
			<div class="service-conten">
				<div class="service-btn">
					<img src="../../assets/images/home/hc-allocation.png" class="service-img"/>
				</div>
				<p class="service-p">调拨列表</p>
			</div>
			<div class="service-conten">
				<div class="service-btn">
					<img src="../../assets/images/home/hc-cardcoupons.png" class="service-img"/>
				</div>
				<p class="service-p">卡券查询</p>
			</div>
			<div class="service-conten">
				<div class="service-btn">
					<img src="../../assets/images/home/hc-seekhelp.png" class="service-img"/>
				</div>
				<p class="service-p">他仓求助</p>
				<div class="prompt">4</div>
			</div>
		</div>
		
		<!--服务中车牌号-->
		<div class="inService">
        	<div class="ins-btn">
        		<p class="ins-border"></p>
        		<p class="ins-txt">服务中</p>
        	</div>
        	<ul class="ins-ul">
        		<li class="ins-li"><span class="ins-span">京L12376</span></a></li>
        		<li class="ins-li"><span class="ins-span">京L12376</span></a></li>
        		<li class="ins-li"><span class="ins-span">京L12376</span></a></li>
        		<li class="ins-li"><span class="ins-span">京L12376</span></a></li>
        		<li class="ins-li"><span class="ins-span">京L12376</span></a></li>
        		<li class="ins-li"><span class="ins-span">京L12376</span></a></li>
        		<li class="ins-li"><span class="ins-span">京L12376</span></a></li>
        		<li class="ins-li"><span class="ins-span">京L12376</span></a></li>
        	</ul>
        </div>
        
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import Header from '@/components/header'
	import "./home.sass"
	export default {
		data() {
			return {}
		},
		components: {
			myHeader: Header
		}
	}
</script>