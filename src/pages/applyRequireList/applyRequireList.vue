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
			<!-- <router-link :to="{path: 'allocationYes', query:{serial:item.serial}}">
				<span class="fr" @click="details">详情</span>
			</router-link> -->
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
                <div class="form-item">
                    <div class="info">回复报价(单价)：</div>
                    <input>
                </div>
                <div class="form-item">
                    <div class="info">加价率：</div>
                    <div class="val">不知</div>
                </div>
                <div class="form-item">
                    <div class="info">销售价格(单价)：</div>
                    <input>
                </div>
                <div class="form-item">
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
                <div class="form-item">
                    <div class="info">调拨状态：</div>
                    <div class="val">{{detailList.applyShopModels[0].applyShopModels}}</div>
                </div>
                <div class="form-item">
                    <div class="info">收货状态：</div>
                    <div class="val">不知</div>
                </div>
                <div class="form-item">
                    <div class="info">备注：</div>
                    <textarea ></textarea>
                </div>
                <div class="form-item">
                    <div class="info">拒绝原因状态：</div>
                    <textarea ></textarea>
                </div>

                <div class="btn-box">
                    <button>接受申请</button>
                    <button>拒绝申请</button>
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
                orderList: [],          // 订单列表
                detailList: [],         // 详情列表
				value1: '',				//调拨时间
				serial: '',
				crmData:{}				//CRM剩余参数
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
            		console.log(res.data)
            	})
            	
            },

            // 再点击详情
            showDetail2 (item,shopId) {
                this.status = 'form'
        		this.value1 = item
        		
        		console.log(shopId)
            	api.GetApplyShopAppInfo({
            		serial: this.serial,
            		shopId: shopId
            	}).then(res =>{
            		this.crmData = res.data
            		console.log(res.data)
            	})
            }
        },
		components: {
            myHeader: Header
		}
	}
</script>