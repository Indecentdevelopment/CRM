<template>
    <div class="confirm loading">
        <my-header></my-header>
        
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
                    <div class="item" v-for="categorys in product.childCategorys" :key="categorys.id">
                        <img class="iconfont" src="../../assets/images/confirm/confirm.gif">
                        <div class="info">
                            <div class="name">{{categorys.name}}</div>
                            <div class="promotion">{{categorys.promotionInfo}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- subBottom -->
        <div class="subBottom"></div>
    </div>
</template>

<script>
import Header from '@/components/header'
import api from '@/vuex/api'
import './confirm.sass'
export default {
    data () {
        return {
            query: {
                userCarBindId: ''
            },
            productData: {},         // 车辆信息  以及服务信息数据
            carInfo: {},             // 车辆信息
        }
    },
    created () {
        this.query.userCarBindId = this.$route.query.userCarBindId
        this.ProductPush()
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
                this.carInfo = res.data.userCarBind.carInfo
            })
        }
    },
    components: {
        myHeader: Header
    }
}
</script>

