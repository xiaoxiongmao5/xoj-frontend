<template>
  <div id="questionSubmitView">
    <a-form :model="searchParams" layout="inline">
      <a-form-item field="questionId" label="题号" style="min-width: 240px">
        <a-input v-model="searchParams.questionId" placeholder="请输入" />
      </a-form-item>
      <a-form-item field="language" label="编程语言" style="min-width: 240px">
        <a-select
          v-model="searchParams.language"
          :style="{ width: '320px' }"
          placeholder="选择编程语言"
        >
          <a-option>go</a-option>
          <a-option>java</a-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="doSubmit">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-divider size="0" />
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      @page-change="onPageChange"
    >
      <template #result="{ record }">
        <!-- 执行状态：等待中、判题中 -->
        <template v-if="record.status == 0 || record.status == 1">
          <a-tag loading>Loading</a-tag>
        </template>
        <template
          v-else-if="
            record.judgeInfo.message !== undefined &&
            record.judgeInfo.message !== null &&
            judgeResultObjtList[record.judgeInfo.message] !== undefined &&
            judgeResultObjtList[record.judgeInfo.message] !== null
          "
        >
          <a-tag
            size="large"
            :color="getJudgeResultStyleColor(record.judgeInfo.message)"
          >
            {{ judgeResultObjtList[record.judgeInfo.message].text }}
          </a-tag>
        </template>
        <template v-else>
          <span></span>
        </template>
      </template>
      <template #memory="{ record }">
        <template v-if="record.judgeInfo.memory <= 1024">
          <span>{{ record.judgeInfo.memory }} byte</span>
        </template>
        <template v-else-if="record.judgeInfo.memory <= 1024 * 1024">
          <span>{{ (record.judgeInfo.memory / 1024).toFixed(2) }} KB</span>
        </template>
        <template v-else>
          <span
            >{{ (record.judgeInfo.memory / (1024 * 1024)).toFixed(2) }} MB</span
          >
        </template>
      </template>
      <template #time="{ record }">
        <template v-if="record.judgeInfo.time < 1000">
          <span>{{ record.judgeInfo.time }} MS</span>
        </template>
        <template v-else>
          <span>{{ (record.judgeInfo.time / 1000).toFixed(0) }} S</span>
        </template>
      </template>
      <!-- 判题状态 -->
      <template #status="{ record }">
        <span :style="getJudgeStatusStyle(record.status)">{{
          judgeStatusObjtList[record.status].text
        }}</span>
      </template>
      <!-- 题目 -->
      <template #questionInfo="{ record }">
        <div id="questionInfo" @click="toQuestionPage(record.questionVO)">
          <span>#{{ record.questionId }}</span>
          {{ record.questionVO.title }}
        </div>
      </template>
      <!-- 提交者 -->
      <template #userName="{ record }">
        <span>{{
          record.userVO.userName ? record.userVO.userName : record.userId
        }}</span>
      </template>
      <!-- 提交时间 -->
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>

      <template #optional="{ record }">
        <template
          v-if="
            store.state.user.loginUser.id == record.userId ||
            store.state.user.loginUser.userRole == ACCESS_ENUM.ADMIN
          "
        >
          <!-- <a-space> -->
          <a-button
            type="secondary"
            @click="toViewQuestionSubmitViewPage(record)"
          >
            查看代码
          </a-button>
          <!-- </a-space> -->
        </template>
        <template v-else> </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watchEffect } from "vue";
