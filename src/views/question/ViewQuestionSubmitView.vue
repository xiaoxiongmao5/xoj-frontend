<template>
  <div id="viewQuestionSubmitView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question">
          <a-tab-pane key="question" title="题目">
            <a-card
              v-if="question"
              :title="question.title"
              style="
                height: 58.5vh;
                min-height: 380px;
                overflow: auto;
                border: none;
              "
            >
              <a-descriptions
                title="判题条件"
                :column="{ xs: 1, md: 2, lg: 3 }"
              >
                <a-descriptions-item label="时间限制">
                  {{ question.judgeConfig.timeLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="内存限制">
                  {{ question.judgeConfig.memoryLimit ?? 0 }}
                </a-descriptions-item>
                <a-descriptions-item label="堆栈限制">
                  {{ question.judgeConfig.stackLimit ?? 0 }}
                </a-descriptions-item>
              </a-descriptions>
              <MdViewer :value="question.content || ''" />
              <template #extra>
                <a-space wrap>
                  <a-tag
                    v-for="(tag, index) of question.tags"
                    :key="index"
                    size="large"
                    :color="getTagStyleColor(tag)"
                    >{{ tag }}
                  </a-tag>
                </a-space>
              </template>
            </a-card>
          </a-tab-pane>
          <!-- <a-tab-pane key="comment" title="评论" disabled> 评论区</a-tab-pane> lightblue-->
          <a-tab-pane key="answer" title="答案">
            <a-tabs
              default-active-key="go"
              type="rounded"
              size="small"
              position="left"
            >
              <a-tab-pane key="go" title="go">
                <div
                  style="
                    height: 58.5vh;
                    min-height: 380px;
                    background: #eee;
                    overflow: auto;
                    padding: 0 10px;
                  "
                >
                  <MdViewer :value="question?.answer ?? '此题暂未提供答案'" />
                </div>
              </a-tab-pane>
              <a-tab-pane key="java" title="java">
                <div
                  style="
                    height: 58.5vh;
                    min-height: 380px;
                    background: #eee;
                    overflow: auto;
                    padding: 0 10px;
                  "
                >
                  <MdViewer :value="'此题暂未提供答案'" />
                </div>
              </a-tab-pane>
            </a-tabs>
          </a-tab-pane>
        </a-tabs>
      </a-col>
      <a-col :md="12" :xs="24">
        <a-form :model="form" layout="inline">
          <a-form-item
            field="language"
            label="编程语言"
            style="min-width: 240px"
          >
            <a-select
              disabled
              v-model="form.language"
              :style="{ width: '320px' }"
              placeholder="选择编程语言"
            >
              <a-option>go</a-option>
              <a-option>java</a-option>
            </a-select>
          </a-form-item>
        </a-form>
        <CodeEditor
          :value="form.code as string"
          :language="form.language"
          :handle-change="changeCode"
        />
        <a-divider size="0" />
        <a-button type="primary" style="min-width: 200px" @click="doSubmit">
          提交代码
        </a-button>
        <a-divider size="0" />
        <!-- <div>{{ judgeInfo?.message ?? "" }} -->
        <!-- :model-value="judgeInfo?.detail ?? judgeInfo?.message ?? ''" -->
        <a-textarea
          :model-value="
            judgeInfo?.detail ? judgeInfo?.detail : judgeInfo?.message
          "
          :auto-size="{ minRows: 2, maxRows: 5 }"
        />
        <!-- </div> -->
        <!-- <CodeViewer :value="form.code as string" :language="form.language" /> -->
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import {
  onMounted,
  ref,
  watchEffect,
  withDefaults,
  defineProps,
  inject,
} from "vue";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import CodeViewer from "@/components/CodeViewer.vue";
import MdViewer from "@/components/MdViewer.vue";
import { useRouter } from "vue-router";
import {
  Service,
  vo_QuestionVO,
  judgeservermodel_JudgeInfo,
  questionsubmit_QuestionSubmitAddRequest,
} from "../../../generated";

const tagsObjtList = {
  default: { text: "default", color: "#168cff" },
  简单: { text: "简单", color: "#0fc6c2" },
  中等: { text: "中等", color: "#ffb400" },
  困难: { text: "困难", color: "#f53f3f" },
};

const getTagStyleColor = (tag: string) => {
  if (tag == "" || tag == undefined || tagsObjtList[tag] == undefined) {
    return tagsObjtList["default"].color;
  }
  return tagsObjtList[tag].color;
};

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const question = ref<vo_QuestionVO>();

const form = ref<questionsubmit_QuestionSubmitAddRequest>({
  language: "go",
  code: "",
});

const judgeInfo = ref<judgeservermodel_JudgeInfo>();

const loadData = async () => {
  const res = await Service.getQuestionQuestionSubmitGetVo(props.id as any);
  if (res.code === 0) {
    question.value = res.data?.questionVO;
    form.value.code = res.data?.code;
    form.value.language = res.data?.language;
    judgeInfo.value = res.data?.judgeInfo;
  } else {
    message.error("加载失败，" + res.message);
  }
};

const changeCode = (value: string) => {
  form.value.code = value;
};

/**
 * 提交代码
 */
const doSubmit = async () => {
  if (!question.value?.id) {
    return;
  }

  if (form.value.language != "go") {
    message.error("提交失败,暂不支持该编程语言！");
    return;
  }

  if (form.value.code == "") {
    message.error("请编写完代码，再提交！");
    return;
  }

  const res = await Service.postQuestionQuestionSubmitDo({
    ...form.value,
    questionId: question.value.id,
  });
  if (res.code === 0) {
    message.success("提交成功");
    toQuestionSubmitViewPage();
  } else {
    message.error("提交失败," + res.message);
  }
};

const router = useRouter();
/**
 * 跳转到做题分析页面
 */
const toQuestionSubmitViewPage = () => {
  router.push({
    path: `/question_submit`,
  });
};

/**
 * 页面加载时，请求数据
 */
onMounted(() => {
  loadData();
});
</script>

<style>
#viewQuestionSubmitView {
  max-width: 1400px;
  margin: 0 auto;
}

#viewQuestionSubmitView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
