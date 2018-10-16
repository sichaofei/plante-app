<template>
	<div class='index-wrapper'>
	  <img src='static/images/bg.png' id='bg' style="width: 100%; height: 100%" /> 
	  <div class='wave'>
	  	<img src="static/images/ball.png">
	  </div>
	  <div class='index-head'>
	    <div class='head-item'>
	      <img src='https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/zuan1.png' class='icon-zuan'/>
	      <div class='zuan'>星钻：{{tokenValue}}</div>
	    </div>
	    <div class='head-item'>
	      <img src='https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/zuan3.png' class='icon-zuan' style='width:20px;height:19px' />
	      <div>贡献度：{{forceValue}}</div>
	    </div>
	  </div>
	  <div v-show="isShow" class='planet-list'>
	    <div id='ball'>
	      <div v-if='countDown'>
	        <div class='ball-title'>距离下次产钻还有</div>
	        <div class='ball-title'>{{countDown}}</div>
	        <div class='ball-txt'>贡献越多，星钻越多</div>
	      </div>
	      <div v-else>
	        <div class='ball-title' style="position: absolute;left: 0.8rem;top: 1rem;">产钻中</div>
	      </div>
	    </div>

	    <router-link class='planet-item intro' tag='div' to='/active'>
	      <img src='../assets/gonggao.png' class='planet-icon'/>
	      <div class='planet-label'>星球活动.</div>
	    </router-link>
	    <router-link class='planet-item renwu' tag='div' to='/renwu'>
	      <img src='../assets/renwu.png' class='planet-icon'/>
	      <div class='planet-label'>星球任务.</div>
	    </router-link>
	    <router-link class='planet-item duihuan' tag='div' to='/duihuan'>
	      <img src='../assets/duihuan.png' class='planet-icon'/>
	      <div class='planet-label'>星球兑换.</div>
	    </router-link>
	    <router-link class='planet-item my' tag='div' to='/my'>
	      <img src='../assets/my.png' class='planet-icon'/>
	      <div class='planet-label'>我的基地.</div>
	    </router-link>
	    <div class="nav-list">
	    	<router-link class="nav-item" tag='div' to="/biyong">
	    		<img src="../assets/czby.png">
	    		<div class="nav-label">车主必用</div>
	    	</router-link>
	    	<router-link class="nav-item" tag='div' to='/yule'>
	    		<img src="../assets/czyl.png">
	    		<div class="nav-label">车主娱乐</div>
	    	</router-link>
	    	<router-link class="nav-item" tag='div' to='/iframe/4'>
	    		<img src="../assets/czwl.png">
	    		<div class="nav-label">车主未来</div>
	    	</router-link>
	    </div>
	  </div>
	  <div class='zuan-list' v-show="!isShow">
	    <div id='ball'>
	      <div v-if='hasZuan'>
	        <div class='ball-title'>新的星钻已生成</div>
	        <div class='ball-txt'>超过48小时，星钻停止生长</div>
	      </div>
	    </div>
	    <div v-for='(item, index) in array' class='zuan-item' @click='receive(index)' :style="{top: item.y/2 + 'px', left: item.x/2 + 'px'}" v-show='item.opacity'>
	      <img src='../assets/icon-zuan.png' class='zuan-icon'></img>
	      <div>{{item.amount}}</div>
	    </div>
	  </div>
	</div>
