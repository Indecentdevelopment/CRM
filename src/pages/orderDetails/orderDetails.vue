<template>
	<div class="orderDetails">
		
		<!-- 头部 顶部 -->
        <my-header></my-header>

        <div class="loading" v-loading="isLoading">
            <!--顾客信息-->
            <div class="customerInfo clearfix">
                <div class="pre-count" v-if="orderInfo.status==='已预约'">
                    您前边还有 {{orderInfo.preBeforeCount}} 位顾客正在排队
                </div>
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
                        <img id="car-img-warp" src="" onerror="this.src = 'http://act.tirecool.net/Content/img/defaultcar.jpg'">
                    </div>
                    <p class="vehicleP fl">
                        <span id="brand"></span>
                        <span>
                            行驶里程：{{orderInfo.mileage}} 
                            <span id="average" v-if="orderInfo.userCarBind">
                                月均里程：{{orderInfo.userCarBind.carInfo.monthMileage}}
                            </span>
                        </span>
                        <span id="carNo" v-if="orderInfo.userCarBind">
                            车牌号：{{orderInfo.userCarBind.carInfo.carNumber}}
                        </span>
                    </p>
                </div>
                <div class="orderUndetermined">
                    <span>{{orderInfo.status}}</span>
                </div>
            </div>
            
            <!--编辑 + 添加 按钮-->
            <div class="editAdd clearfix" v-if="orderInfo.status !== '已预约'&&orderInfo.status !== '已完成'&&orderInfo.status !== '已取消'&&orderInfo.status !== '待付款'">
                <p class="fr" @click="addProduct"><img src="../../assets/images/orderDetails/add.png"/>添加</p>
                <p v-show="!isEditProduct" class="fr" @click="isEditProduct=!isEditProduct"><img src="../../assets/images/orderDetails/edit.png"/>编辑</p>
                <p v-show="isEditProduct" class="fr" @click="saveOrderItem"><img src="../../assets/images/orderDetails/edit.png"/>保存</p>
            </div>
            
            <!--订单内容-->
            <div class="orderContent" >
                <p class="orderContentp fl">订单内容 <span v-show="orderInfo.evaluation">邀请用户评价</span></p>
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
                        <div v-show="item.product.isAllowFree" id="free-button" @click="freeComplimentary">免</div>
                    </div>
                </div>
            </div>

            <!-- 技师备注 -->
            <div class="remark-info" v-if="orderInfo.status !== '已预约'&&orderInfo.status !== '待确认'&&orderInfo.status !== '已取消'">
                <div class="head">技师备注</div>
                <textarea name="" id="technician-remark" rows="2" v-model="orderInfo.staffComments"></textarea>
                <!-- --------------------------------此地注意  ----------------------------------------- -->
                <div class="technician-bg" id="technician-bg"></div>
            </div>
            
            <!--增减工时：-->
            <div class="worktimecalc clearfix" v-if="orderInfo.status === '待付款'">
            	<p class="fl">增减工时：</p>
            	<div class="fr workOperation">
            		<span @click="reduceworktime">-</span><p>{{workingHours}}</p><span @click="addworktime">+</span><button @click="useit">使用</button>
            	</div>
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
                    <!-- <div class="item useother-box" 
                    v-if="orderInfo.status!=='已预约'&&orderInfo.status!=='待确认'&&orderInfo.status!=='服务中'&&orderInfo.status!=='已取消'">
                        <div class="title">useother-box</div>
                        <div class="info">¥123</div>
                    </div> -->

                    <!-- 积分 -->
                    <div class="item integral" v-if="orderInfo.user&&orderInfo.userIntegralConfig" v-show="orderInfo.status==='待付款'&&(orderInfo.user.userIntegralCount>0||orderInfo.useIntegralCount<0)">
                        <div class="title">
                            积分：
                        </div>
                        <div class="info clearfix">
                            <div class="integral-num fl">
                                <!-- {{orderInfo.useIntegralCount < 0 ? 'a':'b'}} -->
                                本次使用（{{Math.abs(0 > orderInfo.useIntegralCount ? orderInfo.useIntegralCount : 
                                ((orderInfo.subtotal+orderInfo.serviceAmount)>(orderInfo.user.userIntegralCount*orderInfo.userIntegralConfig.toAmountRate)?
                                (orderInfo.total*orderInfo.userIntegralConfig.toIntegralRate*orderInfo.userIntegralConfig.minGiveIntegralAmount):
                                orderInfo.user.userIntegralCount)).toFixed(0)}}）分支付
                            </div>
                            <button class="useIntegral fr" @click="useIntegral()">{{isUseIntegral?'取消':'使用'}}</button>
                        </div>
                    </div>

                    <!-- 卡券 -->
                    <div class="item" id="kaquan" v-if="orderInfo.cardCouponLogs" v-show="!(orderInfo.cardCouponLogs&&orderInfo.cardCouponLogs.length>0)&&orderInfo.status === '待付款'">
                        <div class="title">卡券：</div>
                        <div class="info">
                            <input type="text" :placeholder="orderInfo.couponMsg" v-model="currentKaquan.code">
                            <div class="select-down" @click="isChooseKaquan = !isChooseKaquan"></div>
                            <ul class="kaquan-box" v-show="isChooseKaquan">
                                <li class="kaquan-item" v-if="orderInfo.user" v-for="item in orderInfo.user.cardCoupons" 
                                :key="item.id" @click="chooseKaquan(item)">
                                    <div class="title">{{item.name}}</div>
                                    <div class="kaquan-num-price">
                                        <div class="kaquan-num">{{item.code}}</div>
                                        <div class="kaquan-price">￥{{item.amount}}</div>
                                    </div>
                                </li>
                            </ul>
                            <div class="apply" @click="useKaquan()">使用</div>
                        </div>

                        <!-- 使用卡券 弹窗 -->
                        <div class="kaquan-dialog-box" v-if="cardCoupon.card" v-show="kaquanDialog">
                        	<!--关闭按钮-->
                        	<div class="closeCurrent" @click="kaquanDialog = false">×</div>
                            <div class="kaquan-dialog">
                                <div class="head">使用卡券</div>
                                <div class="content">
                                    <div class="item">
                                        <div class="title">卡号：</div>
                                        <div class="info">{{cardCoupon.card.code}}</div>
                                    </div>
                                    <div class="item">
                                        <div class="title">卡券名字：</div>
                                        <div class="info">{{cardCoupon.card.name}}</div>
                                    </div>
                                    <div class="item">
                                        <div class="title">剩余金额：</div>
                                        <div class="info">{{cardCoupon.card.amount}}</div>
                                    </div>
                                    <div class="item record">
                                        <div class="title">使用记录：</div>
                                        <div class="info" v-if="cardCoupon.card.cardCouponLogs.length > 0">
                                            <table>
                                                <tr class="th">
                                                    <th width="30%">说明</th>
                                                    <th width="25%">金额</th>
                                                    <th width="45%">时间</th>
                                                </tr>
                                                <tr v-for="item in cardCoupon.card.cardCouponLogs" :key="item.id">
                                                    <td >{{item.remark?item.remark:'使用套餐卡'}}</td>
                                                    <td >{{item.useAmount}}</td>
                                                    <td >{{item.createDate}}</td>
                                                </tr>
                                                
                                            </table>
                                        </div>
                                        <div v-else>暂无！</div>
                                    </div>
                                    <div class="item">
                                        <div class="title">使用金额：</div>
                                        <div class="info">
                                            <input placeholder="请输入本次使用金额" v-model="cardCouponUseAmount">
                                        </div>
                                    </div>
                                    <div class="item" v-if="cardCoupon.orderInfo != ''">
                                        <div class="title">冲抵金额：</div>
                                        <div class="info">
                                            <input placeholder="请输入本次冲抵金额" v-model="deductionAmount">
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="title">备注：</div>
                                        <div class="info">
                                            <textarea placeholder="使用备注" v-model="carduseremark"></textarea>
                                        </div>
                                    </div>

                                    <div class="item message">
                                        *注意：套餐卡与会员卡优惠不同享，使用套餐卡后将自动取消会员卡折扣
                                    </div>

                                    <div class="item totalbalance" v-if="cardCoupon.orderInfo != ''">
                                        <span class="title">
                                            订单可扣减最大金额：
                                        </span>
                                        <span class="info">
                                            ￥{{cardCoupon.orderInfo.total - cardCoupon.orderInfo.alreadyPaymentAmount - cardCoupon.orderInfo.memberDiscountAmount}}
                                        </span>
                                    </div>

                                    <div class="btn-box">
                                        <button class="cancel" @click="kaquanDialog = false">取消</button>
                                        <button class="sure" @click="usePackageCard()">确定</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 卡券抵扣 -->
                    <div class="item kaquan-discont" v-show="orderInfo.cardCouponLogs&&orderInfo.cardCouponLogs.length>0">
                        <div class="title">卡券抵扣</div>
                        <div class="info">
                            <div class="kaquan-dis-item" v-for="item in orderInfo.cardCouponLogs" :key="item.id">
                                <div class="text">{{item.cardCouponName}}￥{{item.useAmount}}元</div>
                                <button @click="cancelUseCard(item.id)">取消</button>
                            </div>
                        </div>
                    </div>

                    <!-- 发票号 -->
                    <div class="item useother-box1" id="dvinvoice" 
                     v-if="orderInfo.status==='已完成'||orderInfo.status==='已作废'||orderInfo.status==='已冲销'">
                        <div class="title">发票号：</div>
                        <div class="info">
                            <input type="text" placeholder="发票号">
                            <div class="apply">确定</div>
                        </div>
                    </div>

                    <div class="item prefer" v-if="orderInfo.orderPreferentialLogs" v-show="orderInfo.orderPreferentialLogs.length>0">
                        <div class="title">优惠项目：</div>
                        <div class="box">
                            <div v-for="item in orderInfo.orderPreferentialLogs" :key="item.id" class="info">
                                [{{item.name.includes('金套餐')||item.name.includes('钻石套餐')?'服务套餐':'抹零优惠'}}]
                                <span>立减￥{{item.amount}}</span>
                            </div>
                            
                        </div>
                    </div>
                    <div class="item" v-if="orderInfo.cardType" v-show="orderInfo.cardType.typeName&&(orderInfo.memberDiscountAmount>0||orderInfo.status==='待付款')">
                        <div class="title useother-box">会员折扣：</div>
                        <div class="info" >
                            {{orderInfo.memberDiscountAmount>0?`-￥ ${orderInfo.memberDiscountAmount}元`:''}}
                            {{orderInfo.status==='待付款'?orderInfo.cardType.typeName+orderInfo.cardType.discount+'折':''}}
                        </div>
                    </div>
                    <div class="item" v-show="orderInfo.discount>0">
                        <div class="title useother-box">优惠合计：</div>
                        <div class="info">¥{{orderInfo.discount}}</div>
                    </div>
                    <div class="item">
                        <div class="title useother-box" v-if="orderInfo.payments">{{orderInfo.payments.length>0||orderInfo.total==0?'实付款：':'应付总额：'}}</div>
                        <div class="info">
                            <div class="should-pay">
                                ¥{{orderInfo.total}}
                                <img v-show="isMoLing" @click="judgeMoling" class="smearZero" src="../../assets/images/orderDetails/moneyb.png"/> 
                                <img v-show="!isMoLing" @click="judgeMoling" class="smearZero" src="../../assets/images/orderDetails/moneya.png"/>
                            </div>
                            <div class="had-pay">
                                {{orderInfo.alreadyPaymentAmount>0?`已付￥${orderInfo.alreadyPaymentAmount}${orderInfo.total-orderInfo.alreadyPaymentAmount>0?` 剩余￥${orderInfo.total-orderInfo.alreadyPaymentAmount}`:''}`:``}}
                                <!-- {{orderInfo.total-orderInfo.alreadyPaymentAmount>0?`,剩余￥${orderInfo.total-orderInfo.alreadyPaymentAmount}`:``}} -->
                            </div>
                        </div>
                    </div>
                    <div class="item pay-msg" v-show="orderInfo.alreadyPaymentAmount>0">
                        <div class="title">付款详情：</div>
                        <div class="info">
                            <div class="pay-info-item" v-for="item in orderInfo.payments" :key="item.id">
                                <div class="amount">付款金额：￥{{item.amount}}</div>
                                <div class="method">付款方式：{{item.paymentMethod.name}}</div>
                                <div class="time">时间：{{new Date(item.date).toLocaleDateString()}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 付款方式 -->
            <div class="payment-box" v-if="orderInfo.status === '待付款'">
                <div class="head">选择<span>付</span>款方式：</div>
                <div class="pay-box">
                    <label class="item" v-for="pay in orderInfo.paymentMethods" :key="pay.id" @click="inputLshval(pay)" 
                    v-if="pay.name!=='刷卡支付'&&pay.name!=='扫码支付'">
                        <div class="info">
                            <i :class="'iconfont '+pay.className"></i> {{pay.name}}
                        </div>
                        <input type="radio" name="pay" :value="pay.name" v-model="payInfo">
                    </label>
                </div>

                <div class="btn-box">
                    <button @click="paySubmit(false)">立即<span>{{orderInfo.total>0?'付':'退'}}</span>款</button>
                    <button @click="isOpenPaySplit = true">拆分付款</button>
                </div>

                <!-- 支票输入弹窗 -->
                <div class="lshval-box" v-show="isOpenLshval">
                    <div class="lshval">
                        <div class="title">支票号：</div>
                        <input placeholder="请输入支票号" v-model="lshvalNum">
                        <div class="btn-box">
                            <button class="sure" @click="isOpenLshval = false">确认</button>
                            <button class="cancel" @click="cancelLshval()">取消</button>
                        </div>
                    </div>
                </div>

                <!-- 拆分支付  弹窗 -->
                <div class="splite-pay-box" v-show="isOpenPaySplit">
                    <div class="splite-pay">
                        <div class="close"></div>
                        <div class="title">拆分付款</div>
                        <div class="input-box">
                            <div class="msg">使用金额</div>
                            <input :placeholder="'请输入本次支付金额（最多'+(orderInfo.total-orderInfo.alreadyPaymentAmount)+'）'" v-model="paySplitNum">
                        </div>
                        <div class="btn-box">
                            <button @click="paySplitNum='';isOpenPaySplit=false">取消</button>
                            <button @click="paySplit()">确定</button>
                        </div>
                    </div>
                </div>

                <!-- 第三方转账 选择器 -->
                <div class="suppliers">
                    <vue-pickers :show="isSuppliers"
                        :selectData="suppliers"
                        v-on:cancel="isSuppliers = false"
                        v-on:confirm="sureSuppliers"
                        >
                    </vue-pickers>
                </div>
                

            </div>
            
            <!--顾客签字-->
            <div class="sign"  v-if="orderInfo.status==='已预约'||orderInfo.status==='待确认'">
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
            <div class="customer-sign"  v-if="orderInfo.status!=='已预约'&&orderInfo.status!=='待确认'&&orderInfo.status!=='待付款'">
                <div class="head">顾客确认签字</div>
                <div class="wrap">
                    <img :src="'/UserSign/image/'+query.orderId+'.jpg?ra='+Math.random()" alt="">
                </div>
            </div>

            <div class="btn-box">
                <div v-show="isServiceEnd" @click="serviceOver">服务结束</div>
                <div v-show="orderInfo.status === '待确认'||orderInfo.status === '已预约'" @click="SaveRemark">保存/选择技师</div>
                <div v-show="orderInfo.status!=='待付款'&&orderInfo.status!=='已完成'&&orderInfo.status!=='已取消'&&orderInfo.status!=='已冲销'" @click="cancelOrder()">取消订单</div>
            </div>
        </div>
        
        
        
	</div>
</template>

<script>
    import Header from '@/components/header'
    import VuePickers from 'vue-pickers'
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
                },

                cardCoupon: {},             // 使用卡券 弹窗信息
                cardCouponUseAmount: '',    // 使用卡券 本次使用金额
                deductionAmount: '',        // 使用卡券 冲抵金额
                carduseremark: '',          // 使用卡券 备注

                isUseIntegral: false,       // 是否使用积分
                isChooseKaquan: false,      // 是否打开选择卡券弹窗
                currentKaquan: {},          // 当前选中的卡券
                kaquanDialog: false,        // 使用卡券 弹窗
                workingHours: '0',			// 工时
                isOpenLshval: false,        // 是否打开支票输入框
                lshvalNum: '',              // 支票号码
                payInfo: '',                // 选择的支付方式
                isOpenPaySplit: false,      // 是否打开拆分支付 弹窗
                paySplitNum: '',            // 拆分支付 本次支付的金额
                amount: '',                 // 本次支付应该支付的金额
				isMoLing: true,			// 是否抹零
                isSuppliers: false,         // 是否显示第三方挂账选择器
                suppliersId: '',            // 当前选中的第三方支付方式的id
                suppliers: {},              // 第三方挂账 信息
                picking: '',                // 第三方挂账 信息
                isServiceEnd: '',           // if是否服务结束
	        	
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
                    this.isMoLing = res.data.isMoLing
                })
            },

            // 数据处理
            drawingData (data) {
                switch (data.status) {
                    case 12:
                        data.status = '已预约'
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

                // 订阅的产品数据
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

                // 预约时间处理
//              console.log(data)
//              console.log(data.preDate)
                data.preDate = (data.preDate.match(/\d{4}-\d{2}-\d{2}[a-zA-Z]\d{2}:\d{2}/)).toString().replace(/[a-zA-Z]/ig, " ")
                // 订单编号处理
                data.datePlaced = data.datePlaced.match(/\d{4}-\d{2}-\d{2}/)

                // 车辆图片
                document.getElementById('car-img-warp').setAttribute('src', data.userCarBind.carInfo.carType.carSeries.seriesMinImage)

                // 车辆信息处理
                let carType = data.userCarBind.carInfo.carType
                if (carType.carSeries.brandName !== '其他') {
                    document.getElementById('brand').innerHTML = `${carType.carSeries.brandName} ${carType.carSeries.brandType} 
                    ${carType.carSeries.seriesName} ${carType.displacement} ${carType.productiveYear}年生产` 
                } else {
                    document.getElementById('brand').innerHTML = `车型信息待完善`
                }

                // 是否正在使用积分
                if (data.useIntegralCount < 0) {
                    this.isUseIntegral = true
                } else {
                    this.isUseIntegral = false
                }

                // 第三方挂账信息数据处理
                let suppliersTem = {
                    columns: 1,
                    pData1: []
                }
                data.suppliers.map((item, index) => {
                    let obj = {
                        text: item.value,
                        value: item.id
                    }
                    suppliersTem.pData1.push(obj)
                })
                this.suppliers = suppliersTem

                this.orderInfo = data
                
                this.picking = this.orderInfo.items[0].isHave
                
				// 1、判断是不是服务中
				if(this.orderInfo.status == '服务中'){
					// 2、判断服务类型  （产品/服务）
					if(this.orderInfo.items[0].isService){
						this.isServiceEnd = true
					}else{
						//3、判断是否领料
						if(this.orderInfo.items[0].isHave){
							this.isServiceEnd = true
						}else{
							
						}
					}
				}else{
					this.isServiceEnd = false
				}
//              this.isService = this.orderInfo.items[0].isService
//              console.log(this.orderInfo.status + ' 服务状态')
//              console.log(this.orderInfo.isHidden + ' isHidden')
//              console.log(this.orderInfo.items[0].isService + ' isService')
//              console.log(this.orderInfo.items[0].isHave + ' isHave')
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
                let obj = {
                    id: this.query.orderId
                }
                this.orderInfo.items.map((item, index) => {
                    obj[`OrderItemProducts[${index}][key]`] = this.orderInfo.items[index].productId
                    obj[`OrderItemProducts[${index}][value]`] = this.orderInfo.items[index].quantity
                })
                api.saveOrderItem(obj).then(res => {
                    this.isLoading = false
                    this.drawingData(res.data)
                })
            },
			//增减工时
				//增加工时
			addworktime(){
				this.workingHours ++
				console.log('+')
			},
				//减少工时
			reduceworktime(){
				if(this.workingHours == 0){
					this.workingHours = 0
				}else{
					this.workingHours --
				}
				console.log('-')
			},
		    // 使用工时
			useit(){
				let hours = Number(this.workingHours)
		        let reg = /^[\d\-]+$/
		        if (reg.test(hours)) {
		        	api.GetUpdateGS({
		        		hour: this.workingHours,
		        		orderId: this.query.orderId
	                }).then(res => {
	                    if (res.data.isok) {
		                    window.location.reload()
		                } else {
		                	this.$alert(res.data.msg, '轮库Tirecool', {
					          	confirmButtonText: '确定',
					          	callback: action => {}
					        })
		                }
	                })
		        } else {
//		            console.log('false')
		        }
            },
            
            
            // 店家 添加产品
            addProduct () {
                this.$router.push({
                    path: 'confirm',
                    query: {
                        userCarBindId: this.orderInfo.userCarBindId,
                        OrderId: this.orderInfo.id
                    }
                })
            },

            // 点击减号 
            minusCurrentNum (index) {
                if (this.orderInfo.items[index].quantity > 1) {
                    this.orderInfo.items[index].quantity--

                    var currentNum = this.orderInfo.items[index].quantity
                    var products = this.orderInfo.items
                    if (products[index].categoryName === '轮胎' && !products[index].isService) {
                        products.map((item, i) => {
                            if (item.categoryName === '轮胎' && item.isService) {
                                this.orderInfo.items[i].quantity = currentNum
                            }
                        })
                    }
                }
                
            },
            // 点击加号 
	    	addCurrentNum (index) {
                this.orderInfo.items[index].quantity++
                var currentNum = this.orderInfo.items[index].quantity
                var products = this.orderInfo.items
                if (products[index].categoryName === '轮胎' && !products[index].isService) {
                    products.map((item, i) => {
                        if (item.categoryName === '轮胎' && item.isService) {
                            this.orderInfo.items[i].quantity = currentNum
                        }
                    })
                }
            },

            // 清除签名
            clearSign () {
                this.$refs.signature.clear()
            },
            // 生成 签名图片 url
            saveSign () {
                var imgUrl = this.$refs.signature.save()
                return imgUrl
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
                        this.sendImage(this.saveSign(), this.query.orderId)
                    } else {
                        alert(res.data.msg)
                    }
                })
            },
            // 发送签名
            sendImage (dataurl, OrderId) {
                dataurl = dataurl.replace(/^data:image\/(png|jpg|jpeg);base64,/, "")
                api.UserSign({
                    OrderId: OrderId,
                    FileData: dataurl
                }).then(res => {
                    console.log(res)
                    if (res.statusText === 'OK') {
                        if (res.data) {
                            this.$router.push({
                                path: 'sign',
                                query: {
                                    oid: this.query.orderId
                                }
                            })
                        } else {
                            this.$message('保存失败，请重试！')
                        }
                    } else {
                        this.$message('保存失败，请重试！')
                    }
                })
            },

            // 服务结束
            serviceOver () {
                api.serviceOver({
                    orderId: this.query.orderId
                }).then(res => {
                    if (res.data.data = 'Ok') {
                        this.$router.go(0)
                    }
                })
            },


            // 取消 订单
            cancelOrder () {
                if (confirm("确定取消此订单吗？")) {
                    api.CancelOrder({
                        oid: this.query.orderId
                    }).then(res => {
                        if (res.data.success) {
                            this.$router.go(0)
                        } else {
                            alert(res.data.msg)
                        }
                    })
                }
            },

            // 点击支票支付   打开输入支票框
            inputLshval (pay) {
                if (pay.name === '支票支付') {
                    this.isOpenLshval = true
                }
            },

            // 取消支票支付
            cancelLshval () {
                this.isOpenLshval = false
            },

            // 使用积分
            useIntegral() {
                this.isUseIntegral = !this.isUseIntegral
                this.isLoading = true
                api.useIntegralCard({
                    orderId: this.query.orderId,
                    useIntegral: this.isUseIntegral,
                    cardCouponCode: '',
                    useWashCard: '',
                    buyTireInsurance: '',
                    deductionAmount: '',
                    cardCouponUseAmount: '',
                    cardUseRemark: ''
                }).then(res => {
                    this.GetOrderInfo()
                })

            },

            // 选择卡券
            chooseKaquan (data) {
                this.currentKaquan = data
                this.isChooseKaquan = !this.isChooseKaquan
            },
            // 使用卡券
            useKaquan () {
                if (!this.currentKaquan.code) {
                    alert('卡券不能为空！')
                    return
                }
                
                this.isLoading = true
                    	
                if (this.currentKaquan.cardTypeId + '' === '1015') {
                    api.GetCardCouponVerif({
                        code: this.currentKaquan.code,
                        orderId: this.query.orderId
                    }).then(res => {
                        this.isLoading = false
//                      console.log(res.data)
                        if (res.dta.isok) {
                            if (res.data.orderInfo) {
                                this.kaquanDialog = true
                            }
                        } else {
                            alert(res.data.message)
                            return
                        }
                    })
                } else {
                    api.GetCardCoupon({
                        code: this.currentKaquan.code,
                        orderId: this.query.orderId
                    }).then(res => {
                    	console.log(res.data.orderInfo)
                        this.isLoading = false
                        if (res.data.isok) {
                            if (res.data.orderInfo != "") {
                                this.kaquanDialog = true
                                res.data.card.cardCouponLogs.map((item, index) => {
                                    console.log(item)
                                    res.data.card.cardCouponLogs[index].createDate = new Date(item.createDate).toString("yyyy-MM-dd")
                                })
                                this.cardCoupon = res.data

                            }
                            if(res.data.card.cardType == null || !res.data.card.cardType.isAllowAnyDiscount){
                            	this.kaquanDialog = true
                                res.data.card.cardCouponLogs.map((item, index) => {
                                    console.log(item)
                                    res.data.card.cardCouponLogs[index].createDate = new Date(item.createDate).toString("yyyy-MM-dd")
                                })
                                this.cardCoupon = res.data
                            }
                        } else {
                            alert('使用异常！')
                        }
                    })
                }
            },

            // 提交使用卡券
            usePackageCard () {
                if (!this.cardCouponUseAmount) {
                    alert('请输入使用金额!')
                    return
                }
                if (!this.deductionAmount) {
                    alert('请输入冲抵金额!')
                    return
                }
                if (!this.carduseremark) {
                    alert('请输入备注!')
                    return
                }
                this.isLoading = true
                api.usePackageCard({
                    code: this.cardCoupon.card.code,
                    orderId: this.query.orderId,
                    amount: this.cardCouponUseAmount,       // 使用金额
                    deductionAmount: this.deductionAmount,  // 冲抵金额
                    carduseremark: this.carduseremark       // 备注
                }).then(res => {
                    this.isLoading = false
                    if (res.data.isok) {
                        this.kaquanDialog = false
                        this.GetOrderInfo()
                    } else {
                        alert(res.data.msg)
                    }
                })
            },

            // 取消使用卡券
            cancelUseCard (id) {
                this.isLoading = true
                api.CancelCardUse({
                    id: id
                }).then(res => {
                    this.isLoading = false
                    if (res.data.success) {
                        this.GetOrderInfo()
                    } else {
                        alert(res.data.msg)
                    }
                })
            },

            //抹零优惠
            judgeMoling(){
            	let orderId = this.query.orderId
            	api.judgeMoling({
                    orderId: orderId,
					isMoLing: !this.isMoLing
               }).then(res => {
                    
                    if (res.data.isok) {
                    	this.GetOrderInfo()
                        this.isMoLing = true
//	                    api.GetOrderInfo({orderId: this.query.orderId}).then(res => {
//		                    this.isLoading = false
//		                    this.drawingData(res.data)
//		                    this.isMoLing = res.data.isMoLing
//		                })
	                } else {
                        this.isMoLing = false
                        alert(res.data.message)
	                }
                })
            },
            
            // 拆分付款
            paySplit () {
                if (!this.paySplitNum || this.paySplitNum < 0) {
                    alert('请输入正确的金额！')
                    return
                } else if (this.paySplitNum > this.orderInfo.total - this.orderInfo.alreadyPaymentAmount) {
                    this.paySplitNum = this.orderInfo.total - this.orderInfo.alreadyPaymentAmount
                }
                this.paySubmit(true)
                this.isOpenPaySplit=false
            },

            // 付款 isSplit: 是否拆分付款
            paySubmit (isSplit) {
            	console.log(isSplit)
            	console.log(this.payInfo)
                if (!this.payInfo) {
                    alert('请选择支付方式！')
                    return
                }
                if (this.payInfo === '支票支付') {
                    if (!this.lshvalNum) {
                        alert('请输入正确的支票号！')
                        return
                    }
                }
                api.PreparedPay({
                    orderId: this.query.orderId
                }).then(res => {
                	console.log(res.data.appId)
                    // 判断支付是否完成
                    if (!res.data.allowPayment) {
                        // swal(...)
//                      console.log(res.data.allowPayment)
                    } else {
                        // 根据是否拆分 判断本次需要支付的金额
                        let amount = (isSplit ? this.paySplitNum * 1 : (this.orderInfo.total - this.orderInfo.alreadyPaymentAmount)).toFixed(2)
                        this.amount = amount
                        switch (this.payInfo) {
                        	//微信扫码支付
                            case '微信支付': 
                                let payments = JSON.stringify(this.orderInfo.payments)
                                if (payments.includes(this.payInfo)) {
                                    alert("每张订单每个支付方式只能使用一次！")
                                    return
                                }
                                this.$router.push({
                                    path: 'wechatpay',
                                    query: {
                                        otype: 10,
                                        ono: this.query.orderId,
//                                      ptype: 2,
//                                      payAmount: 0
                                    }
                                })
                                break

                            case '扫码支付':
                                if (window.LakalaJSWebPay !== undefined) {
                                    lklPay.payWithCode(payObj, "lklCallBack");
                                } else {
                                    alert('请使用拉卡拉POS机进行后续操作！')
                                }
                                break
                            
                            case '刷卡支付':
                                if (window.LakalaJSWebPay !== undefined) {
                                    lklPay.payWithCard(payObj, "lklCallBack")
                                } else {
                                    alert('请使用拉卡拉POS机进行后续操作！')
                                }

                            case '第三方挂账':
                                this.isSuppliers = true
                                break
                            
                            //其他支付 （现金支付 支票支付 延时出单 对公转账）
		                    default: {
		                        if (confirm("确定使用[ " + this.payInfo + " ]付款吗？")) {
                                    this.payDirect(this.payInfo, this.lshvalNum, amount)
		                        }
		
		                    } break
                            
                        }

                    }
                })
            },

            // 第三方挂账  选择完毕
            sureSuppliers (data) {
                this.suppliersId = data.select1.value
                this.payDirect(this.payInfo, this.suppliersId, this.amount)
                this.isSuppliers = false
            },

            // 其他支付 （现金支付 支票支付 延时出单 对公转账）
            payDirect(payMethod, lsh, amount, payInfo) {
                api.PayOrder({
                    orderId: this.query.orderId,
                    paymentMethod: payMethod,              // 支付方式
                    lsh: lsh,                              // 支票号、第三方挂账id
                    payAmount: amount,                     // 支付金额
                    payInfo: payInfo                       // 支付备注信息
                }).then(res => {
                    console.log(res.data)
                    if (res.data.data == "Ok") {
                        alert("支付成功！")
                        this.GetOrderInfo()
                    }else{
                        alert("支付失败！");
                    }
                })
            }
	    },
	    components:{
            myHeader: Header,
            VuePickers: VuePickers
	    }
	}
</script>

<style>
</style>