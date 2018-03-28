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
        <div class="bookList">
        	<p class="book"></p>
        	<ul>
        		<li></li>
        	</ul>
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
	    	
	    },
	    methods: {
	    	
	    },
	    components:{
	        myHeader: Header
	    }
	}
</script>
<style>
</style>