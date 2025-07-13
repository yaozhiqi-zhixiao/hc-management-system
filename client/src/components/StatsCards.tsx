import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { TeamOutlined, ApartmentOutlined, CalendarOutlined, FileTextOutlined } from '@ant-design/icons';
import { StatisticsData } from '../types';

interface StatsCardsProps {
  statistics: StatisticsData;
}

const StatsCards: React.FC<StatsCardsProps> = ({ statistics }) => {
  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="总HC数量"
            value={statistics.totalHC}
            prefix={<TeamOutlined style={{ color: '#1890ff' }} />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="总记录数"
            value={statistics.totalRecords}
            prefix={<FileTextOutlined style={{ color: '#52c41a' }} />}
            valueStyle={{ color: '#52c41a' }}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="部门数量"
            value={statistics.departments.length}
            prefix={<ApartmentOutlined style={{ color: '#faad14' }} />}
            valueStyle={{ color: '#faad14' }}
          />
        </Card>
      </Col>

      <Col xs={24} sm={12} md={6}>
        <Card>
          <Statistic
            title="月份数量"
            value={statistics.months.length}
            prefix={<CalendarOutlined style={{ color: '#f5222d' }} />}
            valueStyle={{ color: '#f5222d' }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default StatsCards;
