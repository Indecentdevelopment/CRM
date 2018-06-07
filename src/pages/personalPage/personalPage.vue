<template>
	<div class="persona">
		
		<!-- 头部 顶部 -->
		<my-header></my-header>
			<!--个人信息-->
			<div class="personalData">
				<div class="personal-information">
					<div class="personal-user">
						<div class="personal-userImg">
							<img src="../../assets/images/index/user-img.png"/>
						</div>
						<div class="personal-userName">
							<p>{{userInfo.name}}<br />{{userInfo.mobile}}</p>
							<router-link :to="{path: 'uservip', query: {uid: userInfo.id,cid: userCarBindId}}">
								<img src="../../assets/images/personalPage/edit.png" class="personal-userEdit" />
							</router-link>
						</div>
					</div>
					<p v-if="userInfo.memberCard" class="personal-userInfo">会员卡：{{userInfo.memberCard.cardType.typeName}}({{userInfo.memberCard.cardType.discount}})折</p>
					<p class="personal-userInfo">卡券：<span @click="checkVoucher">共{{userInfo.cardCoupons.length}}张 【查看】</span></p>
					<p class="personal-userInfo">积分：<span @click="checkIntegral">剩余{{userInfo.integralCount}} 【查看】</span></p>
					<p class="personal-userInfo">可开发票订单：
						<router-link :to="{path: 'invoice', query:{uid:uid}}">
							<span @click="checkInvoice">【开票】</span>
						</router-link>
					</p>
				</div>
			</div>
			
			<!--车辆信息-->
			<div class="personalModels">
				<div v-for="item in userInfo.cars" :class="{active: item.carId === carInfo.carId}" class="personal-allCar personal-choose" :key="item.carId" @click="changeCar(item)">
					<div class="personal-car">
						<img :src="item.carImg"/>
					</div>
					<p>{{item.brand}}<br />{{item.carNo}}</p>
				</div>
				<div class="personal-plusModels" @click="addNewCar()">
					<span>＋</span>添加车型
				</div>
				<div class="personal-modifyInfo">
					<p>车型信息：{{carInfo.carInfo}}</p>
					<p>车牌号：{{carInfo.carNo}}</p>
					<p>车架号：{{carInfo.vin}}</p>
					<p>技师备注：<input type="text" class="" /></p>
	                <p>上次行驶里程：{{carInfo.mileage}}</p>
	                <p>平均月行驶里程：{{carInfo.mileageMonth}}</p>
					<p>
	                    <button @click="SeeMaintain">查看保养履历</button>
	                    <button @click="CheckUserInfo">修改车辆信息</button>
	                    <button @click="isDelCar = true">删除车辆信息</button>
	                </p>
					<div class="personal-mArrow"></div>
				</div>
			</div>
			
			<!--选填信息-->
			<div class="personalOptional clearfix">
				<!--新版-->
				
				<h3 class="fl">当前车辆信息</h3>
				<div class="personalInput fl">
					<span>上次保养：</span><div class="block">
						<el-date-picker v-model="updateInfo.lastTime" type="date" placeholder="上次保养日期" :picker-options="pickerOptions1" >
						</el-date-picker>
					</div>
				</div>
				<div class="personalInput fl">
					<span>上次换胎：</span><div class="block">
						<el-date-picker v-model="updateInfo.lastChangeTire" type="date" placeholder="上次换胎日期" :picker-options="pickerOptions1" >
						</el-date-picker>
					</div>
				</div>
				<div class="personalInput fl">
					<span>当前里程：</span><input class="pereinp" type="text" placeholder="请输入..." v-model="updateInfo.mileage" @click="showKeyboard($event, 'mileage')"><b>*</b>
				</div>
				<div class="personalInput fl">
					<span>月均里程：</span><input class="pereinp" type="text" placeholder="请输入..." v-model="updateInfo.mileageMonth"  @click="showKeyboard($event, 'mileageMonth')"><b>*</b>
				</div>
				<h3 class="fl">下次保养 / 换胎信息</h3>
				<div class="personalInput fl">
					<span>保养日期：</span><div class="block">
						<el-date-picker v-model="updateInfo.nextTime" type="date" placeholder="下次保养日期" :picker-options="pickerOptions1" >
						</el-date-picker>
					</div>
				</div>
				<div class="personalInput fl">
					<span>保养里程：</span><input class="pereinp" type="text" placeholder="下次保养里程" v-model="updateInfo.nextMileage" @click="showKeyboard($event, 'nextMileage')">
				</div>
				<div class="personalInput fl">
					<span>换胎日期：</span><div class="block">
						<el-date-picker v-model="updateInfo.nextChangeTire" type="date" placeholder="下次换胎日期" :picker-options="pickerOptions1" >
						</el-date-picker>
					</div>
				</div>
				<div class="personalInput fl">
					<span>换胎里程：</span><input class="pereinp" type="text" placeholder="下次换胎里程" v-model="updateInfo.nextTireMileage" @click="showKeyboard($event, 'nextTireMileage')">
				</div>
				<!--旧版  留着备用-->
				<!--<div class="optional-input">
					<span>&nbsp;&nbsp;&nbsp;DOT号：</span><input type="text" placeholder="DOT号" v-model="updateInfo.dotNo" @click="showDot($event)">
				</div>
				<div class="optional-input">
					<span>上次保养：</span><input type="text" placeholder="上次保养时间" v-model="updateInfo.lastTime">
				</div>
				<div class="optional-input">
					<span>当前里程：</span><input type="text" placeholder="请输入..." v-model="updateInfo.mileage" @click="showKeyboard($event, 'mileage')">
				</div>
				<div class="optional-input">
					<span>月均里程：</span><input type="text" placeholder="请输入..." v-model="updateInfo.mileageMonth" @click="showKeyboard($event, 'mileageMonth')">
				</div>-->
				<!--<div class="optional-inpRadio">
					<span class="inpRadio-style">过度磨损：</span>
					<div class="radioBtn">
				        <span>否</span>
				        <input id="item1" type="radio" name="item" value="1" v-model="updateInfo.WearAndTear">
				        <label for="item1"></label>
				    </div>
				    <div class="radioBtn">
				        <span>是</span>
				        <input id="item2" type="radio" name="item" value="2" v-model="updateInfo.WearAndTear">
				        <label for="item2"></label>
				    </div>
				</div>
				<div class="optional-inpRadio inpRadio-border">
					<span class="inpRadio-style">老化开裂：</span>
					<div class="radioBtn">
				        <span>否</span>
				        <input id="item3" type="radio" name="items" value="3"  v-model="updateInfo.Aging">
				        <label for="item3"></label>
				    </div>
				    <div class="radioBtn">
				        <span>是</span>
				        <input id="item4" type="radio" name="items" value="4"  v-model="updateInfo.Aging">
				        <label for="item4"></label>
				    </div>
				</div>
				<div class="optional-inpRadio">
					<span class="inpRadio-style">胎侧损伤：</span>
					<div class="radioBtn">
				        <span>否</span>
				        <input id="item5" type="radio" name="itemss" value="5" v-model="updateInfo.cracks">
				        <label for="item5"></label>
				    </div>
				    <div class="radioBtn">
				        <span>是</span>
				        <input id="item6" type="radio" name="itemss" value="6" v-model="updateInfo.cracks">
				        <label for="item6"></label>
				    </div>
				</div>-->
				<div class="optional-button">
					<button @click="UpadateUserInfo">继续</button>
				</div>
			</div>
	
	        <div class="surebox" v-show="isDelCar">
	            <div class="surefa">
	                <div class="info">您确定要删除该车辆吗？</div>
	                <div class="btn-group">
	                    <button class="cancel" @click="cancelDeleteCarInfo">取消</button>
	                    <button class="sure" @click="DeleteCarInfo">确定</button>
	                </div>
	            </div>
	        </div>
	
	        
	       	<!--遮罩层-->
	        <div class="mask" v-show="mask">
	        	<!--卡劵-->
	        	<div class="checkVoucher" v-show="cardControl">
	        		<div class="closeCurrent" @click="checkClose">×</div>
	        		<div class="headerList clearfix">
	        			<span class="fl">序号</span>
	        			<span class="fl">卡名</span>
	        			<span class="fl">卡号</span>
	        			<span class="fl">金额</span>
	        			<span class="fl">卡类型</span>
	        			<span class="fl">详情</span>
	        		</div>
	        		<div class="headerList" v-for="(item,index) in cardList" :key="index">
	        			<span class="fl">{{index}}</span>
	        			<span class="fl">{{item.name}}</span>
	        			<span class="fl">{{item.code}}</span>
	        			<span class="fl">{{item.amount}}</span>
	        			<span class="fl">{{item.cardType.typeName}}</span>
	        			<router-link :to="{path: 'invoiceDetails', query:{id:item.id}}">
	        				<span class="fl">查看</span>
						</router-link>
	        		</div>
	        	</div>	
	        	<!--积分-->
	        	<div class="checkVoucher" v-show="integraControl">
	        		<div class="closeCurrent" @click="checkClose">×</div>
	        		<div class="headerList clearfix">
	        			<span class="fl">序号</span>
	        			<span class="fl">日期</span>
	        			<span class="fl">门店</span>
	        			<span class="fl">数量</span>
	        			<span class="fl">说明</span>
	        			<span class="fl">订单</span>
	        		</div>
	        		<div class="headerList" v-for="(item,index) in integralList" :key="index">
	        			<span class="fl">{{index}}</span>
	        			<span class="fl">{{item.createDate}}</span>
	        			<span class="fl">{{item.shop.name}}</span>
	        			<span class="fl">{{item.amount}}</span>
	        			<span class="fl">{{item.explain}}</span>
	        			<router-link :to="{path: 'orderDetails', query:{OrderId:item.orderId}}">
	        				<span class="fl">查看</span>
	        			</router-link>
	        		</div>
	        	</div>
	        </div>
	        <!-- 数字键盘 -->
	        <keyboardNum :open="isShowKeyboard" @inputWord="inputWord" @close="isShowKeyboard=false" @backWord="backWord"></keyboardNum>
	        <!--DOT键盘-->
			<keyboardDot :dot="isInputDot" @dotWords="dotWords" @dotSpaces="dotSpaces"  @dotbackWord="dotbackWord"></keyboardDot>
	</div>
