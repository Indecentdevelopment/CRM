<template>
    <div class="keyboard-carNo" v-show="isOpen">
        <div class="cancel-box" @click="hide">
            <img src="../assets/images/keyboard/close_bg.png" alt="">
        </div>
        <div class="main">
            <!-- 汉字 -->
            <div class="zh-word">
                <div class="item" v-for="(item, i) in zhWord" :key="i" @click="inputWord(item)">
                    {{item}}
                </div>
            </div>
            <!-- 数字 -->
            <div class="num-word">
                <div class="item" v-for="(item, i) in numWord" :key="i" @click="inputWord(item)">
                    {{item}}
                </div>
            </div>
            <!-- 英文 -->
            <div class="en-word">
                <div class="item" v-for="(item, i) in enWord" :key="i" @click="inputWord(item)">
                    {{item}}
                </div>
            </div>
            <!-- 按钮 -->
            <div class="btn-box">
                <button class="sure" @click="hide">确定</button>
                <button class="cancel" @click="backWord">
                    <img src="../assets/images/keyboard/del.png" alt="">
                </button>
            </div>
        </div>
        
        
    </div>
</template>
<script>
import "@/assets/components/keyboardCarNo.sass"
export default {
    data () {
        return {
            zhWord: ['港', '澳', '学', '警', '领'],
            numWord: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
            enWord: ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A',
                'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'],
            
            isOpen: this.open,    // 是否显示键盘
        }
    },
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    created () {
    },
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
        // 回撤 Backspace
        backWord () {
            this.$emit('backWord')
        }
    }
}
</script>

