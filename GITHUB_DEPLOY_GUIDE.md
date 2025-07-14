# 🚀 HC管理系统 - GitHub部署指南

## 📋 部署概览

将HC管理系统部署到GitHub，实现在线访问和自动化部署。

## 🎯 部署方案

### 方案1：一键自动部署（推荐）

**使用自动部署脚本：**

1. **打开命令行**
   ```cmd
   cd "C:\Users\yaozhiqi\Desktop\HC correction\HC-correction"
   ```

2. **运行部署脚本**
   ```cmd
   deploy-to-github-final.bat yaozhiqi-zhixiao
   ```

3. **等待部署完成**

### 方案2：手动部署

1. **在GitHub上创建仓库**
   - 访问：https://github.com
   - 点击 "New repository"
   - 仓库名：`hc-management-system`
   - 选择 Public
   - 不要勾选任何初始化选项

2. **本地Git操作**
   ```cmd
   git init
   git add .
   git commit -m "feat: HC管理系统完整版"
   git remote add origin https://github.com/yaozhiqi-zhixiao/hc-management-system.git
   git push -u origin main
   ```

## 🔧 配置GitHub Pages

部署完成后：

1. **进入仓库设置**
   - 访问：https://github.com/yaozhiqi-zhixiao/hc-management-system
   - 点击 "Settings" 标签

2. **配置Pages**
   - 滚动到 "Pages" 部分
   - Source 选择："GitHub Actions"
   - 保存设置

3. **等待自动部署**
   - GitHub Actions会自动构建
   - 大约5-10分钟完成
   - 访问：https://yaozhiqi-zhixiao.github.io/hc-management-system

## 📱 部署后的访问地址

- **GitHub仓库**：https://github.com/yaozhiqi-zhixiao/hc-management-system
- **在线演示**：https://yaozhiqi-zhixiao.github.io/hc-management-system
- **API文档**：仓库中的README.md

## 🎉 系统功能

部署完成后，在线系统将包含：

### 核心功能
- 📊 **复杂Excel上传**：支持多级部门和12个月数据
- 📈 **实时数据可视化**：柱状图、折线图、热力图
- 🔍 **智能筛选**：多维度数据筛选
- 💾 **数据导出**：Excel格式下载
- 📱 **响应式设计**：支持手机、平板访问

### Excel格式支持
- **部门层级**：一级部门 → 六级部门
- **员工信息**：员工类型、job family、job group、职级、城市
- **月度数据**：1月 → 12月HC数量

## 🔧 故障排除

### 问题1：推送失败
**解决方案**：
1. 确保GitHub仓库已创建
2. 检查网络连接
3. 使用GitHub Desktop

### 问题2：GitHub Pages不显示
**解决方案**：
1. 检查Settings → Pages配置
2. 确保选择了"GitHub Actions"
3. 查看Actions标签页的构建日志

### 问题3：认证失败
**解决方案**：
1. 使用GitHub Desktop
2. 配置Git凭据
3. 使用SSH密钥

## 📞 需要帮助？

如果遇到问题：
1. 检查命令行输出的错误信息
2. 确认GitHub仓库创建成功
3. 查看GitHub Actions构建日志
4. 联系技术支持

---

## 🚀 立即开始

**推荐步骤：**

1. **运行自动部署脚本**：
   ```cmd
   deploy-to-github-final.bat yaozhiqi-zhixiao
   ```

2. **配置GitHub Pages**：
   - Settings → Pages → Source: "GitHub Actions"

3. **等待部署完成**：
   - 访问：https://yaozhiqi-zhixiao.github.io/hc-management-system

**准备好部署了吗？现在就开始吧！** 🎯
