@echo off
chcp 65001 >nul
echo ========================================
echo        HC管理系统后端服务器（修复版）
echo ========================================
echo.

echo 进入服务器目录...
cd server

echo 创建必要的目录...
if not exist "data" mkdir data
if not exist "uploads" mkdir uploads

echo 检查依赖...
if not exist "node_modules" (
    echo 安装服务器依赖...
    npm install
)

echo.
echo 重新构建服务器...
npm run build

echo.
echo 启动后端服务器...
echo 服务器地址：http://localhost:5000
echo.
echo 按 Ctrl+C 停止服务器
echo.

npm run dev

pause
