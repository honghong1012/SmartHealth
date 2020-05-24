// 获取年级列表数据
'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ' + event)
	const collection = db.collection('academy_list')
	const res = await collection.orderBy("order", "asc").get()
	console.log("res:", res)
	let resData = {}
	let grade = {}
	if(res.data.length>0){
		// 年级名单
	    resData.academyList = res.data;
		let gradeCol = db.collection("grade_list")
	    for (var i = 0; i < res.data.length; i++) {
	        let gradeRes = await gradeCol.where({
	            academy_id:res.data[i]._id
	        }).orderBy("order","asc").get()
	        
	        console.log("grade_res",gradeRes)
			  // grade键为学院id，值为该学院下的年级记录
	        // grade[res.data[i]._id] = gradeRes.data
			let majorCol = db.collection("major_list")
			for (var j = 0; j < gradeRes.data.length; j++) {
			    let majorRes = await majorCol.where({
			        grade_id:gradeRes.data[j]._id
			    }).orderBy("order","asc").get()
			      
			    console.log("major_res",majorRes)
				// major键为年级id，值为该年级下的专业记录
			    resData[gradeRes.data[j]._id] = majorRes.data
			}
	    }
	//返回数据给客户端
	return resData
	}
};
