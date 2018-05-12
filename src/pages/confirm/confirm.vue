<template>
    <div class="confirm">
        <my-header></my-header>
        
        <div class="loading" v-loading="isLoading">
            <!-- 车辆信息 -->
            <div class="car-info" v-if="carInfo.carType">
                <img class="head-img" id="head-img" :src="carInfo.carType.carSeries.seriesMinImage" onerror="this.src = 'http://act.tirecool.net/Content/img/defaultcar.jpg'">
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
                <div class="item" v-for="(product, proIndex) in productData.data" :key="product.id">
                    <div class="title">{{product.name}}</div>
                    <div class="box">
                        <div class="item" v-for="(categorys, catIndex) in product.childCategorys" :key="categorys.id">
                            
                            <div v-if="categorys.childCategorys.length===0">
                                <div class="oparation" @click="showProductList($event, proIndex, catIndex, categorys)">
                                    <img class="iconfont" src="../../assets/images/confirm/confirm.gif">
                                    <div class="info">
                                        <div class="name">{{categorys.name}}<span class="promotion">{{categorys.promotionInfo}}</span></div>
                                    </div>
                                </div>
                                <div class="productList" :class="{active: categorys.active}" v-show="categorys.active">
                                    <div class="tiresSpecs" v-if="categorys.name === '轮胎'">
                                        <!-- 规格 -->
                                        <i class="item" v-for="(tires, tiresIndex) in productData.tiresSpecs" :key="tiresIndex" 
                                        :class="{active: tires.value === currentTiresSpecs}" @click="checkSpecs(tires.value)">
                                            {{tires.value}}
                                            <div class="num-info" v-show="tires.selectProductNum>0">{{tires.selectProductNum}}</div>
                                        </i>
                                        <i class="otherTries">
                                            其他规格
                                        </i>
                                    </div>

                                    <div class="product-box">
                                        <div class="item" v-for="(goods, goodsIndex) in categorys.productList" @click="productClick(goodsIndex, proIndex, catIndex)" :key="goods.id"
                                        v-show="goods.name.includes(currentTiresSpecs)" :class="{'active check': goods.active}" 
                                        :data-id="goods.id" :data-num="goods.selectQuantity">
                                            <!-- 商品信息 -->
                                            <div class="goods">
                                                <img class="head" src="/Content/img/images/1_c.jpg">
                                                <div class="info">
                                                    <div class="name">{{goods.name}}</div>
                                                    <div class="btn-box">
                                                        <button>优点</button>
                                                        <button>存：{{goods.stock}}</button>
                                                        <button @click="help($event, goodsIndex, proIndex, catIndex)">他店求助</button>
                                                    </div>
                                                </div>
                                                <!-- 价格 -->
                                                <div class="price">
                                                    <div class="old-price" v-show="goods.oldPrice>goods.price">
                                                        原价<br />￥{{goods.oldPrice}}
                                                    </div>
                                                    <div class="new-price">
                                                        ￥{{goods.price}}
                                                    </div>
                                                    <div class="quantity">x{{goods.selectQuantity}}</div>
                                                </div>
                                            </div>
                                            <!-- 操作 -->
                                            <div class="operation">
                                                <div class="num">
                                                    <div class="minus" @click="minus($event, proIndex, catIndex, goodsIndex)"></div>
                                                    <div class="info">{{goods.selectQuantity}}</div>
                                                    <div class="add" @click="add($event, proIndex, catIndex, goodsIndex)"></div>
                                                </div>
                                                <!-- 更换 -->
                                                <div class="exchange" @click="changeProduct($event, goodsIndex, proIndex, catIndex)">
                                                    <img src="/Content/img/selectproduct/v1exchange.png" alt="">
                                                    <div class="info">更换</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div v-show="!categorys.isNoProduct" class="addproductbtn" @click="addProduct($event, proIndex, catIndex)">
                                            <span>+ </span> 添加
                                        </div>

                                        <!-- 待添加的商品 默认隐藏 -->
                                        <div class="hideProduct" v-show="categorys.isHideProduct">
                                            <div class="hidePro-box">
                                                <div class="head">
                                                    <div class="title">添加/更换商品列表</div>
                                                    <div class="close" @click="categorys.isHideProduct = false"></div>
                                                </div>
                                                <div class="search">
                                                    <select class="brandlist" id="brandlist" v-model="search.brand">
                                                        <option value="0-全部">全部</option>
                                                        <option v-for="brand in categorys.brands" :key="brand.id" :value="brand.id+'-'+brand.name">
                                                            {{brand.name}}
                                                        </option>
                                                    </select>
                                                    <input class="search-input" id="search-input" placeholder="搜索产品" v-model="search.specs">
                                                    <button class="search-btn" @click="getProduct(proIndex,catIndex)">搜索</button>

                                                </div>
                                                <div class="hideProList">
                                                    <div class="hide-item" :class="hidePro.active?'active':''" v-for="hidePro in categorys.hideProductList"
                                                        :key="hidePro.id" @click="addHideProTo(hidePro,proIndex,catIndex)">
                                                        <img class="imgBg" :src="hidePro.productImg">
                                                        <div class="info">
                                                            <div class="name">{{hidePro.name}}</div>
                                                            <div class="btn-box">
                                                                <div>优点</div>
                                                                <div>存：{{hidePro.stock}}</div>
                                                                <div>他店求助</div>
                                                            </div>
                                                        </div>
                                                        <div class="price-num">
                                                            <div class="oldPrice" v-show="hidePro.oldPrice>hidePro.price">
                                                                ￥{{hidePro.oldPrice}}
                                                            </div>
                                                            <div class="price">￥{{hidePro.price}}</div>
                                                            <div class="num">x{{hidePro.selectQuantity}}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- 服务 列表 -->
                                    <div class="service-list" v-if="categorys.serviceList.length>0">
                                        <div class="single">养车服务</div>
                                        <!-- 服务 套餐 -->
                                        <div class="preferentialPolicys" v-if="categorys.preferentialPolicys.length>0">
                                            <div class="item" v-for="(policy, polIndex) in categorys.preferentialPolicys" 
                                                :key="policy.id" :class="{active: policy.active}" @click="policyClick(proIndex, catIndex, polIndex)">
                                                {{policy.name}}
                                            </div>
                                        </div>
                                        <div class="service-box">
                                            <div class="item" v-for="(service, serIndex) in categorys.serviceList" :key="service.id" 
                                            :class="{'active check': service.active}" @click="serviceClick(proIndex, catIndex, serIndex)"
                                            :data-id="service.id" :data-num="service.selectQuantity">
                                                <div class="name">{{service.name}}</div>
                                                <div class="btn-box">
                                                    <div v-show="service.isRequired">必选</div>
                                                    <div v-show="service.isRecommend">推荐</div>
                                                    <div v-show="service.discount>0&&service.price>0">
                                                        限时{{service.discount}}折
                                                    </div>
                                                </div>
                                                <div class="price-num">
                                                    <div class="price">￥{{service.price}}</div>
                                                    <div class="num">
                                                        <div class="minus" @click="minusSerNum($event, serIndex, proIndex, catIndex)"></div>
                                                        <div class="num-info">{{service.selectQuantity}}</div>
                                                        <div class="add" @click="addSerNum($event, serIndex, proIndex, catIndex)"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>

                            <div v-else>

                                <div class="oparation" @click="showProductList($event, proIndex, catIndex, categorys)">
                                    <img class="iconfont" src="../../assets/images/confirm/confirm.gif">
                                    <div class="info">
                                        <div class="name">{{categorys.name}}<span class="promotion">{{categorys.promotionInfo}}</span></div>
                                    </div>
                                </div>

                                <div class="" v-for="(categorys2, cat2Index) in categorys.childCategorys" :key="categorys2.id">

                                    <div class="productList" :class="{active: categorys.active}" v-show="categorys.active">
                                        <div class="proTitle">{{categorys2.name}}</div>

                                        <div class="noProduct" v-show="categorys2.productList.length === 0">
                                            暂无匹配产品，可手动添加！
                                        </div>
                                        <div class="product-box">
                                            <div class="item" v-for="(goods, goodsIndex) in categorys2.productList" @click="productClick(goodsIndex, proIndex, catIndex, cat2Index)" :key="goods.id"
                                             :class="{'active check': goods.active}" 
                                            :data-id="goods.id" :data-num="goods.selectQuantity">
                                                <!-- 商品信息 -->
                                                <div class="goods">
                                                    <img class="head" :src="goods.productImg">
                                                    <div class="info">
                                                        <div class="name">{{goods.name}}</div>
                                                        <div class="btn-box">
                                                            <button>优点</button>
                                                            <button>存：{{goods.stock}}</button>
                                                            <button>他店求助</button>
                                                        </div>
                                                    </div>
                                                    <!-- 价格 -->
                                                    <div class="price">
                                                        <div class="old-price" v-show="goods.oldPrice>goods.price">
                                                            原价<br />￥{{goods.oldPrice}}
                                                        </div>
                                                        <div class="new-price">
                                                            ￥{{goods.price}}
                                                        </div>
                                                        <div class="quantity">x{{goods.selectQuantity}}</div>
                                                    </div>
                                                </div>
                                                <!-- 操作 -->
                                                <div class="operation">
                                                    <div class="num">
                                                        <div class="minus" @click="minus($event, proIndex, catIndex, goodsIndex)"></div>
                                                        <div class="info">{{goods.selectQuantity}}</div>
                                                        <div class="add" @click="add($event, proIndex, catIndex, goodsIndex)"></div>
                                                    </div>
                                                    <!-- 更换 -->
                                                    <div class="exchange">
                                                        <img src="/Content/img/selectproduct/v1exchange.png" alt="">
                                                        <div class="info" @click="changeProduct($event, goodsIndex, proIndex, catIndex, cat2Index)">更换</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div v-show="!categorys2.isNoProduct" class="addproductbtn" @click="addProduct($event, proIndex, catIndex, cat2Index)">
                                                <span>+ </span> 添加
                                            </div>
                                            
                                            <!-- 待添加的商品 默认隐藏 -->
                                            <div class="hideProduct" v-show="categorys2.isHideProduct">
                                                <div class="hidePro-box">
                                                    <div class="head">
                                                        <div class="title">添加/更换商品列表</div>
                                                        <div class="close" @click="categorys2.isHideProduct = false"></div>
                                                    </div>
                                                    <div class="search">
                                                        <select class="brandlist" id="brandlist" v-model="search.brand">
                                                            <option value="0-全部">全部</option>
                                                            <option v-for="brand in categorys2.brands" :key="brand.id" :value="brand.id+'-'+brand.name">{{brand.name}}</option>
                                                        </select>
                                                        
                                                        <input class="search-input" id="search-input" placeholder="搜索产品" v-model="search.specs">
                                                        <button class="search-btn" @click="getProduct(proIndex,catIndex,cat2Index)">搜索</button>

                                                    </div>
                                                   
                                                    <div class="hideProList">
                                                        <div class="hide-item" :class="hidePro.active?'active':''" v-for="hidePro in categorys2.hideProductList"
                                                         :key="hidePro.id" @click="addHideProTo(hidePro,proIndex,catIndex,cat2Index)">
                                                            <img class="imgBg" :src="hidePro.productImg">
                                                            <div class="info">
                                                                <div class="name">{{hidePro.name}}</div>
                                                                <div class="btn-box">
                                                                    <div>优点</div>
                                                                    <div>存：{{hidePro.stock}}</div>
                                                                    <div>他店求助</div>
                                                                </div>
                                                            </div>
                                                            <div class="price-num">
                                                                <div class="oldPrice" v-show="hidePro.oldPrice>hidePro.price">
                                                                    ￥{{hidePro.oldPrice}}
                                                                </div>
                                                                <div class="price">￥{{hidePro.price}}</div>
                                                                <div class="num">x{{hidePro.selectQuantity}}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- 服务 列表 -->
                                        <div class="service-list" v-if="categorys.serviceList.length>0">
                                            <div class="single">养车服务</div>
                                            <!-- 服务 套餐 -->
                                            <div class="preferentialPolicys" v-if="categorys.preferentialPolicys.length>0">
                                                <div class="item" v-for="(policy, polIndex) in categorys.preferentialPolicys" 
                                                    :key="policy.id" :class="{active: policy.active}" @click="policyClick(proIndex, catIndex, polIndex)">
                                                    {{policy.name}}
                                                </div>
                                            </div>
                                            <div class="service-box">
                                                <div class="item" v-for="(service, serIndex) in categorys.serviceList" :key="service.id" 
                                                :class="{'active check': service.active}" @click="serviceClick(proIndex, catIndex, serIndex)"
                                                :data-id="service.id" :data-num="service.selectQuantity">
                                                    <div class="name">{{service.name}}</div>
                                                    <div class="btn-box">
                                                        <div v-show="service.isRequired">必选</div>
                                                        <div v-show="service.isRecommend">推荐</div>
                                                        <div v-show="service.discount>0&&service.price>0">
                                                            限时{{service.discount}}折
                                                        </div>
                                                    </div>
                                                    <div class="price-num">
                                                        <div class="price">￥{{service.price}}</div>
                                                        <div class="num">
                                                            <div class="minus"></div>
                                                            <div class="num-info">{{service.selectQuantity}}</div>
                                                            <div class="add"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

            <!-- subBottom -->
            <div class="subBottom">
                <div class="info">
                    <div class="total">
                        合计：￥{{total.subTotal.toFixed(2)}}
                    </div>
                    <div class="service-total">
                        (产品：{{total.productTotal.toFixed(2)}} + 服务/工时费：¥{{total.serviceTotal.toFixed(2)}})
                    </div>
                </div>
                <div class="submit" @click="submit">确定</div>
            </div>
        </div>

        <!-- 立省  -->
        <div class="preferentialAmount" v-show="total.preferentialAmount>0">立省{{total.preferentialAmount}}</div>
        
    </div>
