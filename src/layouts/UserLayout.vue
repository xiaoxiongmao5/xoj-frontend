<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img src="../assets/logo.svg" class="logo" />
          <div style="font-weight: 600; font-size: 33px">X OJ</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="http://github.com/xiaoxiongmao5" target="_blank">
          by 程序媛小熊
        </a>
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
  padding: 30px;
}
#userLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
