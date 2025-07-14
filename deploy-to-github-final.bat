@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo ========================================
echo     HC管理系统 - GitHub部署脚本
echo ========================================
echo.

REM 检查参数
if "%1"=="" (
    echo ❌ 请提供GitHub用户名
    echo 使用方法: deploy-to-github-final.bat your-github-username
    echo.
    echo 示例: deploy-to-github-final.bat yaozhiqi-zhixiao
    pause
    exit /b 1
)

set GITHUB_USERNAME=%1
set REPO_NAME=hc-management-system
set REPO_URL=https://github.com/%GITHUB_USERNAME%/%REPO_NAME%.git

echo 📋 部署信息:
echo    GitHub用户名: %GITHUB_USERNAME%
echo    仓库名称: %REPO_NAME%
echo    仓库地址: %REPO_URL%
echo.

REM 检查Git是否已初始化
if not exist ".git" (
    echo 🔧 初始化Git仓库...
    git init
    echo ✅ Git仓库初始化完成
)

REM 检查是否有远程仓库
git remote get-url origin >nul 2>&1
if %errorlevel% equ 0 (
    echo 🔄 更新远程仓库地址...
    git remote set-url origin %REPO_URL%
) else (
    echo 🔗 添加远程仓库...
    git remote add origin %REPO_URL%
)

REM 检查当前分支并切换到main
for /f "tokens=*" %%i in ('git branch --show-current 2^>nul') do set CURRENT_BRANCH=%%i
if "!CURRENT_BRANCH!"=="" (
    echo 🌿 创建main分支...
    git checkout -b main
) else if not "!CURRENT_BRANCH!"=="main" if not "!CURRENT_BRANCH!"=="master" (
    echo 🌿 切换到main分支...
    git checkout -b main 2>nul || git checkout main
)

REM 添加所有文件
echo 📦 添加项目文件...
git add .

REM 检查是否有变更
git diff --staged --quiet
if %errorlevel% equ 0 (
    echo ℹ️  没有新的变更需要提交
) else (
    echo 💾 提交变更...
    git commit -m "feat: HC管理系统完整版 - 支持复杂Excel格式

✨ 核心功能:
- 支持多级部门结构（一级到六级部门）
- 支持12个月HC数据解析
- 员工详细信息管理（员工类型、job family、job group、职级、城市）
- 实时数据可视化（柱状图、折线图、热力图）
- 智能筛选和数据导出
- 响应式UI设计

🛠 技术栈:
- 前端: React 18 + TypeScript + Ant Design + ECharts
- 后端: Node.js + Express + TypeScript + SQLite
- 部署: GitHub Actions + Docker

📊 Excel格式支持:
- 多级部门层级结构
- 月度HC数据（1月-12月）
- 员工详细信息字段
- 智能数据解析和验证

🚀 部署配置:
- GitHub Pages自动部署
- Docker容器化支持
- 完整的CI/CD流程"
)

REM 推送到GitHub
echo 🚀 推送到GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo 🎉 部署成功！
    echo.
    echo 📍 接下来的步骤:
    echo 1. 访问GitHub仓库: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
    echo 2. 进入Settings → Pages，配置GitHub Pages
    echo 3. 选择Source为'GitHub Actions'
    echo 4. 等待自动部署完成
    echo.
    echo 🌐 部署后的访问地址:
    echo    GitHub Pages: https://%GITHUB_USERNAME%.github.io/%REPO_NAME%
    echo    仓库地址: https://github.com/%GITHUB_USERNAME%/%REPO_NAME%
    echo.
    echo ✅ 脚本执行完成！
) else (
    echo.
    echo ❌ 推送失败！
    echo 可能的原因:
    echo 1. GitHub仓库尚未创建
    echo 2. 网络连接问题
    echo 3. 认证失败
    echo.
    echo 💡 解决方案:
    echo 1. 先在GitHub上创建仓库: %REPO_NAME%
    echo 2. 检查网络连接
    echo 3. 使用GitHub Desktop进行推送
)

pause
