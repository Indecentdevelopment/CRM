<template>
	<div class="orderDetails">
		
		<!-- 头部 顶部 -->
        <my-header></my-header>

        <div class="loading" v-loading="isLoading">
            <!--顾客信息-->
            <div class="customerInfo clearfix">
                <div class="pre-count">您前边还有 {{orderInfo.preBeforeCount}} 位顾客正在排队</div>
                <p class="orderStyleOne orderColor-white fl">订单编号：{{new Date(orderInfo.datePlaced).toString('yyMMdd10' + orderInfo.id)}}</p>
                <p class="orderStyleTwo orderColor-white fl">客户：{{orderInfo.user.firstName}}</p>
                
                <p class="orderStyleTwo orderColor-white fl mobile">电话：173665156</p>
                <p class="orderStyleOne orderColor-gray fl">订单状态：{{orderInfo.status}}</p>
                <p class="orderStyleTwo orderColor-gray fl">技师：{{orderInfo.technician}}</p>
                <p class="orderStyleOne orderColor-gray fl">服务店铺：{{orderInfo.shop.name}}</p>
                <p class="orderStyleTwo orderColor-gray fl">下单时间：{{orderInfo.datePlaced[0]}}</p>
                <p class="orderStyleOne orderColor-white fl">预约时间：{{orderInfo.preDate}}</p>
                <div class="orderVehicleInfo fl clearfix">
                    <div class="vehicleImg fl">
                        <img id="car-img-warp" src=""/>
                    </div>
                    <p class="vehicleP fl">
                        <span id="brand"></span>
                        <span>行驶里程：{{orderInfo.mileage}} <span id="average"></span></span>
                        <span id="carNo"></span>
                    </p>
                </div>
                <div class="orderUndetermined">
                    <span>{{orderInfo.status}}</span>
                </div>
            </div>
            
            <!--编辑 + 添加 按钮-->
            <div class="editAdd clearfix">
                <p class="fr"><img src="../../assets/images/orderDetails/add.png"/>添加</p>
                <p v-show="!isEditProduct" class="fr" @click="isEditProduct=!isEditProduct"><img src="../../assets/images/orderDetails/edit.png"/>编辑</p>
                <p v-show="isEditProduct" class="fr" @click="saveOrderItem"><img src="../../assets/images/orderDetails/edit.png"/>保存</p>
            </div>
            
            <!--订单内容-->
            <div class="orderContent" >
                <p class="orderContentp fl">订单内容</p>
                <div class="orderConDetails" v-if="orderInfo.items" v-for="(item, index) in orderInfo.items" :key="item.id">
                    <div class="detailsImg fl">
                        <img :src="item.imgUrl"/>
                    </div>
                    <div class="detailsList fr">
                        
                        <div class="item-change">
                            <p id="productName">{{item.productName}}</p>
                            <div class="isHave" v-if="orderInfo.status !== '已完成'">
                                <div v-show="!item.isService">
                                    <font v-show="item.isHave" class="have">已领料</font>
                                    <font v-show="!item.isHave" class="havenot">未领料</font>
                                </div>
                            </div>
                            <div id="itemPrice">
                                <span v-show="item.isService">服务</span>
                                <span>价格</span>
                                <span>&nbsp;￥{{item.itemPrice}}</span>
                                <span v-show="!item.isService">&nbsp;&nbsp;&nbsp;&nbsp;工时费</span>
                                <span>&nbsp;￥{{item.servicePrice}}</span>
                            </div>
                            <div class="reduce">
                                <div id='reduce-num' v-show="!isEditProduct">
                                    {{item.categoryName==='机油'?'升数 X':'数量 X'}}
                                </div>
                                <div id="minus" @click="minusCurrentNum(index)" v-show="isEditProduct">-</div>
                                <div id="current-num">{{item.quantity}}</div>
                                <div id="add" @click="addCurrentNum(index)" v-show="isEditProduct">+</div>
                            </div>
                        </div>
                        <div id="free-button" @click="freeComplimentary">免</div>
                    </div>
                </div>
            </div>

            <!-- 技师备注 -->
            <div class="remark-info" v-if="orderInfo.status !== '已预约'">
                <div class="head">技师备注</div>
                <textarea name="" id="technician-remark" rows="2" v-model="orderInfo.staffComments"></textarea>
                <!-- --------------------------------此地注意  ----------------------------------------- -->
                <div class="technician-bg" id="technician-bg"></div>
            </div>
            
            <!--结算信息-->
            <div class="checkout clearfix">
                <p class="head">结算信息</p>
                <div class="box">
                    <div class="item">
                        <div class="title">商品总价：</div>
                        <div class="info">￥{{orderInfo.subtotal}}</div>
                    </div>
                    <div class="item">
                        <div class="title">服务/工时费：</div>
                        <div class="info">¥{{orderInfo.serviceAmount}}</div>
                    </div>
                    <div class="item">
                        <div class="title">合计金额：</div>
                        <div class="info">¥{{orderInfo.subtotal+orderInfo.serviceAmount}}</div>
                    </div>
                    <div class="item useother-box" v-if="orderInfo.status!=='已预约'">
                        <div class="title">useother-box</div>
                        <div class="info">¥123</div>
                    </div>
                    <div class="item useother-box1" id="dvinvoice" v-if="orderInfo.status!=='已预约'">
                        <div class="title">发票号：</div>
                        <div class="info">
                            <input type="text" placeholder="发票号">
                            <div class="apply">使用</div>
                        </div>
                    </div>
                    <div class="item prefer">
                        <div class="title">优惠项目：</div>
                        <div class="box">
                            <div v-for="item in orderInfo.orderPreferentialLogs" :key="item.id" class="info">
                                [{{item.name.includes('金套餐')||item.name.includes('钻石套餐')?'服务套餐':'抹零优惠'}}]
                                <span>立减￥{{item.amount}}</span>
                            </div>
                            
                        </div>
                        
                    </div>
                    <div class="item">
                        <div class="title useother-box">会员折扣：</div>
                        <div class="info" v-if="orderInfo.cardType">
                            {{orderInfo.memberDiscountAmount>0?`-￥${orderInfo.memberDiscountAmount}元`:''}}
                            {{orderInfo.status==='待付款'?orderInfo.cardType.typeName+orderInfo.cardType.discount+'折':''}}
                        </div>
                    </div>
                    <div class="item">
                        <div class="title useother-box">优惠合计：</div>
                        <div class="info">¥{{orderInfo.discount}}</div>
                    </div>
                    <div class="item">
                        <div class="title useother-box">应付总额：</div>
                        <div class="info">¥{{orderInfo.total}}</div>
                    </div>

                </div>

                
                
            </div>

            <!-- 付款方式 -->
            <div class="payment-box" v-if="orderInfo.status!=='已预约'">
                <!-- ----------------------------此地注意 退款---------------------------------- -->
                <div class="head">选择<span>付</span>款方式：</div>
                <div class="pay-box">
                    <div class="item">
                        <div class="info">
                            <i class="iconfont icon-weixinzhifu1"></i> 微信付款
                        </div>
                        <input type="radio" name='pay'>
                    </div>
                    <div class="item">
                        <div class="info">
                            <i class="iconfont icon-wallet"></i> 现金支付
                        </div>
                        <input type="radio" name='pay'>
                    </div>
                    <div class="item">
                        <div class="info">
                            <i class="iconfont icon-zhifufangshi-huodaoshuaqia"></i> 刷卡支付
                        </div>
                        <input type="radio" name='pay'>
                    </div>
                    <div class="item">
                        <div class="info">
                            <i class="iconfont icon-zhipiao2"></i> 刷卡支付
                        </div>
                        <input type="radio" name='pay'>
                    </div>
                    <div class="item">
                        <div class="info">
                            <i class="iconfont icon-saoma"></i> 刷卡支付
                        </div>
                        <input type="radio" name='pay'>
                    </div>
                    <div class="item">
                        <div class="info">
                            <i class="iconfont icon-yanshishuchulogo"></i> 刷卡支付
                        </div>
                        <input type="radio" name='pay'>
                    </div>
                    <div class="item">
                        <div class="info">
                            <i class="iconfont icon-payduigong"></i> 刷卡支付
                        </div>
                        <input type="radio" name='pay'>
                    </div>
                    
                </div>

                <div class="btn-box">
                    <button>立即付款</button>
                    <button>拆分付款</button>
                </div>
            </div>
            
            <!--顾客签字-->
            <div class="sign">
                <p class="head">顾客签字确认</p>
                <div class="signbtn-box">
                    <div class="signbtn" @click="clearSign">
                        <img src="/Content/img/images/refresh.png" alt="">
                    </div>
                </div>
                <div class="mySignature">
                    <vueSignature ref="signature" :sigOption="option" :w="'100%'" :h="'16rem'"></vueSignature> 
                </div>
            </div>

            <!-- 顾客确认签字 -->
            <div class="customer-sign" v-if="orderInfo.status!=='已预约'">
                <div class="head">顾客确认签字</div>
                <div class="wrap">
                    <img src="" alt="">
                </div>
            </div>

            <div class="btn-box">
                <div v-show="orderInfo.status === '服务中'">服务结束</div>
                <div v-show="orderInfo.status === '待确认'||orderInfo.status === '已预约'" @click="SaveRemark">保存/选择技师</div>
                <div v-show="orderInfo.status!=='待付款'&&orderInfo.status!=='已完成'&&orderInfo.status!=='已取消'">取消</div>
            </div>
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
                isLoading: false,       // laoding
                isEditProduct: false,   // 是否编辑订单内容
                query: {
                    orderId: ''
                },
                orderInfo: {
                    datePlaced: [],
                    shop: {},
                    user: {}
                },

                option: {
                    penColor:"rgb(0, 0, 0)",
                    backgroundColor:"#E4E4E4"
                }
	        	
	        }
	    },
	    created() {
            this.query.orderId = this.$route.query.OrderId
            this.toString()
            // this.GetOrderInfo()
	    },
        mounted () {
            this.GetOrderInfo()
        },
	    methods: {
            // init 获取初始数据
            GetOrderInfo () {
                this.isLoading = true
                api.GetOrderInfo({orderId: this.query.orderId}).then(res => {
                    this.isLoading = false
                    this.drawingData(res.data)
                })
            },

            // 数据处理
            drawingData (data) {
                switch (data.status) {
                    case 12:
                        data.status = '已预约'
                        // document.getElementsByClassName('sign')[0].style.display = 'block'
                        // document.getElementsByClassName('pre-count')[0].style.display = 'block'
                        // document.getElementsByClassName('payment-box')[0].style.display = 'none'
                        // document.getElementsByClassName('customer-sign')[0].style.display = 'none'
                        // document.getElementsByClassName('remark-info')[0].style.display = 'none'
                        // document.getElementsByClassName('useother-box')[0].style.display = 'none'   // 尚未解决
                        // document.getElementById('dvinvoice').style.display = 'none'
                        
                        break
                    case 0:
                        data.status = '待确认'
                        break
                    case 1:
                        data.status = '服务中'
                        break
                    case 2:
                        data.status = '待付款'
                        break
                    case 3:
                        data.status = '已完成'
                        break
                    case 13:
                        data.status = '已作废'
                        break
                    case 11:
                        data.status = '已取消'
                        break
                    case 16:
                        data.status = '已冲销'
                        break
                }
                data.items.map((item, index) => {
                    if (!item.product.primaryPhotoId) {
                        if (item.product.isService) {
                            data.items[index].imgUrl = '/Content/img/images/4_c.jpg'
                        } else {
                            data.items[index].imgUrl = `/Content/img/images/${item.product.categoryId}_c.jpg`
                        }
                    } else {
                        data.items[index].imgUrl = `/api/Upload/${item.product.primaryPhotoId}?width=600&height=500&crop=false`
                    }
                    
                })
                data.preDate = (data.preDate.match(/\d{4}-\d{2}-\d{2}[a-zA-Z]\d{2}:\d{2}/)).toString().replace(/[a-zA-Z]/ig, " ")
                data.datePlaced = data.datePlaced.match(/\d{4}-\d{2}-\d{2}/)

                document.getElementById('car-img-warp').setAttribute('src', data.userCarBind.carInfo.carType.carSeries.seriesMinImage)
                let carType = data.userCarBind.carInfo.carType
                if (carType.carSeries.brandName !== '其他') {
                    document.getElementById('brand').innerHTML = `${carType.carSeries.brandName} ${carType.carSeries.brandType} 
                    ${carType.carSeries.seriesName} ${carType.displacement} ${carType.productiveYear}年生产` 
                } else {
                    document.getElementById('brand').innerHTML = `车型信息待完善`
                }

                // document.getElementById('average').innerHTML = `月均行驶：${data.userCarBind.carInfo.monthMileage}`
                // document.getElementById('carNo').innerHTML = `车牌号：${data.userCarBind.carInfo.carNumber}`
                // document.getElementById('itemPrice').innerHTML = `服务价格 ${data.items[0].itemPrice}`
                // document.getElementById('reduce-num').innerHTML = (data.items[0].categoryName === '机油') ? `升数 X` : `数量 X`
                // document.getElementById('current-num').innerHTML = data.items[0].quantity
                // document.getElementById('current-num').setAttribute('stock', data.items[0].isService?'999':data.items[0].stock+data.items[0].quantity)
                // document.getElementById('current-num').setAttribute('isser', data.items[0].isService)
                // document.getElementById('current-num').setAttribute('cla', data.items[0].categoryName)

                // 设置 免
                // document.getElementById('free-button').className = data.items[0].isFree?'active':''


                this.orderInfo = data
            },

            // date tostring
            toString() {
                Date.prototype.toString = function (fmt) { //author: meizz 
                    var o = {
                        "M+": this.getMonth() + 1, //月份 
                        "d+": this.getDate(), //日 
                        "h+": this.getHours() > 12 ? this.getHours() - 12 : this.getHours(), //小时 
                        "H+": this.getHours(), //小时 
                        "m+": this.getMinutes(), //分 
                        "s+": this.getSeconds(), //秒 
                        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                        "S": this.getMilliseconds() //毫秒 
                    }
                    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
                    for (var k in o)
                        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
                    return fmt
                }
            },

            // 点击免
            freeComplimentary () {
                this.isLoading = true
                api.freeComplimentary({itemId: this.orderInfo.items[0].id, isFree: !this.orderInfo.items[0].isFree}).then(res => {
                    if (res.data.isok) {
                        this.GetOrderInfo()
                    } else {
                        this.$message(res.data.message)
                    }
                })
            },

            // 点击 （编辑之后）保存
            saveOrderItem () {
                this.isLoading = true
                this.isEditProduct = !this.isEditProduct
                api.saveOrderItem({
                    id: this.query.orderId,
                    "order.OrderItemProducts[0][key]": this.orderInfo.items[0].productId,
                    "order.OrderItemProducts[0][value]": this.orderInfo.items[0].quantity
                }).then(res => {
                    this.isLoading = false
                })
            },

            // 点击减号 
            minusCurrentNum (index) {
                if (this.orderInfo.items[index].quantity > 1) {
                    this.orderInfo.items[index].quantity--
                    // document.getElementById('current-num').innerHTML = this.orderInfo.items[index].quantity
                }
            },
            // 点击加号 
	    	addCurrentNum (index) {
                this.orderInfo.items[index].quantity++
                // document.getElementById('current-num').innerHTML = this.orderInfo.items[index].quantity
            },

            // 清除签名
            clearSign () {
                this.$refs.signature.clear()
            },
            
            // 选择/保存 技师
            SaveRemark () {
                api.SaveRemark({
                    OrderId: this.query.orderId,
                    technicianRemark: this.orderInfo.staffComments
                })
                // 检查商品
                api.CheckGetGoods({orderId: this.query.orderId}).then(res => {
                    if(res.data.success) {
                        this.sendImage()
                    }
                })
            },
            // 发送签名
            sendImage () {}
	    },
	    components:{
	        myHeader: Header
	    }
	}
</script>

<style>
</style>