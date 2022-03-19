
const zz = () => import("../view/javascript/zhengze.vue");
const list = () => import("../view/javascript/list.vue");
const ar = () => import("../view/javascript/ar.vue");
const routes = [{
  path: "/zz",
  name: "zz",
  component: zz,
}, {
  path: "/list",
  name: "list",
  component: list,
}, {
  path: "/ar",
  name: "ar",
  component: ar,
}];
export default routes;