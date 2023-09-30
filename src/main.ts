/*
 * @Author: 小熊 627516430@qq.com
 * @Date: 2023-09-21 22:47:45
 * @LastEditors: 小熊 627516430@qq.com
 * @LastEditTime: 2023-09-30 22:19:16
 * @FilePath: /xoj-frontend/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import "@/plugins/axios";
import "@/access/index";
import "bytemd/dist/index.css";

createApp(App).use(ArcoVue).use(store).use(router).mount("#app");
