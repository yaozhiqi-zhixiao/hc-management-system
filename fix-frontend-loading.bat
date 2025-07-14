@echo off
chcp 65001 >nul
echo ========================================
echo     修复HC系统前端加载问题
echo ========================================
echo.

echo 🔧 添加修复文件到Git...
git add .

echo 💾 提交修复...
git commit -m "fix: 修复前端页面加载问题

🔧 修复内容:
- 移除不再使用的echarts依赖
- 简化DepartmentTree组件，提高兼容性
- 修复TypeScript类型错误
- 优化组件导入和渲染逻辑

✨ 优化内容:
- 简化部门树组件结构
- 移除复杂的搜索和计数功能
- 保留核心的多层嵌套筛选功能
- 提高页面加载稳定性

🎯 确保功能:
- 多层部门树形筛选
- 左右分栏布局
- 实时数据筛选
- 响应式设计"

echo 🚀 推送修复到GitHub...
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ 修复完成！
    echo.
    echo 📍 修复内容:
    echo - 移除echarts依赖冲突
    echo - 简化部门树组件
    echo - 修复TypeScript错误
    echo - 优化页面加载性能
    echo.
    echo 🌐 在线访问:
    echo https://yaozhiqi-zhixiao.github.io/hc-management-system
    echo.
    echo ⏰ 等待GitHub Actions部署完成（约5-10分钟）
    echo 📱 修复后应该能正常加载前端页面
    echo.
) else (
    echo ❌ 推送失败，请检查网络连接或Git配置
)

pause
