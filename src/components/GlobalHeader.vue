<template>
  <a-row id="globalHeader" align="center" :wrap="false">
    <a-col flex="auto">
      <!-- :default-selected-keys="['1']" -->
      <a-menu
        mode="horizontal"
        :selected-keys="selectedKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img class="logo" src="../assets/logo.svg" alt="" />
            <div class="title">XOJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>
        <template
          v-if="
            store.state.user &&
            store.state.user.loginUser &&
            store.state.user.loginUser.userName &&
            store.state.user.loginUser.userName !== '未登录'
          "
        >
          <!-- {{ store.state.user?.loginUser?.userName ?? "未登录" }} -->
          <a-dropdown @select="handleSelect">
            <a-button type="text">{{
              store.state.user.loginUser.userName
            }}</a-button>
            <template #content>
              <a-doption :value="{ value: 'logout' }">退出登录</a-doption>
            </template>
          </a-dropdown>
        </template>
        <template v-else>
          <a-button type="text" @click="toLoginPage">未登录</a-button>
        </template>
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRoute, useRouter } from "vue-router";
import { computed, ref, useSlots } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";
import { Service } from "../../generated";
import message from "@arco-design/web-vue/es/message";

const router = useRouter();
const store = useStore();

// 获取路由信息
// const route = useRoute();

const handleSelect = (v) => {
  console.log(v);
  // 退出登录
  if (v.value === "logout") {
    Service.postUserLogout();
    toLoginPage();
  }
};

/**
 * 跳转到登录界面
 * @param question
 */
const toLoginPage = () => {
  router.push({
    path: `/user/login`,
  });
};

// 展示在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    // 根据权限过滤菜单
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

// 默认主页
const selectedKeys = ref(["/"]);

// 路由跳转时，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

console.log("store.state.user", store.state.user);

// setTimeout(() => {
//   //   store.dispatch("user/getLoginUser", {
//   store.dispatch("getLoginUser", {
//     username: "小熊",
//     userRole: ACCESS_ENUM.ADMIN,
//   });
// }, 3000);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}
.logo {
  height: 48px;
}
.title {
  color: #444;
  margin-left: 16px;
}
</style>
