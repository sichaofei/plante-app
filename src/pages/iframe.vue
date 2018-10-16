<template>
	<div style="height: 100%">
		<m-header back>{{title}}</m-header>	
		<iframe id="show-iframe"  frameborder=0 name="showHere" scrolling=auto :src="url" style="width: 100%; height: 100%;"></iframe>
	</div>
</template>
<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				title: '',
				urls: [
					['查违章', 'https://bqtv.chetuobang.com/index.html?openid='],
					['查油价', 'https://bqtv.chetuobang.com/index.html?openid='],
					['查路况', 'http://3gimg.qq.com/lightmap/wxcityservice/traffic/index.html'],
					['车主阅读', 'http://m.bang58.com'],
					['车主未来', 'http://open-car.io']
				],
				url: ''
			}
		},
		computed: mapState(['userId']),
		created() {
			const appid = this.$route.params.appid;
			this.title = this.urls[appid][0];
			if(appid < 2) {
				this.url = this.urls[appid][1] + this.userId;
			}else{
				this.url = this.urls[appid][1];
			}
			
		}
	}
</script>
<style>
	
</style>