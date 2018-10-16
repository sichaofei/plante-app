<template>
	<!--pages/active/active.wxml-->
	<div class='activeBody'>
		<m-header back>连续登录</m-header>
		<div class="ball">
			<div class="ball_border">
				<div class="ball_border_inner"></div>
				<div class="ball_content">
					<span class="num">已连续登录
        {{day}}天</span>
				</div>
			</div>
		</div>
		<div class='loginTime'>
			<div v-for="(item,index) in time">
				<div class="article" :class="item.select==1?'selected':''"> <span> {{item.time}}</span></div>
				<div v-show='all' class="gx" :class="item.select==0?'logined':''"> <span>+{{item.gx}}</span>
					<div>
						<!--<img :src="item.select==1?'../assets/zuan2copy2.png':'../assets/zuan2copy5.png'"/>-->
						<img v-if="item.select" src="../assets/zuan2copy2.png" alt="" />
						<img v-if="!item.select" src="../assets/zuan2copy5.png" alt="" />
					</div>
				</div>
			</div>
		</div>
		<div class='explainLogin'>
			<div><span>• 若有一天未登录，再次登录时，连续登录的天数会重新计算</span> </div>
		</div>
	</div>
</template>

<script>
	import fetch from '@/utils/fetch.js'
	export default {
		data() {
			return{
				
			
			all: false,
			time: [{
					"time": 1,
					select: 0,
					gx: ''
				},
				{
					"time": 2,
					select: 0,
					gx: ''
				},
				{
					"time": 3,
					select: 0,
					gx: ''
				},
				{
					"time": 4,
					select: 0,
					gx: ''
				},
				{
					"time": 5,
					select: 0,
					gx: ''
				},
				{
					"time": 6,
					select: 0,
					gx: ''
				},
				{
					"time": 7,
					select: 0,
					gx: ''
				},
			],
			day: 0
			}
		},
		created() {
			let day=JSON.parse(window.localStorage.getItem("msg")).day 
			this.day=day
			
			fetch.get('/api/wx/user/getSignArray')
				.then(res => {
					console.log(res)
					let arr = res.data.amount
					let time = this.time
					arr.map((item, index) => {
						time[index].gx = item
					})
					this.time = time
					this.all = true
					this.loginDay(this.day)
				})
				
		},
		methods:{
			loginDay(date){
 			if(date>=7){
   			date=7
 			}
  for(var a=0;a<date;a++){
    this.time[a].select=1
  }
},
		}
		
	}
</script>

<style scoped>
	/* pages/active/active.wxss */
	/* pages/inviteFriend/inviteFriend.wxss */
	
	.ball {
		position: relative;
		width: 316px;
		height: 316px;
		margin: 80px auto 0;
		opacity: 0.8
	}
	
	.num {
		font-size: 34px;
		letter-spacing: 2px;
		color: #fff;
		text-align: center;
	}
	
	.ball .ball_border {
		width: 316px;
		height: 316px;
		border-radius: 50%;
		position: relative;
		background: linear-gradient(#3D4FFF, #D33BFF);
	}
	
	.ball .ball_border_inner {
		width: 304px;
		height: 304px;
		background: #fff;
		border-radius: 50%;
		position: absolute;
		top: 7px;
		left: 7px;
	}
	
	.ball .ball_content {
		width: 286px;
		height: 286px;
		border-radius: 50%;
		background: linear-gradient(#3D4FFF, #D33BFF);
		/* 标准的语法 */
		position: absolute;
		top: 16px;
		left: 15px;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	
	.loginTime {
		width: 90%;
		
		display: flex;
		margin: 77px auto;
		justify-content: space-between;
	}
	
	.loginTime div .selected {
		color: white;
		background-image: linear-gradient(-45deg, #d33bff 0%, #3d4fff 100%);
	}
	
	.loginTime>span {
		margin-left: 20px;
	}
	
	.loginTime .article {
		box-sizing: border-box;
		font-size: 32px;
		color: #9b9b9b;
		letter-spacing: 0;
		width: 82px;
		height: 82px;
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 82px;
		border: 2px solid #d8d8d8;
		border-radius: 50%;
	}
	
	.loginTime>span:nth-child(1) {
		margin-left: 0;
	}
	
	.loginTime .gx img {
		width: 20px;
		height: 19.7px;
	}
	
	.loginTime .gx {
		margin-top: 20px;
		width: 82px;
		text-align: center;
		box-sizing: border-box;
		padding-right: 5px;
		font-family: PingFangHK-Medium;
		font-size: 22px;
		color: #28CAF5;
		letter-spacing: 1.29px;
	}
	
	.loginTime .logined {
		color: #9B9B9B;
	}
	
	.activeBody {
		font-family: PingFangSC-Medium;
		width: 100%;
		margin: auto;
	}
	
	.explainLogin {
		width: 630px;
		margin: 120px auto;
		height: 180px;
		font-size: 28px;
		padding: 50px 60px;
		color: #333;
		letter-spacing: 1.56px;
		border: 4px dotted #5A616B;
		box-sizing: border-box;
		border-radius: 10px;
	}
</style>