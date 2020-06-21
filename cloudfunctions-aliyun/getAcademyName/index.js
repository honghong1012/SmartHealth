'use strict';
const db = uniCloud.database()
const dbCmd = db.command
exports.main = async (event, context) => {
  //event为客户端上传的参数
  console.log('event : ' + event)
  
  let academylist = db.collection('academy_list')
  let academyres = await academylist.where({
  	_id: dbCmd.eq(event.academy_id)
  }).get()
  
  console.log("academyres", academyres)
  // 返回指定了年级id后的专业列表
  let resData = academyres.data[0].name
  //返回数据给客户端
  return resData
};
