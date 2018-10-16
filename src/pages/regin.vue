<template>
	<div class="con">
		<toast v-show="show">{{title}}</toast>
		<div class="top">
		<div class="header">
			<div class="left" @click="back">
				<img src="../assets/back.png" alt="" />
			</div>
			<div class="center">
				注册
			</div>
			<div class="right">
				<img src="../assets/MenuIcon.png" alt="" />
			</div>
		</div>
		<div class="nav">

			<div class="big"></div>
			<div class="zh"></div>
			<div class="small"></div>
			<img src="../assets/Group2.png" alt="" />
		</div>
		<img src="../assets/bll.png" alt="" class="bl" />
		</div>
		<div class="input">
			<p><input type="text" placeholder="请输入电子邮箱" ref="email" /></p>
			<p><input type="password" placeholder="请输入密码" ref="password" /></p>
			<p><input type="text" placeholder="请输入邀请码" ref="ma" /></p>
			<div class="type">
				<div @click="regin">注册</div>
				<div> </div>
			</div>
		</div>
	</div>
</template>

<script>
	import fetch from '@/utils/fetch.js'
	export default {
		data() {
			return {
				list: [],
				title:"",
				show:false
			}
		},
		methods: {
				toast(name){
					this.show=true
				this.title=name	
				setTimeout(()=>{
					this.show=false
				},2000)
				},
			regin() {
				let emails = this.$refs.email.value
				let password = this.$refs.password.value
				let ma = this.$refs.ma.value
				console.log(emails, password, ma)
				let msg = {}
				msg = {
					from: 'app',
					email: emails,
					pwd: password,
					invitationCode: ma
				}
				fetch.post("/api/wx/user/reg", msg)
					.then(res => {
						console.log(res)
						
						
						if(res.code == 0) {
							this.toast("注册成功")
							setTimeout(()=>{
									this.$router.push("/login")
							},2500)
							
						}else{
							this.toast(res.message)
						}
					})

			},
			back() {
				window.history.go(-1)
			}
		}
	}
</script>

<style scoped>
	.con {
		width: 100%;
		height: 100%;
	}
	
	.bl {
		width: 100%;
		margin-top: 7px;
	}
	.top {
		padding-top: 58px;
		background-image: linear-gradient(-59deg, #D33BFF 13%, #3D4FFF 100%);
	}
	.header {
		width: 90%;
		margin: 0px auto;
		display: flex;
	}
	
	.header .left,
	.right {
		width: 30px;
	}
	
	.header .left img {
		width: 18px;
		height: 33px;
	}
	
	.header div {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.header .right {
		width: 20px;
		height: 20px;
	}
	
	.header .center {
		flex: 1;
		font-family: PingFangSC-Medium;
		font-size: 34px;
		color: #FFFFFF;
		letter-spacing: -0.75px;
		line-height: 44px;
	}
	
	.nav {
		width: 100%;
		display: flex;
		overflow: hidden;
		height: 400px;
		justify-content: center;
		position: relative;
	}
	
	.nav>div {
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 100px;
		bottom: 0;
		right: 0;
		margin: auto;
	}
	
	.nav>.big {
		width: 311.5px;
		height: 311.5px;
		opacity: 0.1;
		background: #FFFFFF;
		z-index: 50;
	}
	
	.nav .zh {
		border-radius: 50%;
		width: 253px;
		height: 253px;
		opacity: 0.2;
		background: #FFFFFF;
		z-index: 60;
	}
	
	.nav .small {
		border-radius: 50%;
		width: 200px;
		height: 200px;
		opacity: 0.5;
		background: #FFFFFF;
		z-index: 80;
	}
	
	.nav img {
		position: absolute;
		left: 0;
		top: 100px;
		bottom: 0;
		right: 0;
		margin: auto;
		width: 151px;
		height: 151px;
		z-index: 10000000;
	}
	
	.input {
		background: white;
		box-sizing: border-box;
		margin-top: -20px;
		text-align: center;
	}
	
	.input p input::-webkit-input-placeholder {
		color: #AAAAAA;
	}
	
	.input p input {
		font-family: PingFangSC-Light;
		font-size: 28px;
		color: black;
		letter-spacing: -0.62px;
		border: 0;
		width: 590px;
		height: 90px;
		border-bottom: 2px solid #EDEDED;
	}
	
	.type {
		margin: 150px 0 100px 0px;
		text-align: center;
	}
	
	.type div {
		text-align: center;
	}
	
	.type div:nth-child(1) {
		width: 600px;
		margin-left: 75px;
		font-family: PingFangSC-Regular;
		font-size: 32px;
		color: #FFFFFF;
		letter-spacing: 2.46px;
		height: 88px;
		border-radius: 50px;
		line-height: 88px;
		background-image: linear-gradient(-45deg, #D33BFF 0%, #3D4FFF 100%);
		box-shadow: 0 11px 20px 0 #ECD6FF;
	}
	
	.type div:nth-child(2) {
		font-family: PingFangSC-Regular;
		margin-top: 60px;
		font-size: 32px;
		color: #333333;
		letter-spacing: 2.46px;
	}
	
	.type span {
		display: inline-block;
		border-bottom: 2px solid black;
	}
</style>