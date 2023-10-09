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
          <a-option>java</a-option>
          <a-option>cpp</a-option>
          <a-option>go</a-option>
          <a-option>html</a-option>
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
        <span :style="getJudgeResultStyle(record.judgeInfo.message)">
          {{
            record.judgeInfo.message !== undefined &&
            record.judgeInfo.message !== null &&
            judgeResultObjtList[record.judgeInfo.message] !== undefined &&
            judgeResultObjtList[record.judgeInfo.message] !== null
              ? judgeResultObjtList[record.judgeInfo.message].text
              : "未知错误"
          }}
        </span>
      </template>
      <template #memory="{ record }">
        <span>{{ record.judgeInfo.memory }}</span>
      </template>
      <template #time="{ record }">
        <span>{{ record.judgeInfo.time }}</span>
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
          {{ record.questionVO.title }}
          <span>[</span>
          {{ record.questionId }}
          <span>]</span>
        </div>
      </template>
      <!-- 提交者 -->
      <template #userName="{ record }">
        <span>{{ record.userVO.userName }}</span>
      </template>

      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD") }}
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import {
  vo_QuestionVO,
  Service,
  questionsubmit_QuestionSubmitQueryRequest,
} from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import moment from "moment";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref<questionsubmit_QuestionSubmitQueryRequest>({
  questionId: undefined,
  language: undefined,
  pageSize: 10,
  current: 1,
});

const judgeStatusObjtList = [
  { text: "等待中", color: "rgb(var(--gray-10))" },
  { text: "判题中", color: "blue" },
  { text: "成功", color: "green" },
  { text: "失败", color: "red" },
];
const getJudgeStatusStyle = (judgeStatus: number) => {
  if (
    judgeStatus == undefined ||
    judgeStatus == null ||
    judgeStatusObjtList[judgeStatus] == undefined ||
    judgeStatusObjtList[judgeStatus] == null
  ) {
    return ``;
  }
  const color = judgeStatusObjtList[judgeStatus].color;
  return `color: ${color};font-weight: bold;`;
};

const judgeResultObjtList = {
  Accepted: { text: "成功", color: "green" },
  "Wrong Answer": { text: "答案错误", color: "red" },
  "Compile Error": { text: "编译错误", color: "purple" },
  "Memory Limit Exceeded": { text: "内存溢出", color: "blue" },
  "Time Limit Exceeded": { text: "超时", color: "blue" },
  "Presentation Error": { text: "展示错误", color: "blue" },
  Waiting: { text: "等待中", color: "rgb(var(--gray-10))" },
  "Output Limit Exceeded": { text: "输出溢出", color: "blue" },
  "Dangerous Operation": { text: "危险操作", color: "red" },
  "Runtime Error": { text: "运行错误", color: "red" },
  "System Error": { text: "系统错误", color: "rgb(var(--gray-10))" },
};

const getJudgeResultStyle = (judgeResult: string) => {
  if (
    judgeResult == undefined ||
    judgeResult == null ||
    judgeResultObjtList[judgeResult] == undefined ||
    judgeResultObjtList[judgeResult] == null
  ) {
    return `background: #333;
    padding: 2px 0px;
    width: 80px;
    display: inline-block;
    text-align: center;
    color: #fff;`;
  }
  const color = judgeResultObjtList[judgeResult].color;
  return `background: ${color};
    padding: 2px 0px;
    width: 80px;
    display: inline-block;
    text-align: center;;
    color: #fff;`;
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
    title: "内存(KB)",
    slotName: "memory",
  },
  {
    title: "耗时(MS)",
    slotName: "time",
  },
  {
    title: "执行状态",
    slotName: "status",
  },
  {
    title: "题目名称[ 题号 ]",
    slotName: "questionInfo",
  },
  {
    title: "提交者",
    slotName: "userName",
  },
  {
    title: "创建时间",
    slotName: "createTime",
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
 * 跳转到做题页面
 * @param question
 */
const toQuestionPage = (question: vo_QuestionVO) => {
  // 在新窗口中打开链接
  window.open(`/view/question/${question.id}`, "_blank");
  // router.push({
  //   path: `/view/question/${question.id}`,
  // });
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
