import express from 'express';
import cors from 'cors';
import path from 'path';
import { initDatabase } from './database';
import { uploadRouter } from './routes/upload';
import { dataRouter } from './routes/data';

const app = express();
const PORT = process.env.PORT || 5000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态文件服务
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// 路由
app.use('/api/upload', uploadRouter);
app.use('/api/data', dataRouter);

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'HC管理系统后端服务运行正常' });
});

// 初始化数据库并启动服务器
async function startServer() {
  try {
    await initDatabase();
    console.log('数据库初始化完成');

    app.listen(PORT, () => {
      console.log(`🚀 HC管理系统后端服务启动成功`);
      console.log(`📍 服务地址: http://localhost:${PORT}`);
      console.log(`📊 API文档: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('服务器启动失败:', error);
    process.exit(1);
  }
}

startServer();
