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
					<el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions1" >
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
						<span :class="{active: shopType==='同城门店'}">同城门店</span>
	                    <span :class="{active: shopType==='供应商'}">供应商</span>
					</div>
					<div class="allocation clearfix">
						<span class="fr" @click="applicationApply">调拨申请</span>
					</div>
				</div>
				<!--门店列表-->
				<div class="storeList clearfix" v-for="(item, i) in supplierList" :key="i" @click="selectStore(i, item.id)">
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
				shopIds: [],					//店铺ID
                query: {                        // 参数
                    productId: this.$route.query.productId,
                    shopId: this.$route.query.shopId,
                    ShowShopType: this.$route.query.ShowShopType
                },
                shopType: ''                    // 他仓求助 商品类型 
			}
		},
		created() {
            
			Promise.all([]).then(res => {
				setTimeout(() => {
					this.isLoading = false
				}, 500)
            })
            
            if (this.query.ShowShopType === 1) {
                this.shopType = '同城门店'
            } else if (this.query.ShowShopType === 2) {
                this.shopType = '供应商'
            } else {
                this.shopType = '同城门店'
            }
            console.log(this.value1)
			
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
	        			proId: this.query.productId +'_'+ this.query.shopId,
						type: this.shopType,
						applyShopName: ''
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
            selectStore (index,id) {
                this.supplierList[index].active = !this.supplierList[index].active
                console.log(this.supplierList[index].active)
                let shops = this.shopIds
                if(this.supplierList[index].active == true){
                	this.shopIds.push('['+ id +']')
                	console.log(id)
                	console.log(this.shopIds.join())
                }else if(this.supplierList[index].active == false){
                	this.shopIds.pop()
                	console.log(this.shopIds)
                }
                
            },
            applicationApply(){
            	//店铺ID
            	console.log(this.shopIds)
            	if(this.shopIds != ""){
            		if(this.value1 == ''){
						this.$alert('调拨时间不正确！', '轮库Tirecool', {
				          	confirmButtonText: '确定',
				          	callback: action => {}
				        });
					}else if(this.shopType == '供应商')
					{
						if(this.allocationNumber > 4){
							this.$alert('零采调拨数量不能超过4个！', '轮库Tirecool', {
					          	confirmButtonText: '确定',
					          	callback: action => {}
					        });
						}
					}else{
						var isApply = window.confirm("您确认发送调拨申请吗？")
						console.log(isApply)	//获取布尔值  判断是否发送请求
						if(isApply == false){
							
						}else{
							console.log(this.query.productId)
							console.log(this.shopIds)
							console.log(this.allocationNumber)
							console.log(this.value1)
							console.log(this.shopType)
							let date = this.value1
							let getMonth = (date.getMonth() + 1)
							let getDate = date.getDate()
							let getHours = date.getHours()
							let getMinutes = date.getMinutes()
							if(getMonth < 10){
								getMonth = "0" + getMonth
							}
							if(getDate < 10){
								getDate = "0" + getDate
							}
							if(getHours < 10){
								getHours = "0" + getHours
							}
							if(getMinutes < 10){
								getMinutes = "0" + getMinutes
							}
							let date_value = date.getFullYear() + '-' + getMonth + '-' + getDate + ' ' + getHours + ':' + getMinutes;
							api.GetCreateApply({
								ProductId: this.query.productId,
								ShopIds: this.shopIds.join(),
								Quantity: this.allocationNumber,
								ProviderDateTime: date_value,//格式
								ApplyType: this.shopType,
								OrderNum: '',
								RowNum: ''
			               }).then(res => {
				               	if(res.data.result){
				               		alert("您的调拨申请已发送！");
			                		this.$router.push({path:'applyRequireList',query:{serial: res.data.errMsg}})
				               	} else {
			                        alert(json.errMsg);
			                    }
			                })
						}
					}
            	}else{
            		this.$alert('请选择一个门店！', '轮库Tirecool', {
			          	confirmButtonText: '确定',
			          	callback: action => {}
			        });
            	}
            }
		},
		components: {
			myHeader: Header
		}
	}
</script>