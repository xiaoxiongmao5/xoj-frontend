import ACCESS_ENUM from "@/access/accessEnum";
import { StoreOptions } from "vuex";
import { Service } from "../../generated";

// // 存储的状态信息，比如用户信息
// const state = () => ({
//   loginUser: {
//     username: "未登录",
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
//       username: "小熊",
//     });
//   },
// };

// function test() {
//   return {
//     code: 0,
//     data: {
//       username: "小熊",
//       userrole: ACCESS_ENUM.USER,
//     },
//   };
// }

export default {
  namespace: true,
  state: () => ({
    loginUser: {
      username: "未登录",
    },
  }),
  getters: {},
  actions: {
    async getLoginUser({ commit, state }, payload) {
      // 从远程请求获取登录信息
      const res = await Service.getUserUinfo();
      console.log("res=", res);
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userrole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
  },
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
