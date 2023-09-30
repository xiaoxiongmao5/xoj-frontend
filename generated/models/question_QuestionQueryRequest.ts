/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type question_QuestionQueryRequest = {
    /**
     * 题目答案
     */
    answer?: string;
    /**
     * 内容
     */
    content?: string;
    /**
     * 当前页号
     */
    current?: number;
    /**
     * id
     */
    id?: number;
    /**
     * 页面大小
     */
    pageSize?: number;
    /**
     * 排序字段
     */
    sortField?: string;
    /**
     * 排序顺序（默认升序）
     */
    sortOrder?: string;
    /**
     * 标签列表（json 数组）
     */
    tags?: Array<string>;
    /**
     * 标题
     */
    title?: string;
    /**
     * 创建用户 id
     */
    userId?: number;
};

