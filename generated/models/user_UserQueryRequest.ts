/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type user_UserQueryRequest = {
    /**
     * 当前页号
     */
    current?: number;
    /**
     * 性别
     */
    gender?: number;
    /**
     * id
     */
    id?: number;
    /**
     * 公众号openId
     */
    mpOpenId?: string;
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
     * 微信开放平台id
     */
    unionId?: string;
    /**
     * 用户头像
     */
    userAvatar?: string;
    /**
     * 用户昵称
     */
    userName?: string;
    /**
     * 用户简介
     */
    userProfile?: string;
    /**
     * 用户角色：user/admin/ban
     */
    userRole?: string;
};

