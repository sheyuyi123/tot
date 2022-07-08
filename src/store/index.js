import { getLocal, setLocal } from "@/utils/storage";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const tokenKey = "toutiao_token";

export default new Vuex.Store({
  // 用于存储全局状态数据
  state: {
    user: getLocal(tokenKey),
  },
  getters: {},
  // 修改状态的唯一入口
  // 只允许有同步状态
  mutations: {
    setUser(state, user) {
      // 存储vuex
      state.user = user;
      // 存储本地
      // localStorage.setItem(tokenKey, JSON.stringify(state));
      setLocal(tokenKey, user);
    },
  },
  // 异步状态修改
  actions: {},
  modules: {},
});
