<template>
	<div class="helpCore">
		
		<!-- 头部 顶部 -->
		<my-header></my-header>
		<div class="loading" v-loading="isLoading">
			<!--导航条-->
			<div class="navList">
				<p @click="tabId=6;ifClick(6)" class="nav-stylea">全部</p>
				<p @click="tabId=0;ifClick(0)" :class="{'nav-stylea':isClicka}">订单类</p>
				<p @click="tabId=1;ifClick(1)" :class="{'nav-stylea':isClickb}">零采调拨</p>
				<p @click="tabId=2;ifClick(2)" :class="{'nav-stylea':isClickc}">卡券类</p>
				<p @click="tabId=3;ifClick(3)" :class="{'nav-stylea':isClickd}">支付类</p>
				<p @click="tabId=4;ifClick(4)" :class="{'nav-stylea':isClicke}">冲销类</p>
				<p @click="tabId=5;ifClick(5)" :class="{'nav-stylea':isClickf}">其它</p>
			</div>
			<!--内容-->
			<div class="content">
				<!--订单类-->
				<div class="order" v-show="tabId===0 || tabId===6">
					<h3>订单类</h3>
					<el-collapse accordion>
					    <el-collapse-item>
					        <template slot="title">
					      		已完成订单如何调整付款方式？
					        </template>
					    	<div class="problem">已完成订单已过账，若需调整付款方式。 需店长发送邮件给zhangchengpeng@tirecool.com 、 guozhentao@tirecool.com、抄送城市经理、当地财务，描述清楚调整原因、方法。</div>
					    </el-collapse-item>
					  	<el-collapse-item title="待付款订单如何增删商品？">
					    	<div class="problem">进入CRM后台订单列表-订单详情页面，点击【返回服务中】。</div>
					  	</el-collapse-item>
					</el-collapse>
				</div>
				<!--零采调拨类-->
				<div class="order" v-show="tabId===1 || tabId===6">
					<h3>零采调拨类</h3>
					<el-collapse accordion>
					    <el-collapse-item>
					        <template slot="title">
					      		零采销售价格的计算规则？
					        </template>
					    	<div class="problem">销售价格=成本/（1-加价率）/0.9</div>
					    </el-collapse-item>
					  	<el-collapse-item title="如何取消零采申请？">
					    	<div class="problem">若未在WMS收货，可在CRM前台-调拨列表，点击【退回】（已收货请参考冲销类问题）。</div>
					  	</el-collapse-item>
					  	<el-collapse-item title="如何取消同城调拨申请？">
					    	<div class="problem">被调拨门店若未出库，可在CRM前台-调拨列表页面，点击【撤销】。</div>
					  	</el-collapse-item>
					  	<el-collapse-item title="加价率偏高，需调整销售价格？">
					    	<div class="problem">正常做服务单、零采单，发邮件给梁姐:liangsl@tirecool.com、城市经理，抄送zhangchengpeng@tirecool.com、guozhentao@tirecool.com，写明服务单号、xxx产品零采进价xx元，原销售价xx元，需调整为XX元（细化到订单项）。审批后，我们来改单，你们再结算。</div>
					  	</el-collapse-item>
					  	<el-collapse-item title="如何取消有零采记录的服务单？">
					    	<div class="problem">零采后，必须在原服务单操作，否则原服务单无法正常取消。需说明原因发邮件给梁姐：liangsl@tirecool.com、城市经理，抄送 zhangchengpeng@tirecool.com、guozhentao@tirecool.com，写明原服务单号、零采单号、新服务单号，确保新服务单的售价不低于零采单售价。</div>
					  	</el-collapse-item>
					  	<el-collapse-item title="零采税率说明？">
					    	<div class="problem" style="text-indent:initial;">
					    		1. 专票对应税码J6、税率16% （2018年5月之后），税码J1、税率17%（2018年5月之前）<br />
	                        	2. 普票对应税码J0、税率0%<br />
	                        	3. 其他对应税码J5、税率3%
					    	</div>
					  	</el-collapse-item>
					</el-collapse>
				</div>
				<!--卡券类-->
				<div class="order" v-show="tabId===2 || tabId===6">
					<h3>卡券类</h3>
					<el-collapse accordion>
					  	<el-collapse-item title="如何解绑卡券？">
					    	<div class="problem">若卡劵已绑定他人，需发送邮件到zhangchengpeng@tirecool.com、guozhentao@tirecool.com,抄送城市经理、梁姐进行解绑。</div>
					  	</el-collapse-item>
					  	<el-collapse-item title="卡券使用提示异常？">
					    	<div class="problem">进入CRM前台首页-卡券查询，若状态为”无效”,需进入CRM后台找到对应卡券更新状态。</div>
					  	</el-collapse-item>
					  	<el-collapse-item title="卡劵是否可以重新绑定客户？">
					    	<div class="problem">需说明情况，发邮件给梁姐，抄送zhangchengpeng@tirecool.com、guozhentao@tirecool.com，附带原客户手机号、原卡号、需绑定客户的手机号，审批通过后，信息部来处理。</div>
					  	</el-collapse-item>
					</el-collapse>
				</div>
				<!--支付类-->
				<div class="order" v-show="tabId===3 || tabId===6">
					<h3>支付类</h3>
					<el-collapse accordion>
					  	<el-collapse-item title="如何设置挂账？">
					    	<div class="problem">说明：挂账分第三方挂账（糯米、百森通）、自身挂账（小KA、大客户）两种。1.第三方挂账需要财务部同事审核，并在ERP维护。2.自身挂账联系城市经理进入CRM后台-小KA下单，找到对应小KA设置挂账权限。</div>
					  	</el-collapse-item>
					  	<el-collapse-item title="扫码支付、刷卡支付后，订单无付款记录？">
					    	<div class="problem">进入CRM后台-订单列表-订单详情，点击【支付同步】。</div>
					  	</el-collapse-item>
					</el-collapse>
				</div>
				<!--冲销类-->
				<div class="order" v-show="tabId===4 || tabId===6">
					<h3>冲销类</h3>
					<el-collapse accordion>
					  	<el-collapse-item title="如何进行订单冲销？">
					    	<div class="problem">已完成订单已过帐，需发邮件给梁姐：liangsl@tirecool.com、当地财务，抄送 zhangchengpeng@tirecool.com、guozhentao@tirecool.com。</div>
					  	</el-collapse-item>
					  	<el-collapse-item title="如何进行采购冲销？">
					    	<div class="problem">已收货采购单进行冲销，需描述清楚问题；附带相关单号（采购单号&服务单号）发邮件给梁姐：liangsl@tirecool.com，抄送zhangchengpeng@tirecool.com,lishuli@tirecool.com,guozhentao@tirecool.com,panjingwei@tirecool.com和chengyanyan@tirecool.com。</div>
					  	</el-collapse-item>
					</el-collapse>
				</div>
				<!--其他问题-->
				<div class="order" v-show="tabId===5 || tabId===6">
					<h3>其他问题</h3>
					<el-collapse accordion>
					  	<el-collapse-item title="小KA下单销售价格取值规则？">
					    	<div class="problem">参考价格是期初导入的基准数据， ERP底价是参考移动平均价（实时变动）。默认以ERP底价为准， 若ERP底价取不到，以参考价格为准。</div>
					  	</el-collapse-item>
					  	<el-collapse-item title="CRM、WMS系统如何下载APP软件?">
					    	<div class="problem" style="text-indent:initial;">
		                        CRM前端（安卓）：<span>crm.tirecool.net/crm.apk</span> <br />
		                        WMS前端（安卓）：<span>crm.tirecool.net/wms.apk</span>
					    	</div>
					  	</el-collapse-item>
					  	<el-collapse-item title="CRM、WMS系统访问地址?">
					    	<div class="problem" style="text-indent:initial;">
		                        CRM前端：<span>crm.tirecool.net</span><br />
		                        CRM后端：<span>crm.tirecool.net/admin</span><br />
		                        WMS后端：<span>crm.tirecool.net/adminnew</span>
	                        </div>
					  	</el-collapse-item>
					</el-collapse>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
    import Header from '@/components/header'
    import api from '@/vuex/api'
	import "./helpCore.sass"
	export default {
		data() {
			return {
                isLoading: true,
                tabId: 6,
                isClicka: false,
                isClickb: false,
                isClickc: false,
                isClickd: false,
                isClicke: false,
                isClickf: false
            }
        },
        computed: {
            ...mapGetters({
                shopData: 'shopData'
            })
        },
        created () {
            Promise.all([]).then(res => {
                setTimeout(() => {
                    this.isLoading = false
                }, 500)
            })
        },
        mounted () {
        	
        },
        methods: {
        	ifClick(i){
        		if(i == '0'){
		    		this.isClicka = !this.isClicka
	        	}else{
	        		this.isClicka = false
	        	}
	        	if(i == '1'){
		    		this.isClickb = !this.isClickb
	        	}else{
	        		this.isClickb = false
	        	}
	        	if(i == '2'){
		    		this.isClickc = !this.isClickc
	        	}else{
	        		this.isClickc = false
	        	}
	        	if(i == '3'){
		    		this.isClickd = !this.isClickd
	        	}else{
	        		this.isClickd = false
	        	}
	        	if(i == '4'){
		    		this.isClicke = !this.isClicke
	        	}else{
	        		this.isClicke = false
	        	}
	        	if(i == '5'){
		    		this.isClickf = !this.isClickf
	        	}else{
	        		this.isClickf = false
	        	}
        	}
        },
		components: {
            myHeader: Header
		}
	}
</script>