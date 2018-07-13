<template>
    <div class="signature">
        <!-- 头部 顶部 -->
		<my-header></my-header>
        <div class="signaStyle">
        	<div class="title">选择技师</div>
            <div class="teach-box">
                <div class="item" :class="{active: JSON.stringify(choList).includes(item.uid)}" v-for="(item, index) in techData.techs" 
                :key="index" @click="choose(item)">
                    {{item.name}}
                </div>
            </div>
            <div class="message">
                <div class="item">
                    一人比例： 100%；
                </div>
                <div class="item">
                    两人比例： 60% 和 40%
                </div>
                <div class="item">
                    三人比例： 40% 和 35% 和 25%
                </div>
            </div>
            <div class="select-teach">
                <div class="item" v-for="(item, i) in choList" :key="i" @click="cancelTech(item)">
                    {{item.name}}
                </div>
            </div>
            <div class="btn-box">
                <button @click="submit()">开始服务</button>
                <button @click="cancelOrder()">取消订单</button>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '@/components/header'
import './sign.sass'
import api from '@/vuex/api'
export default {
    data () {
        return {
            isLoading: false,
            query: {
                OrderId: this.$route.query.oid
            },
            techData: {},     // 初始数据
            choList: [],      // 选中技师

        }
    },
    created () {
        this.technician()
    },
    methods: {
        technician () {
            api.Technician({shopvalue: this.query.OrderId}).then(res => {
                if (res.data.trunto) {
                    this.$router.push({
                        path: 'orderdetails',
                        query: {
                            OrderId: this.query.OrderId
                        }
                    })
                    return
                }
                this.techData = res.data
                res.data.techs.map((item, index) => {
                    if (item.nowName === item.name) {
                        this.choList.push({
                            name: item.name,
                            uid: item.uid
                        })
                    }
                })
                // this.choList.push(res.data.techs[0].nowName)
                console.log(this.choList)
            })
        },
        // 点击技师 选择技师
        choose (tec) {
            let isInarr = false
            if (this.choList.length < 3) {
                this.choList.map((item, index) => {
                    if (item.name === tec.name) {
                        isInarr = true
                        return
                    }
                })
                if (!isInarr) {
                    this.choList.push({
                        name: tec.name,
                        uid: tec.uid
                    })
                }
                // if (!this.choList.includes(name)) {
                //     this.choList.push(name)
                // }
            }
        },
        // 点击选中技师  从选中列表删除
        cancelTech (tec) {
            let i = null
            this.choList.map((item, index) => {
                
                if (tec.uid === item.uid) {
                    i = index
                    console.log(i)
                    return
                }
            })
            if (i!==null) {
                this.choList.splice(i, 1)
                console.log(this.choList)
            }
            // this.choList.splice(index, 1)
        },
        
        // 点击 开始服务
        submit () {
            let ids = []
            this.choList.map((item, index) => {
                ids.push(item.uid)
            })
            api.UpdateTec({
                oid: this.query.OrderId,
                name: ids.join(','),
                no: ''
            }).then(res => {
                if (res.data.success) {
                    this.$router.push({
                        path: 'orderdetails',
                        query: {
                            OrderId: this.query.OrderId
                        }
                    })
                } else {
                    if (res.data.msg === '非待确认') {
                        this.$router.push({
                            path: 'orderdetails',
                            query: {
                                OrderId: this.query.OrderId
                            }
                        })
                    } else {
                        alert(res.data.msg)
                    }
                }
            })
        },

        // 取消订单
        cancelOrder () {
            if (confirm("确定取消此订单吗？")) {
                api.CancelOrder({
                    oid: this.query.OrderId
                }).then(res => {
                    if (res.data.success) {
                        this.$router.push('/home')
                    } else {
                        alert(res.data.msg)
                    }
                })
            }
        }
    },
    components: {
        myHeader: Header
    }
}
</script>

