<template>
	<div class="uservip">
		
	<!-- 头部 顶部 -->
		<my-header></my-header>
		
	<!--内容-->
		<div class="userName">
			<input type="text" v-model="userName" />
		</div>

		
	</div>
</template>

<script>
	import Header from '@/components/header'
	import "./uservip.sass"
	export default {
	    data () {
	        return {
	        	userName: '树莓派'
	        }
	    },
	    methods: {
			UserEdit(){
				
			}
	    },
	    components:{
	        myHeader: Header
	    }
	}
</script>

<style>
</style>