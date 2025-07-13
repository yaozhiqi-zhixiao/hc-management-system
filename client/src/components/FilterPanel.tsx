import React, { useState, useEffect } from 'react';
import { Card, Select, DatePicker, Button, Space, Typography, Row, Col } from 'antd';
import { FilterOutlined, ClearOutlined } from '@ant-design/icons';
import { HCRecord } from '../types';
import { getFilteredHCData } from '../services/api';

const { Title } = Typography;
const { RangePicker } = DatePicker;

interface FilterPanelProps {
  departments: string[];
  months: string[];
  data: HCRecord[];
  onFilter: (filteredData: HCRecord[]) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  departments,
  months,
  data,
  onFilter
}) => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 应用筛选
  const applyFilter = async () => {
    setLoading(true);
    try {
      const conditions = {
        departments: selectedDepartments.length > 0 ? selectedDepartments : undefined,
        startMonth: dateRange?.[0]?.format('YYYY-MM'),
        endMonth: dateRange?.[1]?.format('YYYY-MM'),
      };

      const response = await getFilteredHCData(conditions);
      if (response.success) {
        onFilter(response.data);
      }
    } catch (error) {
      console.error('筛选失败:', error);
      // 如果API失败，使用本地筛选
      const filtered = data.filter(record => {
        const deptMatch = selectedDepartments.length === 0 ||
                         selectedDepartments.includes(record.department);

        const monthMatch = !dateRange ||
                          (record.month >= dateRange[0].format('YYYY-MM') &&
                           record.month <= dateRange[1].format('YYYY-MM'));

        return deptMatch && monthMatch;
      });
      onFilter(filtered);
    } finally {
      setLoading(false);
    }
  };

  // 清除筛选
  const clearFilter = () => {
    setSelectedDepartments([]);
    setDateRange(null);
    onFilter(data);
  };

  // 当数据变化时重置筛选
  useEffect(() => {
    if (selectedDepartments.length === 0 && !dateRange) {
      onFilter(data);
    }
  }, [data, selectedDepartments, dateRange, onFilter]);

  return (
    <Card className="filter-panel">
      <Title level={4} style={{ marginBottom: 16 }}>
        <FilterOutlined /> 数据筛选
      </Title>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              选择部门：
            </label>
            <Select
              mode="multiple"
              placeholder="请选择部门"
              style={{ width: '100%' }}
              value={selectedDepartments}
              onChange={setSelectedDepartments}
              options={departments.map(dept => ({ label: dept, value: dept }))}
              maxTagCount="responsive"
            />
          </div>
        </Col>

        <Col xs={24} sm={12} md={8}>
          <div>
            <label style={{ display: 'block', marginBottom: 8, fontWeight: 500 }}>
              选择月份范围：
            </label>
            <RangePicker
              picker="month"
              placeholder={['开始月份', '结束月份']}
              style={{ width: '100%' }}
              value={dateRange}
              onChange={setDateRange}
              format="YYYY-MM"
            />
          </div>
        </Col>

        <Col xs={24} sm={24} md={8}>
          <div style={{ paddingTop: 32 }}>
            <Space>
              <Button
                type="primary"
                icon={<FilterOutlined />}
                onClick={applyFilter}
                loading={loading}
              >
                应用筛选
              </Button>
              <Button
                icon={<ClearOutlined />}
                onClick={clearFilter}
              >
                清除筛选
              </Button>
            </Space>
          </div>
        </Col>
      </Row>

      {(selectedDepartments.length > 0 || dateRange) && (
        <div style={{
          marginTop: 16,
          padding: 12,
          background: '#f0f8ff',
          borderRadius: 6,
          border: '1px solid #d9d9d9'
        }}>
          <Typography.Text type="secondary">
            当前筛选条件：
            {selectedDepartments.length > 0 && (
              <span> 部门：{selectedDepartments.join(', ')} </span>
            )}
            {dateRange && (
              <span> 月份：{dateRange[0].format('YYYY-MM')} 至 {dateRange[1].format('YYYY-MM')} </span>
            )}
          </Typography.Text>
        </div>
      )}
    </Card>
  );
};

export default FilterPanel;
