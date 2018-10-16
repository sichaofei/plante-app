<template>
	<div class="container">
		<m-header back>车主必用</m-header>
		<div class="nav-wrapper">
			<router-link to="/iframe/0" class="nav-item">
				<img src="../assets/weizhang1.png">
			</router-link>
			<!--<router-link to="/iframe/1" class="nav-item">
				<img src="../assets/youjia1.png">
			</router-link>-->
			<router-link to='/iframe/2' class="nav-item">
				<img src="../assets/lukuang1.png">
			</router-link>
		</div>
	</div>
</template>
<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				// userId: ''
			}
		},
		computed: mapState(['userId']),
		created() {
			// this.userId = this.$route.params.userId;
		}
	}
</script>
<style scoped>
body {
	height: 100%;
}
.container {
	width: 100%;
	height: 100%;
	background-image: url(static/images/xqggbg.png);
	background-size: cover;
	.nav-wrapper {
		padding: 60px 30px 0;
		.nav-item {
			display: block;
			margin-bottom: 40px;
			img {
				width: 100%;
			}
		}
	}
}

</style>