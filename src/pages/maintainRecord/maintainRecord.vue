<template>
	<div class="background">
		<div class="maintainRecord">
			
			<!-- 头部 顶部 -->
			<my-header></my-header>
				<img src="../../assets/images/maintainRecord/clock.png" class="mainImg"/>
				<div class="resumeData clearfix"  v-for="(item, index) in yearArr" :key="index">
					<h3 class="fl clearfix"  @click="timeAxis($event, index)">
						<span class="fl modelsa" >
	                        {{item.year}}
	                        <img src="../../assets/images/maintainRecord/triangle.png" class="triangle" :class="{close: !item.active}"/>
	                    </span>
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
	                            <p class="fr listStylec">
	                            	<router-link class="jump" :to="'/orderDetails/?OrderId='+items.orderId">详情</router-link>
	                            </p>
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
	        	isLoading: true,
                carId: '',
                yearArr: [], 
                models: '',
                dataList: [],
                activeGroup: true,
                orderId: ''
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
                    console.log(res.data.records[0].recordInfo[0].orderId)
                    this.$nextTick(() => {
                        let timeBox = document.getElementsByClassName('timeBox')
                        for (let i = 0, length = timeBox.length; i < length; i++) {
                            console.log(timeBox[i].offsetHeight)
                            timeBox[i].style.height = timeBox[i].offsetHeight + 'px'
                        }
                    })
            	})
            },
            timeAxis(event,index){
                console.log(0)
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