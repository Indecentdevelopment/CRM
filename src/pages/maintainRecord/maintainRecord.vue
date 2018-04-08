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
                <!-- <transition-group name="fade">
                    
                </transition-group> -->
                <div class="timeBox" :class="{close: !item.active}">
                    <div class="timeList fl clearfix" id="timeList" v-for="(items, i) in item.recordInfo" :key="i">
                        <p class="fl listStylea">
                            {{items.time}}
                            <img src="../../assets/images/maintainRecord/circle-h.png" />
                        </p>
                        <div class="lestRight fl">
                            <p class="fr listStyleb">{{items.mileage}}</p>
                            <p class="fr listStyleb">实付价格:{{items.totalPrice}}</p>
                            <p class="fr listStylec" v-for="(itemss, i) in items.product" :key="i">{{itemss.name}}</p>
                            <p class="fr listStylec"><button>详情</button></p>
                        </div>
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
                    res.data.records.map((item, index) => {
                        res.data.records[index].active = true
                    })
                    this.yearArr = res.data.records
            		this.models = res.data.carInfo
            		this.dataList = res.data.carInfo[0].recordInfo
            	})
            },
            timeAxis(event,index){
                this.yearArr[index].active = !this.yearArr[index].active
            }
	    },
	    components:{
	        myHeader: Header
	    }
	}
</script>

<style>
</style>