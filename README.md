基于码云gitee项目 https://gitee.com/dcloud/xinguan2020-xuesheng 二次开发


### 空间与小程序appID设置
- 在`main.js`中设置空间的`spaceId`、`clientSecret`；
- 在`manifest.json`中设置微信小程序的`appID`，否则微信端获取的code为：`the code is a mock one`；
- 在`cloudfunctions-dev/src/utils/constants.js`中设置`AppId`、`AppSecret`、`passSecret`字段，否则不能获取`openid`;


### 项目运行和部署说明  

- 本项目需要[HBuilderX 2.5.8（Alpha版）](https://www.dcloud.io/hbuilderx.html)以上版本才能运行。  

- 项目需要[注册](https://dev.dcloud.net.cn/)和开通uniCloud ,因阿里云审核要求,需要实名认证。

- 拉取项目源码后,对`cloudfunctions`目录点右键,选择你的服务空间。如果没有服务空间,需要创建,创建时会引导登录和注册uniCloud。
  
- 配好服务空间后,请根据项目下的[db.md](db.md)文件,在你的云数据库中创建相应的表。具体方式是对`cloudfunctions`目录点右键,打开uniCloud web控制台,在里面的云数据库界面点击"新建表",表名里把[db.md](db.md)涉及的表名都创建一遍。

- 对每个云函数（文件夹）点右键，"上传并部署"到你的服务空间中。

- 修改`manifest.json`中的`DCloud_AppID`为自己的。

- 最后，可以运行了。如果是win版,可以直接运行在内置浏览器。如果是mac版,内置浏览器也有跨域问题,需要运行到小程序模拟器或app中,或者给mac的外部浏览器[安装跨域插件](https://ask.dcloud.net.cn/article/35267)。


- 项目前端基于uni-app框架开发，它是一个通过vue.js编写所有平台应用的多端框架。你需要了解uni-app以便于更深度的定制。uni-app的文档详见：[https://uniapp.dcloud.io/README](https://uniapp.dcloud.io/README)
- 项目后端基于uniCloud，它是一个基于js的云开发模式，与微信、支付宝小程序的云开发类似，但可以跨端使用。它基于serverless模型，优势众多。建议开发者通读一遍uniCloud的介绍和快速上手，以方便做二次开发。uniCloud的文档详见：[https://uniapp.dcloud.io/uniCloud/README](https://uniapp.dcloud.io/uniCloud/README)

登录界面：

![image](https://github.com/a123wyn/Student-information-reporting-system/blob/master/images/%E5%9B%BE%E7%89%871.jpg)
![image](https://github.com/a123wyn/Student-information-reporting-system/blob/master/images/%E5%9B%BE%E7%89%872.jpg)

### 学生端
进入学生端口后，学生可以进行注册并绑定其学生信息（如学院、年级、专业学号、姓名）以便于后面的老师端口进行管理

![image](https://github.com/a123wyn/Student-information-reporting-system/blob/master/images/%E5%9B%BE%E7%89%873.png)

绑定信息后，便可以进入每日登记健康信息的界面进行体温等健康信息的登记

![image](https://github.com/a123wyn/Student-information-reporting-system/blob/master/images/%E5%9B%BE%E7%89%874.jpg)
![image](https://github.com/a123wyn/Student-information-reporting-system/blob/master/images/%E5%9B%BE%E7%89%875.jpg)

### 老师端
进入老师端口后，老师可以对学生的名单进行管理以及查看学生报备上了的总数据

![image](https://github.com/a123wyn/Student-information-reporting-system/blob/master/images/%E5%9B%BE%E7%89%876.jpg)

对学生的名单进行管理时可以对所管理的学生班级/年级进行查看修改删除等操作

![image](https://github.com/a123wyn/Student-information-reporting-system/blob/master/images/%E5%9B%BE%E7%89%877.png)
![image](https://github.com/a123wyn/Student-information-reporting-system/blob/master/images/%E5%9B%BE%E7%89%878.png)

查看学生报备情况时可以选择相应的班级/年级查看实时学生信息报备的情况

![image](https://github.com/a123wyn/Student-information-reporting-system/blob/master/images/%E5%9B%BE%E7%89%879.png)

此外，还可以在登陆界面查看全国以及全球实时疫情状况，了解疫情的实时情况。此模块用了网上的接口，运用反向代理实现页面跳转，但因为非企业小程序无法使用反向代理的业务域名，所以体验版无法展示疫情动态实时信息，截图取自开发者工具的预览。

![image](https://github.com/a123wyn/Student-information-reporting-system/blob/master/images/%E5%9B%BE%E7%89%8710.png)
