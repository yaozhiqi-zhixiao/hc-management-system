@echo off
chcp 65001 >nul
echo ========================================
echo     修复GitHub Pages部署
echo ========================================
echo.

echo 🔧 添加修复文件到Git...
git add .

echo 💾 提交修复...
git commit -m "fix: 修复GitHub Pages部署配置

- 添加GitHub Actions工作流
- 配置正确的homepage路径
- 优化构建和部署流程"

echo 🚀 推送修复到GitHub...
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ 修复完成！
    echo.
    echo 📍 接下来的步骤:
    echo 1. 访问GitHub仓库: https://github.com/yaozhiqi-zhixiao/hc-management-system
    echo 2. 查看Actions标签页，等待构建完成
    echo 3. 构建成功后访问: https://yaozhiqi-zhixiao.github.io/hc-management-system
    echo.
    echo ⏰ 预计等待时间: 5-10分钟
    echo.
) else (
    echo ❌ 推送失败，请检查网络连接或Git配置
)

pause
