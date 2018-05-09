<template>
	<div class="seekHelp">
		<!-- 头部 顶部 -->
		<my-header></my-header>
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
                    <button v-if="btnAccept">接受申请</button>
                    <button v-if="btnReject">拒绝申请</button>
                    <button v-if="btnAcceptPrice">接受报价</button>
                    <button v-if="btnRejectPrice">拒绝报价</button>
                    <button v-if="btnSendBack">退回</button>
                    <button v-if="btnCheXiao">撤销</button>
                    <button v-if="btnOutStore">商品出库</button>
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
					this.ifState()
				})
			},
			ifState(){
				//门店撤销
		        if (this.crmData.applyType == "同城门店") {
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
		        if (this.crmData.applyType == "同城门店" && this.crmData.isProvider > 2) {
		        	this.deliverSerialDiv = true
		        	this.oddNumbers = '出库单号：'
		        }
		        //非本店操作
		        if (this.crmData.applyType == "同城门店") {
		            this.btnAccept = false
					this.btnReject = false
					this.btnAcceptPrice = false
					this.btnRejectPrice = false
		            this.btnOutStore = false
		        }
			}
			
		},
		components: {
			myHeader: Header
		}
	}
</script>