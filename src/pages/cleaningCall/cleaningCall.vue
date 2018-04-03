<template>
	<div class="cleaningCall">
		
		<!-- 头部 顶部 -->
        <my-header></my-header>
        
        <!--功能键-->
        <div class="functionBtn clearfix">
        	<div class="callSign fl">呼号</div>
        	<div class="details">详情</div>
        	<div class="Next fr">下一位</div>
        </div>
        
        <!--预约列表-->
        <div class="aboutList clearfix">
        	<div class="about clearfix fl">
        		<p class="fl">预约列表<span>（当前车牌）</span></p>
        		<span class="fr"><img src="../../assets/images/cleaningCall/zs.png"/></span>
        	</div>
        	
        	<div class="aboutTimeList fl clearfix">
        		<div class="aboutTime fl clearfix">
        			<div class="aboutOption fl">15:15</div>
        			<div class="fl">不可预约</div>
        			<div class="fl"></div>
        		</div>
        	</div>
        	<div class="aboutTimeList fl clearfix">
        		<div class="aboutTime fl clearfix">
        			<div class="aboutOption fl">15:15</div>
        			<div class="fl">不可预约</div>
        			<div class="fl"></div>
        		</div>
        	</div>
        </div>
	</div>
</template>

<script>
	import Header from '@/components/header'
	import "./cleaningCall.sass"
	import api from '@/vuex/api'
	export default {
	    data () {
	        return {
	        	
	        }
	    },
	    created() {
	    	this.getCleanList()
	    },
	    methods: {
	    	
	    	getCleanList (){
	    		api.GetCleanList()
                .then( res => {
                    console.log(res.data.cleans)
                    console.log(res)
                    
                })
                .catch()
	    	}
	    },
	    components:{
	        myHeader: Header
	    }
	}
</script>
<style>
</style>