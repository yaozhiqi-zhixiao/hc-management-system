@echo off
chcp 65001 >nul
echo ========================================
echo        HC管理系统简化启动脚本
echo ========================================
echo.

echo 步骤1：安装根目录依赖...
npm install
if %errorlevel% neq 0 (
    echo 根目录依赖安装失败，请检查网络连接
    pause
    exit /b 1
)

echo.
echo 步骤2：安装服务器依赖...
cd server
npm install
if %errorlevel% neq 0 (
    echo 服务器依赖安装失败
    cd ..
    pause
    exit /b 1
)

echo.
echo 步骤3：安装客户端依赖...
cd ../client
npm install
if %errorlevel% neq 0 (
    echo 客户端依赖安装失败
    cd ..
    pause
    exit /b 1
)

echo.
echo 步骤4：启动服务器...
cd ../server
start "HC-Server" cmd /k "npm run dev"

echo.
echo 等待服务器启动...
timeout /t 5 /nobreak >nul

echo.
echo 步骤5：启动客户端...
cd ../client
start "HC-Client" cmd /k "npm start"

echo.
echo ========================================
echo HC管理系统启动完成！
echo.
echo 前端地址：http://localhost:3000
echo 后端地址：http://localhost:5000
echo.
echo 请等待浏览器自动打开，或手动访问上述地址
echo ========================================
pause
