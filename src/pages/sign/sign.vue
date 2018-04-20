<template>
    <div class="signature">
        <!-- 头部 顶部 -->
		<my-header></my-header>
        <div class="loading" v-loading="isLoading">
            <div class="title">选择技师</div>
            <div class="teach-box">
                <div class="item" :class="{active: choList.includes(item.name)}" v-for="(item, index) in techData.techs" :key="index" @click="choose(item.name)">
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
                    {{item}}
                </div>
            </div>
            <div class="btn-box">
                <button>开始服务</button>
                <button>取消订单</button>
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
                this.choList.push(res.data.techs[0].nowName)
                console.log(this.choList)
            })
        },
        // 点击技师 选择技师
        choose (name) {
            if (this.choList.length < 3) {
                if (!this.choList.includes(name)) {
                    this.choList.push(name)
                }
            }
        },
        // 点击选中技师  从选中列表删除
        cancelTech (name) {
            var index = this.choList.indexOf(name)
            this.choList.splice(index, 1)
        }
    },
    components: {
        myHeader: Header
    }
}
</script>

