<!-- 绑定学生信息 -->
<template>
    <view class="margin-lr">
        <view class="uni-list" style="margin-top: 30px;">
            <view class="uni-list-cell">
                <view class="uni-list-cell-left">
                    选择学院
                </view>
                <view class="uni-list-cell-db">
                    <picker @change="bindPickerChange" :value="academyIndex" :range="academyArr" range-key="name">
                        <view class="uni-input">{{academyName}}</view>
                    </picker>
                </view>
            </view>
            <view class="uni-list-cell">
                <view class="uni-list-cell-left">
                    选择年级
                </view>
                <view class="uni-list-cell-db">
                    <picker @change="bindGradeChange" :value="gradeIndex" :range="gradeArr" range-key="name">
                        <view class="uni-input">{{gradeName}}</view>
                    </picker>
                </view>
            </view>
			<view class="uni-list-cell">
			    <view class="uni-list-cell-left">
			        选择专业
			    </view>
			    <view class="uni-list-cell-db">
			        <picker @change="bindMajorChange" :value="majorIndex" :range="majorArr" range-key="name">
			            <view class="uni-input">{{majorName}}</view>
			        </picker>
			    </view>
			</view>
        </view>
        
        <view class="uni-title  uni-common-pl margin-top">学号</view>
        <view class="uni-form-item dashed-bottom">
            <input class="uni-input" type="text" name="stu_num" value="" placeholder="请输入学号" v-model="stu_num" />
        </view>
        
        
        <view class="uni-title  uni-common-pl">姓名</view>
        <view class="uni-form-item dashed-bottom">
            <input class="uni-input" type="text" name="stu_name" value="" placeholder="请输入学生姓名" v-model="stu_name" />
        </view>
       
        <view class="buttonGroup">
            <button type="primary" @click="bind">确定</button>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
               userType:1,
               //teacher_id: '5e369bd594a3c6004d0524b7', //  老师的id
               majorList: [], // 该年级下的专业班级列表
			   gradeList: [], // 该学院下的年级列表
               academyArr: [], // 学院
               academyName:'',
               academyIndex: "", // 年级索引
               gradeArr: [], // 特定学院下的年级
               gradeIndex: "", // 年级索引
               gradeName:'',
			   majorArr: [], // 特定年级下的专业
			   majorIndex: "", // 专业索引
			   majorName:'',
               stu_num:"",// 学号
               stu_name:""// 学生姓名
            }
        },
        onLoad() {
            this.userType = uni.getStorageSync("userType")
            //获取学院年级列表
            uniCloud.callFunction({
                name: 'getGradeList',
            })
            .then(res => {
                console.log(res);
				this.gradeList = res.result
                this.academyArr = res.result.academyList
            })
            .catch(err => {
                uni.hideLoading();
                console.error(err);
            });
			
			//获取专业列表
			uniCloud.callFunction({
			    name: 'getMajorList',
			})
			.then(res => {
			    console.log(res);
				this.majorList = res.result
			})
			.catch(err => {
			    uni.hideLoading();
			    console.error(err);
			});
        },
        methods: {
            bindPickerChange: function(e) {
                console.log(e.target.value)
                this.academyIndex = e.target.value
                this.academyName = this.academyArr[this.academyIndex].name
                this.gradeArr = this.gradeList[this.academyArr[this.academyIndex]._id]
            },

            bindGradeChange: function(e) {
                this.gradeIndex = e.target.value
                this.gradeName = this.gradeArr[this.gradeIndex].name
				this.majorArr = this.majorList[this.gradeArr[this.gradeIndex]._id]
            },

			bindMajorChange: function(e) {
			    this.majorIndex = e.target.value
			    this.majorName = this.majorArr[this.majorIndex].name
			},
			
            bind: function() {
                uni.showLoading({})
                uniCloud.callFunction({
                    name: 'StudentBind',
                    data: {
                        academy_id: this.academyArr[this.academyIndex]._id,
                        grade_id: this.gradeArr[this.gradeIndex]._id,
						major_id: this.majorArr[this.majorIndex]._id,
                        token: uni.getStorageSync("token"),
                        uid: uni.getStorageSync("uid"),
                        userType: uni.getStorageSync("userType"),
                        stu_num:this.stu_num,
                        stu_name:this.stu_name
                    }
                })
                .then(res => {
                    uni.hideLoading();
                    console.log(res);
					uni.setStorageSync('stu_num',this.stu_num)
					uni.setStorageSync('stu_name',this.stu_name)
					uni.setStorageSync('major_id',this.majorArr[this.majorIndex]._id)
					uni.setStorageSync('grade_id',this.gradeArr[this.gradeIndex]._id)
					uni.setStorageSync('academy_id',this.academyArr[this.academyIndex]._id)
                    uni.showToast({
                        title: '绑定成功',
                        duration: 2000,
                        success() {
                            uni.navigateTo({
                                url:'/pages/index/index'
                            })
                        }
                    });
                })
                .catch(err => {
                    uni.hideLoading();
                    console.error(err);
                });
            }
        }
    }
</script>

<style>
.buttonGroup{
	margin-top: 150rpx;
}
</style>
