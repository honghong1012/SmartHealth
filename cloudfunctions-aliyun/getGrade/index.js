'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
  console.log('event : ' + event)
  
  let resData = []

	let gradeCol = db.collection("grade_list")
	let gradeRes = await gradeCol.where({
		academy_id:dbCmd.eq(event.academy_id)
	}).orderBy("order","asc").get()
	
	console.log("grade_res",gradeRes)
	// 返回指定了学院id后的年级列表
	resData = gradeRes.data
  //返回数据给客户端
  return resData
};
