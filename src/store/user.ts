/*
 * @Author: 小熊 627516430@qq.com
 * @Date: 2023-09-22 16:15:19
 * @LastEditors: 小熊 627516430@qq.com
 * @LastEditTime: 2023-09-30 14:15:12
 * @FilePath: /xoj/xoj-frontend/src/store/user.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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

export default {
  namespace: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),
  getters: {},
  actions: {
    async getLoginUser({ commit, state }, payload) {
      // 从远程请求获取登录信息
      const res = await Service.getUserGetLogin();
      console.log("res=", res);
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
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
