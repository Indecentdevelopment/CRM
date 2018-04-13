<template>
	<div class="queryPrice">
		<!-- 头部 顶部 -->
		<my-header></my-header>
		<div class="loading" v-loading="isLoading">
			<!--搜索栏-->
			<div class="search">
				<div class="topmain clearfix">
					<p class="collect fl"><img src="../../assets/images/queryPrice/collect.png"/></p>
					<input type="text" placeholder="关键字查询" class="fl keywords" />
					<span class="seobtn fl" @click="getProducts">搜索</span>
					<span class="checkbtn fr">效验</span>
				</div>
				<div class="titlebottom clearfix">
					<div class="fl thebrand" @click="getThebrand">品牌</div>
					<div class="fl thetype" @click="getThetype">分类</div>
					<input type="text" placeholder="请输入规格" class="fr thesize" />
					<!--展示区域-->
					<div class="brandbox clearfix" v-show="brandControl">
						<p class="fl" v-for="item in brandList" :key="item.id">{{item.name}}</p>
					</div>
					<div class="brandbox clearfix" v-show="thetypeControl">
						<p class="fl" v-for="item in thetypeList" :key="item.id">{{item.name}}</p>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
    import Header from '@/components/header'
    import api from '@/vuex/api'
	import "./queryPrice.sass"
	export default {
		data() {
			return {
                isLoading: true,
                productVal: '',
                productBrandId: '',
                productCategoyId: '',
                productSize: '',
                brandList: [],			//品牌类别
                thetypeList: [],		//分类列表
                brandControl: false,		
                thetypeControl: false		
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
        		api.GetProducts({
                    Specs: this.productVal,
		            BrandId: this.productBrandId,
		            CategoryId: this.productCategoyId,
		            Specifications: this.productSize
                }).then(res => {
                    console.log(res.data)
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
                    console.log(res.data)
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
                    console.log(res.data)
            	})
        	}
        },
		components: {
            myHeader: Header
		}
	}
	
</script>