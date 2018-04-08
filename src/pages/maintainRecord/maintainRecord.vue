<template>
	<div class="background">
		<div class="maintainRecord">
			
			<!-- 头部 顶部 -->
			<my-header></my-header>
			<img src="../../assets/images/maintainRecord/clock.png" class="mainImg"/>
			<div class="resumeData clearfix"  v-for="(item, index) in yearArr" :key="index">
				<h3 class="fl clearfix">
					<span class="fl modelsa" @click="timeAxis($event, index)">{{item.year}}<img src="../../assets/images/maintainRecord/triangle.png" class="triangle"/></span>
					<span class="fl models">{{models}}</span>
				</h3>
				<div class="timeList fl clearfix" v-for="items in item.recordInfo" v-show="activeGroup">
					<p class="fl listStylea">
						{{items.time}}
						<img src="../../assets/images/maintainRecord/circle-h.png" />
					</p>
					<div class="lestRight fl">
						<p class="fr listStyleb">{{items.mileage}}</p>
						<p class="fr listStyleb">实付价格:{{items.totalPrice}}</p>
						<p class="fr listStylec" v-for="itemss in items.product">{{itemss.name}}</p>
						<p class="fr listStylec"><button>详情</button></p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Header from '@/components/header'
    import api from '@/vuex/api'
	import "./maintainRecord.sass"
	export default {
	    data () {
	        return {
                carId: '',
                yearArr: [], 
                models: '',
                dataList: [],
                activeGroup: true
	        }
        },
        created () {
            this.carId = this.$route.query.id
            this.GetSeeMaintain()
        },
	    methods: {
            GetSeeMaintain(){
            	api.SeeMaintain( {carTypeId : this.carId} ).then(res => {
            		this.yearArr = res.data.records
            		this.models = res.data.carInfo
            		this.dataList = res.data.carInfo[0].recordInfo
            	})
            },
            timeAxis(event,index){
            	if(this.activeGroup == true){
            		this.activeGroup = false
            	}else{
            		this.activeGroup = true
            	}
            }
	    },
	    components:{
	        myHeader: Header
	    }
	}
</script>

<style>
</style>