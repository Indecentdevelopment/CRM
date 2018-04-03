<template>
    <div class="keyboard-carNo">
        <div class="cancel-box">取消</div>
        <div class="main">
            <!-- 汉字 -->
            <div class="zh-word">
                <div class="item" v-for="(item, i) in zhWord" :key="i">
                    {{item}}
                </div>
            </div>
            <!-- 数字 -->
            <div class="num-word">
                <div class="item" v-for="(item, i) in numWord" :key="i">
                    {{item}}
                </div>
            </div>
            <!-- 英文 -->
            <div class="en-word">
                <div class="item" v-for="(item, i) in enWord" :key="i">
                    {{item}}
                </div>
            </div>
            <!-- 按钮 -->
            <div class="btn-box">
                <button class="sure">确定</button>
                <button class="cancel">取消</button>
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
        }
    },
    props: {
        open: {
            type: Boolean,
            default: false
        }
    },
    created () {},
    methods: {}
}
</script>

