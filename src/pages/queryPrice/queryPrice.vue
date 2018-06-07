<template>
	<div class="queryPrice">
		<!-- 头部 顶部 -->
		<my-header></my-header>
			<!--搜索栏-->
			<div class="search">
				<div class="topmain clearfix">
					<p class="collect fl"><img src="../../assets/images/queryPrice/collect.png"/></p>
					<input type="text" placeholder="关键字查询" class="fl keywords" v-model="keyword" />
					<span class="seobtn fl" @click="getProducts">搜索</span>
					<el-button type="text" @click="checkBtn" class="checkbtn fr">效验</el-button>
				</div>
				<div class="titlebottom clearfix">
					<div class="fl thebrand" @click="getThebrand">{{brandName}}</div>
					<div class="fl thetype" @click="getThetype" >{{thetypeName}}</div>
					<input type="text" placeholder="请输入规格" class="fr thesize" v-model="carNo" @click="showKeyboard($event)" />
					<!--展示区域-->
					<!--品牌展示-->
					<div class="brandbox clearfix" v-show="brandControl">
						<p class="fl" v-for="item in brandList" :key="item.id" @click="brandExhibitio(item.id,item.name)">{{item.name}}</p>
					</div>
					<!--分类展示-->
					<div class="brandbox clearfix" v-show="thetypeControl">
						<p class="fl" v-for="item in thetypeList" :key="item.id" @click="classExhibitio(item.id,item.name)">{{item.name}}</p>
					</div>
				</div>
				<!--产品列表-->
				<div class="productList"  v-if="productList.length>0">
					<div class="productExample" v-for="item in productList" :key="item.id">
						<ul class="clearfix">
							<li class="fl clearfix">
								<span class="fl fontSize">{{item.name}}</span>
								<span class="fr price" v-if="item.price < 0 ">--</span>
								<span class="fr price" v-else>¥ {{item.price}}</span>
							</li>
							<li class="fl clearfix">
								<router-link class="fl btnStyle" :to="{path: 'allocationSingle', 
                                query:{ productId:item.productId,shopId:item.shopId, ShowShopType: 1}}">
									<span>求助</span>
								</router-link>	
								<span class="fl btnStyle btnStyles">星级{{item.starLevel}}</span>
								<span class="fl btnStyle btnStyles" @click="GetStoreStock(item.productId)">存：{{item.stock}}
									<div class="stock" v-show="item.productId == productId">
										<div class="triangle"></div>
										<p class="storeName" v-for="(items, j) in storeStock" :key="j">
                                            {{items.name}} - {{items.stock}}
                                        </p>
									</div>
								</span>
								<span class="fr color">{{item.categoryName}}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<!--键盘-->
			<keyboard-model :open="isInputCarNo" @inputWord="inputWord" @close="isInputCarNo=false" @backWord="backWord" @empty="empty"></keyboard-model>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
    import Header from '@/components/header'
    import api from '@/vuex/api'
	import "./queryPrice.sass"
	import keyboardModel from '@/components/keyboardModel'
	export default {
		data() {
			return {
                isLoading: true,
                productVal: '',			//
                productBrandId: '',		//
                productCategoyId: '',	//
                productSize: '',		//
                productId: '',			//
                brandList: [],			//品牌类别
                brandName: '品牌',		//品牌名称
                thetypeList: [],		//分类列表
                thetypeName: '分类',		//分类名称
                brandControl: false,	//	
                thetypeControl: false,	//
                isInputCarNo: false,    // 是否显示自定义键盘
                carNo: '',				//
                keyword: '',			//关键字		物料编码
                productList: '',		//搜索到的产品列表
                storeStock: '',			//店铺库存列表
                shopId: '123456'
            }
        },
        created () {
            Promise.all([]).then(res => {
                setTimeout(() => {
                    this.isLoading = false
                }, 500)
            })
        },
        methods: {
        	//搜索产品
        	getProducts () {
                this.isLoading = true
        		api.GetProducts({
        			Specs: this.keyword,
		            BrandId: this.productBrandId,
		            CategoryId: this.productCategoyId,
		            Specifications: this.carNo
                }).then(res => {
                    this.isLoading = false
                    console.log(res)
                    console.log(res.data)
                    this.productList = res.data
                    if(res.data == ''){
                    	this.$alert('抱歉，您所搜索的产品不存在！', '轮库Tirecool', {
				          	confirmButtonText: '确定',
				          	callback: action => {}
				        });
                    }
                })
        	},
        	//获取品牌列表
        	getThebrand () {
        		if(this.brandControl == false){
        			this.brandControl = true
        		}else{
        			this.brandControl = false
        			
        		}
        		api.GetThebrand().then(res => {
                    this.brandList = res.data
            	})
        	},
        	//获取分类列表
        	getThetype(){
        		if(this.thetypeControl == false){
        			this.thetypeControl = true
        		}else{
        			this.thetypeControl = false
        		}
        		api.GetThetype().then(res => {
                    this.thetypeList = res.data
            	})
        	},
        	//店铺库存列表
        	GetStoreStock(productId){
        		if(this.productId != productId ){
        			this.productId = productId
        			api.GetStoreStock({
	        			Specs: this.keyword,
			            BrandId: this.productBrandId,
			            CategoryId: this.productCategoyId,
			            Specifications: this.productSize,
			            ProductId: this.productId
	                }).then(res => {
	                    this.storeStock = res.data
	                    console.log(res.data[0].name)
	                })
        		}else{
        			this.productId = false
        		}
        	},
        	//校验按钮
        	checkBtn () {
        		api.GetCheckCode({
        			matnr: this.keyword
        		}).then(res => {
        			console.log(res)
        			this.$alert(res.data, '轮库Tirecool', {
			          	confirmButtonText: '确定',
			          	callback: action => {}
			        });
        		})
        		
        	},
        	//品牌展示
        	brandExhibitio (id,name) {
        		this.productBrandId = id
        		this.brandName = name
        		this.brandControl = false
        	},
        	//类别展示
        	classExhibitio (id,name) {
        		this.productCategoyId = id
        		this.thetypeName = name
        		this.thetypeControl = false
        	},
            // 点击规格输入框  显示自定义键盘
            showKeyboard (event) {
                event.target.blur()
                this.isInputCarNo = true
            },
            // 点击键盘
            inputWord (data) {
                this.carNo += data
            },
            // 键盘 撤销
            backWord () {
                let length = this.carNo.length
                this.carNo = this.carNo.substring(0, length - 1)
            },
            // 键盘 清空
            empty(){
            	this.carNo = ''
            }
        },
		components: {
            myHeader: Header,
            keyboardModel: keyboardModel
		}
	}
	
</script>