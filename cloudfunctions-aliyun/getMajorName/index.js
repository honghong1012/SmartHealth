'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log('event : ' + event)
  
  let majorlist = db.collection('major_list')
  let majorres = await majorlist.where({
  	_id: dbCmd.eq(event.major_id)
  }).get()
  
  console.log("majorres", majorres)
  // 返回指定了年级id后的专业列表
  let resData = majorres.data[0].name
  //返回数据给客户端
  return resData
};
