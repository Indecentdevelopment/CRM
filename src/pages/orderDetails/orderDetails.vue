<template>
	<div class="orderDetails">
		
		<!-- 头部 顶部 -->
        <my-header></my-header>
        
        
        
	</div>
</template>

<script>
	import Header from '@/components/header'
	import "./orderDetails.sass"
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