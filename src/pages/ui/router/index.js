import Vue from "vue";
import VueRouter from "vue-router";
import 'core-js/modules/es.promise';
const bgBubble = () => import("../view/bg-bubble.vue");

Vue.use(VueRouter);

const routes = [{
  path: "/",
  name: "bgBubble",
  component: bgBubble,
  meta: {
    title: "气泡"
  }
}];

export default new VueRouter({
  routes: routes
});