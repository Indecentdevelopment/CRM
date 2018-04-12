<template>
	<div class="cleaningCall">
		
		<!-- 头部 顶部 -->
        <my-header></my-header>
        
        <!--功能键-->
        <div class="functionBtn clearfix">
        	<div class="callSign fl">呼号</div>
        	<div class="details">详情</div>
        	<div class="Next fr">下一位</div>
        </div>
        
        <!--预约列表-->
        <div class="aboutList clearfix">
        	<div class="about clearfix fl">
        		<p class="fl">预约列表<span>（当前车牌）</span></p>
        		<span class="fr"><img src="../../assets/images/cleaningCall/zs.png"/></span>
        	</div>
        	
            <div class="aboutTimeList">
                <div class="item.isok">
                    <div class="preDate"></div>
                </div>
                <div v-for="(item, i) in timeList" :key="i" class="aboutTime">
                    <div class="preorder" v-if="!item.isok">
                        <div v-for="(clean, index) in item.cleansData" :key="index" class="preDate">{{clean.preDate}}</div>
                    </div>
                   
                    <div v-else class="nopreorder">
                        <div class="time">{{item.time}}</div>
                        <div class="info">{{item.appointInfo}}</div>
                        <div class="icon" >
                            <img v-show="item.isAppoint" src="../../assets/images/cleaningCall/addClean.gif">
                        </div>
                    </div>
                    
                </div>
            </div>

            
        </div>
	</div>
</template>

<script>
	import Header from '@/components/header'
	import "./cleaningCall.sass"
	import api from '@/vuex/api'
	export default {
	    data () {
	        return {
	        	CleanList: {},    // init 获取数据
                timeList: [],     // 预约时间列表
	        }
	    },
	    created() {
            this.toString()
	    	this.getCleanList()
	    },
	    methods: {

            CheckTime(time, pretimes, timeSpan) {
                var html = '';
                var longtime = new Date();
                var longpretime = new Date();
                let arr = []
                longtime.setHours(time.split(":")[0]);
                longtime.setMinutes(time.split(":")[1]);
                for (var i = 0; i < pretimes.length; i++) {
                    longpretime.setHours(pretimes[i].preDate.split(":")[0]);
                    longpretime.setMinutes(pretimes[i].preDate.split(":")[1]);
                    if (time == pretimes[i].preDate || (longtime < longpretime && longtime.setMinutes(longtime.getMinutes + timeSpan) > longpretime))
                    {    
                        let obj = {
                            preDate: pretimes[i].preDate,
                            carNumber: pretimes[i].carNumber,
                            name: pretimes[i].nam
                        }

                        arr.push(obj)
                        
                        html += '<div class="list sure ' + (loc.time == pretimes[i].preDate ? 'greyline' : '') +
                         '" items="cannot"><p class="time">' + pretimes[i].preDate + '</p><p class="num">' + pretimes[i].carNumber +
                          '</p><p class="can">' + pretimes[i].name + 
                          '</p><p class="voice" id="voice"><svg class="icon" aria-hidden="true"> <use xlink:href="#icon-zaixianduiyi-caidan-"></use></svg></p></div>';
                    }
                }

                return {
                    isok: html.indexOf(time) > -1,
                    cleansData: arr
                };
            },

            toString () {
                Date.prototype.toString = function (fmt) { //author: meizz 
                    var o = {
                        "M+": this.getMonth() + 1, //月份 
                        "d+": this.getDate(), //日 
                        "h+": this.getHours() > 12 ? this.getHours() - 12 : this.getHours(), //小时 
                        "H+": this.getHours(), //小时 
                        "m+": this.getMinutes(), //分 
                        "s+": this.getSeconds(), //秒 
                        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
                        "S": this.getMilliseconds() //毫秒 
                    };
                    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                    for (var k in o)
                        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    return fmt;
                }
            },
	    	
	    	getCleanList (){
	    		api.GetCleanList()
                .then( res => {
                    this.CleanList = res.data
                    let data = res.data
                    let SumMinutes = (data.endHour - data.starHour) * 60   // 总服务分钟数
                    for (var m = data.timeSpan; m <= SumMinutes - data.timeSpan; m += data.timeSpan) {
                        let dateNow = new Date()
                        dateNow.setHours(data.starHour)
                        dateNow.setMinutes(0)
                        dateNow.setMinutes(dateNow.getMinutes() + m)
                        // if (dateNow < new Date().setMinutes(new Date().getMinutes() - 60)) {
                        //     continue
                        //     // DateAdd('m', -60, new Date())
                        // }

                        let hhmm = dateNow.toString('HH:mm')
                        var preorder = this.CheckTime(hhmm, data.cleans, data.timeSpan)

                        let obj = {
                            time: hhmm,
                            appointInfo: (dateNow <= new Date()) ? '不可预约' : '可预约',
                            isAppoint: (dateNow <= new Date()) ? false : true,
                            isok: preorder.isok,
                            cleansData: preorder.cleansData
                        }
                        this.timeList.push(obj)
                    }
                    
                })
                .catch()
	    	}
	    },
	    components:{
	        myHeader: Header
	    }
	}
</script>
<style>
</style>