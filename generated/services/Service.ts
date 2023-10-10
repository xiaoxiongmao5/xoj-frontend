/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { common_IdRequest } from '../models/common_IdRequest';
import type { question_QuestionAddRequest } from '../models/question_QuestionAddRequest';
import type { question_QuestionEditRequest } from '../models/question_QuestionEditRequest';
import type { question_QuestionQueryRequest } from '../models/question_QuestionQueryRequest';
import type { question_QuestionUpdateRequest } from '../models/question_QuestionUpdateRequest';
import type { questionsubmit_QuestionSubmitAddRequest } from '../models/questionsubmit_QuestionSubmitAddRequest';
import type { questionsubmit_QuestionSubmitQueryRequest } from '../models/questionsubmit_QuestionSubmitQueryRequest';
import type { swagtype_ListQuestionResponse } from '../models/swagtype_ListQuestionResponse';
import type { swagtype_ListQuestionSubmitVOResponse } from '../models/swagtype_ListQuestionSubmitVOResponse';
import type { swagtype_ListQuestionVOResponse } from '../models/swagtype_ListQuestionVOResponse';
import type { swagtype_ListUserResponse } from '../models/swagtype_ListUserResponse';
import type { swagtype_ListUserVOResponse } from '../models/swagtype_ListUserVOResponse';
import type { swagtype_LoginUserVOResponse } from '../models/swagtype_LoginUserVOResponse';
import type { swagtype_QuestionResponse } from '../models/swagtype_QuestionResponse';
import type { swagtype_QuestionSubmitVOResponse } from '../models/swagtype_QuestionSubmitVOResponse';
import type { swagtype_QuestionVOResponse } from '../models/swagtype_QuestionVOResponse';
import type { swagtype_UserResponse } from '../models/swagtype_UserResponse';
import type { swagtype_UserVOResponse } from '../models/swagtype_UserVOResponse';
import type { user_UserAddRequest } from '../models/user_UserAddRequest';
import type { user_UserLoginRequest } from '../models/user_UserLoginRequest';
import type { user_UserQueryRequest } from '../models/user_UserQueryRequest';
import type { user_UserRegisterRequest } from '../models/user_UserRegisterRequest';
import type { user_UserUpdateMyRequest } from '../models/user_UserUpdateMyRequest';
import type { user_UserUpdateRequest } from '../models/user_UserUpdateRequest';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class Service {

    /**
     * 添加
     * 添加
     * @param request 添加参数
     * @returns any 响应数据
     * @throws ApiError
     */
    public static postQuestionAdd(
        request: question_QuestionAddRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/add',
            body: request,
        });
    }

    /**
     * 删除
     * 删除
     * @param request 删除id
     * @returns any 响应数据
     * @throws ApiError
     */
    public static postQuestionDelete(
        request: common_IdRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/delete',
            body: request,
        });
    }

    /**
     * 更新
     * 更新
     * @param request 更新参数
     * @returns any 响应数据
     * @throws ApiError
     */
    public static postQuestionEdit(
        request: question_QuestionEditRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/edit',
            body: request,
        });
    }

    /**
     * 根据 id 获取
     * 根据 id 获取
     * @param id id
     * @returns swagtype_QuestionResponse 响应数据
     * @throws ApiError
     */
    public static getQuestionGet(
        id: number,
    ): CancelablePromise<swagtype_QuestionResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/question/get',
            query: {
                'id': id,
            },
        });
    }

    /**
     * 根据 id 获取包装类（脱敏）
     * 根据 id 获取包装类（脱敏）
     * @param id id
     * @returns swagtype_QuestionVOResponse 响应数据
     * @throws ApiError
     */
    public static getQuestionGetVo(
        id: number,
    ): CancelablePromise<swagtype_QuestionVOResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/question/get/vo',
            query: {
                'id': id,
            },
        });
    }

    /**
     * 分页获取列表
     * 分页获取列表
     * @param request 查询参数
     * @returns swagtype_ListQuestionResponse 响应数据
     * @throws ApiError
     */
    public static postQuestionListPage(
        request: question_QuestionQueryRequest,
    ): CancelablePromise<swagtype_ListQuestionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/list/page',
            body: request,
        });
    }

    /**
     * 分页获取封装列表
     * 分页获取封装列表
     * @param request 查询参数
     * @returns swagtype_ListQuestionVOResponse 响应数据
     * @throws ApiError
     */
    public static postQuestionListPageVo(
        request: question_QuestionQueryRequest,
    ): CancelablePromise<swagtype_ListQuestionVOResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/list/page/vo',
            body: request,
        });
    }

    /**
     * 分页获取当前用户创建的资源列表
     * 分页获取当前用户创建的资源列表
     * @param request 查询参数
     * @returns swagtype_ListQuestionVOResponse 响应数据
     * @throws ApiError
     */
    public static postQuestionMyListPageVo(
        request: question_QuestionQueryRequest,
    ): CancelablePromise<swagtype_ListQuestionVOResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/my/list/page/vo',
            body: request,
        });
    }

    /**
     * 提交题目
     * 提交题目
     * @param request 提交参数
     * @returns any 响应数据
     * @throws ApiError
     */
    public static postQuestionQuestionSubmitDo(
        request: questionsubmit_QuestionSubmitAddRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/question_submit/do',
            body: request,
        });
    }

    /**
     * 获取提交题目的封装
     * 获取提交题目的封装（仅本人能看见自己提交的代码）
     * @param id id
     * @returns swagtype_QuestionSubmitVOResponse 响应数据
     * @throws ApiError
     */
    public static getQuestionQuestionSubmitGetVo(
        id: number,
    ): CancelablePromise<swagtype_QuestionSubmitVOResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/question/question_submit/get/vo',
            query: {
                'id': id,
            },
        });
    }

    /**
     * 分页获取题目提交列表
     * 分页获取题目提交列表（除了管理员外，普通用户只能看到非答案、提交代码等公开信息）
     * @param request 查询参数
     * @returns swagtype_ListQuestionSubmitVOResponse 响应数据
     * @throws ApiError
     */
    public static postQuestionQuestionSubmitListPage(
        request: questionsubmit_QuestionSubmitQueryRequest,
    ): CancelablePromise<swagtype_ListQuestionSubmitVOResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/question_submit/list/page',
            body: request,
        });
    }

    /**
     * 更新
     * 更新
     * @param request 更新参数
     * @returns any 响应数据
     * @throws ApiError
     */
    public static postQuestionUpdate(
        request: question_QuestionUpdateRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/question/update',
            body: request,
        });
    }

    /**
     * 添加
     * 添加
     * @param request 添加参数
     * @returns any 响应数据
     * @throws ApiError
     */
    public static postUserAdd(
        request: user_UserAddRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/add',
            body: request,
        });
    }

    /**
     * 删除
     * 删除
     * @param request 删除id
     * @returns any 响应数据
     * @throws ApiError
     */
    public static postUserDelete(
        request: common_IdRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/delete',
            body: request,
        });
    }

    /**
     * 根据 id 获取
     * 根据 id 获取
     * @param id id
     * @returns swagtype_UserResponse 响应数据
     * @throws ApiError
     */
    public static getUserGet(
        id: number,
    ): CancelablePromise<swagtype_UserResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/get',
            query: {
                'id': id,
            },
        });
    }

    /**
     * 获取当前登录用户
     * 获取当前登录用户
     * @returns swagtype_LoginUserVOResponse 响应数据
     * @throws ApiError
     */
    public static getUserGetLogin(): CancelablePromise<swagtype_LoginUserVOResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/get/login',
        });
    }

    /**
     * 根据 id 获取包装类（脱敏）
     * 根据 id 获取包装类（脱敏）
     * @param id id
     * @returns swagtype_UserVOResponse 响应数据
     * @throws ApiError
     */
    public static getUserGetVo(
        id: number,
    ): CancelablePromise<swagtype_UserVOResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/get/vo',
            query: {
                'id': id,
            },
        });
    }

    /**
     * 分页获取列表
     * 分页获取列表
     * @param request 查询参数
     * @returns swagtype_ListUserResponse 响应数据
     * @throws ApiError
     */
    public static postUserListPage(
        request: user_UserQueryRequest,
    ): CancelablePromise<swagtype_ListUserResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/list/page',
            body: request,
        });
    }

    /**
     * 分页获取封装列表
     * 分页获取封装列表
     * @param request 查询参数
     * @returns swagtype_ListUserVOResponse 响应数据
     * @throws ApiError
     */
    public static postUserListPageVo(
        request: user_UserQueryRequest,
    ): CancelablePromise<swagtype_ListUserVOResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/list/page/vo',
            body: request,
        });
    }

    /**
     * 用户登录
     * 用户登录
     * @param request 账号密码
     * @returns swagtype_LoginUserVOResponse 响应数据
     * @throws ApiError
     */
    public static postUserLogin(
        request: user_UserLoginRequest,
    ): CancelablePromise<swagtype_LoginUserVOResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/login',
            body: request,
        });
    }

    /**
     * 用户退出
     * 用户退出
     * @returns any 响应数据
     * @throws ApiError
     */
    public static postUserLogout(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/logout',
        });
    }

    /**
     * 用户注册
     * 用户注册
     * @param request 注册信息
     * @returns any 响应数据
     * @throws ApiError
     */
    public static postUserRegister(
        request: user_UserRegisterRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/register',
            body: request,
        });
    }

    /**
     * 更新
     * 更新
     * @param request 更新参数
     * @returns any 响应数据
     * @throws ApiError
     */
    public static postUserUpdate(
        request: user_UserUpdateRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/update',
            body: request,
        });
    }

    /**
     * 更新个人信息
     * 更新个人信息
     * @param request 查询参数
     * @returns any 响应数据
     * @throws ApiError
     */
    public static postUserUpdateMy(
        request: user_UserUpdateMyRequest,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/update/my',
            body: request,
        });
    }

}
