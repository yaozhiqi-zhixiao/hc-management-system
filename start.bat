@echo off
echo ========================================
echo        HC管理系统启动脚本
echo ========================================
echo.

echo 正在检查Node.js环境...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误：未找到Node.js，请先安装Node.js
    echo 下载地址：https://nodejs.org/
    pause
    exit /b 1
)

echo Node.js环境检查通过
echo.

echo 正在安装项目依赖...
call npm run install:all
if %errorlevel% neq 0 (
    echo 错误：依赖安装失败
    pause
    exit /b 1
)

echo.
echo 依赖安装完成，正在启动HC管理系统...
echo.
echo 前端地址：http://localhost:3000
echo 后端地址：http://localhost:5000
echo.
echo 按 Ctrl+C 停止服务
echo.

call npm run dev
