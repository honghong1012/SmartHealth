<template>
	<view class="margin-lr">
		<form @submit="formSubmit">
			<view class="uni-title  uni-common-pl">学号</view>
			<view class="uni-form-item uni-column dashed-bottom">
				<input class="uni-input" v-model="student.stu_num" name="stu_num" placeholder="请输入学号" />
			</view>
			<view class="uni-title  uni-common-pl">姓名</view>
			<view class="uni-form-item uni-column dashed-bottom">
				<input class="uni-input" v-model="student.stu_name" name="stu_name" placeholder="请输入姓名" />
			</view>
			<view class="uni-title  uni-common-pl">学院</view>
			<view class="uni-form-item uni-column dashed-bottom">
				<input class="uni-input" v-model="student.academy_name" name="academy_name" placeholder="请输入学院" />
			</view>
			<view class="uni-title  uni-common-pl">年级</view>
			<view class="uni-form-item uni-column dashed-bottom">
				<input class="uni-input" v-model="student.grade_name" name="grade_name" placeholder="请输入年级" />
			</view>
			<view class="uni-title  uni-common-pl">专业</view>
			<view class="uni-form-item uni-column dashed-bottom">
				<input class="uni-input" v-model="student.major_name" name="major_name" placeholder="请输入专业" />
			</view>
			<view class="uni-title  uni-common-pl">今日体温</view>
			<view class="uni-form-item uni-column dashed-bottom">
				<input class="uni-input" name="temperature" type="digit" placeholder="请输入今日体温℃" />
			</view>
			<view class="uni-title  uni-common-pl margin-top text-bold text-center">选择项</view>
			<view class="uni-title  uni-common-pl">有无接触北京人员</view>
			<view class="uni-list">
				<radio-group name="contact_virus">
					<label class="uni-list-cell uni-list-cell-pd">
						<view>
							<radio value="1" />
						</view>
						<view class="k_left">有</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd">
						<view>
							<radio value="0" />
						</view>
						<view class="k_left">无</view>
					</label>
				</radio-group>
			</view>
			<view class="uni-title  uni-common-pl">有无疑似症状</view>
			<view class="uni-list">
				<radio-group name="have_symptom">
					<label class="uni-list-cell uni-list-cell-pd">
						<view>
							<radio value="1" />
						</view>
						<view class="k_left">有</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd">
						<view>
							<radio value="0" />
						</view>
						<view class="k_left">无</view>
					</label>
				</radio-group>
			</view>
			<view class="uni-title  uni-common-pl">当前位置</view>
			<view class="uni-list">
				<radio-group name="current_location">
					<label class="uni-list-cell uni-list-cell-pd">
						<view>
							<radio value="0" />
						</view>
						<view class="k_left">本地</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd">
						<view>
							<radio value="1" />
						</view>
						<view class="k_left">外地（除北京）</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd">
						<view>
							<radio value="2" />
						</view>
						<view class="k_left">北京</view>
					</label>
				</radio-group>
			</view>
			<view class="uni-title  uni-common-pl">当前健康状况</view>
			<view class="uni-list">
				<checkbox-group @change="checkboxChange" name="health">
					<label class="uni-list-cell uni-list-cell-pd" v-for="item in items" :key="item.value">
						<view>
							<checkbox :value="item.value" :checked="item.checked" :disabled="item.disabled" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</checkbox-group>
			</view>

			<view class="uni-btn-v K_botton">
				<button form-type="submit" type="primary">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked: false,
				checkeds: false,
				gradeList: [], // 该学院下的年级列表
				majorList: [], // 该年级下的专业列表
				student: {
					stu_num: "",
					stu_name: "",
					academy_name: "",
					grade_name: "",
					major_name: "",
					major_id: "",
					grade_id: "",
					academy_id: ""
				},
				items: [{
						value: '良好',
						name: '良好'
					},
					{
						value: '咳嗽',
						name: '咳嗽'
					},
					{
						value: '乏力',
						name: '乏力'
					},
					{
						value: '发热',
						name: '发热'
					}
				],
			}
		},
		onLoad: function() {
			//获取该学院的名字
			uniCloud.callFunction({
			    name: 'getAcademyName',
				data: {
					academy_id: uni.getStorageSync("academy_id"),
				}
			})
			.then(res => {
			    console.log(res);
				this.student.academy_name = res.result
			})
			.catch(err => {
			    uni.hideLoading();
			    console.error(err);
			});
			//获取年级名字
			uniCloud.callFunction({
			    name: 'getGradeName',
				data: {
					grade_id: uni.getStorageSync("grade_id"),
				}
			})
			.then(res => {
			    console.log(res);
				this.student.grade_name = res.result
			})
			.catch(err => {
			    uni.hideLoading();
			    console.error(err);
			});
			//获取专业名字
			uniCloud.callFunction({
			    name: 'getMajorName',
				data: {
					major_id: uni.getStorageSync("major_id"),
				}
			})
			.then(res => {
			    console.log(res);
				this.student.major_name = res.result
			})
			.catch(err => {
			    uni.hideLoading();
			    console.error(err);
			});
			
			if (uni.getStorageSync('token')) {
				this.student.major_id = uni.getStorageSync("major_id")
				this.student.grade_id = uni.getStorageSync("grade_id")
				this.student.academy_id = uni.getStorageSync("academy_id")
				this.student.stu_name = uni.getStorageSync("stu_name")
				this.student.stu_num = uni.getStorageSync("stu_num")
			} else {
				uni.navigateTo({
					url: '../login/login'
				})
			}
		},
		methods: {
			formSubmit: function(e) {
				//major_id、grade_id、academy_id需要动态读取
				var data = {
					//stu_id: this.student.stu_num,
					major_id: this.student.major_id,
					grade_id: this.student.grade_id,
					academy_id: this.student.academy_id,
					create_time: Date.now()
				}
				var formData = e.detail.value,
					data;
				formData.health = formData.health.join();
				var submitData = Object.assign(formData, data);

				console.log(submitData);
				uni.showLoading({
					title: '正在提交，请稍后...'
				})
				uniCloud.callFunction({
					name: 'studentDay',
					data: submitData
				}).then((res) => {
					uni.hideLoading()
					// 添加成功返回ID
					if (res) {
						uni.showModal({
							title: '提示',
							content: '提交成功！',
							showCancel: false,
							success: (res) => {
								uni.navigateTo({
									url: "../index/index"
								})
							}
						})
					}else{
						uni.showModal({
							title: '提示',
							content: '提交失败！请通知管理员',
							showCancel: false,
							
						})
					}
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `提交数据失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
				console.log(submitData)
			},
			checkboxChange: function(e) {
				var items = this.items,
					values = e.detail.value;
				for (var i = 1, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.indexOf(item.value) >= 0) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
						this.$set(item, 'disabled', false)
					}
					if (values.indexOf(items[0].value) >= 0) {
						this.$set(item, 'checked', false)
						this.$set(item, 'disabled', true)
					}
				}
			}
		}
	}
</script>

<style>
	.uni-list-cell {
		justify-content: flex-start
	}

	.k_left {
		margin-left: 16rpx;
	}

	/* #ifdef H5 */
	.K_botton {
		margin-bottom: 100rpx;
	}

	/* #endif */
</style>
