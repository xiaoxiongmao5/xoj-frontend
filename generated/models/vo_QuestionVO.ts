/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { question_JudgeConfig } from './question_JudgeConfig';
import type { vo_UserVO } from './vo_UserVO';

export type vo_QuestionVO = {
    /**
     * 题目通过数
     */
    acceptedNum?: number;
    /**
     * 内容
     */
    content?: string;
    /**
     * 创建时间
     */
    createTime?: string;
    /**
     * 收藏数
     */
    favourNum?: number;
    /**
     * id
     */
    id?: number;
    /**
     * 判题配置（json 对象）
     */
    judgeConfig?: question_JudgeConfig;
    /**
     * 题目提交数
     */
    submitNum?: number;
    /**
     * 标签列表（json 数组）
     */
    tags?: Array<string>;
    /**
     * 点赞数
     */
    thumbNum?: number;
    /**
     * 标题
     */
    title?: string;
    /**
     * 更新时间
     */
    updateTime?: string;
    /**
     * 创建用户 id
     */
    userId?: number;
    /**
     * 创建题目人的信息
     */
    userVO?: vo_UserVO;
};

