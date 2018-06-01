<template>
	<div class="cleaningCall">
		
		<!-- 头部 顶部 -->
        <my-header></my-header>
        <div class="loading" v-loading="isLoading">
	        <!--功能键-->
	        <div class="functionBtn clearfix">
	        	<div class="callSign fl" @click="GetCleanvoice">呼号</div>
	        	<div class="details" @click="GetCleandetail">详情</div>
	        	<div class="Next fr" @click="GetCleanNext">下一位</div>
	        </div>
	        
	        <!--预约列表-->
	        <div class="aboutList clearfix">
	        	<div class="about clearfix fl">
	        		<p class="fl">预约列表<span>（当前车牌）</span></p>
	        		<span @click="isCode = true" class="fr"><img src="../../assets/images/cleaningCall/zs.png"/></span>
	        	</div>
	        	
	            <div class="aboutTimeList">
	                
	                <div v-for="(item, i) in timeList" :key="i" class="aboutTime">
	                    <div class="preorder" v-if="item.isok">
	                        <div v-for="(clean, index) in item.cleansData" :key="index" class="item" :class="{greyline: loctime === clean.preDate}">
	                            <div class="preDate">{{clean.preDate}}</div>
	                            <div class="carNumber">{{clean.carNumber}}</div>
	                            <div class="name">{{clean.name}}</div>
	                            <div class="voice" @click="clickVoice(clean.preDate, clean.carNumber)"></div>
	                        </div>
	                    </div>
	                   
	                    <div v-else class="nopreorder">
	                        <div class="time">{{item.time}}</div>
	                        <div class="info">{{item.appointInfo}}</div>
	                        <div class="icon" >
	                            <img v-show="item.isAppoint" src="../../assets/images/cleaningCall/addClean.gif" @click="washorder(item.time)">
	                        </div>
	                    </div>
	                    
	                </div>
	            </div>
	        </div>
	
	        <!-- 二维码 大图 -->
	        <div class="code-box" v-show="isCode">
	            <div class="code">
	                <img id="code-img" src="" alt="">
	                <div class="info">
	                    请顾客扫描此二维码
	                    <br>
	                    预约洗车
	                </div>
	                <div class="btn" @click="isCode = false">关闭</div>
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
	        	isLoading: true,
	        	CleanList: {},    // init 获取数据
                timeList: [],     // 预约时间列表
                loctime: '0',
                isCode: false     // 是否显示二维码
	        }
	    },
	    created() {
	    	Promise.all([this.toString(),this.getCleanList()]).then(res => {
                setTimeout(() => {
                    this.isLoading = false
                }, 500)
            })
            
	    	
        },
        mounted () {
            let codeImg = document.getElementById('code-img')
            codeImg.setAttribute('src', `/api/car/GetPreQRCode?shopId=${localStorage.getItem('shopId')}`)
        },
	    methods: {

            CheckTime(time, pretimes, timeSpan) {
                var str = '';
                var longtime = new Date();
                var longpretime = new Date();
                let arr = []
                longtime.setHours(time.split(":")[0]);
                longtime.setMinutes(time.split(":")[1]);
                for (var i = 0; i < pretimes.length; i++) {
                    longpretime.setHours(pretimes[i].preDate.split(":")[0]);
                    longpretime.setMinutes(pretimes[i].preDate.split(":")[1]);

                    let bool = time == pretimes[i].preDate || (longtime < longpretime && longtime.setMinutes(longtime.getMinutes() + timeSpan) > longpretime)

                    if (bool) {
                        let obj = {
                            preDate: pretimes[i].preDate,
                            carNumber: pretimes[i].carNumber,
                            name: pretimes[i].name,
                            greyline: this.loctime === pretimes[i].preDate
                        }
                        arr.push(obj)

                        str = pretimes[i].preDate + pretimes[i].carNumber + pretimes[i].name

                        // html += '<div class="list sure ' + (loc.time == pretimes[i].preDate ? 'greyline' : '') +
                        //  '" items="cannot"><p class="time">' + pretimes[i].preDate + '</p><p class="num">' + pretimes[i].carNumber +
                        //   '</p><p class="can">' + pretimes[i].name + 
                        //   '</p><p class="voice" id="voice"><svg class="icon" aria-hidden="true"> <use xlink:href="#icon-zaixianduiyi-caidan-"></use></svg></p></div>';
                    }
                    
                }

                return {
                    isok: str.indexOf(time) > -1,
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
	    	// 获取init数据
	    	getCleanList (){
	    		api.GetCleanList()
                .then( res => {
                    this.CleanList = res.data
                    this.timeList = []
                    let data = res.data
                    let SumMinutes = (data.endHour - data.starHour) * 60   // 总服务分钟数
                    for (var m = data.timeSpan; m <= SumMinutes - data.timeSpan; m += data.timeSpan) {
                        let dateNow = new Date()
                        dateNow.setHours(data.starHour)
                        dateNow.setMinutes(0)
                        dateNow.setMinutes(dateNow.getMinutes() + m)
                        if (dateNow < new Date().setMinutes(new Date().getMinutes() - 60)) {
                            continue
                            // DateAdd('m', -60, new Date())
                        }

                        let hhmm = dateNow.toString('HH:mm')
                        let tem = [{
                            preDate: "10:35",
                            carNumber: '8888',
                            name: '服务中'
                        }]
                        var preorder = this.CheckTime(hhmm, data.cleans, data.timeSpan)
                        // var preorder = this.CheckTime('10:30', tem, data.timeSpan)

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
            },
            
            // 呼号
            GetCleanvoice () {
                api.GetCleanvoice().then(res => {
                    this.$message({
                        message: '呼号成功！',
                        type: 'success'
                    });
                    this.loctime = res.data.data.time
                    this.getCleanList()
                })
            },

            // 详情
            GetCleandetail () {
                api.GetCleandetail({loctime: this.loctime}).then(res => {
                    if (res.data.data === '0') {
                        this.$message('当前没有已预约的洗车订单!')
                        this.getCleanList()
                    } else {
                        this.$router.push({
                            path: 'orderDetails',
                            query: {
                                OrderId: res.data.data
                            }
                        })
                    }
                })
            },

            // 下一位
            GetCleanNext () {
//              api.GetCleanNext({loctime: this.loctime}).then(res => {
//                  if (res.data.data == "0") {
//                      this.$message('当前没有已预约的下一位洗车订单!')
//                  } else {
//                      this.$message({
//                          message: '呼号成功！',
//                          type: 'success'
//                      });
//                      this.loctime = res.data.data
//                      this.getCleanList()
//                  }
//              })
            },

            // 点击voice
            clickVoice (time, carNo) {
                this.loctime = time
                api.GetCleanvoicebycarNo({
                    CarNumber: carNo
                }).then(res => {
                    this.$message('呼号成功！')
                    this.getCleanList()
                })
                
            },

            // 点击加号
            washorder (time) {
                this.$router.push({
                    path: 'washorder',
                    query: {
                        time: time + ''
                    }
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