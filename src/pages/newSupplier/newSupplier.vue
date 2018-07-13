<template>
	<div class="newSupplier">
		
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
    import Header from '@/components/header'
    import api from '@/vuex/api'
	import "./newSupplier.sass"
	export default {
		data() {
			return {
				pickerOptions1: {
					disabledDate(time) {
						return time.getTime < Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}

					}]
				},
				productId: '',
				quantity: '',
				dateTime: '',
            }
       },
        created () {
        	this.productId = this.$route.query.productId
        	this.quantity = this.$route.query.quantity
        	this.dateTime = this.$route.query.dateTime
        	
        	console.log(this.productId)
        	console.log(this.quantity)
        	console.log(this.dateTime)
        	
        	Promise.all([]).then(res => {
                setTimeout(() => {
                }, 500)
            })
        },
        mounted () {
        },
        methods: {
        	
        },
		components: {
            myHeader: Header
		}
	}
</script>