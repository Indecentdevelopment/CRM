<template>
	<div class="orderDetails">
		
		<!-- 头部 顶部 -->
        <my-header></my-header>
        
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
        	<p class="fr"><img src="../../assets/images/orderDetails/edit.png"/>编辑</p>
        </div>
        
        <!--订单内容-->
        <div class="orderContent clearfix">
        	<p class="orderContentp fl">订单内容</p>
        	<div class="orderConDetails fl">
        		<div class="detailsImg fl">
        			<img src="http://act.tirecool.net/Content/img/defaultcar.jpg"/>
        		</div>
        		<div class="detailsList fr">
        			
        			<div class="item-change">
                        <p id="productName"></p>
                        <div id="itemPrice"></div>
                        <div class="reduce">
                            <div id='reduce-num'></div>
                            <div id="minus">-</div>
                            <div id="current-num"></div>
                            <div id="add">+</div>
                        </div>
                    </div>
                    <div class="free-button active">免</div>
        		</div>
        	</div>
        </div>

        <!-- 技师备注 -->
        <div class="remark-info">
            <div class="head">技师备注</div>
            <textarea name="" id="technician-remark" rows="2"></textarea>
            <!-- --------------------------------此地注意  ----------------------------------------- -->
            <div class="technician-bg" id="technician-bg"></div>
        </div>
        
        <!--结算信息-->
        <div class="checkout clearfix">
        	<p class="head">结算信息</p>
            <div class="box">
                <div class="item">
                    <div class="title">商品总价：</div>
                    <div class="info">¥123</div>
                </div>
                <div class="item">
                    <div class="title">服务费用：</div>
                    <div class="info">¥123</div>
                </div>
                <div class="item">
                    <div class="title">合计金额：</div>
                    <div class="info">¥123</div>
                </div>
                <div class="item useother-box">
                    <div class="title">useother-box</div>
                    <div class="info">¥123</div>
                </div>
                <div class="item useother-box1" id="dvinvoice">
                    <div class="title">发票号：</div>
                    <div class="info">
                        <input type="text" placeholder="发票号">
                        <div class="apply">使用</div>
                    </div>
                </div>
                <div class="item">
                    <div class="title useother-box">优惠项目：</div>
                    <div class="info">¥123</div>
                </div>
                <div class="item">
                    <div class="title useother-box">会员折扣：</div>
                    <div class="info">¥123</div>
                </div>
                <div class="item">
                    <div class="title useother-box">优惠合计：</div>
                    <div class="info">¥123</div>
                </div>
                <div class="item">
                    <div class="title useother-box">应付总额：</div>
                    <div class="info">¥123</div>
                </div>

            </div>

            
        	
        </div>

        <!-- 付款方式 -->
        <div class="payment-box">
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
        
        <!--顾客签字确认-->
        <div class="sign clearfix">
        	<p class="sign fl">&nbsp;&nbsp;顾客签字确认</p>
        	<div class="signpLate fl">
        	</div>
        </div>

        <!-- 顾客确认签字 -->
        <div class="customer-sign">
            <div class="head">顾客确认签字</div>
            <div class="wrap">
                <img src="" alt="">
            </div>
        </div>

        <div class="btn-box">
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
                query: {
                    orderId: ''
                },
                orderInfo: {
                    datePlaced: [],
                    shop: {},
                    user: {}
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
                api.GetOrderInfo({orderId: this.query.orderId}).then(res => {
                    let data = res.data
                    switch (data.status) {
                        case 12:
                            data.status = '已预约'
                            document.getElementsByClassName('sign')[0].style.display = 'block'
                            document.getElementsByClassName('pre-count')[0].style.display = 'block'
                            document.getElementsByClassName('payment-box')[0].style.display = 'none'
                            document.getElementsByClassName('customer-sign')[0].style.display = 'none'
                            document.getElementsByClassName('remark-info')[0].style.display = 'none'
                            document.getElementsByClassName('useother-box')[0].style.display = 'none'   // 尚未解决
                            document.getElementById('dvinvoice').style.display = 'none'
                            
                            break
                        case 0:
                            data.status = '待确认'
                        case 1:
                            data.status = '服务中'
                        case 2:
                            data.status = '待付款'
                        case 3:
                            data.status = '已完成'
                        case 13:
                            data.status = '已作废'
                        case 11:
                            data.status = '已取消'
                        case 16:
                            data.status = '已冲销'
                    }
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

                    document.getElementById('average').innerHTML = `月均行驶：${data.userCarBind.carInfo.monthMileage}`
                    document.getElementById('carNo').innerHTML = `车牌号：${data.userCarBind.carInfo.carNumber}`
                    document.getElementById('productName').innerHTML = `${data.items[0].productName}`
                    document.getElementById('itemPrice').innerHTML = `服务价格 ${data.items[0].itemPrice}`
                    document.getElementById('reduce-num').innerHTML = (data.items[0].categoryName === '机油') ? `升数 X` : `数量 X`
                    document.getElementById('current-num').innerHTML = data.items[0].quantity
                    document.getElementById('current-num').setAttribute('stock', data.items[0].isService?'999':data.items[0].stock+data.items[0].quantity)
                    document.getElementById('current-num').setAttribute('isser', data.items[0].isService)
                    document.getElementById('current-num').setAttribute('cla', data.items[0].categoryName)
                    
                    this.orderInfo = data
                })
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
            }
	    	
	    },
	    components:{
	        myHeader: Header
	    }
	}
</script>

<style>
</style>