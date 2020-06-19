//  每日健康统计汇总
'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const dailyReportLog = db.collection('daily_report_log') //  获取统计数据表
	const gradeList = db.collection('grade_list') //  获取年级表
	const majorList = db.collection('major_list') //  获取专业表

	let majorres = await majorList.where({
		// 获取专业表的总数
		grade_id: dbCmd.eq(event.grade_id)
	}).get()
	
	let report = await dailyReportLog.where({
		// 请求当前时间的数据
		grade_id: dbCmd.eq(event.grade_id),
		create_time: dbCmd.gte(event.time).and(dbCmd.lt(event.time2)),
	}).get()
	
	// 循环将该年级下的所有专业人数相加
	var sum = 0
	for (var j = 0; j < majorres.data.length; j++) {
	    console.log("major_res",majorres)
		// major键为年级id，值为该年级下的专业记录
	    sum = sum + majorres.data[j].student_sum
	}

	let data = {
		student_sum: sum > 0 ? sum : '未获取到该专业信息',
		arr: report.data,
	}

	// const res = await majorList.add(obj)
	//返回数据给客户端
	return data
};
