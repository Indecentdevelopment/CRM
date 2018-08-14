<template>
    <div class="keyboard-num" v-show="isOpen">
        <div class="cancel-box">
            <img src="../assets/images/keyboard/close_bg.png" alt="" @click="hide();hideStyle()">
        </div>
        <div class="main">
            <!-- 1~9 数字 -->
            <div class="word">
                <div class="item" v-for="item in word" :key="item" @click="inputWord(item)">
                    {{item}}
                </div>
            </div>

            <!-- 0 zero -->
            <div class="zero">
                <div class="item" v-for="item in zero" :key="item" @click="inputWord(item)">
                    {{item}}
                </div>
            </div>
            <!-- 按钮 -->
            <div class="btn-box">
                <div class="backspace" @click="backWord">删除</div>
                <div class="sure" @click="hide">确定</div>
            </div>
        </div>
    </div>
</template>
<script>
import "@/assets/components/keyboardNum.sass"
export default {
    data () {
        return {
            word: ['1','2','3','4','5','6','7','8','9'],
            zero: ['0','00','000'],
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
            let persona = document.getElementById('persona')
            persona.style.top = "0rem"
        },
        // 改变所在页面的初始值
        hideStyle(){
            let persona = document.getElementById('persona')
            persona.style.top = "0rem"
        },
        // 点击键盘 输入
        inputWord (word) {
            this.$emit('inputWord', word + '')
        },
        // 回撤 Backspace
        backWord () {
            this.$emit('backWord')
        }
    }
}
</script>

