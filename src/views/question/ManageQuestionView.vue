<template>
  <div id="manageQuestionView">
    <a-table
      :ref="tableRef"
      :columns="columns"
      :data="dataList"
      :scroll="{ y: 800 }"
      :scrollbar="true"
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
      <template #createTime="{ record }">
        {{ moment(record.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #updateTime="{ record }">
        {{ moment(record.updateTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)"> 修改</a-button>
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
            <a-button type="primary" status="danger">删除</a-button>
          </a-popconfirm>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { question_QuestionUpdateRequest, Service } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import * as querystring from "querystring";
import { useRouter } from "vue-router";
import moment from "moment";

const tableRef = ref();

const dataList = ref([]);
const total = ref(0);
const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await Service.postQuestionListPage(searchParams.value);
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

// {id: "1", title: "A+ D", content: "新的题目内容", tags: "["二叉树"]", answer: "新的答案", submitNum: 0,…}

const columns = [
  {
    title: "题号",
    dataIndex: "id",
    width: 60,
  },
  {
    title: "标题",
    dataIndex: "title",
    width: 100,
    ellipsis: true, //显示省略号
    tooltip: true, //在显示省略号时使用文本提示
  },
  //   {
  //     title: "内容",
  //     dataIndex: "content",
  //   },
  {
    title: "标签",
    dataIndex: "tags",
    width: 130,
  },
  // {
  //   title: "答案",
  //   dataIndex: "answer",
  //   width: 100,
  //   ellipsis: true, //显示省略号
  //   tooltip: true, //在显示省略号时使用文本提示
  // },
  {
    title: "答案模版",
    dataIndex: "answerTemplate",
    width: 100,
    ellipsis: true,
    tooltip: true,
  },
  {
    title: "提交数",
    dataIndex: "submitNum",
    width: 80,
  },
  {
    title: "通过数",
    dataIndex: "acceptedNum",
    width: 80,
  },
  {
    title: "判题配置",
    dataIndex: "judgeConfig",
    width: 150,
  },
  {
    title: "判题用例",
    dataIndex: "judgeCase",
    width: 100,
    ellipsis: true,
    tooltip: true,
  },
  {
    title: "用户id",
    dataIndex: "userId",
    width: 70,
  },
  {
    title: "创建时间",
    slotName: "createTime",
    width: 75,
  },
  {
    title: "更新时间",
    slotName: "updateTime",
    width: 75,
  },
  {
    title: "操作",
    slotName: "optional",
    width: 100,
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

const doDelete = async (question: question_QuestionUpdateRequest) => {
  const res = await Service.postQuestionDelete({
    id: question.id,
  });
  if (res.code === 0) {
    message.success("删除成功");
    loadData();
  } else {
    message.error("删除失败");
  }
};

const router = useRouter();

const doUpdate = (question: question_QuestionUpdateRequest) => {
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};
</script>

<style scoped>
#manageQuestionView {
}
</style>
