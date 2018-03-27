<template>
	<div class="orderDetails">
		
		<!-- 头部 顶部 -->
        <my-header></my-header>
        
        <!--顾客信息-->
        <div class="customerInfo clearfix">
        	<p class="orderStyleOne orderColor-white fl">1111111111</p>
        	<p class="orderStyleTwo orderColor-white fl">老王头</p>
        	<p class="orderStyleOne orderColor-white fl"></p>
        	<p class="orderStyleTwo orderColor-white fl">电话：173665156</p>
        	<p class="orderStyleOne orderColor-gray fl">订单状态：待确定</p>
        	<p class="orderStyleTwo orderColor-gray fl">技师：未分配</p>
        	<p class="orderStyleOne orderColor-gray fl">服务店铺：银川西</p>
        	<p class="orderStyleTwo orderColor-gray fl">下单时间：2018-03-26</p>
        	<p class="orderStyleOne orderColor-white fl">预约时间：2018-3-27</p>
        	<div class="orderVehicleInfo fl clearfix">
        		<div class="vehicleImg fl">
        			<img src="http://act.tirecool.net/Content/img/defaultcar.jpg"/>
        		</div>
        		<p class="vehicleP fl">
        			<span>11111111111111</span><br />
        			<span>22222222222222</span><br />
        			<span>333333333333</span><br />
        			<span>444444444</span><br />
        		</p>
        	</div>
        	<div class="orderUndetermined">
        		<span>待确认</span>
        	</div>
        </div>
        
        <!--编辑 + 添加 按钮-->
        <div class="editAdd clearfix">
        	<p class="fr"><img src="../../assets/images/orderDetails/add.png"/>添加</p>
        	<p class="fr"><img src="../../assets/images/orderDetails/edit.png"/>编辑</p>
        </div>
        
        <!--订单内容-->
        <div class="orderContent clearfix">
        	<p class="orderContentp fl">&nbsp;&nbsp;订单内容</p>
        	<div class="orderConDetails fl">
        		<div class="detailsImg fl">
        			<img src="http://act.tirecool.net/Content/img/defaultcar.jpg"/>
        		</div>
        		<div class="detailsList fr">
        			<p>111</p>
        			<p class="detailsColora">222</p>
        			<p>他仓求助</p>
        			<p class="detailsColorb">444</p>
        			<p>555</p>
        		</div>
        	</div>
        </div>
        
        <!--结算信息-->
        <div class="settlementInfo clearfix">
        	<p class="settlementInfop fl">&nbsp;&nbsp;结算信息</p>
        	<div class="settlementInfoLeft">&nbsp;&nbsp;商品总价：</div><div class="settlementInfoRight">¥123&nbsp;&nbsp;</div>
        	<div class="settlementInfoLeft">&nbsp;&nbsp;服务费用：</div><div class="settlementInfoRight">¥123&nbsp;&nbsp;</div>
        	<div class="settlementInfoLeft">&nbsp;&nbsp;合计金额：</div><div class="settlementInfoRight">¥123&nbsp;&nbsp;</div>
        	<div class="settlementInfoLeft">&nbsp;&nbsp;优惠项目：</div><div class="settlementInfoRight"><span>[抹零优惠]立减</span>¥123&nbsp;&nbsp;</div>
        	<div class="settlementInfoLeft">&nbsp;&nbsp;会员折扣：</div><div class="settlementInfoRight">¥123&nbsp;&nbsp;</div>
        	<div class="settlementInfoLeft">&nbsp;&nbsp;优惠合计：</div><div class="settlementInfoRight">¥123&nbsp;&nbsp;</div>
        	<div class="settlementInfoLeft">&nbsp;&nbsp;应付总额：</div><div class="settlementInfoRight">¥123&nbsp;&nbsp;</div>
        </div>
        
        <!--顾客签字确认-->
        <div class="userSign clearfix">
        	<p class="userSignp fl">&nbsp;&nbsp;顾客签字确认</p>
        	<div class="signpLate fl">
        		
        	</div>
        	<div class="preservation fl">保存/选择技师</div>
        	<div class="cancel fl">取消</div>
        </div>
        
	</div>
</template>

<script>
	import Header from '@/components/header'
	import "./orderDetails.sass"
	import api from '@/vuex/api'
	export default {
	    data () {
	        return {
	        	
	        }
	    },
	    created() {
	    	
	    },
	    methods: {
	    	
	    },
	    components:{
	        myHeader: Header
	    }
	}
</script>

<style>
</style>