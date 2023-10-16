/*
 * @Author: 小熊 627516430@qq.com
 * @Date: 2023-09-21 22:47:45
 * @LastEditors: 小熊 627516430@qq.com
 * @LastEditTime: 2023-10-16 21:46:22
 * @FilePath: /xoj-frontend/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ArcoVue from "@arco-design/web-vue";
// 额外引入图标库
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import "@arco-design/web-vue/dist/arco.css";
import "@/plugins/axios";
import "@/access/index";
import "bytemd/dist/index.css";
// import "highlight.js/styles/atom-one-dark-reasonable.css";
import "highlight.js/styles/a11y-light.css";
// 引入bytemd中文设置
import "bytemd/dist/index.css";
// // 引入数学模块
// import "katex/dist/katex.css";

createApp(App)
  .use(ArcoVue)
  .use(ArcoVueIcon)
  .use(store)
  .use(router)
  .mount("#app");
