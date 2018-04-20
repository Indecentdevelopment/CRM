<template>
    <div class="confirm">
        <my-header></my-header>
        
        <div class="loading" v-loading="isLoading">
            <!-- 车辆信息 -->
            <div class="car-info" v-if="carInfo.carType">
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
                        <div class="item" v-for="categorys in product.childCategorys" :key="categorys.id">
                            <div class="oparation" @click="showProductList(categorys)">
                                <img class="iconfont" src="../../assets/images/confirm/confirm.gif">
                                <div class="info">
                                    <div class="name">{{categorys.name}}</div>
                                    <div class="promotion">{{categorys.promotionInfo}}</div>
                                </div>
                            </div>
                            <div class="productList" v-show="categorys.name + categorys.id===currentCategorys">
                                {{categorys.active}}
                                <div class="tiresSpecs" v-if="categorys.name === '轮胎'">
                                    <i class="item" v-for="tires in productData.tiresSpecs" :key="tires" :class="{active: tires === currentTiresSpecs}">
                                        {{tires}}
                                    </i>
                                    <i class="otherTries">
                                        其他规格
                                    </i>
                                </div>

                                <div class="product-box">
                                    <div class="item">
                                        <!-- 商品信息 -->
                                        <div class="goods">
                                            <img class="head" src="/Content/img/images/1_c.jpg">
                                            <div class="info">
                                                <div class="name">name</div>
                                                <div class="btn-box">
                                                    <button>优点</button>
                                                    <button>存：7</button>
                                                    <button>他店求助</button>
                                                </div>
                                            </div>
                                            <!-- 价格 -->
                                            <div class="price">
                                                <div class="old-price">
                                                    原价： ￥1000
                                                </div>
                                                <div class="new-price">
                                                    ￥1000
                                                </div>
                                                <div class="quantity">x1</div>
                                            </div>
                                        </div>
                                        <!-- 操作 -->
                                        <div class="operation">
                                            <div class="num">
                                                <div class="add">+</div>
                                                <div class="info">1</div>
                                                <div class="minus">-</div>
                                            </div>
                                            <!-- 更换 -->
                                            <div class="exchange">
                                                <img src="/Content/img/selectproduct/v1exchange.png" alt="">
                                                <div class="info">更换</div>
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
            <div class="subBottom"></div>
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
            isLoading: false,
            query: {
                userCarBindId: ''
            },
            productData: {},         // 初始数据  以及服务信息数据
            carInfo: {},             // 车辆信息
            currentCategorys: '',    // 当前 打开的服务列表
            currentTiresSpecs: '',   // 当前 规格
        }
    },
    created () {
        this.query.userCarBindId = this.$route.query.userCarBindId
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
                this.productData = res.data                      // 初始 数据
                this.carInfo = res.data.userCarBind.carInfo      // 设置 车辆信息
                this.currentTiresSpecs = res.data.tiresSpecs[0]  // 设置 当前 轮胎规格
            })
        },
        GetCarProduct (categoryId, carTypeId) {
            api.GetCarProduct({
                categoryId: categoryId,
                carTypeId: carTypeId
            })
        },
        // 点击某一条服务  显示服务列表
        showProductList (categorys) { 
            // let item = event.currentTarget.parentNode
            // console.log(item.children)
            // for (var i = 0; i < item.children.length; i++) {
            //     // console.log(item.children[i].className.indexOf('productList'))
            //     if (item.children[i].className.indexOf('productList') > -1) {
            //         item.children[i].setAttribute('class', 'aaaa')
            //     }
            // }
            if (this.currentCategorys === categorys.name + categorys.id) {
                this.currentCategorys = ''
            } else {
                this.currentCategorys = categorys.name + categorys.id
            }

            this.GetCarProduct(categorys.id, this.productData.userCarBind.carInfo.carTypeId)
        }
    },
    components: {
        myHeader: Header
    }
}
</script>

