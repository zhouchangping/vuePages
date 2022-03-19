import Vue from "vue";
import Router from "vue-router";

import dailyAlgorithm from "./dailyAlgorithm.js";
import javascript from "./javascript.js";
import publics from "./public.js";
import financial from "./financial.js";

//合并两个路由
const routes = new Set([...dailyAlgorithm, ...javascript, ...publics, ...financial]);

Vue.use(Router);
let router = new Router({
  routes: routes
});


// router.beforeEach((to, from, next) => { // 路由守卫
//   // to 将要访问的路径
//   // from 代表从哪个路径跳转过来
//   // next 是一个函数，表示放行
//   // next() 放行  next('/login')跳转到登录页面
//   // console.log(to);
//   // console.log(from);
//   let token = window.localStorage.getItem("token");
//   let token_exp = window.localStorage.getItem("token_exp");
//   if (!token) {
//     if (to.path !== "/signin" && to.path !== "/signup") {
//       // return next("/signin"); // 如果访问的不是登录页,没有token，直接去signin
//       window.location.href="/funds/loginUp.html"
//     } else {
//       return next(); // 如果访问的是登录页,并且没有token，直接通过
//     }
//   } else {
//     if (((new Date().getTime() - token_exp) / 86400000) > 1) {
//       window.localStorage.removeItem("token_exp", "");
//       window.localStorage.removeItem("token", "");
//       // return next("/signin"); // 超过时间了，直接去signin
//       window.location.href="/funds/loginUp.html"
//     }
//     // if (to.path == "/signin") {
//     //   return next("/"); // 如果访问的是登录页,有token，直接去jsMainPage
//     // }
//     // if (to.path == "/signup") { // 如果访问的是注册页,有token，清空token
//     //   window.localStorage.removeItem("token", "");
//     // }
//   }
//   // 如果存在token直接放行
//   next();
// });

// router.beforeEach
export default router;