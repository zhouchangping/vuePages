
const bg = () => import("../view/css/bg.vue");
const bgBubble = () => import("../view/css/bg-bubble.vue");
const animation = () => import("../view/css/animation.vue");
const canvasCssButton = () => import("../view/css/canvasCssButton.vue");
const numberMove = () => import("../view/css/numberMove.vue");
const routes = [{
  path: "/",
  name: "bgBubble",
  component: bgBubble,
}, {
  path: "/bg",
  name: "bg",
  component: bg,
}, {
  path: "/animation",
  name: "animation",
  component: animation,
}, {
  path: "/canvasCssButton",
  name: "canvasCssButton",
  component: canvasCssButton,
}, {
  path: "/numberMove",
  name: "numberMove",
  component: numberMove,
}
];
export default routes;