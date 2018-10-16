<template>
	<div class="toast">
		<div><slot>{{title}}</slot></div>
		
	</div>
</template>
<script>
	export default {
		data() {
			return {
				title: '123'
			}
		},
		props:{
			
		}
	}
</script>
<style scoped>
	.toast{
		width:300px;
		height:100px;
		border-radius: 20px;
		background: rgba(0,0,0,0.5);
		color: white;
		font-size: 20px;
		position: fixed;
		margin:500px 220px;
		line-height: 100px;
		text-align: center;
	}
</style>