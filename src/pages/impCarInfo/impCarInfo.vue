<template>
    <div class="impcarinfo">
        <!-- 头部 顶部 -->
		<my-header></my-header>

        <!-- 修改车型、快捷查询 -->
        <div class="type">
            <div class="edit active" data-value="edit">修改车型</div>
            <div class="search" data-value="search">修改车型</div>
        </div>
        <div class="content">
            <div class="message">
                 ERP车型参考:品牌:马自达|车系:3
            </div>
            <!-- 车辆信息选择 -->
            <div class="car-info">
                <select class="brand">
                    <option value="brand">品牌</option>
                </select>
                <select class="series">
                    <option value="series">车系</option>
                </select>
                <select class="displacement">
                    <option value="displacement">排量</option>
                </select>
                <select class="year">
                    <option value="year">年款</option>
                </select>
            </div>

            <!-- 车牌号 -->
            <div class="carNum">
                <select class="prov">
                    <option value="京">京</option>
                    <option value="津">津</option>
                    <option value="沪">沪</option>
                    <option value="渝">渝</option>
                    <option value="川">川</option>
                    <option value="粤">粤</option>
                    <option value="鄂">鄂</option>
                    <option value="云">云</option>
                    <option value="鲁">鲁</option>
                    <option value="晋">晋</option>
                    <option value="闽">闽</option>
                    <option value="浙">浙</option>
                    <option value="皖">皖</option>
                    <option value="辽">辽</option>
                    <option value="豫">豫</option>
                    <option value="湘">湘</option>
                    <option value="赣">赣</option>
                    <option value="甘">甘</option>
                    <option value="冀">冀</option>
                    <option value="陕">陕</option>
                    <option value="苏">苏</option>
                    <option value="吉">吉</option>
                    <option value="青">青</option>
                    <option value="贵">贵</option>
                    <option value="黑">黑</option>
                    <option value="桂">桂</option>
                    <option value="新">新</option>
                    <option value="蒙">蒙</option>
                    <option value="藏">藏</option>
                    <option value="宁">宁</option>
                    <option value="琼">琼</option>
                    <option value="其他">其他</option>
                </select>
                <input class="carNo">
                <i class="fa fa-camera-retro fa-3x"></i>
            </div>
            <!-- 补充车型 -->
            <div class="add-series">
                <div class="checkbox">
                    <input type="checkbox">
                    <div>补充车型</div>
                </div>
                <input class="info" type="text">
            </div>
            <div class="vinNo">
                <input type="text">
            </div>
            <div class="btn">
                <button>确定</button>
            </div>

            
        </div>

        <!-- user info -->
        <div class="user-info">
            <div>
                <span class="name">赵先生</span>
                <span class="mobile">1234567890</span>
            </div>
            
            <div class="user">
                <div class="head-img"></div>
                <div>车主</div>
            </div>
        </div>

    </div>
</template>
<script>
import Header from '@/components/header'
import './impCarInfo.sass'
export default {
    data () {
        return {}
    },
    components: {
        myHeader: Header
    }
}
</script>

