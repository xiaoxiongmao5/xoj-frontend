<template>
  <div class="userLoginView">
    <h2 style="margin-bottom: 16px">用户登录</h2>
    <a-form
      :model="form"
      @submit="handleSubmit"
      label-align="left"
      auto-label-width
      style="max-width: 480px; margin: 0 auto"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于8位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 120px"
          >提交</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const form = reactive({
  userAccount: "",
  userPassword: "",
});

function test(param: any) {
  return {
    code: 0,
    message: "",
    data: {},
  };
}

const router = useRouter();
const store = useStore();

/**
 * 提交表单
 *
 */
const handleSubmit = async () => {
  const res = await test(form);
  if (res.code === 0) {
    // 登录成，跳转到主页
    router.push({
      path: "/",
      replace: true,
    });
    store.dispatch("getLoginUser");
  } else {
    Message.error("登录失败，" + res.message);
  }
};
</script>
