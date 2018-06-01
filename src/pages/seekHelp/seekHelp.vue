<template>
	<div class="seekHelp">
		<!-- 头部 顶部 -->
		<my-header></my-header>
		<div class="loading" v-loading="isLoading">
			<!--列表-->
			<div class="" v-show="status === 'order'">
				<div class="orderList clearfix" v-for="item in orderLists.applyShopModels" :key="item.id" >
					<p class="fl">需求单号：{{item.serial}}</p>
					<p class="fl">订单状态：{{item.providerStatus}}</p>
					<p class="fl">请求门店：{{item.currentShopName}}</p>
					<p class="fl">订单状态：{{item.createDateTime}}</p>
					<!-- <router-link :to="{
						path: 'allocationDetailed',
						query:{
							id:item.id,
							serial:item.serial,
							currentShopName:item.currentShopName
						}
					}">
						<span class="fr" @click="details">详情</span>
					</router-link> -->
	                <div class="show-detail" @click="showDetails(item,item.serial,item.shopId,item.deliverDateTime)">详情</div>
				</div>
				<div class="seekHelp-footer">如需要查看更多调拨信息请在crm后台调拨列表查看</div>
			</div>
	
	        <div class="form" v-show="status === 'form'">
	            <div class="title">调拨单明细</div>
	            <div class="form-box">
	                <div class="form-item">
	                    <div class="info">ID：</div>
	                    <div class="val">{{orderData.id}}</div>
	                </div>
	                <div class="form-item">
	                    <div class="info">零采单号：</div>
	                    <div class="val">{{crmData.ebeln}}</div>
	                </div>
	                <div class="form-item">
	                    <div class="info">CRM服务单号：</div>
	                    <div class="val">{{crmData.orderNum}}</div>
	                </div>
	                <div class="form-item">
	                    <div class="info">Serial号：</div>
	                    <div class="val">{{orderData.serial}}</div>
	                </div>
	                <div class="form-item">
	                    <div class="info">申请门店：</div>
	                    <div class="val">{{orderData.currentShopName}}</div>
	                </div>
	                <div class="form-item">
	                    <div class="info">申请产品：</div>
	                    <div class="val"><span>{{crmData.productName}}</span></div>
	                </div>
	                <div class="form-item">
	                    <div class="info">申请数量：</div>
	                    <div class="val"><span>{{crmData.quantity}}</span></div>
	                </div>
	                <div class="form-item">
	                    <div class="info">申请时间：</div>
	                    <div class="val">{{orderData.createDateTime}}</div>
	                </div>
	                <div class="form-item">
	                    <div class="info">被调拨方：</div>
	                    <div class="val">{{crmData.shopName}}</div>
	                </div>
	                <div class="form-item" v-if="replyPriceDiv">
	                    <div class="info">回复报价(单价)：</div>
	                    <div class="val">{{crmData.ReplyPrice}}</div>
	                </div>
	                <div class="form-item" v-if="addsalelv">
	                    <div class="info">毛利率：</div>
	                    <div class="val">{{crmData.addPriceLv}}%</div>
	                </div>
	                <div class="form-item" v-if="salePriceDiv">
	                    <div class="info">销售价格(单价)：</div>
	                    <div class="val">{{crmData.SalePrice}}</div>
	                </div>
				    <div class="form-item" v-if="invoiceDiv">
	                    <div class="info">税别：</div>
				        <select>
				            <option value="J6">专票</option>
				            <option value="J0">普票</option>
				            <option value="J5">其它</option>
				        </select>
	                </div>
	                <div class="form-item">
	                    <div class="info">预估到店：</div>
	                    <div class="block">
							<el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
							</el-date-picker>
						</div>
	                </div>
	                <div class="form-item" v-if="deliverSerialDiv">
	                    <div class="info">{{oddNumbers}}</div>
	                    <div class="val">{{crmData.deliverSerial}}</div>
	                </div>
	                <div class="form-item">
	                    <div class="info">调拨状态：</div>
	                    <div class="val">{{orderData.providerStatus}}</div>
	                </div>
	                <div class="form-item">
	                    <div class="info">收货状态：</div>
	                    <div class="val">{{crmData.deliveryStatus}}</div>
	                </div>
	                <div class="form-item">
	                    <div class="info">备注：</div>
	                    <textarea ></textarea>
	                </div>
	                <div class="form-item" v-if="rejectDiv">
	                    <div class="info">拒绝原因：</div>
	                    <textarea ></textarea>
	                </div>
	
	                <div class="btn-box">
	                    <button v-if="btnAccept" @click="acceptApply">接受申请</button>
	                    <button v-if="btnReject" @click="returnList">拒绝申请</button>
	                    <button v-if="btnAcceptPrice" @click="acceptOffer">接受报价</button>
	                    <button v-if="btnRejectPrice" @click="refuseOffer">拒绝报价</button>
	                    <button v-if="btnSendBack" @click="returnList">退回</button>
	                    <button v-if="btnCheXiao" @click="revokeList">撤销</button>
	                    <button v-if="btnOutStore" @click="commodity">商品出库</button>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Header from '@/components/header'
	import api from '@/vuex/api'
	import "./seekHelp.sass"
	export default {
		data() {
			return {
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
				oddNumbers: '订单流水号：', //流水单号
                status: 'order',         // 当前显示的页面
				isLoading: true,
                orderLists: {},		    // 产品详情
                orderData: {},          // 当前查看的订单
				orderParameter: '',		// 产品参数
				value1: '',				//调拨时间
				crmData: {},
				btnAccept: false,
				btnReject: false,
				btnAcceptPrice: false,
				btnRejectPrice: false,
				btnSendBack: false,
				btnCheXiao: false,
				btnOutStore: false,
				replyPriceDiv: false,
				addsalelv: false,
				salePriceDiv: false,
				invoiceDiv: false,
				deliverSerialDiv: false,
				rejectDiv: false,
				DeliverSerial: '0'
			}
		},
		created() {
			Promise.all([]).then(res => {
				setTimeout(() => {
					this.isLoading = false
				}, 500)
			})
			this.orderList()
		},
		methods: {
			//获取订单列表
			orderList(){
				api.GetMyApplyRequireList(
					
				).then( res =>{
					this.orderLists = res.data
					this.orderParameter = res.data
//					console.log(res.data.applyShopModels)
				})
			},
			showDetails(item,serial,shopId,time){
                this.status = 'form'
                this.orderData = item
                this.value1 = time
                //获取数据详情
                api.GetApplyShopAppInfo({
					serial: serial,
					shopId: shopId
				}).then(res=>{
					this.crmData = res.data
//					console.log(res.data)
					this.ifState(shopId)
				})
			},
			ifState(isShowBtn){
				//门店撤销
				console.log(isShowBtn)
				console.log(this.crmData.applyType)
		        if (this.crmData.applyType == "同城门店" && isShowBtn != 1) {
		            if (this.crmData.isShowCheXiao == 1) {
		                this.btnCheXiao = true
		            } else {
		                this.btnCheXiao = false
		            }
		        }
		        //商品已出库
		        if (this.crmData.isShowSendBack == 1) {
		        	this.btnSendBack = true
		        } else {
		            this.btnSendBack = false
		        }
		        //提交需求单
		        if (this.crmData.isProvider < 1) {
		            this.btnAccept = true
					this.btnReject = true
		            this.rejectDiv = true
		        }else if (this.crmData.isProvider < 3  && isShowBtn == 1){//供应商回复报价
		            this.btnAcceptPrice = true
					this.btnRejectPrice = true
		        }
		        //如果是拒绝状态
		        if (this.crmData.isProvider == 2 || this.crmData.isProvider == 4 || this.crmData.isProvider == 6) {
					this.btnAccept = false
					this.btnReject = false
					this.btnAcceptPrice = false
					this.btnRejectPrice = false
					this.btnSendBack = false
					this.btnOutStore = false
					this.rejectDiv = false
		        }
		        //同城不显示报价、销售价格和订单号
		        if (this.crmData.applyType == "同城门店") {
		            this.replyPriceDiv = false
		            this.salePriceDiv = false
		            this.addsalelv = false
		            this.invoiceDiv = false
		        }
		        if (this.crmData.applyType == "同城门店" && this.crmData.isProvider > 2) {
		        	this.deliverSerialDiv = true
		        	this.oddNumbers = '出库单号：'
		        }
		        //非本店操作
		        if (this.crmData.applyType == "同城门店" && isShowBtn == 1) {
		            this.btnAccept = false
					this.btnReject = false
					this.btnAcceptPrice = false
					this.btnRejectPrice = false
		            this.btnOutStore = false
		        }
			},
			//接受申请
        	acceptApply(){
        		let applyType = this.crmData.applyType			//供应商或同城门店
        		let price = this.crmData.replyPrice				//回复报价
        		let salePrice = this.crmData.salePrice			//销售价格
        		let deliverDateTime = this.value1				//日期
        		let serial = this.crmData.serial				//订单号
        		let invoice = this.crmData.invoice				//发票
        		let shopId = this.shopId						//shopId
        		let remarks = this.remarks						//备注
        		let addPriceLv = this.crmData.addPriceLv		//加价率
//      		console.log(deliverDateTime)
//      		console.log(applyType,price,salePrice)
        		if (applyType == "供应商" && (price == "" || price == "0")) {
	                alert("请输入您的报价！")
	            }else if (applyType == "供应商" && (salePrice == "" || salePrice == "0")) {
	                alert("请输入销售价格！")
	            }else if (applyType == "供应商") {
	                let lv = addPriceLv
	                lv = lv / 100
	                let spnic = Math.ceil(parseFloat(price) / (1 - lv) / 0.9)
	                if (parseFloat(salePrice) < parseFloat(spnic)) {
	                    alert("销售价格最低为" + spnic + "")
	                    return false
	                }
	            }else if (deliverDateTime == null && deliverDateTime == '') {
	            	console.log(deliverDateTime)
	                alert("请输入您的交期！")
	            }else if(this.flag == true){
        			console.log('提交')
	        		this.flag = false
        			api.GetReplyPriceForShop({
        				Serial: serial,
		                ShopId: shopId,
		                Price: price,
		                SalePrice: salePrice,
		                Invoice: invoice,
		                DeliverDateTime: deliverDateTime,
		                Remark: remarks
	        		}).then(res=>{
	        			console.log(res.data)
	        		})
        		} else {
	                alert('请勿重复点击')
	            }
        	},
        	//拒绝
        	returnList(){
        		let rejMsg = this.refuseReason					//拒绝原因
        		let serial = this.crmData.serial				//订单号
        		let shopId = this.shopId						//shopId
        		if (rejMsg == "") {
	                alert("请输入您拒绝的原因！")
	                return false
	            }
        		if (this.flags == true) {
	                this.flags = false;
	                api.GetReplyReject({
	                    Serial: serial,
	                    ShopId: shopId,
	                    RejectMessage: rejMsg
                    }).then(res=>{
                    	console.log(res.data)
                    })
	            } else {
	                alert('请勿重复点击');
	            }
        	},
        	//接受报价
        	acceptOffer(){
        		let price = this.crmData.replyPrice				//回复报价
        		let serial = this.crmData.serial				//订单号
        		let shopId = this.shopId						//shopId
        		if (price == "") {
	                alert("请输入报价！")
	                return false
	            }
        		if (this.flags == true) {
	                this.flags = false;
	                api.GetUpdatePurchaseStatus({
	                    Serial: serial,
	                    ShopId: shopId,
	                    Price: price,
	                    IsProvider: 3
                    }).then(res=>{
                    	console.log(res.data)
                    })
	            } else {
	                alert('请勿重复点击');
	            }
        	},
        	//拒绝报价
        	refuseOffer(){
        		let price = this.crmData.replyPrice				//回复报价
        		let serial = this.crmData.serial				//订单号
        		let shopId = this.shopId						//shopId
        		if (this.flags == true) {
	                this.flags = false;
	                api.GetUpdatePurchaseStatus({
	                    Serial: serial,
	                    ShopId: shopId,
	                    Price: price,
	                    IsProvider: 4
                    }).then(res=>{
                    	console.log(res.data)
                    })
	            } else {
	                alert('请勿重复点击');
	            }
        	},
        	//退回
        	returnList(){
        		let ihrez = this.crmData.ihrez
	        	if (ihrez != "" && ihrez != null) {
	        		if(confirm("确定退回?")){
	                    api.GetSendBack({
	                    	IHREZ: ihrez
	                    }).then(res=>{
	                    	console.log(res.data)
	                    })
	                }
        		}
        	},
        	//撤销
        	revokeList(){
        		let serial = this.crmData.serial				//订单号
	        	if (serial != "" && serial != null) {
	        		if(confirm("确定撤销?")){
	                    api.GetCheXiao({
	                    	Serial: serial
	                    }).then(res=>{
	                    	console.log(res.data)
	                    })
	                }
        		}
        	},
        	//商品出库
        	commodity(){
        		let serial = this.crmData.serial				//订单号
        		let deliverSerial = this.crmData.deliverSerial	//订单流水号
        		let shopId = this.shopId						//shopId
        		if (this.flags == true) {
	                this.flags = false;
	                api.GetStore({
	                    Serial: serial,
	                    ShopId: shopId,
	                    DeliverSerial: deliverSerial,
	                    IsProvider: 5
                    }).then(res=>{
                    	console.log(res.data)
                    })
	            } else {
	                alert('请勿重复点击');
	            }
        	}
		},
		components: {
			myHeader: Header
		}
	}
</script>