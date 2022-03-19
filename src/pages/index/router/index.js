import Vue from "vue";
import VueRouter from "vue-router";
const homeList = () => import("../view/home-list.vue");

Vue.use(VueRouter);

const routes = [{
  path: "/",
  name: "homeList",
  component: homeList,
  meta: {
    title: "首页"
  }
}];

export default new VueRouter({
  routes: routes
});