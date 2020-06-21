// 删除班级项
'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('major_list')
	const dailyReportLog = db.collection('daily_report_log') //  获取统计数据表
	let studentlist = db.collection("students")
	let studentres = await studentlist.where({
		major_id: event._id
	}).remove()
	
	const res = await collection.doc(event._id).remove() //删除
	
	const reportres = await dailyReportLog.where({
			major_id: event._id
		}).remove()
	let resData = res.data
	//返回数据给客户端
	return resData
};
