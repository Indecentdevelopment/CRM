<template>
	<div class="allocationSingle">
		<!-- 头部 顶部 -->
		<my-header></my-header>
		<div class="loading" v-loading="isLoading">
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
				<span @click.stop="supplier">查找门店（供应商）</span>
			</div>
			<div class="store" v-show="storejudge">
			<el-tabs type="border-card" @tab-click="diliverApply">
				<!--同城门店-->
			  	<el-tab-pane label="同城门店">
					<div class="allocation">
						<span class="fr" @click="applicationApply">调拨申请</span>
					</div>
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
			  	</el-tab-pane>
			  	<!--门店列表-->
			  	<el-tab-pane label="供应商">
			  		<div class="supplierTop fl">
			  			<p class="fl clearfix">
			  				<span class="fr" @click="supplierApply">调拨申请</span>
			  				<span class="fr" @click="newSupplier">增加供应商</span>
			  			</p>
			  			<p class="fl clearfix">
			  				<span class="fr" @click="lookupSupplier">查找供应商</span>
			  				<input type="text" class="fr"/>
			  			</p>
			  		</div>
			  		<div class="storeList clearfix fl" v-for="(item, i) in diliverList" :key="i"  @click.stop="diliverStore(i, item.id, item.isNoWechat)">
						<div class="stoLeft fl">
							<img src="../../assets/images/allocationSingle/apply.png"/>
						</div>
						<div class="stoRighr fr">
							<h3 class="">{{item.name}}</h3>
							<p class="">距离：{{(item.distance/1000).toFixed(2)}}公里</p>
							<p class="">预计时间：{{(item.duration/60).toFixed(0)}}分钟</p>
							<p class="">电话：{{item.phone}}</p>
							<p class="">是否绑定微信：<span>{{item.isNoWechat>0?'是':'否'}}</span></p>
						</div>
						<div v-bind:class="[item.actives?'choice-b':'choice-a']"></div>
					</div>
			  	</el-tab-pane>
			</el-tabs>
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
				value1: '',						// 调拨时间
				supplierList: [],				// 调拨店铺列表
				diliverList:[],					// 供应商调拨列表
				allocationNumber: '1',			// 调拨数量
				storejudge: false,				// 门店调拨判断
				supplierAllocation: false,		// 供应商调拨判断
				shopIds: [],					// 店铺ID
				supplierIds: [],				// 供应商ID
				isNoWechat: [],					// 绑定微信用户
				shopsLength: 0,					// 供应商数量
                query: {                        // 参数
                    productId: this.$route.query.productId,
                    shopId: this.$route.query.shopId,
                    ShowShopType: this.$route.query.ShowShopType,
                    ordernum: this.$route.query.ordernum,
                    rownum: this.$route.query.rownum
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
		},
		methods: {
			// 获取供应商
			diliverApply(){
				
			},
			// 点击某个供应商
			diliverStore(index,id,isNoWechat){
				this.diliverList[index].actives = !this.diliverList[index].actives
                let shops = this.supplierIds
                if(this.diliverList[index].actives == true){
                	this.supplierIds.push('['+ id +']');
                	if(isNoWechat > 0){
                		this.isNoWechat.push('['+ id +']')
                	}
                }else if(this.diliverList[index].actives == false){
                	this.supplierIds.pop();
                	if(isNoWechat > 0){
	                	this.isNoWechat.pop()
                	}
                }
			},
			// 添加供应商 （供应商）
			newSupplier(){
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
				
				this.$router.push({path: 'newSupplier',query:{ 
						productId: this.query.productId,
						quantity: this.allocationNumber,
						dateTime: date_value,
						orderNum: '',
						rownum: ''
					}
				})
			},
			// 查找供应商（供应商）
			lookupSupplier(){
				
			},
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
			supplier(ev){
				ev.preventDefault=true
				this.isLoading = true
				if(this.value1 == ''){
					this.$alert('调拨时间不正确！', '轮库Tirecool', {
			          	confirmButtonText: '确定',
			          	callback: action => {}
			        });
			        this.isLoading = false
				}else if(this.allocationNumber == '' || this.allocationNumber == 0){
					this.$alert('调拨数量不正确！', '轮库Tirecool', {
			          	confirmButtonText: '确定',
			          	callback: action => {}
			        });
			        this.isLoading = false
				}else{
					this.storejudge = true
					api.GetSupplierList({
	        			proId: this.query.productId +'_'+ this.query.shopId,
						type: this.shopType,
						applyShopName: ''
	               }).then(res => {
	               		this.isLoading = false
                        res.data.shops.map((item, index) => {
                            res.data.shops[index].active = false
                        })
                        this.supplierList = res.data.shops
	                })
	                api.GetSupplierList({
	        			proId: this.query.productId +'_'+ this.query.shopId,
						type: '供应商',
						applyShopName: ''
	                }).then(res => {
	                	this.isLoading = true
	               		res.data.shops.map((item, index) => {
	                        res.data.shops[index].actives = false
	                    })
	               		this.shopsLength = res.data.shops.length
	                	this.diliverList = res.data.shops
	                    
	                })
				}
			},
            // 点击 某个门店
            selectStore (index,id) {
                this.supplierList[index].active = !this.supplierList[index].active
                let shops = this.shopIds
                if(this.supplierList[index].active == true){
                	this.shopIds.push('['+ id +']')
                }else if(this.supplierList[index].active == false){
                	this.shopIds.pop();
                }
            },
            // 同城门店 - 调拨申请
            applicationApply(){
            	//店铺ID
            	if(this.shopIds != "" || this.supplierIds != ""){
            		// 判断调拨数量
            		if (this.allocationNumber == "" || this.allocationNumber == 0) {
            			this.$alert('调拨数量不正确！', '轮库Tirecool', {
				          	confirmButtonText: '确定',
				          	callback: action => {}
				        });
				        return
			        }
            		// 判断调拨时间
            		if(this.value1 == ''){
						this.$alert('调拨时间不正确！', '轮库Tirecool', {
				          	confirmButtonText: '确定',
				          	callback: action => {}
				        });
				        return
					}
            		var isApply = window.confirm("您确认发送调拨申请吗？")
					if(isApply){
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
		                        alert(res.errMsg);
		                    }
		                })
					}else{
						return
					}
            	}else{
            		this.$alert('请选择一个门店！', '轮库Tirecool', {
			          	confirmButtonText: '确定',
			          	callback: action => {}
			        });
            	}
            },
            // 供应商 - 调拨申请
            supplierApply(){
            	//店铺ID
            	if(this.shopIds != "" || this.supplierIds != ""){
            		// 判断调拨数量
            		if (this.allocationNumber == "" || this.allocationNumber == 0) {
            			this.$alert('调拨数量不正确！', '轮库Tirecool', {
				          	confirmButtonText: '确定',
				          	callback: action => {}
				        });
				        return
			        }
            		// 判断调拨时间
            		if(this.value1 == ''){
						this.$alert('调拨时间不正确！', '轮库Tirecool', {
				          	confirmButtonText: '确定',
				          	callback: action => {}
				        });
				        return
					}
            		// 判断供应商调拨数量  和  微信绑定用户数量
            		if(this.supplierIds.length > 0){
						if(this.allocationNumber > 4){
							this.$alert('零采调拨数量不能超过4个！', '轮库Tirecool', {
					          	confirmButtonText: '确定',
					          	callback: action => {}
					        });
					        return
						}
						let xuancount = this.supplierIds.length
		                let isNoWechat = this.isNoWechat.length
		                console.log(xuancount);
		                console.log(isNoWechat);
		                if (xuancount > 1 && isNoWechat <= 0) {
		                	this.$alert('选择多个门店时，最少选择一个绑定微信的供应商!', '轮库Tirecool', {
					          	confirmButtonText: '确定',
					          	callback: action => {}
					        })
		                    return;
		                }
					}
            		var isApply = window.confirm("您确认发送调拨申请吗？")
					if(isApply){
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
							ShopIds: this.supplierIds.join(),
							Quantity: this.allocationNumber,
							ProviderDateTime: date_value,//格式
							ApplyType: '供应商',
							OrderNum: '',
							RowNum: ''
		               }).then(res => {
			               	if(res.data.result){
			               		alert("您的调拨申请已发送！");
		                		this.$router.push({path:'applyRequireList',query:{serial: res.data.errMsg}})
			               	} else {
		                        alert(res.errMsg);
		                    }
		                })
					}else{
						return
					}
            	}else{
            		this.$alert('请选择一个门店！', '轮库Tirecool', {
			          	confirmButtonText: '确定',
			          	callback: action => {}
			        });
            	}
           },
		},
		components: {
			myHeader: Header
		}
	}
</script>