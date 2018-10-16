<template>

	<div class="container">
		<m-header back>商品详情</m-header>
		<div class="top">
			<swiper :options="swiperOption">
				<swiper-slide class="img" v-for="(item, index) in prod.broadcastImageList" :key="index">
					<img :src="item" alt="" />
				</swiper-slide>
			</swiper>
		</div>
		<div class='prod-info'>
			<div class='prod-name'>{{prod.goodsName}}</div>
			<!--<div class='prod-name'>1111111111111111111111111111111111111111111111111111111111111111</div>-->

			<div class='prod-count'>
				<div class='prod-zuan'>{{prod.tokenNumber}}</div>
				<div>包邮：剩余<span>{{prod.stockNumber}}</span>件</div>
			</div>
		</div>

		<div class='bottom' v-show='show==null'>
			<div class='tips1'>免费兑换商品，暂不支持退换货</div>
			<router-link v-if="!show" class='dh-btn' to='/renwu'>星钻不足，快去做任务获取星钻吧</router-link>

			<div class='bottomDh' v-show="show">
				<div class='dhFoot'>
					<text>所需星钻  {{prod.tokenNumber}}</text>
					<router-link v-show='xieyiEd' to="/renwu" class='dhFoot2'>
						立即兑换
					</router-link>
				</div>

			</div>

		</div>
	</div>

</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import 'swiper/dist/css/swiper.css'
	import fetch from '@/utils/fetch.js'
	import { mapState } from 'vuex'
	export default {
		computed: mapState(['userId']),
		components: {
			swiper,
			swiperSlide
		},
		data() {
			return {
				swiperOption: {
					notNextTick: true,
					pagination: '.swiper-pagination',
					slidesPerView: 'auto',
					centeredSlides: true,
					paginationClickable: true,
					spaceBetween: 30,
				},

				prod: {
					broadcastImageList: []
				},
				tokenValue: 0,
				id: null,
				show: null,
				list: [],
				pageSize: 5,
				xieyiEd: true
			}
		},
		created() {
			let id = this.$route.params.id
			fetch.get("/api/goods/detail?goodsId=" + id)
				.then(res => {
					console.log(res)
					this.$nextTick(() => {
						this.prod = res.data.starGoodsDetail
					})

				})
			//				获取星钻
			fetch.get("/api/token/user/total/" + this.userId).then(res => {

			})
		},

	}
</script>

<style scoped>
	/* pages/prod/prod.wxss */
	
	a {
		display: block;
	}
	
	.top{
		height: 50vh;
		background: white;
	}
	
	.container {
		
		width: 100%;
		height:100vh;
	}
	.swiper-container{
		height:100%;
	}
	.swiper-wrapper{
		height:100%;
		overflow: hidden;
	}
	.swiper-slide{
		height:100%;
	}
	 .swiper-slide img {
		width: 100%;
		
	}
	
	.prod-info {
		height:20vh;
		box-sizing: border-box;
		padding: 20px 40px 0px 40px;
		background: #fff;
		overflow: hidden;
	}
	
	.prod-name {
		font-size: 38px;
		color: #333333;
		margin-bottom: 8px;
	}
	
	.prod-count {
		display: flex;
		justify-content: space-between;
		font-size: 24px;
		color: #9B9B9B;
	}
	
	.prod-count text {
		color: #000000;
	}
	
	.prod-zuan {
		padding-left: 40px;
		font-size: 24px;
		color: #7F00EE;
		letter-spacing: 1.5px;
		background: url(https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/zuan2.png) no-repeat;
		background-size: 30px;
		background-position: left center;
	}
	
	.record-list {
		margin-top: 20px;
		padding: 32px 40px;
		background: #fff;
		padding-bottom: 280px;
	}
	
	.record-title {
		font-size: 30px;
		color: #7F00EE;
		margin-bottom: 20px;
	}
	
	.icon-title {
		background-image: linear-gradient(-45deg, #D33BFF 0%, #3D4FFF 100%);
		width: 7px;
		height: 28px;
		margin-right: 20px;
		display: inline-block;
		vertical-align: middle;
	}
	
	.record-item {
		padding: 10px 0;
		border-bottom: 2px solid #D7D9DB;
		display: flex;
		justify-content: space-between;
		font-size: 24px;
		color: #333333;
		align-items: center;
	}
	
	.item-name {
		font-size: 30px;
		line-height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.item-name img {
		width: 80px;
		height: 80px;
		border-radius: 50%;
		margin-right: 26px;
	}
	
	.bottom {
		width: 100%;
		height: 30vh;
		background: #F8F8F8;
		position: fixed;
		bottom: 0;
		font-size: 24px;
		color: #9B9B9B;
		text-align: center;
		padding-top: 10vh;
	}
	
	.dh-btn {
		background-image: linear-gradient(-45deg, #D33BFF 0%, #3D4FFF 100%);
		border-radius: 100px;
		width: 630px;
		height: 98px;
		line-height: 98px;
		margin: 40px auto;
		font-size: 30px;
		color: #FFFFFF;
		text-align: center;
	}
	
	.dhFoot {
		width: 690px;
		position: relative;
		height: 98px;
		text-align: left;
		line-height: 98px;
		background: #333333;
		padding-left: 40px;
		color: white;
	}
	
	.dhFoot>span {
		font-size: 28px;
		color: #FFFFFF;
		letter-spacing: 1.56px;
	}
	
	.dhFoot2 {
		width: 296px;
		height: 110px;
		text-align: center;
		line-height: 110px;
		font-size: 38px;
		color: #FFFFFF;
		position: absolute;
		top: -10px;
		right: 0;
		letter-spacing: 2.11px;
		background-image: url(https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/v2/an1.png);
		background-size: 100%;
	}
	
	.record-item .time {
		font-family: PingFangSC-Regular;
		font-size: 22px;
		color: #9B9B9B;
		letter-spacing: 1.16px;
	}
	
	.bottomDh .xieyi {
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: PingFangHK-Regular;
		font-size: 22px;
		color: #9B9B9B;
		letter-spacing: 0.69px;
		padding: 20px 0px;
	}
	
	.bottomDh {
		width: 690px;
		position: fixed;
		bottom: 0px;
		left: 30px;
	}
	
	checkbox .wx-checkbox-input {
		width: 30px;
		height: 30px;
	}
	
	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before {
		border-radius: 50%;
		/* 圆角 */
		width: 30px;
		/* 选中后对勾大小，不要超过背景的尺寸 */
		height: 30px;
		/* 选中后对勾大小，不要超过背景的尺寸 */
		line-height: 30px;
		text-align: center;
		font-size: 15px;
		/* 对勾大小 30px */
		color: white;
		padding-left: 5px;
		background: transparent;
		transform: translate(-50%, -50%) scale(1);
		-webkit-transform: translate(-50%, -50%) scale(1);
	}
	
	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		width: 30px;
		height: 30px;
		background: #8711EF;
	}
	
	.scrollBottom {
		text-align: center;
		color: #9B9B9B;
		height: 60px;
		line-height: 60px;
	}
</style>