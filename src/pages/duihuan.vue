<template>
	<div class='container'>
		<m-header back>商品兑换</m-header>
		<div class='zuan-count'>商品在9-21点不定时更新，请随时关注。</div>
		<div class='prod-list'>
			<div class='prod-item' v-for="(item,index) in list" :key="index" @click="toProd(item.goodsId)">
				<img :src='item.coverImage' class='item-image' />
				<div class='item-title'>{{item.goodsName}}</div>
				<div class='item-count'>剩余{{item.stockNumber>=0?item.stockNumber:0}}件</div>
				<div class='item-zuan'><img src="https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/zuan2.png" alt="" /> {{item.tokenNumber}}</div>
				<div class='dh-btn'>立即兑换</div>
				<div class="label" :class="item.goodsLabel==1?'tuijian':item.goodsLabel==2?'new':item.goodsLabel==3?'xianliang':''" v-if="item.goodsLabel==1">推荐</div>
				<div class="label" :class="item.goodsLabel==1?'tuijian':item.goodsLabel==2?'new':item.goodsLabel==3?'xianliang':''" v-if="item.goodsLabel==2">NEW</div>
				<div class="label" :class="item.goodsLabel==1?'tuijian':item.goodsLabel==2?'new':item.goodsLabel==3?'xianliang':''" v-if="item.goodsLabel==3">限量</div>
			</div>
		</div>
		<div class='footDh'>商品在9-21点不定时更新，请随时关注。</div>
	</div>

</template>

<script>
	import fetch from '@/utils/fetch.js'
	export default {
		data() {
			return {
				list: [],
				pageNum: 1,
				pageSize: 20,
				totalPages: 1,
				isLoading: false
			}
		},
		created() {
			fetch.post("/api/goods/query", {
					pageNum: this.pageNum,
					pageSize: this.pageSize
				}, )
				.then(res => {
					console.log(res)
					let lists = [...this.list, ...res.data.pageStarGoods.list];
					this.list = lists,
						this.totalPages = res.data.pageStarGoods.pages

				})
		},
		methods: {
			toProd(id) {
				this.$router.push("/prod/" + id);
			}

		}
	}
</script>

<style scoped>
	/* pages/duihuan/duihuan.wxss */
	
	a {
		display: block;
	}
	
	.prod-list {
		
	}
	
	.container {
		width: 100%;
		height: auto;
		background-image: url(https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/xqggbg.png);
		background-size: cover;
	}
	
	.title {
		margin-bottom: 17px;
	}
	
	.zuan-count {
		font-family: PingFangHK-Medium;
		font-size: 32px;
		color: #6CE0FF;
		text-align: center;
		margin: 40px 0px;
	}
	
	.baoxiang {
		background-image: url(https://cms-img.oss-cn-hangzhou.aliyuncs.com/wechat/planet/v2/jilubg2.png);
		background-size: cover;
		width: 720px;
		height: 220px;
		font-family: hzgb;
		font-size: 72px;
		color: #E4AC67;
		letter-spacing: 0;
		padding-left: 100px;
		padding-top: 81px;
		margin: 20px auto;
	}
	
	.prod-list {
		width: 690px;
		margin: 30px auto;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	.prod-item {
		position: relative;
		width: 330px;
		height: 558px;
		background: #fff;
		border-radius: 10px;
		padding: 10px;
		margin-bottom: 30px;
	}
	
	.item-image {
		width: 310px;
		height: 310px;
	}
	
	.item-title {
		font-size: 24px;
		color: #333333;
		letter-spacing: 2px;
		margin: 10px 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.item-count {
		font-size: 20px;
		color: #B5B5B5;
		letter-spacing: 1.25px;
		margin-bottom: 10px;
	}
	.item-zuan img{
		width: 26px;
		height: 26px;
		margin-right:10px;
	}
	.item-zuan {
		
		font-size: 24px;
		color: #7F00EE;
		letter-spacing: 1.5px;
		display: flex;
		
		margin-bottom: 25px;
		background-position: left center;
	}
	
	.dh-btn {
		background-image: linear-gradient(-45deg, #D33BFF 0%, #3D4FFF 100%);
		border-radius: 10px;
		font-size: 28px;
		color: #FFFFFF;
		width: 220px;
		height: 52px;
		line-height: 52px;
		text-align: center;
		margin: 0 auto;
	}
	
	.label {
		font-family: PingFangHK-Medium;
		font-size: 24px;
		color: #FFFFFF;
		letter-spacing: 1px;
		width: 80px;
		height: 40px;
		line-height: 40px;
		position: absolute;
		top: 10px;
		left: 10px;
		text-align: center;
	}
	
	.tuijian {
		background: #FF345E;
	}
	
	.xianliang {
		background: #7F00EE;
	}
	
	.new {
		background: #11B7E3;
	}
	
	.footDh {
		font-family: PingFangHK-Light;
		font-size: 28px;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
		padding-bottom: 51px;
	}
</style>