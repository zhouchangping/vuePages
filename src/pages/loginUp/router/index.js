import Vue from "vue";
import VueRouter from "vue-router";
// import 'core-js/modules/es.promise';

const signin = () => import("../view/signin.vue");
const signup = () => import("../view/signup.vue");

Vue.use(VueRouter);

const routes = [{
  path: "/",
  name: "signin",
  component: signin,
  meta: {
    title: "登陆"
  }
},{
  path: "/",
  name: "signup",
  component: signup,
  meta: {
    title: "注册"
  }
},];

export default new VueRouter({
  routes: routes
});