# HC管理系统

一个现代化的人力资源HC（Human Capital）管理系统，支持复杂Excel文件上传和实时数据可视化展示。

![系统预览](https://img.shields.io/badge/Status-Ready-green) ![技术栈](https://img.shields.io/badge/Tech-React%2BNode.js-blue) ![许可证](https://img.shields.io/badge/License-MIT-yellow)

## ✨ 功能特性

### 📊 核心功能
- **复杂Excel数据上传**：支持多级部门结构和12个月HC数据解析
- **多级部门管理**：支持一级到六级部门层级结构
- **员工详细信息**：员工类型、job family、job group、职级、城市等字段
- **实时图表展示**：动态展示部门HC统计、月度趋势、热力图
- **智能筛选**：按部门层级、时间范围进行数据筛选
- **数据导出**：支持将处理后的数据导出为Excel文件

### 🎨 界面特性
- **响应式设计**：支持桌面端和移动端访问，自适应不同屏幕尺寸
- **现代化UI**：基于Ant Design 5.x的美观界面，支持暗色主题
- **统计面板**：实时显示总HC数量、记录数、部门数等关键指标
- **数据管理**：支持数据清空、批量操作等管理功能

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
git clone https://github.com/yaozhiqi-zhixiao/hc-management-system.git
cd hc-management-system
```

2. **安装依赖**
```bash
npm install
cd server && npm install && cd ..
cd client && npm install && cd ..
```

3. **启动开发服务器**
```bash
# 启动后端服务器
cd server && npm run dev

# 启动前端服务器（新终端窗口）
cd client && npm start
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
├── .github/workflows/     # GitHub Actions配置
├── start.bat              # Windows启动脚本
├── start.sh               # Linux/Mac启动脚本
├── deploy-to-github-final.bat  # GitHub部署脚本
├── DEPLOYMENT.md          # 部署指南
└── README.md              # 项目说明
```

## 📋 Excel数据格式

系统支持复杂的Excel格式，包含以下字段：

### 部门层级字段（必需）
| 列名 | 说明 | 示例 |
|------|------|------|
| 一级部门 | 顶级部门 | 技术中心 |
| 二级部门 | 二级部门 | 研发部 |
| 三级部门 | 三级部门 | 前端组 |
| 四级部门 | 四级部门 | 核心团队 |
| 五级部门 | 五级部门 | 专项小组 |
| 六级部门 | 六级部门 | 项目组 |

### 员工信息字段（可选）
| 列名 | 说明 | 示例 |
|------|------|------|
| 员工类型 | 员工分类 | 正式员工 |
| job family | 职位族群 | Engineering |
| job group | 职位组 | Frontend |
| 职级 | 员工职级 | P6 |
| 城市 | 工作城市 | 北京 |

### 月度HC数据字段（必需）
| 列名 | 说明 |
|------|------|
| 1月-12月 | 各月份HC数量 |

### 示例数据
```
一级部门    二级部门    三级部门    员工类型    job family    职级    城市    1月    2月    3月
技术中心    研发部      前端组      正式员工    Engineering   P6     北京    5      6      7
技术中心    研发部      后端组      正式员工    Engineering   P7     上海    8      9      10
产品中心    产品部      用户体验    正式员工    Product       P5     深圳    3      4      5
```

## 📖 使用说明

### 1. 数据上传
- 点击"选择文件上传"按钮或拖拽文件到上传区域
- 系统自动解析Excel文件并验证数据格式
- 支持.xlsx和.xls格式，文件大小限制10MB

### 2. 数据可视化
- **统计卡片**：显示总HC数量、记录数、部门数、月份数
- **部门统计图**：柱状图展示各部门HC总数（支持多级部门）
- **月度趋势图**：折线图展示12个月HC数量变化
- **热力图**：部门×月份的HC分布热力图

### 3. 数据筛选
- **部门筛选**：支持多级部门筛选
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

### GitHub部署

1. **使用自动部署脚本**：
```bash
deploy-to-github-final.bat yaozhiqi-zhixiao
```

2. **手动部署**：
```bash
git init
git add .
git commit -m "Initial commit: HC Management System"
git remote add origin https://github.com/yaozhiqi-zhixiao/hc-management-system.git
git push -u origin main
```

3. **配置GitHub Pages**：
   - 进入仓库 Settings → Pages
   - Source选择 "GitHub Actions"
   - 等待自动部署完成

### 生产环境部署
```bash
# 构建项目
npm run build
npm run server:build

# 启动生产服务器
npm start
```

### Docker部署
```bash
docker build -t hc-system .
docker run -d -p 5000:5000 hc-system
```

## 🎯 系统特色

- ✅ **智能Excel解析**：支持复杂的多级部门和月度数据格式
- ✅ **实时数据可视化**：专业的图表展示和交互
- ✅ **多维度筛选**：灵活的数据筛选和分析
- ✅ **响应式设计**：完美适配各种设备
- ✅ **现代化技术栈**：React 18 + TypeScript + Node.js
- ✅ **完整的CI/CD**：GitHub Actions自动部署

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

1. 查看 [部署指南](./DEPLOYMENT.md)
2. 提交 [Issue](../../issues)
3. 联系开发团队

---

**HC管理系统** - 让人力资源数据管理更简单、更直观、更专业！

🌐 **在线演示**：https://yaozhiqi-zhixiao.github.io/hc-management-system
