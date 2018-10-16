<template>
	<div class="header-wrapper">
		<a href="javascript:history.go(-1)" class="back" v-if="back"></a>
		<h2><slot>{{title}}</slot></h2>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				title: '车托帮'
			}
		},
		props: {
			back: Boolean
		}
	}
</script>
<style>
	.header-wrapper {
		height: 84px;
		background: #1c054c;

		h2 {
			font-family: PingFangSC-Medium;
			font-size: 36px;
			color: #FFFFFF;
			letter-spacing: -0.75px;
			line-height: 84px;
			text-align: center;
		}

		.back {
			size: 20px;
			border: 4px solid transparent;
			border-right-color: #fff;
			border-bottom-color: #fff;
			transform: rotate(135deg);
			position: absolute;
			left: 30px;
			top: 30px;
		}
	}
</style>