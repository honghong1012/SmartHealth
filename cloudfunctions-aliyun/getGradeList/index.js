'use strict';

const db = uniCloud.database()

exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log('event : ' + event)
  
  // const collection = db.collection('grade_list')
  const collection = db.collection('academy_list')
  // 学院名单
  const res = await collection.orderBy("order","asc").get()
  console.log("res:",res)
  
  
  let resData = {}
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
          resData[res.data[i]._id] = gradeRes.data
		  
		  // let majorCol = db.collection("major_list")
		  // for (var i = 0; i < gradeRes.data.length; i++) {
		  //     let majorRes = await majorCol.where({
		  //         grade_id:gradeRes.data[i]._id
		  //     }).orderBy("order","asc").get()
		      
		  //     console.log("major_res",majorRes)
			 //  // major键为年级id，值为该年级下的专业记录
		  //     major[gradeRes.data[i]._id] = majorRes.data
		  // }
      }
	  // 专业名单
	  // resData.gradeList = grade;
	  // resData.academyList = res.data;
	  //       let classCol = db.collection("grade_list")
	  //       for (var i = 0; i < res.data.length; i++) {
	  //           let classRes = await classCol.where({
	  //               academy_id:res.data[i]._id
	  //           }).orderBy("order","asc").get()
	            
	  //           console.log("class_res",classRes)
	            
	  //           resData[res.data[i]._id] = classRes.data
	  //       }
  }else{
      console.log("length is 0??")
  }
  //返回数据给客户端
  return resData
};
