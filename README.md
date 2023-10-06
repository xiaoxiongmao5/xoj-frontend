# xoj-frontend

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 根据后端的接口文档生成前端调用后端的接口代码
```
openapi --input http://localhost:8091/swagger/swagger.json --output ./generated --client axios
```
然后修改 /generated/core/OpenAPI.ts 中的
```
export const OpenAPI: OpenAPIConfig = {
    BASE: 'http://localhost:8091',
    VERSION: '1.0',
    WITH_CREDENTIALS: true, //这里改为true
    CREDENTIALS: 'include',
    TOKEN: undefined,
    USERNAME: undefined,
    PASSWORD: undefined,
    HEADERS: undefined,
    ENCODE_PATH: undefined,
};
```