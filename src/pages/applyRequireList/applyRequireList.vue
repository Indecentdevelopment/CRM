<template>
	<div class="applyRequire">
		<!-- 头部 顶部 -->
		<my-header></my-header>
		<!--列表-->
		<div class="orderList clearfix"  v-for="(item,i) in orderList" :key="i" v-show="status==='order'">
			<p class="fl">产品名称：{{item.productName}}</p>
			<p class="fl">请求时间：{{item.providerDateTime}}</p>
			<p class="fl">调拨数量：{{item.quantity}}</p>
			<p class="fl">调拨类型：{{item.applyType}}</p>
            <div class="show-detail" @click="showDetail(item.serial)">详情</div>
		</div>
        <div class="detailList" v-show="status==='detail'">
            <div class="detail-item" v-for="item in detailList.applyShopModels" :key="item.id">
                <div class="shop-name">
                    {{item.shopType}}：{{item.shopName}}
                </div>
                <div class="action">
                    订单状态：{{item.providerStatus}}
                </div>
                <div class="show-detail2" @click="showDetail2(item.deliverDateTime,item.shopId)">详情</div>
            </div>
        </div>

        <div class="form" v-show="status==='form'" v-if="detailList.applyShopModels">
            <div class="title">调拨单明细</div>
            <div class="form-box">
                <div class="form-item">
                    <div class="info">ID：</div>
                    <div class="val">{{detailList.applyShopModels[0].id}}</div>
                </div>
                <div class="form-item">
                    <div class="info">零采单号：</div>
                    <div class="val"><span>{{crmData.ebeln}}</span></div>
                </div>
                <div class="form-item">
                    <div class="info">CRM服务单号：</div>
                    <div class="val"><span>{{crmData.orderNum}}</span></div>
                </div>
                <div class="form-item">
                    <div class="info">Serial号：</div>
                    <div class="val">{{detailList.applyShopModels[0].serial}}</div>
                </div>
                <div class="form-item">
                    <div class="info">申请门店：</div>
                    <div class="val"><span>{{crmData.applyShopName}}</span></div>
                </div>
                <div class="form-item">
                    <div class="info">申请产品：</div>
                    <div class="val">{{detailList.productName}}</div>
                </div>
                <div class="form-item">
                    <div class="info">申请数量：</div>
                    <div class="val">{{detailList.quantity}}</div>
                </div>
                <div class="form-item">
                    <div class="info">申请时间：</div>
                    <div class="val">{{detailList.applyCreateDateTime}}</div>
                </div>
                <div class="form-item">
                    <div class="info">被调拨方：</div>
                    <div class="val">{{detailList.applyShopModels[0].shopName}}</div>
                </div>
                <div class="form-item" v-if="replyPriceDiv">
                    <div class="info">回复报价(单价)：</div>
                    <input v-model="crmData.replyPrice">
                </div>
                <div class="form-item" v-if="addsalelv">
                    <div class="info">加价率：</div>
                    <div class="val">{{crmData.addPriceLv}}%</div>
                </div>
                <div class="form-item" v-if="salePriceDiv">
                    <div class="info">销售价格(单价)：</div>
                    <input v-model="crmData.salePrice">
                </div>
                <div class="form-item" v-if="invoiceDiv">
                    <div class="info">税别：</div>
                    <select>
                        <option value="">专票</option>
                        <option value="">普票</option>
                        <option value="">其他</option>
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
                    <div class="val">{{crmData.providerStatus}}</div>
                </div>
                <div class="form-item">
                    <div class="info">收货状态：</div>
                    <div class="val">{{crmData.deliveryStatus}}</div>
                </div>
                <div class="form-item">
                    <div class="info">备注：</div>
                    <textarea v-model="remarks"></textarea>
                </div>
                <div class="form-item" v-if="rejectDiv">
                    <div class="info">拒绝原因：</div>
                    <textarea ></textarea>
                </div>

                <div class="btn-box">
                    <button v-if="btnAccept" @click="acceptApply">接受申请</button>
                    <button v-if="btnReject">拒绝申请</button>
                    <button v-if="btnAcceptPrice">接受报价</button>
                    <button v-if="btnRejectPrice">拒绝报价</button>
                    <button v-if="btnSendBack">退回</button>
                    <button v-if="btnCheXiao">撤销</button>
                    <button v-if="btnOutStore">商品出库</button>
                </div>
                
            </div>
        </div>
		<div class="seekHelp-footer" v-show="status==='order'">如需要查看更多调拨信息请在crm后台调拨列表查看</div>
		<div v-show="orderList == ''">暂未找到相关订单！</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
    import Header from '@/components/header'
    import keyboardCarNo from '@/components/keyboardCarNo'
    import api from '@/vuex/api'
	import "./applyRequireList.sass"
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
                status: 'order',        // 当前显示的页面
                isLoading: true,
                remarks: '',			//备注
                shopId: '',
                orderList: [],          // 订单列表
                detailList: [],         // 详情列表
				value1: '',				//调拨时间
				serial: '',
				crmData:{},				//CRM剩余参数
				btnAccept: false,
				btnReject: false,
				btnAcceptPrice: false,
				btnRejectPrice: false,
				btnSendBack: false,
				btnCheXiao: false,
				btnOutStore: false,
				replyPriceDiv: true,
				addsalelv: true,
				salePriceDiv: true,
				invoiceDiv: true,
				deliverSerialDiv: false,
				rejectDiv: false,
				flag: true,
            }
       },
        created () {
        	Promise.all([]).then(res => {
                setTimeout(() => {
                }, 500)
            })
        	this.getApplyRequireList()
        },
        mounted () {
        },
        methods: {
        	
        	//获取信息
        	getApplyRequireList(){
        		api.GetApplyRequireList(
        			
        		)
                .then(res => {
                    this.orderList = res.data.applyRequires
                    this.isLoading = false
                })
            },
            // 点击详情
            showDetail (serial) {
            	this.serial = serial
                this.status = 'detail'
                api.GetApplyRequireDetail({
                    serial: serial
                }).then(res => {
                    this.detailList = res.data
                })
                //获取订单详情
                api.GetRequireAppDetails({
            		serial: serial
            	}).then(res =>{
//          		console.log(res.data)
            	})
            	
            },

            // 再点击详情
            showDetail2 (item,shopId) {
                this.status = 'form'
        		this.value1 = item
        		this.shopId = shopId
//      		console.log(shopId)
            	api.GetApplyShopAppInfo({
            		serial: this.serial,
            		shopId: shopId
            	}).then(res =>{
            		this.crmData = res.data
//          		console.log(res.data)
            		this.ifState(shopId)
            	})
            },
            //
            ifState(isShowBtn){
				//门店撤销
		        if (this.crmData.applyType == "同城门店" && isShowBtn == 1) {
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
        },
		components: {
            myHeader: Header
		}
	}
</script>