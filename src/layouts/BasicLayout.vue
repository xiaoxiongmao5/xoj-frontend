<template>
  <div id="basicLayout">
    <a-layout style="height: 400px">
      <a-layout-header class="header">
        <GlobalHeader />
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

<script lang="ts">
import GlobalHeader from "@/components/GlobalHeader";
export default {
  components: { GlobalHeader },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#basicLayout {
}
#basicLayout .header {
  /* margin-bottom: 16px; */
  box-shadow: #eee 1px 1px 5px;
}
#basicLayout .content {
  background: linear-gradient(to right, #eee, #fff);
  margin-bottom: 16px;
}
#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
