<template>
	<div class='container'>
		<m-header back>星球活动</m-header>
		<!-- <div class='title'>星球活动</div> -->
		<!--<router-link class='intro' to='/zuanDetails'>车主星球说明</router-link>-->
		<router-link class='huodong' to="/loginDays">
			<img src='https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/huodong1.png?v=0.1' />
			<span class='active-name'>每日登录活动</span>
			<span class='active-tips'>· 赚更多贡献度</span>
		</router-link>
		<img src="../assets/Ar1.png" alt="" />
 		<img src="../assets/Ar2.png" alt="" />
 		<img src="../assets/Ar3.png" alt="" />
 		<img src="../assets/Ar4.png" alt="" />	
 		<img src="../assets/Ar5.png" alt="" />	
	</div>
</template>

<script>
</script>

<style scoped>
	/* pages/gonggao/gonggao.wxss */
	
	.container {
		
		width: 100%;
		height: auto;
		background-image: url(https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/xqggbg.png) ;
		background-size: cover;
	}
	
	.container a {
		display: block;
	}
	.container>img{
		width: 670px;
		margin-left: 40px;
		display: block;
	}
	
	.active-tips {
  font-size: 24px;
  position: absolute;
  top: 164px;
  left: 250px;
}
	.huodong {
		width: 680px;
		height: 280px;
		margin: 40px 33px 30px;
		overflow: hidden;
		position: relative;
		color: #fff;
		border-radius: 8px;
	}
	
	.huodong img {
		width: 686px;
		height: 280px;
	}
	
	.active-name {
		font-size: 42px;
		position: absolute;
		top: 84px;
		left: 210px;
	}
	
</style>