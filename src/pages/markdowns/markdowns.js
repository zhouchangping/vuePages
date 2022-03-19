import Vue from "vue";
import markdowns from "./markdowns.vue";
import router from "./router";
import 'prismjs/themes/prism.css';
import '@/assets/css/markdownAll.scss';
import "@/assets/css/page.scss";
import "@/assets/css/reset.scss";
import "@/utils/mainInfo.js";
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts;
import Vuex from "vuex";
import axios from "@/utils/axiosUtil.js"; // ajax
Vue.use(axios); // 使用axios
Vue.use(Vuex);
new Vue({
  el: "#markdowns",
  router,
  components: {
    markdowns
  },
  render: h => h(markdowns)
});
