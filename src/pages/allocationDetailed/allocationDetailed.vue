<template>
	<div class="allocationDetailed">
		<!-- 头部 顶部 -->
		<my-header></my-header>
			<!--列表-->
			<div class="listHead">
				调拨单明细
			</div>
			<div class="listContent clearfix">
				<div class="contentLeft fl">
					<p>ID：</p>
					<p>零采单号：</p>
					<p>CRM服务单号：</p>
					<p>Serial号：</p>
					<p>申请门店：</p>
					<p>申请产品：</p>
					<p>申请数量：</p>
					<p>申请时间：</p>
					<p>被调拨方：</p>
					<p>预估到店：</p>
					<p>出库单号：</p>
					<p>调拨状态：</p>
					<p>收货状态：</p>
					<p>备注：</p>
					<p style="margin-top: 3rem;">拒绝原因：</p>
				</div>
				<div class="contentRight fr">
					<p>{{}}</p>
					<p>{{}}</p>
					<p>{{}}</p>
					<p>{{}}</p>
					<p>{{}}</p>
					<p>{{}}</p>
					<p>{{}}</p>
					<p>{{}}</p>
					<p>{{}}</p>
					<p>
						<div class="block">
							<el-date-picker v-model="value1" type="date" placeholder="选择日期" :picker-options="pickerOptions1">
							</el-date-picker>
						</div>
					</p>
					<p><input type="" name="" id="" value="" /></p>
					<p>{{}}</p>
					<p>{{}}</p>
					<p><textarea class="remarks"></textarea></p>
					<p><textarea class="remarks" v-model="valRefuse"></textarea></p>
				</div>
				<div class="bottomBtn fl">
					<p @click="btnAccept">接受申请</p>
					<p @click="btnReject">拒绝申请</p>
				</div>
			</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Header from '@/components/header'
	import api from '@/vuex/api'
	import "./allocationDetailed.sass"
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
				value1: '',		//时间
				valRefuse: '',		//拒绝原因
			}
		},
		created() {
			Promise.all([]).then(res => {
				setTimeout(() => {
					this.isLoading = false
				}, 500)
			})
		},
		methods: {
			//接受申请
			btnAccept(){
				if(this.value1 == ''){
                	this.$alert('请输入您的交期！', '轮库Tirecool', {
			          	confirmButtonText: '确定',
			          	callback: action => {}
			        });
                }
			},
			//拒绝申请
			btnReject(){
				if(this.valRefuse == ''){
                	this.$alert('请输入您拒绝的原因！', '轮库Tirecool', {
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