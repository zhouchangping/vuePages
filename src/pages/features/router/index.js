import Vue from "vue";
import Router from "vue-router";

import css from "./css.js";
import javascript from "./javascript.js";

//合并两个路由
const routes = new Set([...css, ...javascript]);

Vue.use(Router);
let router = new Router({
  // scrollBehavior (to, from, savedPosition) {
  //   return { x: 0, y: 0 }
  // },
  routes: routes
});

// router.beforeEach((to, from, next) => { // 路由守卫
// });

export default router;