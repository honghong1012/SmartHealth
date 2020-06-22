<template>
	<view class="content">
		<view class="text-area">
			<view style="margin-top: 100upx;margin-bottom: 100upx;">
				<text class="title" style ="font-size: 30px;">{{school}}健康信息平台</text>
			</view>
			<!-- <div class="tipText">
				<text>{{userText}}您好</text>
			</div> -->

		</view>
		<!-- 学生 -->
		<view class="buttonGroup" v-if="userType === 1">
			<view class="welcome">{{username}}，您好</view>
			<navigator url="../student_bind/student_bind" class="linkBtn" >
				绑定学生信息
			</navigator>
			<navigator url="../student/student_day" class="linkBtn">
				今日健康报备
			</navigator>
			<!-- <button class="cu-btn bg-blue lg" @click="logout">退出登录</button> -->
		</view>
		<!-- 老师 -->
		<view class="buttonGroup" v-if="userType === 0">
			<view class="welcome">{{username}}老师，您好</view>
			<!-- <navigator url="../teacher_bind/teacher_bind" class="linkBtn">
				绑定管理班级
			</navigator> -->
			<view class="navigator-area">
				<view style="margin-top: 100upx;">
				</view>
			</view>
			<navigator url="../administrator/admin_grade" class="linkBtn" style="width: 300px; font-size:20px; height: 45px; ">
				学生管理
			</navigator>
			<view class="navigator-area">
				<view style="margin-top: 50upx;margin-bottom: 50upx;">
				</view>
			</view>
			<!--<navigator url="../administrator/admin_class" class="linkBtn">
				班级管理
			</navigator>-->
			<navigator url="/pages/list/list" class="linkBtn" style="width: 300px; font-size:20px; height: 45px;">
				查看报备数据
			</navigator>
			<!-- <button class="cu-btn bg-blue lg" @click="logout">退出登录</button> -->
		</view>
		<!-- 管理员 -->
		<!-- <view class="buttonGroup" v-if="userType === 3">
			<navigator url="../administrator/admin_grade" class="linkBtn">
				年级管理
			</navigator>
			<navigator url="../administrator/admin_class" class="linkBtn">
				班级管理
			</navigator>
		</view> -->	
		<button class="cu-btn bg-blue lg" style="position:absolute; bottom:100px;" @click="logout">退出登录 </button>
		<!-- <view class="buttonGroup" v-if="userType === 4">
			<view class="welcome">欢迎进入健康报备系统！</view>
			<button class="cu-btn bg-blue lg" @click="logout">进入</button>
		</view> -->
	</view>

</template>

<script>
	export default {
		data() {
			return {
				school: '',
				userType: 4,
				userText: '',
				username:'',
			}
		},
		onLoad:function(){
			this.school = uni.getStorageSync('school')
			this.username = uni.getStorageSync('username')
		},
		onShow() {
			if (uni.getStorageSync('token')) {
				this.getUserInfo()
			} else {
				uni.switchTab({
					url: '/pages/login/login'
				})
			}
		},
		methods: {
			logout() {
				//用户退出，清楚缓存信息
				uni.removeStorageSync('token')
				uni.removeStorageSync("userType")
				uni.removeStorageSync("uid")
				uni.removeStorageSync("academy_id")
				uni.removeStorageSync("major_id")
				uni.removeStorageSync("grade_id")
				uni.removeStorageSync("stu_num")
				uni.removeStorageSync("stu_name")
				uni.removeStorageSync("username")
				/*
				uni.navigateTo({
					url: '/pages/login/login'
				});
				*/
				// 切换到登录页面
				uni.switchTab({
					url: '/pages/login/login'
				});
				
				
			},
			setUserText(userType) {
				const userOptionDB = {
					0: '老师',
					1: '学生',
					// 2: '家长',
					// 3: '管理员',
				}
				return userOptionDB[userType];
			},
			getUserInfo() {
				console.log("getUserInfo begin")
				uni.showLoading({
					title: '加载中...'
				});

				let token = uni.getStorageSync('token')

				if (token) {
					uniCloud.callFunction({
						name: 'validateToken',
						data: {
							token: uni.getStorageSync('token')
						}
					}).then((res) => {
						console.log("validateToken", res.result.data)
						try {
							const {
								userType,
								school
							} = res.result.data;
							this.school = school;
							this.userType = userType;
							this.userText = this.setUserText(userType)
						} catch (e) {
							throw new Error("参数错误请重新登录");
						}
						uni.hideLoading()
					}).catch((err) => {
						uni.hideLoading()
						uni.showModal({
							content: '请求云函数发生错误，' + err.message,
							showCancel: false
						})
					})
				} else {
					uni.navigateTo({
						url: "../login/login"
					})
				}
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 100rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		text-align: center;
	}

	.tipText {
		text-align: left;
		margin: 40upx 0;
	}

	.title {
		font-size: 20px;
		text-align: center;
		font-weight: bold;
		margin-bottom: 30upx;
		padding: 20px 0px;

	}

	.buttonGroup {
		width: 100%;
		margin-bottom: 40upx;
	}

	.buttonGroup .linkBtn {
		font-size: 30upx;
		display: block;
		line-height: 80upx;
		margin: 0 auto;
		width: 90%;
		text-align: center;
		margin-bottom: 20upx;
		border-radius: 40upx;
		box-shadow: 0 3px 5px rgba(5, 26, 180, 0.35);
		font-weight: bold;
		background: linear-gradient(135deg, #576FEC 0%, #576FEC 76%, #536DEC 76%);
		color: #fff;
	}

	.welcome {
		padding-left: 22px;
		margin-bottom: 35px;
	}
</style>
