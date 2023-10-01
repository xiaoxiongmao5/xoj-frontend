<!--
 * @Author: 小熊 627516430@qq.com
 * @Date: 2023-09-21 22:47:45
 * @LastEditors: 小熊 627516430@qq.com
 * @LastEditTime: 2023-10-01 17:59:43
 * @FilePath: /xoj-frontend/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
  /* text-align: center; */
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
