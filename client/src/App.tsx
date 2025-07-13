import React, { useState, useEffect } from 'react';
import { Layout, Typography, message } from 'antd';
import { BarChartOutlined } from '@ant-design/icons';
import UploadComponent from './components/UploadComponent';
import FilterPanel from './components/FilterPanel';
import ChartDisplay from './components/ChartDisplay';
import DataTable from './components/DataTable';
import StatsCards from './components/StatsCards';
import { HCRecord, StatisticsData } from './types';
import { getStatistics, getHCData } from './services/api';

const { Header, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [data, setData] = useState<HCRecord[]>([]);
  const [filteredData, setFilteredData] = useState<HCRecord[]>([]);
  const [statistics, setStatistics] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<string[]>([]);
  const [months, setMonths] = useState<string[]>([]);

  // 加载数据
  const loadData = async () => {
    setLoading(true);
    try {
      const [statsResponse, dataResponse] = await Promise.all([
        getStatistics(),
        getHCData()
      ]);

      if (statsResponse.success) {
        setStatistics(statsResponse.data);
        setDepartments(statsResponse.data.departments);
        setMonths(statsResponse.data.months);
      }

      if (dataResponse.success) {
        setData(dataResponse.data);
        setFilteredData(dataResponse.data);
      }
    } catch (error) {
      message.error('加载数据失败');
      console.error('加载数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 处理筛选
  const handleFilter = (filtered: HCRecord[]) => {
    setFilteredData(filtered);
  };

  // 处理上传成功
  const handleUploadSuccess = () => {
    message.success('文件上传成功！');
    loadData(); // 重新加载数据
  };

  // 初始加载
  useEffect(() => {
    loadData();
  }, []);

  return (
    <Layout>
      <Header>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <BarChartOutlined style={{ fontSize: '24px', color: 'white', marginRight: '12px' }} />
          <Title level={3} style={{ color: 'white', margin: 0 }}>
            HC管理系统
          </Title>
        </div>
      </Header>

      <Content>
        {/* 文件上传区域 */}
        <UploadComponent onUploadSuccess={handleUploadSuccess} />

        {/* 统计卡片 */}
        {statistics && <StatsCards statistics={statistics} />}

        {/* 筛选面板 */}
        <FilterPanel
          departments={departments}
          months={months}
          data={data}
          onFilter={handleFilter}
        />

        {/* 图表展示 */}
        <ChartDisplay data={filteredData} loading={loading} />

        {/* 数据表格 */}
        <DataTable data={filteredData} loading={loading} />
      </Content>
    </Layout>
  );
};

export default App;
