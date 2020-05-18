<template>
	<div>
		<view class="logo">
			<image src="/static/AboutPage.png" style="width:100%; height:100%"></image>
		</view>
		<view class='aboutUsTitle'>
			<text>关于我们</text>
		</view>
		<view class='aboutUs'>
			<text>本应用作为软件体系结构与应用开发小组课程项目，功能主要包括：1.提供学生健康信息登记平台; 2.管理员查询信息; 3.国内外疫情实时动态。</text>
		</view>
		<view class='responsibilityTitle'>
			<text>免责声明</text>
		</view>
		<view class='responsibility'>
			<text>本小程序主要用于课程演示，不提供对外服务，不保证维护后台数据库。请勿使用本小程序用于登记信息，敬请谅解。</text>
		</view>
	</div>
	
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.logo{
		position: relative;
		width: 26%;
		height: 110px;
		left:37%;
		top:50px;
	}
	
	.aboutUsTitle{
		width: 96%;
		margin-left: 2%;
		margin-top: 20%;
		padding: 2%;
		color: #000000;
		font-size: 35rpx;
		font-weight: bold;
	}
	
	.aboutUs{
		width: 96%;
		margin-left: 2%;
		margin-top: 0%;
		padding: 2%;
		color: #000000;
		font-size: 32rpx;
	}
	
	.responsibilityTitle{
		width: 96%;
		margin-left: 2%;
		margin-top: 1%;
		padding: 2%;
		color: #000000;
		font-size: 35rpx;
		font-weight: bold;
	}
	
	.responsibility{
		width: 96%;
		margin-left: 2%;
		margin-top: 0%;
		padding: 2%;
		color: #000000;
		font-size: 32rpx;
	}
	
</style>