</template>

<script>
import Header from '@/components/header'
import api from '@/vuex/api'
import $ from 'jquery'
import './confirm.sass'
export default {
    data () {
        return {
            isLoading: false,
            isSearching: false,      // 正在 搜索中
            changeOrAdd: '',         // 添加/更换商品
            changeIndex: null,       // 需要被更换的商品索引
            query: {
                userCarBindId: ''
            },
            productData: {},         // 初始数据  以及服务信息数据
            productList: [],         // 商品 列表
            serviceList: [],         // 服务列表
            carInfo: {},             // 车辆信息

            search: {
                specs: '',           // 添加商品 搜索框的数据
                brand: '0-全部',           // 添加商品 下拉框的数据
            },
            currentCategorys: '',    // 当前 打开的服务列表
            currentTiresSpecs: '',   // 当前 规格
            defaultProductIds: [],   // 默认 必选的 服务
            total: {                 // 合计 账单
                preferentialAmount: 0,
                productTotal: 0,     // 商品 总价
                serviceTotal: 0,     // 服务 总价
                subTotal: 0,         // 总价
            }
        }
    },
    created () {
        this.query.userCarBindId = this.$route.query.userCarBindId
        // Promise.all([this.ProductPush()]).then(res => {
        //     setTimeout(() => {
        //         this.isLoading = false
        //     }, 500)
        // })
        this.ProductPush()
    },
    mounted () {
    },
    methods: {
        // 获取初始数据
        ProductPush () {
            this.isLoading = true
            api.ProductPush({
                userCarBindId: this.query.userCarBindId,
                shopId: localStorage.getItem('shopId')
            }).then(res => {
                this.isLoading = false
                this.carInfo = res.data.userCarBind.carInfo      // 设置 车辆信息
                this.currentTiresSpecs = res.data.tiresSpecs[0]  // 设置 当前 轮胎规格
                res.data.data.map((item, index) => {
                    item.childCategorys.map((v, i) => {
                        res.data.data[index]['childCategorys'][i].active = false         // 当前显/隐状态
                        res.data.data[index]['childCategorys'][i].isHideProduct = false  // 当前隐藏列表显/隐状态
                        res.data.data[index]['childCategorys'][i].productList = []       // 商品列表
                        res.data.data[index]['childCategorys'][i].currentProduct = []    // 当前商品
                        res.data.data[index]['childCategorys'][i].serviceList = []       // 服务列表
                        res.data.data[index]['childCategorys'][i].currentService = []    // 当前服务
                        res.data.data[index]['childCategorys'][i].hideProductList = []   // 点击添加 隐藏的列表

                        if (res.data.data[index]['childCategorys'][i]['childCategorys'].length > 0) {
                            res.data.data[index]['childCategorys'][i]['childCategorys'].map((vv, ii) => {
                                res.data.data[index]['childCategorys'][i]['childCategorys'][ii].active = false
                                res.data.data[index]['childCategorys'][i]['childCategorys'][ii].isHideProduct = false
                                res.data.data[index]['childCategorys'][i]['childCategorys'][ii].productList = []
                                res.data.data[index]['childCategorys'][i]['childCategorys'][ii].serviceList = []
                                res.data.data[index]['childCategorys'][i]['childCategorys'][ii].hideProductList = []
                            })
                        }
                    })
                })
                let tiresSpecsArr = []
                res.data.tiresSpecs.map((item, index) => {
                    let obj = {
                        selectProductNum: 0,
                        value: item
                    }
                    tiresSpecsArr.push(obj)
                })
                res.data.tiresSpecs = tiresSpecsArr

                // 套餐 
                res.data.data[0].childCategorys[0].preferentialPolicys.map((item, index)=>{
                    res.data.data[0].childCategorys[0].preferentialPolicys[index].active = false
                })
                
                this.productData = res.data                      // 初始 数据
            })
        },
        // 获取商品列表
        GetCarProduct (categoryId, carTypeId, proIndex, catIndex) {
            this.isLoading = true
            api.GetCarProduct({
                categoryId: categoryId,
                carTypeId: carTypeId
            }).then(res => {
                this.isLoading = false
                res.data.map((item, index) => {
                    res.data[index].active = false
                })
                this.productData.data[proIndex]['childCategorys'][catIndex].productList = res.data
                
            })
        },
        // 获取 服务列表
        GetCarServiceProduct (categoryId, carTypeId, proIndex, catIndex) {
            this.isLoading = true
            api.GetCarServiceProduct({
                categoryId: categoryId,
                carTypeId: carTypeId
            }).then(res => {
                res.data.map((item, index) => {
                    res.data[index].active = false
                })
                this.productData.data[proIndex]['childCategorys'][catIndex].serviceList = res.data
                
            })
        },
        // 点击某一条服务  显示服务列表
        showProductList (event, proIndex, catIndex, categorys) {

            var active = this.productData.data[proIndex]['childCategorys'][catIndex].active
            this.productData.data[proIndex]['childCategorys'][catIndex].active = !active

            if (!active) {
                if (this.productData.data[proIndex]['childCategorys'][catIndex].productList.length === 0) {
                    // 获取 商品列表
                    this.GetCarProduct(categorys.id, this.productData.userCarBind.carInfo.carTypeId, proIndex, catIndex)
                    // 获取服务列表
                    this.GetCarServiceProduct(categorys.id, this.productData.userCarBind.carInfo.carTypeId, proIndex, catIndex)
                }
            }
            this.calculateTotal(proIndex, catIndex)
            
            

            
        },

        // 切换 规格
        checkSpecs (specs) {
            this.currentTiresSpecs = specs
        },

        // 获取 总价
        // GetProductsTotal () {
        //     api.GetProductsTotal({
        //         UserCarBindId: 1
        //     })
        // },

        // 商品 点击减 数量
        minus (event, proIndex, catIndex, goodsIndex) {
            event.stopPropagation()
            if (this.productData.data[proIndex]['childCategorys'][catIndex].productList[goodsIndex].selectQuantity>1) {
                this.productData.data[proIndex]['childCategorys'][catIndex].productList[goodsIndex].selectQuantity--
            }
            this.calculateTotal(proIndex, catIndex)
        },
        // 商品 点击 添加数量
        add (event, proIndex, catIndex, goodsIndex) {
            event.stopPropagation()
            this.productData.data[proIndex]['childCategorys'][catIndex].productList[goodsIndex].selectQuantity++
            this.calculateTotal(proIndex, catIndex)
        },

        // 点击 商品 选中/取消选中 商品
        productClick (goodsIndex, proIndex, catIndex, cat2Index) {
            console.log(this.productData.tiresSpecs)

            // 如果是轮胎  在规格上添加  num记号
            if (proIndex === 0 && catIndex === 0) {
                this.productData.tiresSpecs.map((item, index) => {
                    if (item.value === this.currentTiresSpecs) {
                        if (!this.productData.data[proIndex]['childCategorys'][catIndex].productList[goodsIndex].active) {
                            this.productData.tiresSpecs[index].selectProductNum +=1
                        } else {
                            this.productData.tiresSpecs[index].selectProductNum -=1
                        }
                    }
                })
            }
            if (cat2Index !== undefined) {
                let active = this.productData.data[proIndex]['childCategorys'][catIndex]['childCategorys'][cat2Index].productList[goodsIndex].active
                this.productData.data[proIndex]['childCategorys'][catIndex]['childCategorys'][cat2Index].productList[goodsIndex].active = !active
                this.calculateTotal(proIndex, catIndex)
            } else {
                let active = this.productData.data[proIndex]['childCategorys'][catIndex].productList[goodsIndex].active
                this.productData.data[proIndex]['childCategorys'][catIndex].productList[goodsIndex].active = !active
                this.calculateTotal(proIndex, catIndex)
            }
        },

        // 他店求组
        help(event, goodsIndex, proIndex, catIndex) {
            event.stopPropagation()

            let productId = this.productData.data[proIndex]['childCategorys'][catIndex].productList[goodsIndex].productId
            this.$router.push({
                path: 'allocationSingle',
                query: {
                    productId: productId,
                    shopId: localStorage.getItem('shopId'),
                    ShowShopType: 1
                }
            })
        },

        // 点击 选择套餐
        policyClick (proIndex, catIndex, polIndex) {
            // 切换 状态
            this.productData.data[proIndex]['childCategorys'][catIndex].preferentialPolicys.map((item, index) => {
                this.productData.data[proIndex]['childCategorys'][catIndex].preferentialPolicys[index].active = false
            })
            this.productData.data[proIndex]['childCategorys'][catIndex].preferentialPolicys[polIndex].active = true
            // 获取 productIds
            let pids = this.productData.data[proIndex]['childCategorys'][catIndex].preferentialPolicys[polIndex].productIds.split(",")
            this.productData.data[proIndex]['childCategorys'][catIndex].serviceList.map((item, index) => {
                if (pids.includes(item.productId + '')) {
                    this.productData.data[proIndex]['childCategorys'][catIndex].serviceList[index].active = true
                } else {
                    this.productData.data[proIndex]['childCategorys'][catIndex].serviceList[index].active = false
                }
                
            })

            this.calculateTotal(proIndex, catIndex)

        },

        // 点击 添加 添加商品
        addProduct (event,proIndex, catIndex, cat2Index) {
            event.stopPropagation()
            this.changeOrAdd = 'add'
            if (this.productData.data[proIndex]['childCategorys'][catIndex].id === 1) {
                this.search.specs = this.currentTiresSpecs
            } else {
                this.search.specs = ''
            }
            if (cat2Index !== undefined) {
                this.productData.data[proIndex]['childCategorys'][catIndex]['childCategorys'][cat2Index].isHideProduct = true
            } else {
                this.productData.data[proIndex]['childCategorys'][catIndex].isHideProduct = true
            }
            
        },

        // 点击 更换 商品
        changeProduct (event, goodsIndex, proIndex, catIndex, cat2Index) {
            event.stopPropagation()
            this.changeOrAdd = 'change'
            this.changeIndex = goodsIndex
            if (this.productData.data[proIndex]['childCategorys'][catIndex].id === 1) {
                this.search.specs = this.currentTiresSpecs
            } else {
                this.search.specs = ''
            }
            if (cat2Index !== undefined) {
                this.productData.data[proIndex]['childCategorys'][catIndex]['childCategorys'][cat2Index].isHideProduct = true
            } else {
                this.productData.data[proIndex]['childCategorys'][catIndex].isHideProduct = true
            }
        },

        // 点击 搜索 商品
        getProduct (proIndex,catIndex,cat2Index) {
            var obj = {
                specs: $(".search-input").val(),
                brandId: $("#brandlist").val(),
                brand: $("#brandlist option:selected").text(),
                mcid: '',
                shopId: localStorage.getItem('shopId'),
                categoryId: '',
                page: 1
            }
            if (cat2Index !== undefined) {
                obj.mcid = this.productData.data[proIndex]['childCategorys'][catIndex].id
                obj.categoryId = this.productData.data[proIndex]['childCategorys'][catIndex]['childCategorys'][cat2Index].id
            } else {
                obj.mcid = this.productData.data[proIndex].id
                obj.categoryId = this.productData.data[proIndex]['childCategorys'][catIndex].id
            }
            api.getProduct(obj).then(res => {
                res.data.map((item, index) => {
                    res.data[index].active = false
                })
                if (cat2Index !== undefined) {
                    this.productData.data[proIndex]['childCategorys'][catIndex]['childCategorys'][cat2Index].hideProductList = res.data
                } else {
                    this.productData.data[proIndex]['childCategorys'][catIndex].hideProductList = res.data
                }
            })
            
        },

        // 点击 搜索出来的商品 添加到列表
        addHideProTo (hidePro,proIndex,catIndex,cat2Index) {
            // 待更换商品索引
            let i = this.changeIndex
            if (cat2Index!==undefined) {
                let isInArr = false
                
                this.productData.data[proIndex]['childCategorys'][catIndex]['childCategorys'][cat2Index].productList.map((item, index) =>{
                    if (item.id === hidePro.id) {
                        isInArr = true
                    }
                })
                if (this.changeOrAdd === 'add') {
                    if (!isInArr) {
                        hidePro.active = true   // 把新添加的商品设为选中状态
                        this.productData.data[proIndex]['childCategorys'][catIndex]['childCategorys'][cat2Index].productList.push(hidePro)
                    }
                } else if (this.changeOrAdd === 'change') {
                    this.productData.data[proIndex]['childCategorys'][catIndex]['childCategorys'][cat2Index].productList[i] = hidePro
                }
                
                this.productData.data[proIndex]['childCategorys'][catIndex]['childCategorys'][cat2Index].isHideProduct = false
            } else {
                let isInArr = false
                this.productData.data[proIndex]['childCategorys'][catIndex].productList.map((item, index) => {
                    if(item.id === hidePro.id) {
                        isInArr = true
                    }
                })
                if (this.changeOrAdd === 'add') {
                    if (!isInArr) {
                        hidePro.active = true   // 把新添加的商品设为选中状态
                        this.productData.data[proIndex]['childCategorys'][catIndex].productList.push(hidePro)
                    }
                } else if (this.changeOrAdd === 'change') {
                    this.productData.data[proIndex]['childCategorys'][catIndex].productList[i] = hidePro
                }
                
                this.productData.data[proIndex]['childCategorys'][catIndex].isHideProduct = false
            }

            this.calculateTotal(proIndex,catIndex)

        },

        // 点击 服务
        serviceClick(proIndex, catIndex, serIndex) {
            let preferentialPolicys = this.productData.data[proIndex]['childCategorys'][catIndex].preferentialPolicys
            let service = this.productData.data[proIndex]['childCategorys'][catIndex].serviceList[serIndex]
            preferentialPolicys.map((item, index) => {
                if (item.defaultChecked) {
                    this.defaultProductIds = item.productIds.split(',')
                    return
                }
            })
            
            if(service.active && !this.defaultProductIds.includes(service.productId + '')) {
                this.productData.data[proIndex]['childCategorys'][catIndex].serviceList[serIndex].active = false
            } else {
                this.productData.data[proIndex]['childCategorys'][catIndex].serviceList[serIndex].active = true
            }
           
            this.calculateTotal(proIndex, catIndex)
        },

        // 服务 减去数量
        minusSerNum (event, serIndex, proIndex, catIndex, cat2Index) {
            event.stopPropagation()
            if (cat2Index !== undefined) {
                if (this.productData.data[proIndex]['childCategorys'][catIndex]['childCategorys'][cat2Index].serviceList[serIndex].selectQuantity > 1) {
                    this.productData.data[proIndex]['childCategorys'][catIndex]['childCategorys'][cat2Index].serviceList[serIndex].selectQuantity--
                }
            } else {
                if (this.productData.data[proIndex]['childCategorys'][catIndex].serviceList[serIndex].selectQuantity > 1) {
                    this.productData.data[proIndex]['childCategorys'][catIndex].serviceList[serIndex].selectQuantity--
                }
            }
        },

        // 服务 添加数量
        addSerNum (event, serIndex, proIndex, catIndex, cat2Index) {
            event.stopPropagation()
            if (cat2Index !== undefined) {
                let service = this.productData.data[proIndex]['childCategorys'][catIndex]['childCategorys'][cat2Index].serviceList[serIndex]
                if (service.maxQuantity>0 && service.selectQuantity>=service.maxQuantity) {
                    this.$message(`此产品最大可选数量为${service.maxQuantity}`)
                } else {
                    this.productData.data[proIndex]['childCategorys'][catIndex]['childCategorys'][cat2Index].serviceList[serIndex].selectQuantity++
                }
            } else {
                let service = this.productData.data[proIndex]['childCategorys'][catIndex].serviceList[serIndex]
                if (service.maxQuantity>0 && service.selectQuantity>=service.maxQuantity) {
                    this.$message(`此产品最大可选数量为${service.maxQuantity}`)
                } else {
                    this.productData.data[proIndex]['childCategorys'][catIndex].serviceList[serIndex].selectQuantity++
                }
            }

            this.calculateTotal(proIndex, catIndex)
        },

        // 算账
        calculateTotal (proIndex, catIndex) {
            // 处理 轮胎 携带服务
            let preferentialPolicys = this.productData.data[proIndex]['childCategorys'][catIndex].preferentialPolicys
            preferentialPolicys.map((item ,index) => {
                var pids = item.productIds.split(',')
                var thisq = 0
                this.productData.data[proIndex]['childCategorys'][catIndex].productList.map((item, index) => {
                    if (item.active) {
                        thisq = thisq + item.selectQuantity
                    }
                })
                if (item.defaultChecked && thisq > 0) {
                    
                    // 判断 当前是否已经选中套餐
                    let isCurPolicy = false
                    this.productData.data[proIndex]['childCategorys'][catIndex].preferentialPolicys.map(item => {
                        if (item.active) {
                            isCurPolicy = true
                            return
                        }
                    })
                    if (!isCurPolicy) {
                        this.productData.data[proIndex]['childCategorys'][catIndex].preferentialPolicys[index].active = true
                    }
                    this.productData.data[proIndex]['childCategorys'][catIndex].serviceList.map((item, index) => {
                        if (pids.includes(item.productId + '')){
                            this.productData.data[proIndex]['childCategorys'][catIndex].serviceList[index].active = true
                            this.productData.data[proIndex]['childCategorys'][catIndex].serviceList[index].selectQuantity = thisq
                        }
                    })
                    
                }
            })

            // 发起 算账请求
            // let productBox = document.getElementsByClassName('product-box').getElementsByClassName('active')
            // console.log($('.product-box'))
            this.$nextTick(() => {
                // $('.product-box').map((index, item) => {
                //     let product = $(item).find('.item')
                //     if (product.hasClass('active')) {
                //         console.log(product)
                //     }
                // })
                let obj = {
                    UserCarBindId: this.$route.query.userCarBindId,
                    UserComments: '',
                    Source: 1
                }
                if (this.$route.query.OrderId) {
                    obj.OrderId = this.$route.query.OrderId
                }
                var check = $('.productList.active').find('.check')
                
                $.each(check, (index, item) => {
                    obj[`OrderProducts[${index}][key]`] = $(item)[0].dataset.id
                    obj[`OrderProducts[${index}][value]`] = $(item)[0].dataset.num
                })
                if (check.length > 0) {
                    api.GetProductsTotal(obj).then(res => {
                        this.total = res.data
                    })
                } else if (check.length === 0) {
                    for (let item in this.total) {
                        this.total[item] = 0
                    }
                }
                
            })
            
            
        },

        // 提交
        submit () {
            let obj = {
                UserCarBindId: this.$route.query.userCarBindId,
                UserComments: '',
                Source: 1
            }
            if (this.$route.query.OrderId) {
                obj.OrderId = this.$route.query.OrderId
            }
            var check = $('.check')
            $.each(check, (index, item) => {
                obj[`OrderProducts[${index}][key]`] = $(item)[0].dataset.id
                obj[`OrderProducts[${index}][value]`] = $(item)[0].dataset.num
            })
            api.CreateOrder(obj).then(res => {
                if (res.data.data) {
                    if (this.$route.OrderId) {
                        this.$router.push({
                            path: 'orderdetails',
                            query: {
                                opera: 'update',
                                OrderId: res.data.data
                            }
                        })
                    } else {
                        this.$router.push({
                            path: 'orderdetails',
                            query: {
                                OrderId: res.data.data
                            }
                        })
                    }
                    
                } else {
                    alert('请选择需要的商品或服务!')
                }
            })
        }
    },
    components: {
        myHeader: Header
    }
}
</script>

