# GitHub部署指南

本指南将帮助你将HC管理系统部署到GitHub，包括代码托管、GitHub Pages部署和GitHub Actions自动化。

## 📋 部署选项

### 1. GitHub Pages（前端静态部署）
适合展示系统界面，但后端功能需要单独部署。

### 2. GitHub + 云服务器（完整部署）
推荐方案，前端部署到GitHub Pages，后端部署到云服务器。

### 3. GitHub + Docker（容器化部署）
使用Docker进行完整的容器化部署。

## 🚀 快速部署步骤

### 步骤1：创建GitHub仓库

1. **登录GitHub**，创建新仓库
   ```
   仓库名：hc-management-system
   描述：HC管理系统 - 人力资源数据管理平台
   可见性：Public（推荐）或 Private
   ```

2. **初始化仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: HC Management System"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/hc-management-system.git
   git push -u origin main
   ```

### 步骤2：配置GitHub Pages

1. **进入仓库设置**
   - 点击仓库的 `Settings` 标签
   - 滚动到 `Pages` 部分

2. **配置Pages源**
   - Source: `GitHub Actions`
   - 或选择 `Deploy from a branch` → `gh-pages`

3. **自动部署**
   - 推送代码后，GitHub Actions会自动构建和部署
   - 访问地址：`https://YOUR_USERNAME.github.io/hc-management-system`

### 步骤3：配置环境变量（可选）

在仓库设置中添加Secrets：
```
Settings → Secrets and variables → Actions → New repository secret
```

常用环境变量：
- `NODE_ENV`: production
- `API_URL`: 后端API地址
- `DATABASE_URL`: 数据库连接字符串

## 🔧 GitHub Actions配置

系统已包含 `.github/workflows/deploy.yml` 配置文件，支持：

- ✅ 自动构建和测试
- ✅ 多Node.js版本测试
- ✅ 自动部署到GitHub Pages
- ✅ 构建缓存优化

### 工作流程说明

1. **触发条件**：推送到main/master分支
2. **构建测试**：Node.js 18.x 和 20.x 环境测试
3. **自动部署**：构建成功后自动部署到GitHub Pages

## 🌐 完整部署方案

### 方案A：GitHub Pages + 云服务器

**前端（GitHub Pages）：**
```bash
# 1. 推送代码到GitHub
git push origin main

# 2. GitHub Actions自动部署前端到Pages
# 访问：https://YOUR_USERNAME.github.io/hc-management-system
```

**后端（云服务器）：**
```bash
# 1. 在服务器上克隆仓库
git clone https://github.com/YOUR_USERNAME/hc-management-system.git
cd hc-management-system

# 2. 安装依赖并构建
npm run install:all
npm run server:build

# 3. 启动服务（推荐使用PM2）
npm install -g pm2
pm2 start server/dist/index.js --name "hc-system"
```

### 方案B：Docker部署

```bash
# 1. 构建Docker镜像
docker build -t hc-management-system .

# 2. 运行容器
docker run -d -p 5000:5000 --name hc-system hc-management-system

# 3. 或使用Docker Compose
docker-compose up -d
```

### 方案C：Vercel部署（推荐）

1. **连接GitHub仓库到Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 导入GitHub仓库
   - 选择 `hc-management-system`

2. **配置构建设置**
   ```
   Framework Preset: Create React App
   Build Command: cd client && npm run build
   Output Directory: client/build
   Install Command: npm run install:all
   ```

3. **环境变量配置**
   ```
   NODE_ENV=production
   ```

## 📱 移动端适配

系统已支持响应式设计，在移动设备上访问体验良好：
- 📱 手机端：完整功能支持
- 📟 平板端：优化布局显示
- 💻 桌面端：完整功能体验

## 🔒 安全配置

### 1. 环境变量管理
```bash
# 在生产环境中设置
export NODE_ENV=production
export PORT=5000
export DATABASE_URL=your_database_url
```

### 2. HTTPS配置
```nginx
# 在nginx.conf中启用SSL
server {
    listen 443 ssl http2;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
}
```

### 3. 访问控制
```javascript
// 在server中添加认证中间件
app.use('/api', authMiddleware);
```

## 📊 监控和日志

### 1. 应用监控
```bash
# 使用PM2监控
pm2 monit

# 查看日志
pm2 logs hc-system
```

### 2. 性能监控
- 使用Google Analytics跟踪用户行为
- 配置Sentry进行错误监控
- 设置Uptime监控服务可用性

## 🔄 持续集成/持续部署

### GitHub Actions工作流
1. **代码推送** → **自动测试** → **构建** → **部署**
2. **Pull Request** → **自动测试** → **代码审查**
3. **发布Tag** → **创建Release** → **生产部署**

### 自动化脚本
```bash
# 部署脚本
#!/bin/bash
git pull origin main
npm run install:all
npm run build
pm2 restart hc-system
```

## 🆘 故障排除

### 常见问题

1. **GitHub Pages部署失败**
   - 检查 `.github/workflows/deploy.yml` 配置
   - 确认仓库有Pages权限
   - 查看Actions日志

2. **构建失败**
   - 检查Node.js版本兼容性
   - 确认所有依赖正确安装
   - 查看构建日志错误信息

3. **API连接失败**
   - 检查后端服务是否正常运行
   - 确认API地址配置正确
   - 检查CORS设置

### 调试命令
```bash
# 本地测试构建
npm run build
npm run server:build

# 检查端口占用
netstat -tulpn | grep :5000

# 查看应用日志
pm2 logs hc-system --lines 100
```

## 📞 技术支持

如需帮助，请：
1. 查看 [Issues](https://github.com/YOUR_USERNAME/hc-management-system/issues)
2. 创建新的Issue描述问题
3. 联系开发团队

---

**祝你部署成功！** 🎉
