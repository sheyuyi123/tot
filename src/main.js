import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./styles/index.less";
// 引入自定义封装icon组件
import TouiaoIcon from "@/components/TouiaoIcon";
// 注册全局icon组件
Vue.component("TouiaoIcon", TouiaoIcon);
// 引入Vant
import Vant from "vant";
// 引入Vant样式
import "vant/lib/index.less";
// 注册Vant
Vue.use(Vant);
// 引入rem的插件
import "amfe-flexible";
// 测试一下接口是否可用
// import request from "@/utils/request";
// request.get("/v1_0/channels").then((res) => {
//   console.log(res.data.data.channels);
// });
// 注册全局时间包
import "@/utils/dayjs";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
