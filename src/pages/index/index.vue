<template>
    <div class="index">

        <!-- 头部 顶部 -->
        <my-header></my-header>

        <!-- 切换城市 -->
        <div class="city clearfix">
        	<div class="city-btn fr">
				<span class="">
					当前城市：
				</span>
				<span class="currentCity">
					{{sgm}}
				</span>
				<span class="switch" @click="citySwitching">
					[切换]
				</span>
			</div>
        </div>

        <!-- 内容部分 -->
        <div class="content">
            <div v-for="(group, index) in shopNameList" :key="index" class="group">
            	<div v-for="item in group" :key="item.id" class="item" :class="{active: activeItem === item.id}" @click="showShopStaffInfos($event, index, item.id)">
                    <div class="box">
                        <div class="name">{{item.name}}</div>
                        
                    </div>
                    <i class="sign"></i>
                </div>
                <div v-if="activeGroup===index" class="shop-bg">
                    <div  v-for="(item, index) in ShopStaffInfos" :key="index" class="item">
                        <div class="user-name">{{item.firstName}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Header from '@/components/header'
import "./index.sass"
export default {
    data: function () {
        return {
            sgm: '青岛市',
            activeGroup: new Number(), // 当前活动的shopName组
            activeItem: new Number()   // 当前活动的元素
        }
    },
    computed: {
        ...mapGetters({
            shopNameList: 'shopNameList',
            ShopStaffInfos: 'ShopStaffInfos'
        })
    },
    created () {
        this.$store.dispatch('getShopName', '青岛市')
    },
    methods:{
        citySwitching () {
            console.log('a')
        },
        showShopStaffInfos (event, index, shopId) {
            this.activeItem = shopId
            this.activeGroup = index
            this.$store.dispatch('getShopStaffInfos', shopId)
        }
    },
    components:{
        myHeader: Header
    }
}
</script>
