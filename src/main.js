import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Axios from "axios";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// import "lib-flexible/flexible";
import * as utils from "@/untils/utils.js";

Vue.prototype.$utils = utils;

Vue.config.productionTip = false;
Vue.use(Element);
Vue.prototype.$http = Axios;

if (process.env.ONLINE) {
  alert(1111);
}

// 添加一个请求拦截器
Axios.interceptors.request.use(
  function(config) {
    config.headers.Token = localStorage.getItem("luck_draw_token");
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

// 添加一个响应拦截器
Axios.interceptors.response.use(
  function(res) {
    /* eslint-disable no-undef */
    let { code } = res.data;
    debugger;
    if (code !== 0) {
      // let msg = errorCode(subCode);
      //  msg && showToast(msg);
      console.log(res.data);
      return Promise.reject(res.data);
    }
    return res.data;
  },
  function(err) {
    // showToast("网络故障，请稍后再试");
    return Promise.reject(err);
  }
);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
