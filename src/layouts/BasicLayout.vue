<!--
 * @Author: 小熊 627516430@qq.com
 * @Date: 2023-09-22 14:45:49
 * @LastEditors: 小熊 627516430@qq.com
 * @LastEditTime: 2023-10-16 00:22:23
 * @FilePath: /xoj-frontend/src/layouts/BasicLayout.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="basicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
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

<script lang="ts">
import GlobalHeader from "@/components/GlobalHeader.vue";
import { Icon } from "@arco-design/web-vue";
export default {
  components: { GlobalHeader },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#basicLayout {
}
#basicLayout .header {
  box-shadow: #eee 1px 1px 5px;
}
#basicLayout .content {
  background: linear-gradient(to right, #fefefe, #fff);
  margin-bottom: 16px;
  padding: 20px;
}
#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}

#basicLayout .footer a {
  margin-right: 8px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.65);
  /* color: rgba(0, 0, 0, 0.88); */
  font-size: 14px;
  font-weight: 400;
}
</style>
