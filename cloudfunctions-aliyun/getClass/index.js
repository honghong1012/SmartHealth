// 根据年级ID获取班级列表数据
'use strict';

const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
	
	
	//event为客户端上传的参数
	console.log('event : ' + event)
	let major_col = db.collection('major_list')
	let res = await major_col.where({
		grade_id: dbCmd.eq(event.grade_id)
	}).orderBy("order", "asc").get()
	
	console.log("res", res)
	// 返回指定了年级id后的专业列表
	let resData = res.data
	//返回数据给客户端
	return resData
};//