import {
  vo_QuestionVO,
  vo_QuestionSubmitVO,
  Service,
  questionsubmit_QuestionSubmitQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";
import { useStore } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";

const tableRef = ref();
const store = useStore();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref<questionsubmit_QuestionSubmitQueryRequest>({
  questionId: undefined,
  language: undefined,
  pageSize: 10,
  current: 1,
});

const judgeStatusObjtList = [
  { text: "等待中", color: "#168cff" },
  { text: "判题中", color: "#ffb400" },
  { text: "成功", color: "#00b42a" },
  { text: "失败", color: "#f53f3f" },
];
const getJudgeStatusStyle = (judgeStatus: number) => {
  if (
    judgeStatus == undefined ||
    judgeStatus == null ||
    judgeStatusObjtList[judgeStatus] == undefined ||
    judgeStatusObjtList[judgeStatus] == null
  ) {
    return `color: #86909c;font-weight: bold;`;
  }
  const color = judgeStatusObjtList[judgeStatus].color;
  return `color: ${color};font-weight: bold;`;
};

const judgeResultObjtList = {
  Accepted: { text: `成功`, color: "#00b42a" },
  "Wrong Answer": { text: "答案错误", color: "#f53f3f" },
  "Runtime Error": { text: "运行错误", color: "#f53f3f" },
  "Dangerous Operation": { text: "危险操作", color: "#f53f3f" },
  "Compile Error": { text: "编译错误", color: "#ffb400" },
  "Time Limit Exceeded": { text: "超时", color: "#0fc6c2" },
  "Memory Limit Exceeded": { text: "内存溢出", color: "#ff7d00" },
  "Output Limit Exceeded": { text: "输出溢出", color: "#ff7d00" },
  "Presentation Error": { text: "展示错误", color: "#0fc6c2" },
  Waiting: { text: "等待中", color: "#168cff" },
  "System Error": { text: "系统错误", color: "#86909c" },
  default: { text: "未知错误", color: "#86909c" },
};

const getJudgeResultStyleColor = (judgeResult: string) => {
  if (
    judgeResult == undefined ||
    judgeResult == null ||
    judgeResultObjtList[judgeResult] == undefined ||
    judgeResultObjtList[judgeResult] == null
  ) {
    return judgeResultObjtList["default"].color;
  }
  return judgeResultObjtList[judgeResult].color;
};

const loadData = async () => {
  if (searchParams.value.questionId) {
    searchParams.value.questionId = Number(searchParams.value.questionId);
  } else {
    searchParams.value.questionId = undefined;
  }
  const res = await Service.postQuestionQuestionSubmitListPage({
    ...searchParams.value,
    sortField: "createTime",
    sortOrder: "desc",
  });
  if (res.code === 0) {
    dataList.value = res.data?.records ?? [];
    total.value = res.data?.total ?? 0;
  } else {
    message.error("加载失败，" + res.message);
  }
};

const refreshFlag = ref(false); // 哨兵变量

// 设置定时器，每隔一段时间执行一次 loadData 函数
const intervalId = setInterval(() => {
  if (refreshFlag.value) {
    console.log("定时任务");
    loadData();
    refreshFlag.value = false; // 重置哨兵变量
  }
}, 3000); // 每隔（3 秒）执行一次

/**
 * 监听 searchParams 变量，改变时触发页面的重新加载
 */
watchEffect(() => {
  if (!refreshFlag.value) {
    refreshFlag.value = true; // 设置哨兵变量，触发定时任务
  }
  loadData();
});

// 在组件销毁时清除定时器
onBeforeUnmount(() => {
  clearInterval(intervalId);
});

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});

const columns = [
  {
    title: "提交号",
    dataIndex: "id",
  },
  {
    title: "编程语言",
    dataIndex: "language",
  },
  {
    title: "判题结果",
    slotName: "result",
  },
  {
    title: "内存",
    slotName: "memory",
  },
  {
    title: "耗时",
    slotName: "time",
  },
  {
    title: "执行状态",
    slotName: "status",
  },
  {
    title: "题目",
    slotName: "questionInfo",
  },
  {
    title: "提交者",
    slotName: "userName",
  },
  {
    title: "提交时间",
    slotName: "createTime",
  },
  {
    slotName: "optional",
  },
];

const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
};

const router = useRouter();

/**
 * 跳转到已提交题目详情界面
 */
const toViewQuestionSubmitViewPage = (questionSumit: vo_QuestionSubmitVO) => {
  // // 在新窗口中打开链接
  // window.open(`/view/question_submit/${questionSumit.id}`, "_blank");
  router.push({
    path: `/view/question_submit/${questionSumit.id}`,
  });
};

/**
 * 跳转到做题页面
 * @param question
 */
const toQuestionPage = (question: vo_QuestionVO) => {
  // // 在新窗口中打开链接
  // window.open(`/view/question/${question.id}`, "_blank");
  router.push({
    path: `/view/question/${question.id}`,
  });
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
</script>

<style scoped>
#questionSubmitView {
  max-width: 1280px;
  margin: 0 auto;
}

#questionInfo {
  cursor: pointer;
}
#questionInfo:hover {
  cursor: pointer;
  text-decoration: underline;
  color: red;
}
</style>
