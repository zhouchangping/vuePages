import Vue from "vue";
import VueRouter from "vue-router";
import 'core-js/modules/es.promise';
const Login = () => import("./login/login.vue"); // https://juejin.im/post/5c8f1513e51d45134130b9df
// 下面2行代码，没有指定webpackChunkName，每个组件打包成一个js文件。
// const ImportFuncDemo1 = () => import('../components/ImportFuncDemo1')
// const ImportFuncDemo2 = () => import('../components/ImportFuncDemo2')

// 下面2行代码，指定了相同的webpackChunkName，会合并打包成一个js文件。
// const ImportFuncDemo = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../components/ImportFuncDemo')
// const ImportFuncDemo2 = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../components/ImportFuncDemo2')


Vue.use(VueRouter);

// const routes = [{
//   path: '/',
//   name: 'login',
//   component: r => {
//     require(['./login/login'], r)
//   },
//   meta: {
//     title: 'console 登录'
//   }
// }]

const routes = [{
  path: "/",
  name: "login",
  component: Login,
  meta: {
    title: "console 登录1"
  }
}];

export default new VueRouter({
  routes: routes
});