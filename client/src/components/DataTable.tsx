import React, { useState } from 'react';
import { Table, Card, Typography, Button, Space, message, Popconfirm } from 'antd';
import { TableOutlined, DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { HCRecord } from '../types';
import { exportData, clearAllData } from '../services/api';

const { Title } = Typography;

interface DataTableProps {
  data: HCRecord[];
  loading: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ data, loading }) => {
  const [exporting, setExporting] = useState(false);
  const [clearing, setClearing] = useState(false);

  // 导出数据
  const handleExport = async () => {
    setExporting(true);
    try {
      await exportData();
      message.success('数据导出成功！');
    } catch (error) {
      console.error('导出失败:', error);
      message.error('数据导出失败，请重试');
    } finally {
      setExporting(false);
    }
  };

  // 清空数据
  const handleClear = async () => {
    setClearing(true);
    try {
      const response = await clearAllData();
      if (response.success) {
        message.success('数据清空成功！');
        window.location.reload(); // 刷新页面
      }
    } catch (error) {
      console.error('清空失败:', error);
      message.error('数据清空失败，请重试');
    } finally {
      setClearing(false);
    }
  };

  const columns: ColumnsType<HCRecord> = [
    {
      title: '序号',
      key: 'index',
      width: 80,
      render: (_, __, index) => index + 1,
    },
    {
      title: '部门',
      dataIndex: 'department',
      key: 'department',
      sorter: (a, b) => a.department.localeCompare(b.department),
      filters: [...new Set(data.map(item => item.department))].map(dept => ({
        text: dept,
        value: dept,
      })),
      onFilter: (value, record) => record.department === value,
    },
    {
      title: '月份',
      dataIndex: 'month',
      key: 'month',
      sorter: (a, b) => a.month.localeCompare(b.month),
      filters: [...new Set(data.map(item => item.month))].map(month => ({
        text: month,
        value: month,
      })),
      onFilter: (value, record) => record.month === value,
    },
    {
      title: 'HC数量',
      dataIndex: 'hc_count',
      key: 'hc_count',
      sorter: (a, b) => a.hc_count - b.hc_count,
      render: (value) => (
        <span style={{ fontWeight: 'bold', color: '#1890ff' }}>
          {value}
        </span>
      ),
    },
    {
      title: '员工姓名',
      dataIndex: 'employee_name',
      key: 'employee_name',
      render: (value) => value || '-',
    },
    {
      title: '上传时间',
      dataIndex: 'upload_time',
      key: 'upload_time',
      sorter: (a, b) => new Date(a.upload_time).getTime() - new Date(b.upload_time).getTime(),
      render: (value) => new Date(value).toLocaleString('zh-CN'),
    },
    {
      title: '文件名',
      dataIndex: 'file_name',
      key: 'file_name',
      ellipsis: true,
    },
  ];

  return (
    <Card className="data-table">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0 }}>
          <TableOutlined /> HC数据详情
        </Title>

        <Space>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={handleExport}
            loading={exporting}
          >
            导出数据
          </Button>

          <Popconfirm
            title="确认清空所有数据？"
            description="此操作不可恢复，请谨慎操作！"
            onConfirm={handleClear}
            okText="确认"
            cancelText="取消"
            okType="danger"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              loading={clearing}
            >
              清空数据
            </Button>
          </Popconfirm>
        </Space>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey="id"
        pagination={{
          total: data.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `第 ${range[0]}-${range[1]} 条，共 ${total} 条记录`,
        }}
        scroll={{ x: 800 }}
        size="middle"
        bordered
      />
    </Card>
  );
};

export default DataTable;
