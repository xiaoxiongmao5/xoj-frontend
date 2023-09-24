<template>
  <div id="app">
    <template v-if="route.path.startsWith('/user')">
      <router-view />
    </template>
    <template v-else>
      <BasicLayout />
    </template>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import BasicLayout from "./layouts/BasicLayout.vue";

const route = useRoute();

/**
 * 全局初始化函数，有全局单单次用的代码，都可以写在这里
 *
 */
const doInit = () => {
  console.log("hello 欢迎来到我的项目");
};
// 钩子函数
onMounted(() => {
  doInit();
});
</script>
