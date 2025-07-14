# 🚀 HC管理系统部署指南 - yaozhiqi-zhixiao

## 📋 当前状态
- ✅ 项目代码已准备完成
- ✅ Git仓库已初始化并提交
- ⚠️ 需要先创建GitHub仓库

## 🎯 立即部署步骤

### 步骤1：创建GitHub仓库（必须先完成）

1. **访问GitHub**
   - 打开 https://github.com
   - 确保已登录账户 `yaozhiqi-zhixiao`

2. **创建新仓库**
   - 点击右上角 "+" → "New repository"
   - 填写信息：
     ```
     Repository name: hc-management-system
     Description: HC管理系统 - 人力资源数据管理平台
     Visibility: ✅ Public (推荐，便于GitHub Pages)
     ```
   - ❌ 不要勾选 "Add a README file"
   - ❌ 不要勾选 "Add .gitignore"
   - ❌ 不要选择 "Choose a license"
   - 点击 "Create repository"

### 步骤2：推送代码到GitHub

创建仓库后，在当前目录执行：

```bash
git remote add origin https://github.com/yaozhiqi-zhixiao/hc-management-system.git
git push -u origin main
```

### 步骤3：配置GitHub Pages自动部署

1. **进入仓库设置**
   - 访问：https://github.com/yaozhiqi-zhixiao/hc-management-system
   - 点击 "Settings" 标签

2. **配置Pages**
   - 滚动到左侧菜单的 "Pages"
   - Source 选择：**"GitHub Actions"**
   - 保存设置

3. **等待自动部署**
   - GitHub Actions会自动开始构建
   - 大约3-5分钟完成
   - 部署完成后访问：https://yaozhiqi-zhixiao.github.io/hc-management-system

## 🔄 替代部署方案

### 方案A：使用GitHub Desktop（推荐新手）

1. 下载安装 [GitHub Desktop](https://desktop.github.com/)
2. 登录你的GitHub账户
3. 点击 "Add an Existing Repository from your Hard Drive"
4. 选择当前项目文件夹
5. 点击 "Publish repository"
6. 仓库名设为：`hc-management-system`
7. 确保勾选 "Public"
8. 点击 "Publish Repository"

### 方案B：重新初始化（如果遇到问题）

```bash
# 删除现有的远程仓库配置
git remote remove origin

# 重新添加（确保GitHub仓库已创建）
git remote add origin https://github.com/yaozhiqi-zhixiao/hc-management-system.git

# 推送代码
git push -u origin main
```

## 🎉 部署完成后的访问地址

- **GitHub仓库**：https://github.com/yaozhiqi-zhixiao/hc-management-system
- **在线演示**：https://yaozhiqi-zhixiao.github.io/hc-management-system
- **项目文档**：仓库中的README.md

## 📱 系统功能

部署完成后，你的HC管理系统将包含：

### 核心功能
- 📊 **Excel文件上传**：拖拽或点击上传.xlsx/.xls文件
- 📈 **数据可视化**：
  - 部门HC统计柱状图
  - 月度HC趋势折线图
  - 部门×月份热力图
- 🔍 **智能筛选**：按部门、时间范围筛选
- 💾 **数据导出**：导出筛选后的数据为Excel
- 📱 **响应式设计**：支持手机、平板、桌面访问

### 技术特性
- ⚡ **实时更新**：上传数据后立即显示图表
- 🎨 **现代UI**：基于Ant Design的美观界面
- 🔒 **数据安全**：本地SQLite数据库存储
- 🚀 **高性能**：React 18 + TypeScript构建

## 🔧 故障排除

### 问题1：Repository not found
**解决方案**：确保先在GitHub网站上创建仓库

### 问题2：Authentication failed
**解决方案**：
1. 使用GitHub Desktop
2. 或配置Git凭据：
   ```bash
   git config --global user.name "yaozhiqi-zhixiao"
   git config --global user.email "your-email@example.com"
   ```

### 问题3：GitHub Pages不显示
**解决方案**：
1. 检查Settings → Pages配置
2. 确保选择了"GitHub Actions"
3. 查看Actions标签页的构建日志

## 📞 需要帮助？

如果遇到任何问题：
1. 检查GitHub仓库是否成功创建
2. 确认网络连接正常
3. 查看终端错误信息
4. 可以尝试GitHub Desktop图形界面

---

**下一步：请先在GitHub上创建仓库，然后告诉我创建完成，我会继续帮你推送代码！** 🎯
