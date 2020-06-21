//  每日健康统计汇总
'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	const dailyReportLog = db.collection('daily_report_log') //  获取统计数据表
	const gradeList = db.collection('grade_list') //  获取年级表
	const majorList = db.collection('major_list') //  获取专业表
	var sum = 0
	let report
	if(event.grade_id==''){
		let graderes = await gradeList.where({
			// 获取对应学院下的所有年级
			academy_id: dbCmd.eq(event.academy_id)
		}).get()
		// 年级下的所有专业
		for (var j = 0; j < graderes.data.length; j++) {
		    let majorres = await majorList.where({
		        grade_id:graderes.data[j]._id
		    }).orderBy("order","asc").get()
		    console.log("grade_res",graderes)

			for (var i = 0; i < majorres.data.length; i++) {
			    console.log("major_res",majorres)
			    sum = sum + majorres.data[i].student_sum
			}
		}
		// 报备数据
		report = await dailyReportLog.where({
			// 请求当前时间的数据
			academy_id: dbCmd.eq(event.academy_id),
			create_time: dbCmd.gte(event.time).and(dbCmd.lt(event.time2)),
		}).get()
	}
	else{
		if(event.major_id==''){
			let majorres = await majorList.where({
				// 获取专业表的总数
				grade_id: dbCmd.eq(event.grade_id)
			}).get()
			// 计算人数
			for (var j = 0; j < majorres.data.length; j++) {
			    console.log("major_res",majorres)
			    sum = sum + majorres.data[j].student_sum
			}
			// 报备数据
			report = await dailyReportLog.where({
				// 请求当前时间的数据
				grade_id: dbCmd.eq(event.grade_id),
				create_time: dbCmd.gte(event.time).and(dbCmd.lt(event.time2)),
			}).get()
		}
		else{
			let majorres = await majorList.where({
				// 获取专业表的总数
				_id: dbCmd.eq(event.major_id)
			}).get()
			// 计算人数
			sum = majorres.data[0].student_sum
			// 报备数据
			report = await dailyReportLog.where({
				// 请求当前时间的数据
				major_id: dbCmd.eq(event.major_id),
				create_time: dbCmd.gte(event.time).and(dbCmd.lt(event.time2)),
			}).get()
		}
	}
	
	let data = {
		student_sum: sum > 0 ? sum : '未获取到该专业信息',
		arr: report.data,
	}

	// const res = await majorList.add(obj)
	//返回数据给客户端
	return data
};
