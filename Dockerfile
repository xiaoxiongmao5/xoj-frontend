# syntax=docker/dockerfile:1.2

# 使用一个基础的 Node.js 镜像
FROM node:14.21.3-alpine3.16 AS x86_64_builder

# 设置工作目录
WORKDIR /app

# 将本地项目文件复制到容器中
COPY . .

# 安装依赖并构建前端应用程序
RUN npm install
RUN npm run build

# 第二阶段：使用一个基础的 Nginx 镜像来创建最终的容器
FROM nginx:alpine AS x86_64_final

# 复制自定义Nginx配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制构建后的前端文件到 Nginx 的默认站点目录
COPY --from=x86_64_builder /app/dist /usr/share/nginx/html

# 定义容器暴露的端口
EXPOSE 8088

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]

# 使用一个基础的 Node.js 镜像
FROM node:14.21.3-alpine3.16 AS arm64v8_builder

# 设置工作目录
WORKDIR /app

# 将本地项目文件复制到容器中
COPY . .

# 安装依赖并构建前端应用程序
RUN npm install
RUN npm run build

# 第二阶段：使用一个基础的 Nginx 镜像来创建最终的容器
FROM nginx:alpine AS arm64v8_final

# 复制自定义Nginx配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制构建后的前端文件到 Nginx 的默认站点目录
COPY --from=arm64v8_builder /app/dist /usr/share/nginx/html

# 定义容器暴露的端口
EXPOSE 8088

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
