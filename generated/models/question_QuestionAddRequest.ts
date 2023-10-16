/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { question_JudgeCase } from './question_JudgeCase';
import type { question_JudgeConfig } from './question_JudgeConfig';

export type question_QuestionAddRequest = {
    /**
     * 题目答案
     */
    answer?: string;
    /**
     * 题目答案模版
     */
    answerTemplate?: string;
    /**
     * 内容
     */
    content?: string;
    /**
     * 判题用例
     */
    judgeCase?: Array<question_JudgeCase>;
    /**
     * 判题配置
     */
    judgeConfig?: question_JudgeConfig;
    /**
     * 标签列表
     */
    tags?: Array<string>;
    /**
     * 标题
     */
    title?: string;
};

