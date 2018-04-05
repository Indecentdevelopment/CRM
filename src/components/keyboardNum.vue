<template>
    <div class="keyboard-num">
        <div class="cancel-box">
            <img src="../assets/images/keyboard/close_bg.png" alt="">
        </div>
        <div class="main">
            <!-- 1~9 数字 -->
            <div class="word">
                <div class="item" v-for="item in word" :key="item">
                    {{item}}
                </div>
            </div>

            <!-- 0 zero -->
            <div class="zero">
                <div class="item" v-for="item in zero" :key="item">
                    {{item}}
                </div>
            </div>
            <!-- 按钮 -->
            <div class="btn-box">
                <div class="backspace">删除</div>
                <div class="sure">确定</div>
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
            zero: ['0','00','000']
        }
    },
    created () {},
    methods: {}
}
</script>

