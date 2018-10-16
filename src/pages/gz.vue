<template>
	<!--pages/gongzhonghao/gongzhonghao.wxml-->
<div class="box">
	<m-header back>关注微信公众号</m-header>
  <img src='https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/v2/gzh-bg.png' />
  <div class='intro'>
    <div class='main_title'>按照如下步骤完成关注微信公众号</div>
    <div class='sub_title'>即可领取<span class="num">50个</span>贡献度</div>
    <span class='info'>
    1. 在微信公众号中搜索“{{name}}”并关注
    </span>
    <span class='info'>2.点击{{name}}公众号菜单“个人中心-获取贡献度”获得验证码</span>
    <span class='info'>3.在下方输入验证码，验证成功后即可领取贡献度</span>
    <div class='tip'>说明：每个星球账号仅有一次机会</div>
  </div>
  <div class='input-title'>请输入6位验证码</div>
		<div class="btn">
			
			 <input class='input' name='validateCode' ref="input"/>
			 <p><button class='button' type='submit' @click="success">确定</button></p>
    
		</div>
   
</div>

</template>

<script>
	import fetch from '@/utils/fetch.js'
	export default{
		data(){
			return{
				name:'',
				id:"",
				code:''
			}
		},
		created(){
			let msg=this.$route.query
			console.log(msg)
			this.name=this.$route.query.name
			this.code=this.$route.query.code
			this.id=this.$route.query.id
		},
		methods:{
			success(){
				let val=this.$refs.input.value
				console.log(val)
				fetch.post("/api/wx/user/follow",{userId:this.id,sourceCode:this.code,validateCode:val})
				.then(res=>{
					console.log(res)
					if(res.code==0){
						this.$router.push("/renwu/")
					}
				})
			}
		}
	}
</script>

<style scoped>
	/* pages/gongzhonghao/gongzhonghao.wxss */
.box{
  background-color: #fff;
  padding-bottom: 60px;
}
img{
	width:100%
}
.head_bg{
  width: 100%;
}
.intro {
  padding: 40px;
}
.main_title {
  padding-left: 0;
  font-size: 36px;
  color:#333;
  line-height: 50px;
}
.sub_title{
  font-size: 28px;
  color:#151515;
  line-height: 50px;
}
.sub_title .num{
  color:#ff97c7;
  letter-spacing: 2px;
  font-size: 28px;
}
.info {
  display: block;
  font-size: 28px;
  color: #151515;
  line-height: 50px;
  margin-bottom: 28px;
}
.tip {
  border-top: 1px dotted #979797;
  font-size: 28px;
  color: #5A616B;
  padding: 20px 0;
  margin-top: 56px;
  line-height: 90px;
}
.input-title {
  font-size: 42px;
  color: #333;
  margin-top: 5px;
  text-align: center;
  letter-spacing: 2px;
}
.input {
	border: 0;
  border-bottom: 1px solid #000;
  margin: 40px 60px 120px;
  text-align: center;
  height:140px;
}
.button.ensure{
  background-image: linear-gradient(to left, #3D4FFF 40%, #D33BFF 100%);
}

.button{
  	width:600px;

		font-family: PingFangSC-Regular;
font-size: 32px;
color: #FFFFFF;
border: 0;
outline: none;
letter-spacing: 2.46px;
		height:88px;
		border-radius: 50px;
		line-height: 88px;
		background-image: linear-gradient(-45deg, #D33BFF 0%, #3D4FFF 100%);
box-shadow: 0 11px 20px 0 #ECD6FF;
}
.btn{
	text-align: center;
	
}
.btn p{
	text-align: center;;
}
</style>