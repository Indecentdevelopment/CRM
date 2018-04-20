<template>
    <div class="keyboard-model" v-show="isOpen">
    	
    	<!-- 控制按钮 -->
        <div class="btn-box clearfix">
        	<div class="cancel fl" @click="empty">清空</div>
        	<div class="backspace fl" @click="backWord">删除</div>
        	<div class="sure fl" @click="hide">确定</div>
        </div>
        
        <!-- 1~9 数字 -->
        <div class="word clearfix">
            <div class="item fl" v-for="item in word" :key="item" @click="inputWord(item)">
                {{item}}
            </div>
        </div>
        
        <!-- 控制按钮 -->
        <div class="model clearfix">
            <div class="item fl" v-for="item in model" :key="item" @click="inputWord(item)">
                {{item}}
            </div>
        </div>
    </div>
</template>
<script>
import "@/assets/components/keyboardModel.sass"
export default {
    data () {
        return {
            word: ['1','2','3','/','4','5','6','R','7','8','9','0'],
            model: ['C','Z'],
            isOpen: this.open,    // 是否显示键盘
        }
    },
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    created () {},
    watch: {
        open (newVal, oldVal) {
            this.isOpen = newVal
        }
    },
    methods: {
        // 隐藏键盘
        hide () {
            this.isOpen = false
            this.$emit('close')
        },
        // 点击键盘 输入
        inputWord (word) {
            this.$emit('inputWord', word + '')
        },
        // 清空 Backspace
        empty () {
            this.$emit('empty', '')
        },
        // 回撤 Backspace
        backWord () {
            this.$emit('backWord')
        }
    }
}
</script>

