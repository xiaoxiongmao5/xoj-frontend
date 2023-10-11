<template>
  <div class="userRegisterView">
    <h2 style="margin-bottom: 32px">账户密码注册</h2>
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
        />
      </a-form-item>
      <a-form-item
        field="checkUserpassword"
        :validate-trigger="['change', 'input']"
        :rules="rules"
      >
        <a-input-password
          v-model="form.checkUserpassword"
          placeholder="确认密码"
        />
      </a-form-item>
      <div>
        <a
          style="
            float: right;
            margin-bottom: 16px;
            cursor: pointer;
            color: #1677ff;
          "
          @click="ToLogin"
          >已有账号，去登陆!</a
        >
      </div>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 320px"
          >注 册</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import { Service, user_UserRegisterRequest } from "../../../generated";
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkUserpassword: "",
} as user_UserRegisterRequest);

const router = useRouter();

const rules = [
  {
    validator: (value, cb) => {
      return new Promise((resolve) => {
        if (value !== form.userPassword) {
          cb("两次密码输入不一致，请重新输入！");
        }
        resolve();
      });
    },
  },
];

// 去登录页面
const ToLogin = () => {
  router.push({
    path: "/user/login",
    replace: true,
  });
};

/**
 * 提交表单
 *
 */
const handleSubmit = async (values, errors) => {
  if (values.errors) {
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
  const res = await Service.postUserRegister(form);
  if (res.code === 0) {
    // 注册成功，跳转到登录页
    router.push({
      path: "/user/login",
      replace: true,
    });
    Message.success("注册成功，请登录！");
  } else {
    Message.error("注册失败，" + res.message);
  }
};
</script>
