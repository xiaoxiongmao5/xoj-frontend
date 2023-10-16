<template>
  <div id="userManageView">
    <a-form :model="searchParams" layout="inline" style="min-width: 240px">
      <!-- <a-form-item field="title" label="编号：" tooltip="请输入用户编号">
        <a-input v-model="searchParams.id" placeholder="请输入用户编号" />
      </a-form-item> -->
      <a-form-item field="title" label="昵称">
        <a-input v-model="searchParams.userName" placeholder="请输入用户昵称" />
      </a-form-item>
      <!-- <a-form-item field="title" label="电话：" tooltip="请输入电话">
        <a-input v-model="searchParams.phone" placeholder="请输入搜索电话" />
      </a-form-item>
      <a-form-item field="title" label="邮箱：" tooltip="请输入邮箱">
        <a-input v-model="searchParams.email" placeholder="请输入搜索邮箱" />
      </a-form-item> -->
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :column-resizable="true"
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
        showJumper: true,
        showPageSize: true,
      }"
      @page-change="onPageChange"
      @pageSizeChange="onPageSizeChange"
    >
      <template #userAvatar="{ record }">
        <a-avatar :size="70" shape="circle">
          <img alt="userAvatar" :src="record.userAvatar" />
        </a-avatar>
      </template>
      <template #userRole="{ record }">
        <!-- user普通用户 admin管理员 -->
        <a-tag size="large" v-if="record.userRole === 'user'" color="#0fc6c2"
          >普通用户
        </a-tag>
        <a-tag size="large" v-if="record.userRole === 'admin'" color="#ffb400"
          >管理员</a-tag
        >
        <a-tag size="large" v-if="record.userRole === 'ban'" color="#f53f3f"
          >已封禁</a-tag
        >
      </template>
      <template #gender="{ record }">
        {{ record.gender === 1 ? "男" : "女" }}
      </template>

      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #updateTime="{ record }">
        {{ moment(record.updateTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <!-- <template #userState="{ record }">
        <a-tag v-if="record.userState === '正常'" color="blue">正常</a-tag>
        <a-tag v-if="record.userState === '注销'" color="grey">注销</a-tag>
        <a-tag v-if="record.userState === '封号'" color="red">封号</a-tag>
      </template> -->
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="openModalForm(record.id)"
            >修改
          </a-button>
          <a-popconfirm
            content="确定要删除此题目吗?"
            type="error"
            okText="是"
            cancelText="否"
            @cancel="
              () => {
                console.log(`已取消`);
              }
            "
            @ok="doDelete(record)"
          >
            <a-button type="primary" status="danger">删除 </a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </a-table>
    <a-modal
      width="30%"
      :visible="visible"
      placement="right"
      @ok="handleOk"
      @cancel="closeModel"
      unmountOnClose
    >
      <div style="text-align: center">
        <a-upload
          action="/"
          :fileList="file ? [file] : []"
          :show-file-list="false"
          @change="onChange"
          :custom-request="uploadAvatar"
        >
          <template #upload-button>
            <a-avatar :size="70" shape="circle">
              <img alt="头像" :src="userInfo?.userAvatar" />
            </a-avatar>
          </template>
        </a-upload>
      </div>
      <a-form
        label-align="right"
        title="个人信息"
        style="max-width: 480px; margin: 0 auto"
      >
        <a-form-item field="账号" label="账号 :">
          <a-input
            disabled
            v-model="userInfo.userAccount"
            placeholder="请输入账号"
          />
        </a-form-item>
        <a-form-item field="昵称" label="昵称 :">
          <a-input v-model="userInfo.userName" placeholder="请输入用户昵称" />
        </a-form-item>
        <!-- <a-form-item field="邮箱" label="邮箱 :">
          <a-input v-model="userInfo.email" placeholder="请输入邮箱" />
        </a-form-item>
        <a-form-item field="电话" label="电话 :">
          <a-input v-model="userInfo.phone" placeholder="请输入电话号码" />
        </a-form-item>
        <a-form-item field="用户状态" label="状态 :">
          <a-select v-model="userInfo.userState" placeholder="请输入用户状态">
            <a-option value="正常">正常</a-option>
            <a-option value="注销">注销</a-option>
            <a-option value="封号">封号</a-option>
          </a-select>
        </a-form-item> -->
        <a-form-item field="用户角色" label="角色 :">
          <a-select v-model="userInfo.userRole" placeholder="请输入用户角色">
            <a-option value="admin">管理员</a-option>
            <a-option value="user">普通用户</a-option>
            <a-option value="ban">已封禁</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="性别" label="性别 :">
          <a-select v-model="userInfo.gender" placeholder="请输入性别">
            <a-option :value="1">男</a-option>
            <a-option :value="0">女</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="userAvatar" label="头像 :">
          <a-textarea
            v-model="userInfo.userAvatar"
            placeholder="请输入头像地址"
          />
        </a-form-item>
        <a-form-item field="userProfile" label="简介 :">
          <a-textarea v-model="userInfo.userProfile" placeholder="请输入简介" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { Service, vo_UserVO, user_UserQueryRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import moment from "moment";
import { useRouter } from "vue-router";
import { FileItem, Message } from "@arco-design/web-vue";

const router = useRouter();
const tableRef = ref();
const file = ref();

const visible = ref(false);
const userInfo = ref<vo_UserVO>();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref<user_UserQueryRequest>({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await Service.postUserListPage(searchParams.value);
  if (res.code === 0) {
    dataList.value = res.data?.records ?? [];
    total.value = res.data?.total ?? 0;
  } else {
    message.error("加载失败，" + res.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "编号",
    dataIndex: "id",
    align: "left",
    width: 60,
  },
  {
    title: "账号",
    dataIndex: "userAccount",
    align: "left",
    width: 150,
    ellipsis: true,
    tooltip: true,
  },
  {
    title: "昵称",
    dataIndex: "userName",
    align: "left",
    width: 150,
    ellipsis: true,
    tooltip: true,
  },
  {
    title: "头像",
    slotName: "userAvatar",
    align: "left",
    width: 150,
  },
  {
    title: "简介",
    dataIndex: "userProfile",
    align: "left",
    width: 150,
    ellipsis: true,
    tooltip: true,
  },
  {
    title: "性别",
    slotName: "gender",
    align: "center",
    width: 60,
  },
  //   {
  //     title: "电话",
  //     dataIndex: "phone",
  //     align: "center",
  //   },
  //   {
  //     title: "邮箱",
  //     dataIndex: "email",
  //     align: "center",
  //   },
  //   {
  //     title: "状态",
  //     slotName: "userState",
  //     align: "center",
  //   },
  {
    title: "角色",
    slotName: "userRole",
    align: "left",
    width: 120,
  },
  {
    title: "创建时间",
    slotName: "createTime",
    align: "center",
    width: 180,
  },
  {
    title: "更新时间",
    slotName: "updateTime",
    align: "center",
    width: 180,
  },
  {
    title: "操作",
    slotName: "optional",
    align: "left",
    width: 180,
  },
];
/**
 * 分页
 * @param page
 */
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

/**
 * 分页大小
 * @param size
 */
const onPageSizeChange = (size: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageSize: size,
  };
};
/**
 * 打开弹窗,获取到用户信息
 */
const openModalForm = async (userId: any) => {
  const res = await Service.getUserGet(userId);
  console.log("res:", res.data);
  userInfo.value = res.data;
  console.log(userInfo.value);
  visible.value = true;
};
/**
 * 删除
 * @param user
 */
const doDelete = async (user: vo_UserVO) => {
  const res = await Service.postUserDelete({
    id: user.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败");
  }
};

/**
 * 确认搜索，重新加载数据
 */
const doSubmit = () => {
  // 这里需要重置搜索页号
  searchParams.value = {
    ...searchParams.value,
    current: 1,
  };
};

// 从表单中获取的用户头像
// let userAvatarImg = userInfo.value?.userAvatar;

/**
 * 上传头像
 */
// const uploadAvatar = async () => {
//   const res = await FileControllerService.uploadOssFileUsingPost(
//     file?.value.file
//   );
//   if (res.code === 0) {
//     userAvatarImg = res.data;
//     Message.success("上传成功，点击确认即可修改头像");
//   } else {
//     Message.error("上传失败！" + res.data);
//   }
// };

/**
 * 确定修改按钮
 */
const handleOk = async () => {
  userInfo.value?.gender
    ? (userInfo.value.gender = Number(userInfo.value?.gender))
    : "";
  const res = await Service.postUserUpdate(userInfo.value);
  // const res = await Service.postUserUpdate({
  //   ...userInfo.value,
  //   userAvatar: userAvatarImg,
  // });
  if (res.code === 0) {
    Message.success("更新成功！");
    visible.value = false;
    loadData();
  } else {
    Message.error("更新失败！", res.msg);
  }
};
const closeModel = () => {
  visible.value = false;
};

const onChange = async (_: never, currentFile: FileItem) => {
  file.value = {
    ...currentFile,
  };
};
</script>

<style scoped>
/* #userManageView {
  padding: 5px;
  box-shadow: 0px 0px 10px rgba(35, 7, 7, 0.21);
  border-radius: 10px;
} */
#userManageView {
  margin: 0 auto;
}
</style>
