# 🚀 启动后端服务器指南

## 🔧 当前状态
- ✅ 前端已成功运行（http://localhost:3000）
- ❌ 后端服务器未启动（需要启动 http://localhost:5000）
- 🎯 目标：启动后端服务器解决上传失败问题

## 📋 启动后端服务器步骤

### 方法1：新开命令行窗口（推荐）

1. **打开新的命令行窗口**
   - 按 Win + R
   - 输入 `cmd`
   - 按回车

2. **进入服务器目录**
   ```cmd
   cd "C:\Users\yaozhiqi\Desktop\HC correction\HC-correction\server"
   ```

3. **启动后端服务器**
   ```cmd
   npm run dev
   ```

### 方法2：使用启动脚本

**双击运行**：`simple_start.bat`

这个脚本会自动启动前端和后端服务。

## 📱 启动成功的标志

后端启动成功后，你会看到类似这样的输出：
```
Server running on port 5000
Database initialized successfully
```

## 🎯 验证后端是否启动

1. **打开浏览器**
2. **访问**：http://localhost:5000
3. **应该看到**：API响应或服务器信息

## 🔧 如果启动失败

### 问题1：端口被占用
```cmd
netstat -ano | findstr :5000
taskkill /PID <进程ID> /F
```

### 问题2：依赖问题
```cmd
cd server
npm install
npm run dev
```

### 问题3：权限问题
- 以管理员身份运行命令行

## 📊 测试上传功能

后端启动成功后：

1. **创建测试Excel文件**，包含以下数据：

| 部门 | 月份 | HC数量 | 员工姓名 |
|------|------|--------|----------|
| 技术部 | 2024-01 | 15 | 张三 |
| 产品部 | 2024-01 | 8 | 李四 |
| 运营部 | 2024-01 | 12 | 王五 |

2. **保存为 test_data.xlsx**

3. **在HC管理系统中上传测试**

## 🚀 立即开始

**现在就试试：**

1. **打开新的命令行窗口**
2. **执行**：
   ```cmd
   cd "C:\Users\yaozhiqi\Desktop\HC correction\HC-correction\server"
   npm run dev
   ```
3. **等待看到 "Server running on port 5000"**
4. **回到浏览器测试上传功能**

## 📞 需要帮助？

如果遇到问题：
1. 告诉我具体的错误信息
2. 截图命令行输出
3. 确认是否看到端口5000的启动信息

**准备好启动后端服务器了吗？** 🎯
