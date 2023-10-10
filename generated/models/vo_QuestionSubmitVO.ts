/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { judgeservermodel_JudgeInfo } from './judgeservermodel_JudgeInfo';
import type { vo_QuestionVO } from './vo_QuestionVO';
import type { vo_UserVO } from './vo_UserVO';

export type vo_QuestionSubmitVO = {
    /**
     * 用户代码
     */
    code?: string;
    /**
     * 创建时间
     */
    createTime?: string;
    /**
     * id
     */
    id?: number;
    judgeInfo?: judgeservermodel_JudgeInfo;
    /**
     * 编程语言
     */
    language?: string;
    /**
     * 题目 id
     */
    questionId?: number;
    /**
     * 对应题目信息
     */
    questionVO?: vo_QuestionVO;
    /**
     * 判题状态（0 - 待判题、1 - 判题中、2 - 成功、3 - 失败）
     */
    status?: number;
    /**
     * 更新时间
     */
    updateTime?: string;
    /**
     * 用户 id
     */
    userId?: number;
    /**
     * 创建题目人的信息
     */
    userVO?: vo_UserVO;
};

