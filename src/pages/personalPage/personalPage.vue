<template>
	<div class="persona">
		
		<!-- 头部 顶部 -->
		<my-header></my-header>
		<div class="loading" v-loading="isLoading">	
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
			<div class="personalOptional">
				<div class="optional-input">
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
				</div>
				<div class="optional-inpRadio">
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
				</div>
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
	        		<div class="headerList" v-for="(item,index) in cardList">
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
	        		<div class="headerList" v-for="(item,index) in integralList">
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
                integraControl: false,		// 积分控制
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
                    this.updateInfo = this.carInfo
                    this.carId = res.data.cars[0].carId
                    console.log(this.carId)
                    this.cardList = res.data.cardCoupons
                    this.integralList = res.data.integrals
                    // this.updateInfo.CarId = res.data.cars[0].carId
                    // this.updateInfo.Mileage = res.data.cars[0].mileage
                    // this.updateInfo.MileageMonth = res.data.cars[0].mileageMonth
                    // this.updateInfo.DotNo = res.data.cars[0].dotNo
                    // this.updateInfo.LastTime = res.data.cars[0].lastTime
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
                api.UpadateUserInfo(this.updateInfo).then(res => {
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
                event.target.blur()
                this.focusInp = focus
                this.isShowKeyboard = true
            },
            // 点击键盘 开始输入
            inputWord (data) {
                this.updateInfo[this.focusInp] += data
            },
            // 键盘 撤销
            backWord () {
                let length = this.updateInfo[this.focusInp].length
                this.updateInfo[this.focusInp] = this.updateInfo[this.focusInp].substring(0, length - 1)
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