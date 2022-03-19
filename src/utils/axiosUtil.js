import axios from "axios";

class HttpRequest {
  constructor(baseUrl = "") {
    this.baseUrl = baseUrl;
    this.queue = {};
    this.source = null;
  }
  request (options) {
    // this.source = axios.CancelToken.source();
    // let CancelToken = this.source.token();
    const instance = axios.create();
    options = Object.assign(this.getInsideConfig(), options, {
      // CancelToken
    });
    this.interceptors(instance, options.url);
    return instance(options);
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
    };
    return config;
  } 
  destroy (url) {
    delete this.queue[url];
  }
  interceptors (instance, url) {
    instance.interceptors.request.use((config) => {
      let token = window.localStorage.getItem("token");
      if (token) {
        config.headers.common["Authorization"] = "Bearer " + token; // 设置token
      }
      this.queue[url] = true;
      return config;
    }, (error) => {
      return Promise.reject(error);
    });
    instance.interceptors.response.use((res) => {
      this.destroy(url);
      const { data, status } = res;
      return {
        data,
        status
      };
    }, (error) => {
      this.destroy(url);
      return Promise.reject(error);
    });
  }
  install (Vue) {
    Vue.prototype.$axios = this.request.bind(this);
  }
}
let axiosHttp = "";
const isDev = process.env.NODE_ENV != "production";
// console.log(isDev);
if (isDev) {
  axiosHttp = new HttpRequest("/api");
} else {
  axiosHttp = new HttpRequest("http://49.235.238.235:3000");
}


export default axiosHttp;


