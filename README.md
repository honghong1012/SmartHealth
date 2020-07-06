基于码云gitee项目https://gitee.com/dcloud/xinguan2020-xuesheng二次开发


### 空间与小程序appID设置
- 在`main.js`中设置空间的`spaceId`、`clientSecret`；
- 在`manifest.json`中设置微信小程序的`appID`，否则微信端获取的code为：`the code is a mock one`；
- 在`cloudfunctions-dev/src/utils/constants.js`中设置`AppId`、`AppSecret`、`passSecret`字段，否则不能获取`openid`;


## 项目运行和部署说明  

- 本项目需要[HBuilderX 2.5.8（Alpha版）](https://www.dcloud.io/hbuilderx.html)以上版本才能运行。  

- 项目需要[注册](https://dev.dcloud.net.cn/)和开通uniCloud ,因阿里云审核要求,需要实名认证。

- 拉取项目源码后,对`cloudfunctions`目录点右键,选择你的服务空间。如果没有服务空间,需要创建,创建时会引导登录和注册uniCloud。
  
- 配好服务空间后,请根据项目下的[db.md](db.md)文件,在你的云数据库中创建相应的表。具体方式是对`cloudfunctions`目录点右键,打开uniCloud web控制台,在里面的云数据库界面点击"新建表",表名里把[db.md](db.md)涉及的表名都创建一遍。

- 对每个云函数（文件夹）点右键，"上传并部署"到你的服务空间中。

- 修改`manifest.json`中的`DCloud_AppID`为自己的。

- 最后，可以运行了。如果是win版,可以直接运行在内置浏览器。如果是mac版,内置浏览器也有跨域问题,需要运行到小程序模拟器或app中,或者给mac的外部浏览器[安装跨域插件](https://ask.dcloud.net.cn/article/35267)。


- 项目前端基于uni-app框架开发，它是一个通过vue.js编写所有平台应用的多端框架。你需要了解uni-app以便于更深度的定制。uni-app的文档详见：[https://uniapp.dcloud.io/README](https://uniapp.dcloud.io/README)
- 项目后端基于uniCloud，它是一个基于js的云开发模式，与微信、支付宝小程序的云开发类似，但可以跨端使用。它基于serverless模型，优势众多。建议开发者通读一遍uniCloud的介绍和快速上手，以方便做二次开发。uniCloud的文档详见：[https://uniapp.dcloud.io/uniCloud/README](https://uniapp.dcloud.io/uniCloud/README)
