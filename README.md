# HC管理系统

一个现代化的人力资源HC（Human Capital）管理系统，支持Excel文件上传和实时数据可视化展示。

![系统预览](https://img.shields.io/badge/Status-Ready-green) ![技术栈](https://img.shields.io/badge/Tech-React%2BNode.js-blue) ![许可证](https://img.shields.io/badge/License-MIT-yellow)

## ✨ 功能特性

- 📊 **Excel数据上传**：支持上传Excel文件，自动解析HC数据，智能识别多种列名格式
- 📈 **实时图表展示**：动态展示不同部门每月HC数量变化，包含柱状图、折线图、热力图
- 🔍 **智能筛选**：按部门、时间范围进行数据筛选，支持多条件组合查询
- 📱 **响应式设计**：支持桌面端和移动端访问，自适应不同屏幕尺寸
- 💾 **数据导出**：支持将处理后的数据导出为Excel文件
- 🎨 **现代化UI**：基于Ant Design 5.x的美观界面，支持暗色主题
- 📊 **统计面板**：实时显示总HC数量、记录数、部门数等关键指标
- 🔄 **数据管理**：支持数据清空、批量操作等管理功能

## 🛠 技术栈

### 前端技术
- **React 18** + **TypeScript** - 现代化前端框架
- **Ant Design 5.x** - 企业级UI组件库
- **ECharts** - 专业数据可视化图表库
- **Axios** - HTTP客户端
- **Day.js** - 轻量级日期处理库

### 后端技术
- **Node.js** + **Express** + **TypeScript** - 服务端框架
- **SQLite** - 轻量级数据库
- **Multer** - 文件上传中间件
- **xlsx** - Excel文件处理库
- **CORS** - 跨域资源共享

## 🚀 快速开始

### 环境要求
- Node.js 16.x 或更高版本
- npm 8.x 或更高版本

### 一键启动（推荐）

**Windows用户：**
```bash
# 双击运行启动脚本
start.bat
```

**Linux/Mac用户：**
```bash
# 给脚本执行权限并运行
chmod +x start.sh
./start.sh
```

### 手动启动

1. **克隆项目**
```bash
git clone <repository-url>
cd hc-management-system
```

2. **安装依赖**
```bash
npm run install:all
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **访问系统**
- 前端地址：http://localhost:3000
- 后端API：http://localhost:5000

## 📁 项目结构

```
hc-management-system/
├── client/                 # 前端React应用
│   ├── public/            # 静态资源
│   ├── src/
│   │   ├── components/    # React组件
│   │   ├── services/      # API服务
│   │   ├── types/         # TypeScript类型定义
│   │   └── App.tsx        # 主应用组件
│   └── package.json
├── server/                # 后端Node.js应用
│   ├── src/
│   │   ├── routes/        # API路由
│   │   ├── database.ts    # 数据库操作
│   │   └── index.ts       # 服务器入口
│   ├── data/              # SQLite数据库文件
│   ├── uploads/           # 上传文件存储
│   └── package.json
├── start.bat              # Windows启动脚本
├── start.sh               # Linux/Mac启动脚本
├── DEPLOYMENT.md          # 部署指南
└── README.md              # 项目说明
```

## 📋 Excel数据格式

系统支持多种Excel列名格式，自动识别以下字段：

| 中文列名 | 英文列名 | 说明 | 必填 |
|---------|---------|------|------|
| 部门 | Department | 部门名称 | ✅ |
| 月份 | Month | 格式：YYYY-MM 或 YYYYMM | ✅ |
| HC数量 | HC_Count / HC | 数字格式 | ✅ |
| 员工姓名 | Employee_Name | 员工姓名 | ❌ |

### 示例数据
```
部门        月份      HC数量    员工姓名
技术部      2024-01   15       张三
产品部      2024-01   8        李四
运营部      2024-01   12       王五
技术部      2024-02   18       赵六
```

## 📖 使用说明

### 1. 数据上传
- 点击"上传Excel"按钮或拖拽文件到上传区域
- 系统自动解析Excel文件并验证数据格式
- 支持.xlsx和.xls格式，文件大小限制10MB

### 2. 数据可视化
- **统计卡片**：显示总HC数量、记录数、部门数、月份数
- **部门统计图**：柱状图展示各部门HC总数
- **月度趋势图**：折线图展示HC数量随时间变化
- **热力图**：部门×月份的HC分布热力图

### 3. 数据筛选
- **部门筛选**：支持多选部门进行筛选
- **时间筛选**：选择月份范围查看特定时期数据
- **组合筛选**：支持部门和时间的组合筛选

### 4. 数据管理
- **数据导出**：将筛选后的数据导出为Excel文件
- **数据清空**：清空所有已上传的数据
- **数据表格**：详细查看所有HC记录，支持排序和筛选

## 🔧 API接口

### 文件上传
```http
POST /api/upload
Content-Type: multipart/form-data
```

### 数据查询
```http
GET /api/data                    # 获取所有数据
GET /api/data/filter            # 筛选数据
GET /api/data/statistics        # 获取统计信息
GET /api/data/departments       # 获取部门列表
GET /api/data/months           # 获取月份列表
```

### 数据导出
```http
GET /api/data/export            # 导出Excel文件
```

### 数据管理
```http
DELETE /api/data/clear          # 清空所有数据
```

## 🚀 部署指南

详细的部署说明请参考 [DEPLOYMENT.md](./DEPLOYMENT.md)

### 生产环境快速部署
```bash
# 构建项目
npm run build
npm run server:build

# 启动生产服务器
npm start
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🆘 支持与反馈

如果您在使用过程中遇到问题或有改进建议，请：

1. 查看 [常见问题](./DEPLOYMENT.md#故障排除)
2. 提交 [Issue](../../issues)
3. 联系开发团队

---

**HC管理系统** - 让人力资源数据管理更简单、更直观！
