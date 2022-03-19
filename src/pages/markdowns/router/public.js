import webview from "../view/public/js/原生webview和javascript交互.md";
import urlToPage from "../view/public/js/从输入URL到页面加载发生了什么.md";
import vueRouter from "../view/public/js/vue-router.md";

const routes = [
  {
    path: "/webview",
    name: "webview",
    component: webview,
    meta: {
      title: "webview"
    }
  }, {
    path: "/urlToPage",
    name: "urlToPage",
    component: urlToPage,
    meta: {
      title: "urlToPage"
    }
  }, {
    path: "/vueRouter",
    name: "vueRouter",
    component: vueRouter,
    meta: {
      title: "vueRouter"
    }
  }];
export default routes;