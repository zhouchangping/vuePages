import Vue from "vue";
import loginUp from "./loginUp.vue";
import router from "./router";
import Vuex from "vuex";
Vue.use(Vuex);
import axios from "@/utils/axiosUtil.js"; // ajax
import "@/utils/mainInfo.js";
Vue.use(axios); // 使用axios
new Vue({
  el: "#loginUp",
  router,
  render: h => h(loginUp)
})