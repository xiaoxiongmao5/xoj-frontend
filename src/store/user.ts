import ACCESS_ENUM from "@/access/accessEnum";
import { StoreOptions } from "vuex";

// // 存储的状态信息，比如用户信息
// const state = () => ({
//   loginUser: {
//     userName: "未登录",
//   },
// });

// const getters = {};

// // （尽量同步）定义了对变量进行增删改（更新）的方法
// const mutations = {
//   updateUser(state, userInfo) {
//     state.loginUser = userInfo;
//   },
// };

// // （支持异步）执行异步操作，并且触发 mutation 的更改（actions 调用 mutation）
// const actions = {
//   async getLoginUser({ commit, state }, userInfo) {
//     commit("updateUser", {
//       userName: "小熊",
//     });
//   },
// };

export default {
  namespace: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
      userRole: ACCESS_ENUM.NOT_LOGIN,
    },
  }),
  getters: {},
  actions: {
    async getLoginUser({ commit, state }, payload) {
      commit("updateUser", payload);
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
