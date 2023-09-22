<template>
  <a-row id="globalHeader" align="center" style="margin-bottom: 16px">
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
        <a-menu-item v-for="item in routes" :key="item.path">
          {{ item.name }}
        </a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>
        {{ store.state.user?.loginUser?.userName ?? "未登录" }}
      </div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRoute, useRouter } from "vue-router";
import { ref, useSlots } from "vue";
import { useStore } from "vuex";

// 获取路由信息
// const route = useRoute();

const router = useRouter();

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

const store = useStore();
console.log(store.state.user);

setTimeout(() => {
  //   store.dispatch("user/getLoginUser", {
  store.dispatch("getLoginUser", {
    userName: "小熊",
    role: "admin",
  });
}, 5000);
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
