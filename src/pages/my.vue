<template>
	<!--pages/my.wxml-->
	<div class="container">
		<m-header back>我的基地</m-header>
		<div>
			<div class='banner'>
				<div class='avatar'>
					<div class='avatar-wrapper'>
						<div class='nick-label'>星球居民</div>
						<div class='avatar-image'>
							<img src="../assets/touxiang.png" />
						</div>
						
					</div>
					<div class="name">
						{{msg.email}}
					</div>
					<div class='myTotal'>
						<img src="../assets/zuan1.png" alt="" />	星钻：{{total}}
					</div>
				</div>

			</div>
			<div class="yaoqing">
				我的邀请码
				<p>{{msg.ma}}</p>
			</div>
		
	    </div>
    </div>
</template>

<script>
		import fetch from '@/utils/fetch.js'
		import { mapState } from 'vuex'
	export default{
		data(){
			return{
				total:0,
				
				msg:{}
			}
		},
		computed: mapState(['userId']),
		created(){
			this.msg=JSON.parse(localStorage.getItem("msg"))
			fetch.get("/api/wx/user/mytoken/"+this.userId)
			.then(res=>{
				console.log(res.data.myToken.totalAmount)
				this.total=res.data.myToken.totalAmount
			})
		},
		methods:{
			
		}
	}
</script>

<style scoped>
/* pages/my.wxss */
.container {
  width: 100%;
 height:100vh;
  background-image: url(https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/xqggbg.png);
  background-size: cover;
  
}
.name{
	text-align: center;
}
.banner {
	
  width: 670px;
  height: 400px;
  background-image: url(https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/gerenbg.png);
  background-size: contain;
  background-repeat: no-repeat;
  margin: 40px auto;
  border-radius: 20px;
  padding-top: 40px;
}
.avatar {
  text-align: center;
}
.avatar-wrapper {
  position: relative;
  width: 150px;
  height: 150px;
  margin: 0 auto;
}
.avatar-image {
  width: 150px;
  height: 150px;
  display: block;
	background: #EEEDFF;
border: 4px solid #FFFFFF;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar-image  img{
	width: 66px;
	height: 84px;
}
.icon-v {
  width: 44px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  border-radius: 50%;
  background: #BE3DFF;
  color: #fff;
  position: absolute;
  right: 0;
  bottom: 0;
  z-index: 1;
}
.avatar .nickname {
  font-family: PingFangHK-Medium;
  font-size: 42px;
  color: #272D32;
  letter-spacing: 2px;
}

.myTotal{
	font-family: PingFangHK-Light;
font-size: 30px;
color: #333333;
text-shadow: 0 2px 4px rgba(255,255,255,0.50);
text-align: center;
  height:42.5px;
  line-height: 42.5px;
   width:100%;
    margin:24px auto;
display: flex;
justify-content: center;
align-content: center;
color: #333333;
}
.myTotal img{
  width:60px;
  height:51px;
	margin-right:10px;
}
.nick-label {
  position: absolute;
  left:-180px;
  top:53px;
  width: 160px;
  height: 44px;
  line-height: 44px;
  background-image: linear-gradient(-45deg, #D33BFF 0%, #3D4FFF 100%);
  border-radius: 20px;
  color: #fff;
  font-size: 24px;
}
.nav-label {
  color: #fff;
}
.name{
	margin-top: 28px;
	font-family: PingFangSC-Medium;
font-size: 40px;
color: #333333;
letter-spacing: 1.33px;
line-height: 45px;
}
.yaoqing{
	margin-top: 100px;
	text-align: center;
	font-family: PingFangHK-Medium;
font-size: 28px;
color: #FFFFFF;
letter-spacing: 0.88px;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
}
.yaoqing p{
	margin-top:40px;
	width: 420px;
	height: 88px;
	font-family: PingFangHK-Medium;
font-size: 42px;
color: #6CE0FF;
letter-spacing: 1.31px;
line-height: 88px;
text-align: center;
border: 2px solid #6CE0FF;
border-radius: 100px;
}
</style>