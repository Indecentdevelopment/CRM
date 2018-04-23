<template>
	<div class="allocationSingle">
		<!-- 头部 顶部 -->
		<my-header></my-header>
		<div class="apply">
			调拨申请单
		</div>
		<!--调拨数量-->
		<div class="allocationNber">
			<span class="allNber-amount">调拨数量：</span>
			<span class="allNber-reduce" @click="allReduce">-</span>
			<input class="allNber-conter" onfocus=this.blur() type="text" v-model="allocationNumber" />
			<span class="allNber-plus" @click="allPlus">+</span>
		</div>
		<!--调拨时间-->
		<div class="allocationNber">
			<span class="allNber-amount">调拨时间：</span>
			<div class="block">
				<el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
				</el-date-picker>
			</div>
		</div>
		<!--查找门店（供应商）-->
		<div class="supplier">
			<span @click="supplier">查找门店（供应商）</span>
		</div>
		<div class="store" v-show="storejudge">
			<!--同城门店-->
			<div class="cityStore">
				<div class="cityHeader">
					<span>同城门店</span>
				</div>
				<div class="allocation clearfix">
					<span class="fr" @click="applicationApply">调拨申请</span>
				</div>
			</div>
			<!--门店列表-->
			<div class="storeList clearfix" v-for="(item, i) in supplierList" :key="i" @click="selectStore(i)">
				<div class="storeImg fl">
					<img src="../../assets/images/allocationSingle/shop.png"/>
				</div>
				<div class="storeData clearfix fl">
					<h3 class="fl">{{item.name}}</h3>
					<p class="fl">距离：{{(item.distance/1000).toFixed(2)}}公里</p>
					<p class="fl">预计时间：{{(item.duration/60).toFixed(0)}}分钟</p>
					<p class="fl">电话：{{item.phone}}</p>
					<p class="fl">库存：{{item.quantity}}</p>
				</div>
				<div v-bind:class="[item.active?'choice-b':'choice-a']"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Header from '@/components/header'
	import api from '@/vuex/api'
	import "./allocationSingle.sass"
	export default {
		data() {
			return {
				isLoading: true,
				pickerOptions1: {
					disabledDate(time) {
						return time.getTime < Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}

					}]
				},
				value1: '',						//调拨时间
				supplierList: [],				//调拨店铺列表
				allocationNumber: '1',			//调拨数量
				storejudge: false,				//调拨判断
				shopId: '',						//shopId
				productId: '',					//proId
				type: '',						//供应商
				applyShopName: ''				//应用商店
			}
		},
		created() {
			let route = this.$route
            this.shopId = route.query.shopId
            this.productId = route.query.productId
            this.type = route.query.type
            this.applyShopName = route.query.applyShopName
            
			Promise.all([]).then(res => {
				setTimeout(() => {
					this.isLoading = false
				}, 500)
			})
			
		},
		methods: {
			//调拨判断
			//减少
			allReduce(){
				if(this.allocationNumber == 1){
					this.allocationNumber = 1
				}else{
					this.allocationNumber --
				}
			},
			//增加
			allPlus(){
				this.allocationNumber ++
			},
			//查找门店（供应商）
			supplier(){
				if(this.value1 == ''){
					this.$alert('调拨时间不正确！', '轮库Tirecool', {
			          	confirmButtonText: '确定',
			          	callback: action => {}
			        });
				}else if(this.allocationNumber == '' || this.allocationNumber == 0){
					this.$alert('调拨数量不正确！', '轮库Tirecool', {
			          	confirmButtonText: '确定',
			          	callback: action => {}
			        });
				}else{
					this.storejudge = true
					api.GetSupplierList({
	        			proId: this.shopId +'_'+ this.productId,
						type: this.type,
						applyShopName: this.applyShopName
	                }).then(res => {
	                	console.log(res.data)
	                	
                        res.data.shops.map((item, index) => {
                            res.data.shops[index].active = false
                        })
                        this.supplierList = res.data.shops
	                	console.log(this.supplierList)
	                })
				}
			},
            // 点击 某个门店
            selectStore (index) {
                this.supplierList[index].active = !this.supplierList[index].active
                console.log(this.supplierList[index].active)
            },
            applicationApply(){
//          	var apply = {
//                  ProductId: proid,
//                  ShopIds: shopIds,
//                  Quantity: quantity,
//                  ProviderDateTime: dateTime,
//                  ApplyType: $("#hidApplyType").val(),
//                  OrderNum: getUrlParam("ordernum"),
//                  RowNum: getUrlParam("rownum")
//              }
//          	if(){
//          		调拨数量不正确!
//          	}else if(){
//          		调拨时间不正确!
//          	}
            }
		},
		components: {
			myHeader: Header
		}
	}
</script>