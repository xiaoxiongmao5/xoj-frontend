import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "./accessEnum";
import checkAccess from "./checkAccess";

router.beforeEach(async (to, from, next) => {
  console.log("登录用户信息", store);
  const loginUser = store.state.user.loginUser;
  // 如果之前没有登录过，自动登录
  if (!loginUser || !loginUser.userrole) {
    await store.dispatch("getLoginUser");
  }
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  //  要跳转的页面必须要登录
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果没有登录，跳转到登录页面
    if (!loginUser || !loginUser.userrole) {
      console.log("未登录", loginUser);
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    // 如果已经登录了，但是权限不足，就跳转到无权限界面
    if (!checkAccess(loginUser, needAccess)) {
      console.log("权限不足");
      next("/noAuth");
      return;
    }
  }

  next();
});
