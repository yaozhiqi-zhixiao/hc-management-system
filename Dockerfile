# 多阶段构建 - 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app

# 复制package.json文件
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# 安装依赖
RUN npm ci
RUN cd server && npm ci
RUN cd ../client && npm ci

# 复制源代码
COPY . .

# 构建项目
RUN cd client && npm run build
RUN cd server && npm run build

# 生产阶段
FROM node:18-alpine AS production

WORKDIR /app

# 创建非root用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S hcuser -u 1001

# 复制package.json和安装生产依赖
COPY server/package*.json ./
RUN npm ci --only=production && npm cache clean --force

# 复制构建后的文件
COPY --from=builder --chown=hcuser:nodejs /app/server/dist ./dist
COPY --from=builder --chown=hcuser:nodejs /app/client/build ./public

# 创建必要的目录
RUN mkdir -p data uploads && chown -R hcuser:nodejs data uploads

# 切换到非root用户
USER hcuser

# 暴露端口
EXPOSE 5000

# 健康检查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"

# 启动应用
CMD ["node", "dist/index.js"]
