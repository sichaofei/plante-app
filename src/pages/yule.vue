<template>
	<div class="container">
		<m-header back>车主娱乐</m-header>
		<div class="nav-wrapper">
			<router-link to='/iframe/3' class="nav-item">
				<img src="../assets/yuedu1.png">
			</router-link>
			<a href="#" class="nav-item">
				<img src="../assets/youxi1.png">
			</a>
		</div>
	</div>
</template>
<script>
	export default {
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