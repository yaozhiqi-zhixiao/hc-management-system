# HC管理系统部署指南

## 环境要求

- Node.js 16.x 或更高版本
- npm 8.x 或更高版本
- 支持的操作系统：Windows 10+, macOS 10.15+, Ubuntu 18.04+

## 快速启动

### 方法一：使用启动脚本（推荐）

**Windows用户：**
```bash
双击运行 start.bat
```

**Linux/Mac用户：**
```bash
chmod +x start.sh
./start.sh
```

### 方法二：手动启动

1. **安装依赖**
```bash
npm run install:all
```

2. **启动开发服务器**
```bash
npm run dev
```

3. **访问系统**
- 前端地址：http://localhost:3000
- 后端API：http://localhost:5000

## 生产环境部署

### 1. 构建项目
```bash
# 构建前端
cd client
npm run build

# 构建后端
cd ../server
npm run build
```

### 2. 启动生产服务器
```bash
# 在server目录下
npm start
```

### 3. 使用PM2部署（推荐）
```bash
# 安装PM2
npm install -g pm2

# 启动服务
pm2 start server/dist/index.js --name "hc-system"

# 查看状态
pm2 status

# 查看日志
pm2 logs hc-system
```

### 4. 使用Docker部署

创建 `Dockerfile`：
```dockerfile
FROM node:18-alpine

WORKDIR /app

# 复制package.json文件
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# 安装依赖
RUN npm run install:all

# 复制源代码
COPY . .

# 构建项目
RUN npm run build
RUN npm run server:build

# 暴露端口
EXPOSE 5000

# 启动服务
CMD ["npm", "start"]
```

构建和运行：
```bash
docker build -t hc-system .
docker run -p 5000:5000 hc-system
```

## 配置说明

### 环境变量
在 `server` 目录下创建 `.env` 文件：
```env
PORT=5000
NODE_ENV=production
```

### 数据库配置
系统使用SQLite数据库，数据文件位于 `server/data/hc_data.db`

### 文件上传配置
上传的文件存储在 `server/uploads/` 目录

## 系统监控

### 健康检查
```bash
curl http://localhost:5000/api/health
```

### 日志查看
- 开发环境：控制台输出
- 生产环境：使用PM2查看日志

## 故障排除

### 常见问题

1. **端口被占用**
   - 修改 `server/src/index.ts` 中的端口配置
   - 或设置环境变量 `PORT=其他端口`

2. **依赖安装失败**
   - 清除缓存：`npm cache clean --force`
   - 删除 `node_modules` 重新安装

3. **数据库连接失败**
   - 检查 `server/data/` 目录权限
   - 确保SQLite3正确安装

4. **文件上传失败**
   - 检查 `server/uploads/` 目录权限
   - 确保磁盘空间充足

### 性能优化

1. **前端优化**
   - 启用gzip压缩
   - 使用CDN加速静态资源
   - 配置缓存策略

2. **后端优化**
   - 使用连接池
   - 添加Redis缓存
   - 配置负载均衡

## 安全建议

1. **文件上传安全**
   - 限制文件类型和大小
   - 扫描恶意文件
   - 隔离上传目录

2. **API安全**
   - 添加身份验证
   - 实施访问控制
   - 启用HTTPS

3. **数据安全**
   - 定期备份数据库
   - 加密敏感数据
   - 审计日志记录
