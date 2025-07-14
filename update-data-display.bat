@echo off
chcp 65001 >nul
echo ========================================
echo     更新HC系统数据显示方式
echo ========================================
echo.

echo 🔧 添加更新文件到Git...
git add .

echo 💾 提交更新...
git commit -m "feat: 更新数据显示方式

✨ 主要更改:
- 移除图表功能（部门HC统计、月度HC趋势、HC热力图）
- 每行Excel数据对应一条数据库记录
- 显示年度总HC数量和月度分布详情
- 简化界面，专注于数据管理

🎯 数据处理逻辑:
- Excel每行 → 数据库一条记录
- 自动计算12个月HC总和
- 保留完整的部门层级和员工信息
- 月度数据作为详情显示在员工信息中"

echo 🚀 推送更新到GitHub...
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ 更新完成！
    echo.
    echo 📍 更新内容:
    echo - 移除了图表功能
    echo - 每行Excel数据对应一条记录
    echo - 显示年度HC总量和月度分布
    echo.
    echo 🌐 在线访问:
    echo https://yaozhiqi-zhixiao.github.io/hc-management-system
    echo.
    echo ⏰ 等待GitHub Actions部署完成（约5-10分钟）
    echo.
) else (
    echo ❌ 推送失败，请检查网络连接或Git配置
)

pause
