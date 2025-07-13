#!/bin/bash

echo "========================================"
echo "        HC管理系统启动脚本"
echo "========================================"
echo

echo "正在检查Node.js环境..."
if ! command -v node &> /dev/null; then
    echo "错误：未找到Node.js，请先安装Node.js"
    echo "下载地址：https://nodejs.org/"
    exit 1
fi

echo "Node.js环境检查通过"
echo

echo "正在安装项目依赖..."
npm run install:all
if [ $? -ne 0 ]; then
    echo "错误：依赖安装失败"
    exit 1
fi

echo
echo "依赖安装完成，正在启动HC管理系统..."
echo
echo "前端地址：http://localhost:3000"
echo "后端地址：http://localhost:5000"
echo
echo "按 Ctrl+C 停止服务"
echo

npm run dev
