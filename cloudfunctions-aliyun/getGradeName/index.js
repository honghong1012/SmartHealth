'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log('event : ' + event)
  
  let gradelist = db.collection('grade_list')
  let graderes = await gradelist.where({
  	_id: dbCmd.eq(event.grade_id)
  }).get()
  
  console.log("graderes", graderes)
  // 返回指定了年级id后的专业列表
  let resData = graderes.data[0].name
  //返回数据给客户端
  return resData
};
