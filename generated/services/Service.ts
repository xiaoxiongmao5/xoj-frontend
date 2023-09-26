/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { models_UserRegisterParams } from '../models/models_UserRegisterParams';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class Service {

    /**
     * 用户登录
     * 用户登录
     * @param useraccount
     * @param userpassword
     * @returns any OK
     * @throws ApiError
     */
    public static postUserLogin(
        useraccount?: string,
        userpassword?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/login',
            formData: {
                'useraccount': useraccount,
                'userpassword': userpassword,
            },
        });
    }

    /**
     * 用户注册
     * @param request 注册信息
     * @returns any OK
     * @throws ApiError
     */
    public static postUserRegister(
        request: models_UserRegisterParams,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/user/register',
            body: request,
        });
    }

    /**
     * 根据用户的 Cookie 获取用户信息
     * @returns any 用户信息
     * @throws ApiError
     */
    public static getUserUinfo(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/user/uinfo',
        });
    }

}