</template>

<script>
    import Header from '@/components/header'
    import keyboardNum from '@/components/keyboardNum'
    import keyboardDot from '@/components/keyboardDot'
    import api from '@/vuex/api'
	import "./personalPage.sass"
	export default {
	    data () {
	        return {
	        	isLoading: true,
	        	pickerOptions1: {
					disabledDate(time) {
						return time.getTime < Date.now();
					},
					shortcuts: [{
						text: '今天',
						onClick(picker) {
							picker.$emit('pick', new Date());
						}
					}, {
						text: '昨天',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24);
							picker.$emit('pick', date);
						}

					}]
				},
                userCarBindId: '', 		// 获取userInfo时  传参
                uid: '',           		// 获取userInfo时  传参
                userInfo: {        		// 获取的userInfo数据
                    cardCoupons: []
                },       
                carInfo: {},        	// 车辆数据信息
                updateInfo: {},       	// 点击继续 需要提交的数据
                isDelCar: false,      	// 是否显示弹窗删除车辆
                carId: '',
                isShowKeyboard: false,  // 是否显示键盘
                isInputDot: false,   	// 是否显示DOT键盘
                dotNo: '',   			// 当前选中DOT输入框
                focusInp: '',           // 当前选中的输入框 （当前里程、月里程）
                mask: false,			// 遮罩层
                cardList: '',			// 卡劵列表
                integralList: '',		// 积分列表
                cardControl: false,		// 卡劵控制                
                integraControl: false,	// 积分控制
            	lastTime: '',			// 上次保养时间
				lastChangeTire: '',		// 上次换胎时间
				mileage: '',			// 当前里程
				mileageMonth: '',		// 月均里程
				nextTime: '',			// 下次保养日期
				nextMileage: '',		// 下次保养里程
				nextChangeTire: '',		// 下次换胎日期
				nextTireMileage: '',	// 下次换胎里程
				
	        }
        },
        created () {
            let route = this.$route
            this.userCarBindId = route.query.userCarBindId
            this.uid = route.query.uid
            
            Promise.all([this.getUserInfo()]).then(res => {
            setTimeout(() => {
                this.isLoading = false
            }, 500)
        })
        },
	    methods: {
            getUserInfo () {
                api.getUserInfo({
                    userCarBindId: this.userCarBindId,
                    uid: this.uid
                }).then(res => {
                    res.data.cars.map((item, index) => {
                        if (!item.dotNo) {
                            res.data.cars[index].dotNo = ''
                        }
                    })
                    this.userInfo = res.data
                    this.carInfo = res.data.cars[0]
                    var str = JSON.stringify(res.data.cars[0])
                    this.updateInfo = JSON.parse(str)
                    this.carId = res.data.cars[0].carId
                    //console.log(this.carId)
                    this.cardList = res.data.cardCoupons
                    this.integralList = res.data.integrals
                    
                	
                    if(this.updateInfo.lastTime != 0 && this.updateInfo.lastTime != null){
                    	this.updateInfo.lastTime = this.updateInfo.lastTime
                    }else{
                    	this.lastTime = ""
                    }
                    
                    if(this.updateInfo.lastChangeTire != 0 && this.updateInfo.lastChangeTire != null){
                    	this.updateInfo.lastChangeTire = this.updateInfo.lastChangeTire
                    }else{
                    	this.lastChangeTire = ""
                    }
                    
                    if(this.updateInfo.mileage != 0 && this.updateInfo.mileage != null){
                    	this.updateInfo.mileage = this.updateInfo.mileage
                    }else{
                    	this.updateInfo.mileage = ""
                    }
                    
                    if(this.updateInfo.mileageMonth != 0 && this.updateInfo.mileageMonth != null){
                    	this.updateInfo.mileageMonth = this.updateInfo.mileageMonth
                    }else{
                    	this.updateInfo.mileageMonth = ""
                    }
                    
                    if(this.updateInfo.nextTime != 0 && this.updateInfo.nextTime != null){
                    	this.updateInfo.nextTime = this.updateInfo.nextTime
                    }else{
                    	this.updateInfo.nextTime = ""
                    }
                    
                    if(this.updateInfo.nextMileage != 0 && this.updateInfo.nextMileage != null){
                    	this.updateInfo.nextMileage = this.updateInfo.nextMileage
                    }else{
                    	this.updateInfo.nextMileage = ""
                    }
                    
                    if(this.updateInfo.nextChangeTire != 0 && this.updateInfo.nextChangeTire != null){
                    	this.updateInfo.nextChangeTire = this.updateInfo.nextChangeTire
                    }else{
                    	this.updateInfo.nextChangeTire = ""
                    }
                    
                    if(this.updateInfo.nextTireMileage != 0 && this.updateInfo.nextTireMileage != null){
                    	this.updateInfo.nextTireMileage = this.updateInfo.nextTireMileage
                    }else{
                    	this.updateInfo.nextTireMileage = ""
                    }
                })
            },
            // 查看卡劵
            checkVoucher () {
            	if(this.cardControl == true&&this.mask == true){
            		this.cardControl = false
            	}else{
            		this.cardControl = true
            		this.mask = true
            	}
            },
            //关闭
            checkClose(){
            	this.cardControl = false
            	this.integraControl = false
            	this.mask = false
            },
            // 查看积分
            checkIntegral () {
            	if(this.integraControl == true&&this.mask == true){
            		this.integraControl = false
            	}else{
            		this.integraControl = true
            		this.mask = true
            	}
            },
            // 发票订单
            checkInvoice () {
            	console.log(123)
            },
            // 点击换车
            changeCar (data) {
                this.carInfo = data
                this.updateInfo = data
            },
            // 添加车型
            addNewCar () {
                this.$router.push({
                    path: 'impCarInfo',
                    query: {
                        opera: 'add',
                        id: this.carInfo.carId
                    }
                })
            },
            //查看保养履历 跳转到保养履历
            SeeMaintain(){
                this.$router.push({
                    path: 'maintainRecord',
                    query: {
                        id: this.carId
                    }
                })
            },
            // 检车用户信息 跳转修改车辆信息
            CheckUserInfo () {
                api.CheckUserInfo({uid: this.userInfo.id}).then(res => {
                    if (res.data) {
                        this.$router.push({
                            path: 'impCarInfo',
                            query: {
                                opera: 'update',
                                id: this.carInfo.carId
                            }
                        })
                    }
                })
            },
            // 删除车辆
            DeleteCarInfo () {
                api.DeleteCarInfo({id: this.carInfo.carId, uid: this.userInfo.id}).then(res => {
                    if (res.data) {
                        alert('删除成功')
                        this.getUserInfo()
                    } else {
                        alert('删除失败')
                        this.getUserInfo()
                    }
                })
            },
            // 取消删除车辆
            cancelDeleteCarInfo () {
                this.isDelCar = false 
            },
            // 点击继续 
            UpadateUserInfo () {
            	console.log(this.updateInfo.lastTime)
            	let mileage =	this.updateInfo.mileage		// 上次当前里程
            	let mileageM =	this.updateInfo.mileageMonth// 上次月均里程
            	
	            // 必填项
	            if (mileage == '') {
	                alert("当前里程不能为空");
	                return
	            } else if (mileageM == '') {
	                alert("月平均里程不能为空");
	                return
	            } else if (mileage == 0) {
	                alert("当前里程不能为0");
	                return
	            } else if (mileageM == 0) {
	                alert("月平均里程不能为0");
	                return
	            }
                api.UpadateUserInfo({
                	CarId:this.updateInfo.carId,
                	Mileage:this.updateInfo.mileage,
                	MileageMonth: this.updateInfo.mileageMonth,
                	DotNo:this.updateInfo.dotNo,
                	WearAndTear:this.updateInfo.wearAndTear,
                	Aging:this.updateInfo.aging,
                	cracks:this.updateInfo.cracks,
                	LastTime:this.updateInfo.lastTime,
                	LastChangeTire:this.updateInfo.lastChangeTire,
                	NextTime:this.updateInfo.nextTime,
                	NextMileage:this.updateInfo.nextMileage,
                	NextChangeTire:this.updateInfo.nextChangeTire,
                	NextTireMileage:this.updateInfo.nextTireMileage
                }).then(res => {
                    let data = res.data
                    if (data.success) {
                        if (data.isBind) {
                            this.$router.push({
                                path: 'Confirm',
                                query: {
                                    userCarBindId: data.id
                                }
                            })
                        } else {
                            this.$router.push({
                                path: 'scan',
                                query: {
                                    userCarBindId: data.id
                                }
                            })
                        }
                    } else {
                        if (!data.phoneNumber) {
                            alert('您的手机号格式不正确，请先修改手机号')
                            this.$router.push({
                                path: 'uservip',
                                query: {
                                    uid: userInfo.id,
                                    cid: userCarBindId
                                }
                            })
                        } else {
                            alert(data.errMsg)
                            if (data.errMsg === '请先维护完整车型信息') {
                                this.$router.push({
                                    path: 'impCarInfo',
                                    query: {
                                        opera: 'update',
                                        id: data.id
                                    }
                                })
                            }
                        }
                    }
                })
            },
        	// 显示键盘  
            showKeyboard (event, focus) {
            	//console.log(focus)
                event.target.blur()
                this.focusInp = focus
                this.isShowKeyboard = true
            },
            // 点击键盘 开始输入
            inputWord (data) {
            	//console.log(this.carInfo.mileage)
            	//console.log(this.carInfo.mileageMonth)
                this.updateInfo[this.focusInp] += data
                console.log(this.updateInfo[this.focusInp])
            },
            // 键盘 撤销
            backWord () {
            	let focusInp = this.updateInfo[this.focusInp].toString()
                let length = focusInp.length
                //console.log(focusInp)
                this.updateInfo[this.focusInp] = focusInp.substring(0, length - 1)
            },
        // DOT显示键盘
            showDot (event, focus) {
            	event.target.blur()
            	this.isInputDot = true
            },
            // 点击键盘 开始输入
            dotWords (data) {
            	this.updateInfo['dotNo'] += data
            },
            //空格dotSpace
            dotSpaces () {
                this.updateInfo['dotNo'] += ' '
            },
            //删除 dotbackWord
            dotbackWord () {
                let length = this.updateInfo['dotNo'].length
            	this.updateInfo['dotNo'] = this.updateInfo['dotNo'].substring(0, length - 1)
            }
	    },
	    components:{
	        myHeader: Header,
            keyboardNum: keyboardNum,
            keyboardDot: keyboardDot
	    }
	}
</script>

<style>
</style>