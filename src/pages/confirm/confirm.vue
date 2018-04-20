<template>
    <div class="confirm">
		
        <my-header></my-header>
        <div class="loading" v-loading="isLoading">	
	        <!-- 车辆信息 -->
	        <div class="car-info">
	            <img class="head-img" id="head-img" :src="carInfo.carType.carSeries.seriesMinImage">
	            <div class="info">
	                <div class="name">
	                    {{carInfo.carType.carSeries.brandName.replace(/^[A-Z] - /g,'')}}
	                    {{carInfo.carType.carSeries.brandType}}
	                    {{carInfo.carType.carSeries.seriesName}}
	                    {{carInfo.carType.displacement}}
	                    {{carInfo.carType.productiveYear}} 年生产
	                    ({{carInfo.carNumber}}/{{carInfo.mileage}}km/
	                    {{carInfo.monthMileage}}km)
	                </div>
	                <div class="config">
	                    采用{{carInfo.carType.cylinder}} 
	                    缸发动机,机油用量 {{carInfo.carType.engineOil}}L 
	                    防冻液用量 {{carInfo.carType.antifreezing}}L
	                </div>
	            </div>
	        </div>
	        <!-- 轮胎服务 -->
	        <div class="server">
	            <div class="item" v-for="product in productData.data" :key="product.id">
	                <div class="title">{{product.name}}</div>
	                <div class="box">
	                    <div class="item" v-for="categorys in product.childCategorys" :key="categorys.id" >
	                        <div class="oparation" @click="showProductList($event)">
	                            <img class="iconfont" src="../../assets/images/confirm/confirm.gif">
	                            <div class="info">
	                                <div class="name">{{categorys.name}}<span class="promotion">{{categorys.promotionInfo}}</span></div>
	                            </div>
	                        </div>
	                        <div class="productList">
	                            {{categorys.active}}
	                            <div class="tiresSpecs" v-if="categorys.name === '轮胎'">
	                                <i class="item" v-for="tires in productData.tiresSpecs" :key="tires" :class="{active: tires === productData.defaultSpecs}">
	                                    {{tires}}
	                                </i>
	                            </div>
	                            <div class="tiresSpecsbtn">
	                            	其他规格
	                            </div>
	                            <div class="proItem">
	                            	<!--缺货-->
	                            	<div class="proItemdetails clearfix">
	                            		<div class="imgBg fl">
	                            			<img src="../../assets/images/confirm/hook_no.png" class="hook"/>
	                            			<img src="../../assets/images/confirm/tyre.jpg" />
	                            		</div>
	                            		<div class="rightInfo clearfix fr">
	                            			<div class="model fl">555555555555555555555555555555555555555555</div>
	                            			<div class="price fr">
	                            				<p style="text-decoration:line-through; color: #999;">原价¥1096</p>
	                            				<p style="color: #df3448">现价¥888</p>
	                            				<p style="color: #999;">×1</p>
	                            			</div>
	                            			<div class="min-btn-box fl">
	                            				<span class="btn">优点</span>
	                            				<span class="btn">存：4</span>
	                            				<span class="btn">他店求助</span>
	                            			</div>
	                            		</div>
	                            		<div class="edit fr clearfix">
	                            			<div class="control fl">
	                            				<span class="kong">-</span>
	                            				<span class="chan">1</span>
	                            				<span class="kong">＋</span>
	                            			</div>
	                            			<div class="replace fr">
	                            				<img src="../../assets/images/confirm/replace.png"/><br />
	                            				更换
	                            			</div>
	                            		</div>
	                            	</div>
	                            </div>
	                        	<div class="fillPlus">
	                        		<p><span>+</span>添加</p>
	                        	</div>
	                        	<div class="servicetitle">
	                        		<div class="servicetype-name">
	                        			养护服务
	                        		</div>
	                        	</div>
	                        	<div class="preferentialPolicys">
	                        		<p>黄金套餐</p>
	                        		<p>钻石套餐</p>
	                        		<p>白金套餐</p>
	                        		<div class="servicePackage">
	                        			服务套餐
	                        		</div>
	                        	</div>
	                        	<div class="serviceproduct-box clearfix">
	                        		<div class="serviceproduct-item fl">
	                        			<span class="selected">✔</span>
	                        			<p class="productName">轮胎养护 四轮定位检查</p>
	                        			<p class="sdiscount">限时6折</p>
	                        			<div class="productBtn clearfix">
	                        				<span class="fl unitPrice">¥ 200</span>
	                        				<p class="fr clearfix">
	                        					<span class="cut fl">-</span>
	                        					<span class="squantity fl">1</span>
	                        					<span class="add fl">+</span>
	                        				</p>
	                        			</div>
	                        		</div>
	                        	</div>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	
	        <!-- subBottom -->
	        <div class="subBottom clearfix">
	        	<div class="cost clearfix fl">
	        		<p class="total fl">合计：¥{{}}</p>
	        		<p class="singlePrice fl">(产品:¥0.00 + 服务/工时费:¥0.00)</p>
	        	</div>
	        	<div class="determine">
	        		确定
	        	</div>
        	</div>
    	</div>
	</div>
</template>

<script>
import Header from '@/components/header'
import api from '@/vuex/api'
import './confirm.sass'
export default {
    data () {
        return {
        	isLoading: true,
            query: {
                userCarBindId: ''
            },
            productData: {},         // 车辆信息  以及服务信息数据
            carInfo: {},             // 车辆信息
            model: '',				 // 轮胎型号
        }
    },
    created () {
        this.query.userCarBindId = this.$route.query.userCarBindId
        Promise.all([this.ProductPush()]).then(res => {
            setTimeout(() => {
                this.isLoading = false
            }, 500)
        })
    },
    mounted () {
    },
    methods: {
        ProductPush () {
            api.ProductPush({
                userCarBindId: this.query.userCarBindId,
                shopId: localStorage.getItem('shopId')
            }).then(res => {
                this.productData = res.data
                //默认型号
                this.productData.defaultSpecs = this.productData.tiresSpecs[0]
                this.carInfo = res.data.userCarBind.carInfo
                //轮胎型号
                this.model = productData.data.childCategorys
                
            	console.log(this.productData)
            	console.log(this.productData.defaultSpecs)
            	console.log(this.carInfo)
            })
        },
        // 点击 显示服务列表
        showProductList (event) {
            let item = event.currentTarget.parentNode
            console.log(item.children)
//          for (var i = 0; i < item.children.length; i++) {
//              // console.log(item.children[i].className.indexOf('productList'))
//              if (item.children[i].className.indexOf('productList') > -1) {
//                  item.children[i].setAttribute('class', 'aaaa')
//              }
//          }
            // item.childNodes.map((item) => {
            //     console.log(item)
            // })
        }
    },
    components: {
        myHeader: Header
    }
}
</script>

