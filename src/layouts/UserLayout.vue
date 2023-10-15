<!--
 * @Author: 小熊 627516430@qq.com
 * @Date: 2023-09-24 21:41:28
 * @LastEditors: 小熊 627516430@qq.com
 * @LastEditTime: 2023-10-16 00:28:45
 * @FilePath: /xoj-frontend/src/layouts/UserLayout.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/logo.svg" class="logo" />
          <div style="font-weight: 600; font-size: 33px">X OJ</div>
        </a-space>
        <div
          style="color: rgba(0, 0, 0, 0.65); font-size: 14px; margin-top: 8px"
        >
          一个编程题目评测系统
        </div>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <div style="margin-bottom: 8px">
          <a href="http://github.com/xiaoxiongmao5/xoj" target="_blank"
            >GitHub</a
          >
          <a href="http://github.com/xiaoxiongmao5" target="_blank"
            ><icon-github :size="14"
          /></a>
          <a href="https://blog.csdn.net/trinityleo5" target="_blank"
            ><icon-book :size="14"
          /></a>
          <a href="http://github.com/xiaoxiongmao5" target="_blank">XOJ</a>
        </div>
        <div>
          <a style="olor: rgba(0, 0, 0, 0.88); margin-right: 4px"
            ><icon-copyright :size="16"
          /></a>
          <a style="color: rgba(0, 0, 0, 0.88)">2023 程序媛-小熊出品</a>
        </div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts"></script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#userLayout {
  text-align: center;
  /* background-color: #eee; */
  background-image: url("https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr");
  background-size: 100% 100%;
}
#userLayout .logo {
  width: 44px;
  height: 44px;
  margin-inline-end: 10px;
  vertical-align: top;
}
#userLayout .header {
  margin-top: 64px;
}
#userLayout .content {
  margin-bottom: 16px;
  padding: 32px;
}
#userLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

#userLayout .footer a {
  margin-right: 8px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.65);
  /* color: rgba(0, 0, 0, 0.88); */
  font-size: 14px;
  font-weight: 400;
}
</style>
