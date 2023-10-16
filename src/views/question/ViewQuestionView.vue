<template>
  <div id="viewQuestionView">
    <a-row :gutter="[24, 24]">
      <a-col :md="12" :xs="24">
        <a-tabs default-active-key="question" type="line">
          <a-tab-pane key="question" title="题目">
            <a-card v-if="question" :title="question.title">
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
          <!-- <a-tab-pane key="comment" title="评论" disabled> 评论区</a-tab-pane> -->
          <a-tab-pane key="answer" title="答案">
            <!-- position="left"  -->
            <a-tabs default-active-key="go" type="rounded" size="small">
              <a-tab-pane key="go" title="go">
                <MdViewer :value="question?.answer ?? '此题暂未提供答案'" />
              </a-tab-pane>
              <a-tab-pane key="java" title="java">
                <MdViewer :value="'此题暂未提供答案'" />
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
              v-model="form.language"
              :style="{ width: '320px' }"
              placeholder="选择编程语言"
              :change="GetAnswerTemplate(string)"
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
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect, withDefaults, defineProps } from "vue";
import message from "@arco-design/web-vue/es/message";
import CodeEditor from "@/components/CodeEditor.vue";
import MdViewer from "@/components/MdViewer.vue";
import { useRouter } from "vue-router";
import {
  Service,
  vo_QuestionVO,
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

const loadData = async () => {
  const res = await Service.getQuestionGetVo(props.id as any);
  if (res.code === 0) {
    question.value = res.data;
    GetAnswerTemplate();
  } else {
    message.error("加载失败，" + res.message);
  }
};

// 根据选择的编程语言，设置代码的模版内容
const GetAnswerTemplate = () => {
  if (question.value?.answerTemplate == "") {
    return;
  }
  const answerTemplate = JSON.parse(question.value?.answerTemplate ?? "{}");
  console.log("answerTemplate", answerTemplate);
  if (
    form.value.language &&
    answerTemplate[form.value.language] &&
    answerTemplate[form.value.language] != null
  ) {
    form.value.code = answerTemplate[form.value.language];
  }
  // console.log("更换语言的答案模版", form.value.code);
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

const changeCode = (value: string) => {
  form.value.code = value;
};
</script>

<style>
#viewQuestionView {
  max-width: 1400px;
  margin: 0 auto;
}

#viewQuestionView .arco-space-horizontal .arco-space-item {
  margin-bottom: 0 !important;
}
</style>