</template>
<script>
	import fetch from '@/utils/fetch.js'
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				loginFlag: false,
			    day: null,
			    waveCtx: null,
			    step: 0,
			    ratio: 0,
			    r: 1,
			    array: [],
			    leftArray: [],
			    isShow: false,
			    forceValue: 0.0,
			    tokenValue: 0.0,
			    countDown: '',
			    isTips: true,
			    count: 0,
			    hidden1: 1,
			    hidden2: 1,
			    model: 0,
			    zuanNum: 0,
			    hasZuan: false,
			    unRead: false,
			    message: '',
			    showMsg: false,
			    loginNum: 0,
			    loginDayFlag: true,
			    isIphone: false,
			    timer: null,
			    newGoodsFlag: false,
			    newTaskFlag: false,
			    zuanPos: [[300, 110], [550, 640], [600, 520], [600, 200], [400, 300],
			    [600, 800], [460, 140], [540, 980], [400, 420], [600, 340],
			    [70, 820], [180, 900], [290, 800], [60, 1000], [400, 930],
			    [450, 600], [98, 98]]
			}; 
	    },
	    computed: mapState(['userId']),
	    created() {
	    	const userId = this.userId;
	    	
	    	this.getForce(userId);
	    	this.getToken(userId);
	    	this.loadZuan(userId);
	    },
	    methods: {
	    	getForce(userId) {
	    		fetch.get('/api/force/user/total/'+ userId)
	    		.then(res => {
	    			if (res.code === '0') {
		    			this.forceValue = res.data.totalDetail.totalAmount;
		    		}
	    		})
			},
			getToken(userId) {
	    		fetch.get('/api/token/user/total/'+ userId)
	    		.then(res => {
	    			if (res.code === '0') {
		    			this.tokenValue = res.data.totalDetail.totalAmount;
		    		}
	    		})
			},
			loadZuan(userId) {

      			this.zuanNum = 0;
    			fetch.get('/api/token/user/unreceivelist?userId='+ userId)
		    		.then(res => {
		    			if (res.code === '0') {
			    			const detail = res.data.unReceiveList.details;

					        if (detail.length) {
					            if (detail.length > 17) {
					              this.array = this.prepareZuan(detail.slice(0, 17), this.zuanPos);
					              this.leftArray = this.prepareZuan(detail.slice(17), this.zuanPos)
					            } else {
					              this.array = this.prepareZuan(detail, this.zuanPos)
					          	}
					            this.ratio = res.data.unReceiveList.unreceiveRate;
					            this.hasZuan = true;
					            this.isShow = false
					          // if (this.timer) {
					          //   clearInterval(me.data.timer);
					          // }
					          // this.countDown();
					        } else {
					          // if(flag) {
					          //   me.loadZuan(true)
					          // }else {
					              this.hasZuan = false
					              this.isShow = true
					          // }
					         
					        }
			    		}
		    		})
  			},
			prepareZuan(arr, zuanPos) {
			    for (let i = 0; i < arr.length; i++) {
			      arr[i].x = zuanPos[i][0];
			      arr[i].y = zuanPos[i][1];
			      arr[i].opacity = 1;
			    }
			    return arr;
			},
			receive(index) {
			    // const index = e.currentTarget.dataset.id;
			    let arr = this.array;

			    const opacity = arr[index].opacity;
			    if(opacity == 0) return;

			    const id = arr[index].id;
			    const amount = parseFloat(arr[index].amount);
			    // this.data.array.splice(index, 1);
			    arr[index].opacity = 0;

			    this.zuanNum = this.zuanNum + 1

			    if (this.zuanNum === arr.length) {
			        if (!this.leftArray.length) {
			          this.isShow = true
			          this.hasZuan = false
			          this.array = []
			        } else {
			          this.array = this.leftArray
			          this.leftArray = []
			          this.zuanNum = 0
			      }
			    }

			    fetch.post('/api/token/user/receive',{
					        "userId": this.userId,
					        "grantId": id
					    }).then(res => {
					        if (res.code == 0) {
					            this.tokenValue = (parseFloat(this.tokenValue) + amount).toFixed(5)
					        }
					    })
			    
			}
	    }
	}
