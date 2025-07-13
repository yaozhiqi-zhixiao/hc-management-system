@echo off
setlocal enabledelayedexpansion

REM HC管理系统 - GitHub部署脚本 (Windows版本)
REM 使用方法: deploy-to-github.bat your-github-username

echo 🚀 HC管理系统 - GitHub部署脚本
echo ==================================

REM 检查参数
if "%1"=="" (
    echo ❌ 请提供GitHub用户名
    echo 使用方法: deploy-to-github.bat your-github-username
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
    git commit -m "feat: HC管理系统 - 完整功能实现

✨ 新功能:
- Excel文件上传和解析
- 实时数据可视化图表
- 智能筛选和搜索
- 数据导出功能
- 响应式UI设计

🛠 技术栈:
- 前端: React 18 + TypeScript + Ant Design
- 后端: Node.js + Express + SQLite
- 部署: GitHub Actions + Docker

📚 文档:
- 完整的README和部署指南
- Docker和GitHub Actions配置
- 示例数据和使用说明"
)

REM 推送到GitHub
echo 🚀 推送到GitHub...
git push -u origin main

echo.
echo 🎉 部署完成！
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
echo 📖 详细部署指南请查看: GITHUB_DEPLOYMENT.md
echo.
echo ✅ 脚本执行完成！
pause
