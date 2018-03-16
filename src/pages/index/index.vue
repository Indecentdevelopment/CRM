<template>
    <div class="index">

        <!-- 头部 顶部 -->
        <my-header></my-header>

        <!-- 切换城市 -->
        <div class="city clearfix">
        	<div class="city-btn fr">
				<span class="">
					当前城市：
				</span>
				<span class="currentCity">
					{{sgm}}
				</span>
				<span class="switch" @click="citySwitching">
					[切换]
				</span>
			</div>
        </div>

        <!-- 内容部分 -->
        <div class="content">
            <div class="">
            	
            </div>
        </div>
    </div>
</template>
<script>
import Header from '@/components/header'
import "./index.sass"
export default {
    data: function () {
        return {
          sgm: '青岛市'
        }
    },
    methodes:{

    },
    components:{
        myHeader: Header
    }
}
</script>