</script>
<style scoped>
.index-wrapper {
  background: linear-gradient(#1c054c, #301181); 
  min-height: 100%;
}
.wave {
  width: 341px;
  height: 442px;
  position: absolute;
  top: 360px;
  background-color: transparent;
  overflow: hidden;

  img {
  	width: 100%;
  	height: 100%;
  }
}
#ball {
  position: absolute;
  top: 292px;
  left: -80px;
  width: 442px;
  height: 442px;
  border-radius: 50%;
  background-color: transparent;
  text-align: center;
  color: #fff;
  padding-top: 150px;
  box-sizing:border-box;
  padding-left: 20px;
}
.tips {
  background: rgba(39,45,50, .5);
  box-shadow: 0 7px 16px 0 #2A0848;
  border-radius: 8px;
  font-size: 32px;
  color: #FFFFFF;
  width: 615px;
  height: 188px;
  line-height: 188px;
  text-align: center;
  position: absolute;
  top: 200px;
  left: 67px;
}
.day {
  width:100px;
  font-size: 42px;
  display:inline-block;
  vertical-align:middle;
}
.index-head {
  position: absolute;
  top: 20px;
  left: 40px;
  width: 670px;
  height: 68px;
  background: rgba(45,38,123,.74);
  border-radius: 100px;
  display: flex;
  justify-content: space-between;
  padding: 17px 80px 8px;
  box-sizing: border-box;
  font-family: PingFangSC-Light;
  font-size: 24px;
  color: #6CE0FF;
  text-shadow: 0 2px 4px rgba(255,255,255,0.50);
}
.head-item .icon-zuan {
  width: 50px;
  margin-right: 10px;
}
.head-item .zuan {
  color: #ECB1FE;
}
.head-item {
  display: flex;
  align-items: center;
}
.planet-list {
  width: 100%;
  height: calc(100% - 68px);
  position: absolute;
  top: 68px;
  left: 0;
}
.planet-item {
  position: absolute;
  display: flex;
  align-items: center;
}
.planet-icon {
  width: 100px;
  height: 100px;
  margin-right: 20px;
  vertical-align: bottom;
}
.planet-label {
  font-size: 24px;
  color: #FFFFFF;
  letter-spacing: 0;
}
.planet-item.intro {
  top: 191px;
  left: 325px;
}
.planet-item.renwu {
  top: 392px;
  left: 456px;
  height: 140px;
}
.planet-item.duihuan {
  top: 671px;
  left: 400px;
  height: 140px;
}
.planet-item.my {
  top: 823px;
  left: 152px;
}
.zuan-list {
  position: absolute;
  left: 0;
  top: 68px;
  width: 100%;
  height: calc(100% - 68px);
}
.zuan-item {
  position: absolute;
  color: rgba(255,255,255,0.40);
  text-align: center;
  font-size: 20px;
  transition: transform .5s;
  transition-timing-function: linear;
}
.zuan-icon {
  width: 80px;
  height: 80px;
  transition: transform .5s;
  transition-timing-function: cubic-bezier(.55,0,.85,.36);
}
.zd{
  position: fixed;
  bottom:100px;
  width:100%;
  display: flex;
  justify-content: center;
  z-index: 1000;
}
.zd cover-image{
  width:372px;
  height:112px;
  z-index: 1000;
}
.bodyBg{
  top:0;
  position: fixed;
  width:100vw;
  height:100vh;
}
.bodyBg cover-image {
  width: 100%;
  height:100%;
}
.yindao1{
  width:100vw;
  height:100vh;
  position: fixed;
  top:0;
  z-index: 400
}
.jiantou{
  position: fixed;
  top:320px;
  left:200px;
}
.jiantou cover-image{
  width:176px;
  height:208px;
}
.shouqu{
  position: fixed;
  top:240px;
  left:350px;
}
.shouqu cover-image{
  width:369px;
  height:50px;
}
.yindao2{
  width:100vw;
  height:100vh;
  position: fixed;
  top:0;
  z-index: 400;
}
.mengceng2{
  width:100vw;
  position: fixed;
  top:-100px;
}
.mengceng2 cover-image{
  width:100%;
  height:100%;
}
.jiantou2{
  position: fixed;
  left:250px;
  top:580px;
  z-index: 500;
}
.jiantou2 cover-image{
  width:176px;
  height:208px;
}
.wenzi2{
  position: fixed;
  top:550px;
  left:50px;
}
.wenzi2 cover-image{
  width:556px;
  height:53px;
}
.iphonex{
  position: fixed;
  bottom:0;
  z-index: 100;
  width:100%;
  height:215px;
  background:rgba(0,0,0,0.8)
}
.loginTishi{
  justify-content: center;
  background: #FFFFFF;
  z-index: 1000;
box-shadow: 0 7px 16px 0 #2A0848;
border-radius: 8px;
position: fixed;
width:615px;
height:442px;
top:300px;
left:70px;
text-align: center;
}
.loginTishi cover-image{
  margin-top:63px;
  width:98px;
  height:84px;
  margin-left:258.5px;
}
.loginTishi .a{
  margin-top:30px;
  font-size: 42px;
color: #272D32;
letter-spacing: 2.33px;
}
.loginTishi .b{
  font-size: 24px;
  margin-top:13px;
color: #9B9B9B;
letter-spacing: 1.33px;
}
.loginTishi .c{
  margin-left:207.5px;
  margin-top:48px;
  border: 1px solid #7F00EE;
border-radius: 100px;
font-size: 26px;
color: #7F00EE;
letter-spacing: 1.44px;
width:200px;
height:64px;
line-height: 64px;
}
.message-wrapper {
  position: absolute;
  top: 98px;
  font-size: 24px;
  color: #fff;
  width:100%;
  height:50px;
  overflow:hidden;
}
.message {
  animation: marquee 20s infinite linear ;
  display: flex;
  align-items: center;
  backface-visibility: hidden;
}
.icon-msg {
  width: 50px;
  height: 50px;
}
.msg-content {
  height: 50px;
  line-height: 50px;
  white-space: nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
@keyframes marquee {
  from {
    transform: translate3d(100%, 0, 0);
  }
  to {
    transform: translate3d(-100%, 0, 0);
  }
}
.ball-title {
  margin-bottom:20px;
  font-size:34px;
}
.ball-txt {
  font-size:28px;
  color:rgba(255,255,255,.5);
  margin-top:20px;
  padding-left:40px;
}
#bg {
  width: 100%;
  height: 100vh;
  animation: bg 2s infinite ease-in-out both;
}
@keyframes bg {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}
.login-day {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
}
.new-force {
  position: fixed;
  top: 12px;
  left: 420px;
  width: 46px;
  height: 25px;
}
.login-reward {
  font-size: 26px;
  color: #5A616B;
  margin-top: 26px;
  display: flex;
  justify-content: center;
}
.reward-amount {
  color: #28CAF5;
  min-width: 80px;
}
.new-icon {
  width:46px;
  height:25px;
  position: absolute;
  left: 88px;
  top: 4px;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background: rgba(0,0,0,.6);
}
.nav-list {
	display: flex;
	position: absolute;
	top: 946px;
	padding: 0 50px;
	justify-content: space-between;
	align-items: center;
	width: 100%;

	.nav-item {
		background: #40208C;
		border-radius: 8px;
		size: 200px 220px;
		padding: 35px 0;
		text-align: center;
		font-size: 28px;
		color: #FFFFFF;
		display: block;

		img {
			size: 100px;
			margin-bottom: 17px;
		}
	}
}
</style>