<template>
	<div class="cardsInfo">
		
		<!-- 头部 顶部 -->
		<my-header></my-header>
		<div class="loading" v-loading="isLoading">
			<!--收搜框-->
			<div class="findbox">
				<input class="sthelse" placeholder="请输入四位以上卡号查询" v-model="cardsNo"/>
				<p class="findsth" @click="searchCardsList">查询</p>
			</div>
			<!--卡劵列表-->
			<div class="sthbox" >
				<div class="sths" v-for="(item,i) in cardlist" :key="i">
                    <div class="cardname">
                    	<p> {{item.cardNo}} - <span style="color:#ccc;">{{item.name}}</span>
                    	</p>
                    </div>
                    <div class="cardtype"><p>{{item.cardType}}</p>
                    	<p></p>
                    </div>
                    <div class="cardinfo clearfix" >
                    	<p class="fudong fl"><img src="../../assets/images/cardsInfo/card_name.png"/>{{item.userName}}</p>
                    	<p class="fudong fl"><img src="../../assets/images/cardsInfo/card_tell.png"/>{{item.userPhone}}</p>
                    	<p class="fudong fl"><img src="../../assets/images/cardsInfo/card_money.png"/>{{item.money}}</p>
                    	<p class="usedDetail fl" @click="showUsedRecord(i)"><span>明细</span></p>
                    </div>
                    <div class="cardmain clearfix">
                    	<p class="fl">绑定门店：{{item.shopName}}</p>
                    	<p class="fr">状态：有效</p>
                    </div>
                </div>
			</div>
			<!--消费记录-->
			<div class="mask" v-show="detailOpend && usedDetailList !='' ">
		        <div class="consumption">
		        	<div class="fl clearfix conTop">
			        	<p class="fl">消费时间</p>
			        	<p class="fl">消费金额</p>
			        	<p class="fl">订单尾号</p>
			        	<span @click="detailOpend = ''">×</span>
			        </div>
			        <div class="fl clearfix conBottom" v-for="(recorditem,index) in usedDetailList" :key="index">
			        	<p class="fl">{{recorditem.createDate.substring(0,10)}}</p>
			        	<p class="fl">{{recorditem.useAmount}}</p>
			        	<p class="fl">{{recorditem.orderId}}</p>
			        	<router-link :to="{path: 'orderDetails', query:{ OrderId:recorditem.orderId}}" class="fl">
			        		查看
						</router-link>	
			        </div>
		        </div>
		    </div>
		   
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
    import Header from '@/components/header'
    import keyboardCarNo from '@/components/keyboardCarNo'
    import api from '@/vuex/api'
	import "./cardsInfo.sass"
	export default {
		data() {
			return {
                isLoading: true,
                cardsNo: '', // 卡券号
                cardlist: [],  // 最下方 服务列表
                detailOpend:false,
                usedDetailList:[] //使用记录
            }
       },
        created () {
        	Promise.all([]).then(res => {
                setTimeout(() => {
                    this.isLoading = false
                }, 500)
            })
        	
        },
        mounted () {
        },
        methods: {
        	searchCardsList(){
        		if(this.cardsNo.length < 4){
        			alert("请输入四位以上的卡号!")
        		}else{
        			api.GetCardsList({
        				cardsNo:this.cardsNo
        			}).then(res => {
	                    this.cardlist = res.data.items
	                })
	                .catch(err => Promise.reject(err))
        		}
        	},
        	showUsedRecord(index){
        		this.detailOpend = true;
        		api.GetCardsUsedList(
        			{
        				CardCouponId:this.cardlist[index].cardId
        			}
        		)
        		.then(res => {
        			this.usedDetailList = res.data.card.cardCouponLogs
        		})
        		.catch(err => Promise.reject(err))
        	},
        	showCardsDetail(recordindex){
        		
        	}
        	
        },
		components: {
            myHeader: Header
		}
	}
</script>