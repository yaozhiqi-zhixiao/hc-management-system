# 🚀 HC管理系统快速修复指南

## 🔧 解决npm error问题

从你的截图看，问题是缺少install:all脚本。让我们手动解决：

## 📋 手动安装步骤

### 步骤1：打开命令行
1. **按 Win + R**
2. **输入 `cmd`**
3. **按回车**

### 步骤2：进入项目目录
```cmd
cd "C:\Users\yaozhiqi\Desktop\HC correction\HC-correction"
```

### 步骤3：逐步安装依赖
```cmd
npm install
```

等待完成后：
```cmd
cd server
npm install
```

等待完成后：
```cmd
cd ..
cd client
npm install
```

### 步骤4：启动系统

**方法1：分别启动（推荐）**

打开第一个命令行窗口：
```cmd
cd "C:\Users\yaozhiqi\Desktop\HC correction\HC-correction\server"
npm run dev
```

打开第二个命令行窗口：
```cmd
cd "C:\Users\yaozhiqi\Desktop\HC correction\HC-correction\client"
npm start
```

**方法2：使用简化脚本**
双击运行：`simple_start.bat`

## 📱 访问系统

启动成功后：
- **前端**：http://localhost:3000
- **后端**：http://localhost:5000

## 🎯 预期结果

启动成功后你会看到：
- 服务器窗口显示：`Server running on port 5000`
- 客户端窗口显示：`webpack compiled successfully`
- 浏览器自动打开 http://localhost:3000

## 🔧 如果还是有问题

### 问题1：端口被占用
```cmd
netstat -ano | findstr :3000
taskkill /PID <进程ID> /F
```

### 问题2：依赖安装失败
```cmd
npm cache clean --force
npm install
```

### 问题3：网络问题
```cmd
npm config set registry https://registry.npmmirror.com
```

## 🚀 立即开始

**现在就试试：**

1. **双击 `simple_start.bat`**（最简单）
2. **或者按照上面的手动步骤**
3. **等待启动完成**
4. **访问 http://localhost:3000**

## 📞 需要帮助？

如果遇到问题，告诉我：
1. 具体的错误信息
2. 执行到哪一步失败了
3. 命令行显示的内容

**准备好了吗？现在就开始吧！** 🎯
