@echo off
chcp 65001 >nul
echo ========================================
echo        启动HC管理系统后端服务器
echo ========================================
echo.

echo 进入服务器目录...
cd server

echo 检查依赖...
if not exist "node_modules" (
    echo 安装服务器依赖...
    npm install
)

echo.
echo 启动后端服务器...
echo 服务器地址：http://localhost:5000
echo.
echo 按 Ctrl+C 停止服务器
echo.

npm run dev

pause
