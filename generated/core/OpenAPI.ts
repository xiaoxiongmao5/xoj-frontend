/*
 * @Author: 小熊 627516430@qq.com
 * @Date: 2023-10-10 22:14:55
 * @LastEditors: 小熊 627516430@qq.com
 * @LastEditTime: 2023-10-12 14:56:38
 * @FilePath: /xoj-frontend/generated/core/OpenAPI.ts
 */
import type { ApiRequestOptions } from "./ApiRequestOptions";

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;
type Headers = Record<string, string>;

export type OpenAPIConfig = {
  BASE: string;
  VERSION: string;
  WITH_CREDENTIALS: boolean;
  CREDENTIALS: "include" | "omit" | "same-origin";
  TOKEN?: string | Resolver<string> | undefined;
  USERNAME?: string | Resolver<string> | undefined;
  PASSWORD?: string | Resolver<string> | undefined;
  HEADERS?: Headers | Resolver<Headers> | undefined;
  ENCODE_PATH?: ((path: string) => string) | undefined;
};

export const OpenAPI: OpenAPIConfig = {
  BASE: "http://60.204.157.168:8091",
  // BASE: "http://localhost:8091",
  VERSION: "1.0",
  WITH_CREDENTIALS: true,
  CREDENTIALS: "include",
  TOKEN: undefined,
  USERNAME: undefined,
  PASSWORD: undefined,
  HEADERS: undefined,
  ENCODE_PATH: undefined,
};
