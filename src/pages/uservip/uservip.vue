<template>
	<div class="uservip">
		
	<!-- 头部 顶部 -->
		<my-header></my-header>
		
	<!--内容-->
        <div class="content">

            <div class="userName">
                <input type="text"  />
            </div>

            <!-- 性别 -->
            <div class="sex">
                <input type="radio" value="男" name="sex">
                <label for="">男</label>
                <input type="radio" value="女" name="sex">
                <label for="">女</label>
            </div>

            <!-- 会员等级 -->
            <div class="level">
                <div>当前会员级别：</div>
                <div class="level-info">
                    金卡
                </div>
            </div>

            <!-- 升级 -->
            <div class="upgrade">
                <input type="button" value="升为金卡">
                <input type="button" value="升为砖卡">
                <input type="button" value="升为白金卡">
            </div>

            <!-- 电话 -->
            <div class="mobile">
                <input placeholder="手机号">
            </div>

            <!-- 地址 -->
            <div class="address">
                <input placeholder="地址">
            </div>

            <!-- 标签 -->
            <div class="sign">
                <div class="item">文艺青年</div>
                <div class="item">文艺青年</div>
                <div class="add-sign item">标签<span>+</span></div>
            </div>

            <!-- 确认按钮 -->
            <button class="submit">确定</button>

            <!-- 二维码 -->
            <div class="qecode">
                <img src="" alt="">
                <div class="info">
                    用户扫描此二维码即可绑定微信
                </div>
            </div>
        </div>
		

		
	</div>
</template>

<script>
    import Header from '@/components/header'
    import api from '@/vuex/api'
	import "./uservip.sass"
	export default {
	    data () {
	        return {
	        	query: {                // 路由参数
                    userId: '',
                    cid: ''
                },
                userExtendInfo: {},     // 用户初始数据
	        }
        },
        created () {
            this.query.userId = this.$route.query.uid
            this.query.cid = this.$route.query.cid
            this.GetUserExtendInfo()
        },
	    methods: {
			GetUserExtendInfo () {
                api.GetUserExtendInfo({
                    userId: this.query.userId,
                    cid: this.query.cid
                })
            }
	    },
	    components:{
	        myHeader: Header
	    }
	}
</script>

<style>
</style>