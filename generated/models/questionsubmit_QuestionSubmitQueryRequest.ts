/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type questionsubmit_QuestionSubmitQueryRequest = {
    /**
     * 当前页号
     */
    current?: number;
    /**
     * 编程语言
     */
    language?: string;
    /**
     * 页面大小
     */
    pageSize?: number;
    /**
     * 题目 id
     */
    questionId?: number;
    /**
     * 排序字段
     */
    sortField?: string;
    /**
     * 排序顺序（默认升序）
     */
    sortOrder?: string;
    /**
     * 判题状态（0 - 待判题、1 - 判题中、2 - 成功、3 - 失败）
     */
    status?: number;
    /**
     * 用户 id
     */
    userId?: number;
};

