import Vue from "vue";
import home from "./ui.vue";
import axios from "axios";
import Vuex from "vuex";
import "@/assets/css/page.scss";
import "@/assets/css/reset.scss";
Vue.use(Vuex);
console.log('ui')

Vue.prototype.$ajax = axios;
new Vue({
  render: h => h(home)
}).$mount("#ui");