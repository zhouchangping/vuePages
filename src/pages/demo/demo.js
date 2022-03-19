import Vue from "vue";
import home from "./demo.vue";
import axios from "axios";
import Vuex from "vuex";
Vue.use(Vuex);
console.log('demo')

Vue.prototype.$ajax = axios;
new Vue({
  render: h => h(home)
}).$mount("#demo");