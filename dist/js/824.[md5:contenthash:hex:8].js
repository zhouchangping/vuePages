(self.webpackChunkvueWebpackCliDemo=self.webpackChunkvueWebpackCliDemo||[]).push([[824],{"./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-3[0].rules[0].use[2]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js??clonedRuleSet-3[0].rules[0].use[4]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/pages/loginUp/view/signin.vue?vue&type=style&index=0&id=64125e10&scoped=true&lang=css&":(e,s,o)=>{"use strict";o.r(s)},"./src/pages/loginUp/view/signin.vue":(e,s,o)=>{"use strict";o.r(s),o.d(s,{default:()=>t});var l=o("./node_modules/@babel/runtime-corejs3/core-js-stable/instance/trim.js"),d=o.n(l);const n={data:function(){return{title:"登陆",username:"",password:""}},created:function(){},methods:{fnSignup:function(){this.$router.push("/signin")},fnSubmit:function(){var e,s=this;""==d()(e=this.username).call(e)?s.$toast("请输入用户名！"):this.username.match(/[<'">]/g)?s.$toast("请输入合法字符！"):s.$axios({url:"/api/signin",method:"POST",data:{name:s.username,password:s.password}}).then((function(e){var o=e.data;""==o.data?s.$toast("用户名或密码错误"):(s.$toast("登录成功"),window.localStorage.setItem("token",o.token),window.localStorage.setItem("token_exp",(new Date).getTime()),window.location.href="/funds/index.html")})).catch((function(e){s.$toast(e)}))}}};o("./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-3[0].rules[0].use[2]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js??clonedRuleSet-3[0].rules[0].use[4]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/pages/loginUp/view/signin.vue?vue&type=style&index=0&id=64125e10&scoped=true&lang=css&");const t=(0,o("./node_modules/vue-loader/lib/runtime/componentNormalizer.js").Z)(n,(function(){var e=this,s=e.$createElement,o=e._self._c||s;return o("div",{staticClass:"page-better"},[o("van-form",{staticClass:"page-form",on:{submit:e.fnSubmit}},[o("van-field",{attrs:{name:"用户名",label:"用户名",placeholder:"用户名",rules:[{required:!0,message:"请填写用户名"}]},model:{value:e.username,callback:function(s){e.username=s},expression:"username"}}),e._v(" "),o("van-field",{attrs:{type:"password",name:"请输入密码",label:"请输入密码",placeholder:"请输入密码",rules:[{required:!0,message:"请填写密码"}]},model:{value:e.password,callback:function(s){e.password=s},expression:"password"}}),e._v(" "),o("div",{staticStyle:{margin:"16px"}},[o("van-button",{attrs:{round:"",size:"large",type:"info","native-type":"submit"}},[e._v("\n        登陆\n      ")])],1),e._v(" "),o("div",{staticClass:"page-signup",on:{click:e.fnSignup}},[e._v("去注册")])],1)],1)}),[],!1,null,"64125e10",null).exports},"./node_modules/vue-style-loader/index.js!./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-3[0].rules[0].use[2]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js??clonedRuleSet-3[0].rules[0].use[4]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/pages/loginUp/view/signin.vue?vue&type=style&index=0&id=64125e10&scoped=true&lang=css&":(e,s,o)=>{var l=o("./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-3[0].rules[0].use[2]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js??clonedRuleSet-3[0].rules[0].use[4]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./src/pages/loginUp/view/signin.vue?vue&type=style&index=0&id=64125e10&scoped=true&lang=css&");"string"==typeof l&&(l=[[e.id,l,""]]),l.locals&&(e.exports=l.locals);(0,o("./node_modules/vue-style-loader/lib/addStylesClient.js").Z)("f1acd42a",l,!0,{})}}]);