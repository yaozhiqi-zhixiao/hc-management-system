@echo off
chcp 65001 >nul
echo ========================================
echo     更新HC系统部门筛选器
echo ========================================
echo.

echo 🔧 添加更新文件到Git...
git add .

echo 💾 提交更新...
git commit -m "feat: 添加多层嵌套部门树筛选器

✨ 新增功能:
- 多层嵌套的部门树形筛选器
- 左侧固定位置显示部门筛选器
- 右侧显示数据详情和表格
- 支持部门搜索和全选/清空功能
- 显示每个部门的HC数量统计

🎨 界面优化:
- 响应式布局设计
- 树形结构展示部门层级
- 实时筛选和数据更新
- 粘性定位的筛选器面板

🔧 技术实现:
- 使用Ant Design Tree组件
- 智能的部门层级构建算法
- 高效的数据筛选逻辑
- TypeScript类型安全"

echo 🚀 推送更新到GitHub...
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ 更新完成！
    echo.
    echo 📍 新增功能:
    echo - 多层嵌套部门树筛选器
    echo - 左右分栏布局
    echo - 实时数据筛选
    echo - 部门HC数量统计
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
