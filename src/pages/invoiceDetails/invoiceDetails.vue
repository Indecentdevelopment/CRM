<template>
    <div class="invoiceDetails">
    	
    	<!-- 头部 顶部 -->
        <my-header></my-header>
        <div class="">
        	
        </div>
        
    </div>
</template>
<script>
	import Header from '@/components/header'
	import "./invoiceDetails.sass"
	import api from '@/vuex/api'
	export default {
	    data () {
	        return {
                isLoading: true,  		// loading
                id: '',			    	// 卡劵ID
                
	        }
	    },
	    created() {
	    	let route = this.$route
            this.id = route.query.id
            this.obtainInvoice()
	    },
	    methods: {
	    	obtainInvoice(){
	    		api.GetCouponsDetails
	    	}
	    },
	    components:{
	        myHeader: Header
	    }
	}
</script>

