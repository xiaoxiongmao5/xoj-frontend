<template>
  <div class="userLoginView">
    <h2 style="margin-bottom: 16px">账户密码登录</h2>
    <a-form
      :model="form"
      size="large"
      @submit="handleSubmit"
      label-align="left"
      auto-label-width
      style="max-width: 320px; margin: 0 auto"
    >
      <a-form-item
        field="userAccount"
        :validate-trigger="['change', 'input']"
        :rules="[
          { minLength: 4, message: '账号长度不能少于4位' },
          { maxLength: 16, message: '账号长度不能超过16位' },
        ]"
      >
        <a-input v-model="form.userAccount" placeholder="账号 (4~16位)" />
      </a-form-item>
      <a-form-item
        field="userPassword"
        :validate-trigger="['change', 'input']"
        :rules="[
          { minLength: 6, message: '密码长度不能少于6位' },
          { maxLength: 16, message: '密码长度不能超过16位' },
        ]"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="密码 (6~16位)"
          aria-required="true"
        />
      </a-form-item>

      <a-form-item field="autoLogin" style="text-aligt: center">
        <a-checkbox v-model="otherform.autoLogin"> 自动登录 </a-checkbox>
        <div style="width: 70%; text-align: right">
          <a style="cursor: pointer; color: #1677ff" @click="ToRegister"
            >没有账号？去注册</a
          >
        </div>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 320px"
          >登 录</a-button
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
import { Service, user_UserLoginRequest } from "../../../generated";

const form = reactive({
  userAccount: "",
  userPassword: "",
} as user_UserLoginRequest);
const otherform = reactive({
  autoLogin: true,
});

const router = useRouter();
const store = useStore();

// 去注册页面
const ToRegister = () => {
  router.push({
    path: "/user/register",
    replace: true,
  });
};

/**
 * 提交表单
 *
 */
const handleSubmit = async (values, errors) => {
  if (values?.errors) {
    return;
  }
  if (form.userAccount == "") {
    Message.error("请输入账号！");
    return;
  }
  if (form.userPassword == "") {
    Message.error("请输入密码！");
    return;
  }
  const res = await Service.postUserLogin(form);
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
