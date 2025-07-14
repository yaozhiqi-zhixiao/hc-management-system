# 🔧 HC管理系统手动启动指南

## 🚨 解决乱码问题

看到乱码说明Node.js可能没有正确安装或配置。让我们手动启动：

## 📋 手动启动步骤

### 步骤1：验证Node.js安装

1. **按 Win + R**
2. **输入 `cmd`**
3. **按回车打开命令行**
4. **输入以下命令验证**：
   ```cmd
   node --version
   ```

   如果显示版本号（如 v18.17.0），说明安装成功
   如果显示"不是内部或外部命令"，需要重新安装Node.js

### 步骤2：重新安装Node.js（如果需要）

1. **访问**：https://nodejs.org/
2. **下载LTS版本**（推荐18.x或20.x）
3. **运行安装程序**
4. **重启电脑**
5. **重新验证安装**

### 步骤3：手动启动系统

1. **打开命令行**（Win + R → cmd）
2. **进入项目目录**：
   ```cmd
   cd "C:\Users\yaozhiqi\Desktop\HC correction\HC-correction"
   ```

3. **安装依赖**：
   ```cmd
   npm install
   ```

4. **进入服务器目录安装依赖**：
   ```cmd
   cd server
   npm install
   cd ..
   ```

5. **进入客户端目录安装依赖**：
   ```cmd
   cd client
   npm install
   cd ..
   ```

6. **启动后端服务**：
   ```cmd
   cd server
   npm run dev
   ```

   保持这个窗口打开，打开新的命令行窗口

7. **启动前端服务**（新窗口）：
   ```cmd
   cd "C:\Users\yaozhiqi\Desktop\HC correction\HC-correction\client"
   npm start
   ```

## 🎯 替代方案：使用修复版脚本

我创建了一个修复版的启动脚本：

**双击运行**：`start_fixed.bat`

这个脚本修复了编码问题，应该能正常显示中文。

## 📱 访问系统

启动成功后：
- **前端**：http://localhost:3000
- **后端**：http://localhost:5000

## 🔧 常见问题解决

### 问题1：Node.js未找到
**解决方案**：
- 重新下载安装Node.js
- 安装时选择"Add to PATH"
- 重启电脑

### 问题2：端口被占用
**解决方案**：
```cmd
netstat -ano | findstr :3000
taskkill /PID <进程ID> /F
```

### 问题3：权限问题
**解决方案**：
- 以管理员身份运行命令行
- 右键命令行 → "以管理员身份运行"

### 问题4：网络问题
**解决方案**：
```cmd
npm config set registry https://registry.npmmirror.com
```

## 🚀 快速解决方案

**立即尝试：**

1. **双击 `start_fixed.bat`**（修复版脚本）
2. **如果还是乱码，手动执行上述步骤**
3. **如果Node.js未安装，先安装Node.js再重试**

## 📞 需要帮助？

告诉我：
1. Node.js是否已正确安装？
2. 运行 `node --version` 的结果
3. 具体的错误信息

**现在试试 `start_fixed.bat` 或按照手动步骤操作！** 🎯
