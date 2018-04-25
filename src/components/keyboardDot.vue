<template>
    <div class="keyboard-dot" v-show="isInputDot">
    	<div class="dotHide">
            <img src="../assets/images/keyboard/close_bg.png" alt="" @click="dotHide">
        </div>
    	<div class="dotMain">
    		<!-- 1~9 数字 -->
            <div class="dotWord clearfix">
                <div class="item" v-for="item in dotWord" :key="item" @click="dotWords(item)">
                    {{item}}
                </div>
            </div>
            <!-- Q~P 字母-->
            <div class="dotLetterOne clearfix">
            	<div class="item" v-for="item in dotLetterOne" :key="item"  @click="dotWords(item)">
                    {{item}}
                </div>
            </div>
            <!-- A~L 字母-->
            <div class="dotLetterTwo clearfix">
            	<div class="item" v-for="item in dotLetterTwo" :key="item" >
                    {{item}}
                </div>
            </div>
            <!-- Z~M 字母-->
            <div class="dotLetterThree clearfix">
            	<div class="item" v-for="item in dotLetterThree" :key="item">
                    {{item}}
                </div>
                <span @click="dotbackWord">删除</span>
            </div>
            <!--空格 确定-->
            <div class="dotEng clearfix">
	            <div class="space fl" @click="dotSpace">空格</div>
	            <div class="sure fl" @click="dotHide">确定</div>
	        </div>
    	</div>
    </div>
</template>
<script>
import "@/assets/components/keyboardDot.sass"
export default {
    data () {
        return {
            dotWord: ['1','2','3','4','5','6','7','8','9','0'],
            dotLetterOne: ['Q','W','E','R','T','Y','U','I','O','P'],
            dotLetterTwo: ['A','S','D','F','G','H','J','K','L'],
            dotLetterThree: ['Z','X','C','V','B','N','M'],
            isInputDot: this.dot,    // 是否显示键盘
        }
    },
    props: {
        dot: {
            type: Boolean,
            default: false
        }
    },
    created () {},
    watch: {
        dot (newVal, oldVal) {
            this.isInputDot = newVal
        }
    },
    methods: {
        // 隐藏键盘
        dotHide () {
            this.isInputDot = false
            this.$emit('dotHides')
        },
        // 点击键盘 输入
        dotWords (words) {
            this.$emit('dotWords', words + '')
        },
        // 回撤 Backspace
        dotbackWord () {
            this.$emit('dotbackWords')
        },
        // 空格
        dotSpace () {
            this.$emit('dotSpaces')
        }
    }
}
</script>

