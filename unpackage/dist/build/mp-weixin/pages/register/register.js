(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/register/register"],{"0879":function(n,e,t){"use strict";var o=t("77fb"),a=t.n(o);a.a},"568a":function(n,e,t){"use strict";var o={"wuc-tab":()=>t.e("components/wuc-tab/wuc-tab").then(t.bind(null,"27e1")),"uni-icons":()=>Promise.all([t.e("common/vendor"),t.e("components/uni-icons/uni-icons")]).then(t.bind(null,"173e"))},a=function(){var n=this,e=n.$createElement;n._self._c},c=[];t.d(e,"b",function(){return a}),t.d(e,"c",function(){return c}),t.d(e,"a",function(){return o})},"77fb":function(n,e,t){},"812a":function(n,e,t){"use strict";(function(n){t("a4ad"),t("921b");o(t("66fd"));var e=o(t("d986"));function o(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("543d")["createPage"])},c058:function(n,e,t){"use strict";t.r(e);var o=t("c5a8"),a=t.n(o);for(var c in o)"default"!==c&&function(n){t.d(e,n,function(){return o[n]})}(c);e["default"]=a.a},c5a8:function(n,e,t){"use strict";(function(n,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=function(){return t.e("components/wuc-tab/wuc-tab").then(t.bind(null,"27e1"))},c=function(){return Promise.all([t.e("common/vendor"),t.e("components/uni-icons/uni-icons")]).then(t.bind(null,"173e"))},u={data:function(){return{username:"",password:"",repeatPassword:"",tabList:[{name:"老师",icon:"cuIcon-comment"},{name:"学生",icon:"cuIcon-dianhua"}],userType:0,school:""}},components:{WucTab:a,uniIcons:c},computed:{},onLoad:function(){this.school=n.getStorageSync("school")},methods:{returnLogin:function(){n.switchTab({url:"/pages/login/login"})},tabChange:function(n){this.userType=n},signUp:function(){var e=this.username,t=this.password,a=this.repeatPassword,c=this.userType;a===t?(console.log(c),n.showLoading({title:"注册中..."}),o.callFunction({name:"signUp",data:{username:e,password:t,userType:c}}).then(function(e){if(n.hideLoading(),0!==e.result.status)return Promise.reject(new Error(e.result.msg));n.setStorageSync("token",e.result.token),n.showToast({icon:"none",title:"注册成功，请重新登录",success:function(){n.switchTab({url:"/pages/login/login"})}})}).catch(function(e){console.log(e),n.hideLoading(),n.showModal({content:"注册失败，"+e.message,showCancel:!1})})):n.showModal({content:"两次密码不一致",showCancel:!1})},validateToken:function(){n.showLoading({title:"加载中..."}),o.callFunction({name:"validateToken",data:{token:n.getStorageSync("token")}}).then(function(e){console.log(e),n.hideLoading(),n.showModal({content:e.result.msg,showCancel:!1})}).catch(function(e){n.hideLoading(),n.showModal({content:"请求云函数发生错误，"+e.message,showCancel:!1})})}},onReady:function(){}};e.default=u}).call(this,t("543d")["default"],t("a9ff")["default"])},d986:function(n,e,t){"use strict";t.r(e);var o=t("568a"),a=t("c058");for(var c in a)"default"!==c&&function(n){t.d(e,n,function(){return a[n]})}(c);t("0879");var u,i=t("f0c5"),s=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],u);e["default"]=s.exports}},[["812a","common/runtime","common/vendor"]]]);