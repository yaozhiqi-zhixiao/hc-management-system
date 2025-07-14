import React from 'react';
import { Card, Typography, Spin } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';
import { HCRecord } from '../types';

const { Title } = Typography;

interface ChartDisplayProps {
  data: HCRecord[];
  loading: boolean;
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <Card className="chart-container">
        <div style={{ textAlign: 'center', padding: '50px 0' }}>
          <Spin size="large" />
          <div style={{ marginTop: 16 }}>加载中...</div>
        </div>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card className="chart-container">
        <div style={{ textAlign: 'center', padding: '50px 0', color: '#999' }}>
          <FileTextOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
          <div>暂无数据，请先上传Excel文件</div>
        </div>
      </Card>
    );
  }

  // 如果有数据，显示简单的数据概览
  return (
    <Card className="chart-container">
      <Title level={4}>
        <FileTextOutlined /> 数据概览
      </Title>
      <div style={{ padding: '20px 0' }}>
        <p style={{ fontSize: '16px', color: '#666' }}>
          ✅ 数据已成功加载，共 {data.length} 条记录
        </p>
        <p style={{ fontSize: '14px', color: '#999' }}>
          您可以在下方的数据表格中查看详细信息，或使用筛选功能进行数据分析。
        </p>
      </div>
    </Card>
  );
};

export default ChartDisplay;
