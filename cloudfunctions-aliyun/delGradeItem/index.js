// 删除年级项
'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const collection = db.collection('grade_list')
	const dailyReportLog = db.collection('daily_report_log') //  获取统计数据表
	const studentlist = db.collection("students")
	const majorlist = db.collection("major_list")
	const res = await collection.doc(event._id).remove() //删除
	let resData = res.data
	// 需要循环删除对应班级的数据
	let majorres = await majorlist.where({
		grade_id: event._id
	}).get()
	for(var i = 0; i < majorres.data.length; i++){
		let studentres = await studentlist.where({
			major_id: majorres.data[i]._id
		}).remove()
	}
	majorres = await majorlist.where({
		grade_id: event._id
	}).remove()
	// .then((res) => {
	// 		const promiseList = res.data.map(item => {
	// 			return majorCol.doc(item.grade_id).remove(); //删除
	// 		});
	// 		Promise.all(promiseList);
	// 	})
	// 	.catch((e) => {

	// 	});
	const reportres = await dailyReportLog.where({
			grade_id: dbCmd.eq(event._id),
		}).remove()
	//返回数据给客户端
	return resData
};
