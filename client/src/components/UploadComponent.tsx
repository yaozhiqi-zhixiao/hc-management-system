import React, { useState } from 'react';
import { Upload, Button, message, Card, Typography, Space } from 'antd';
import { InboxOutlined, UploadOutlined } from '@ant-design/icons';
import { uploadExcel } from '../services/api';

const { Dragger } = Upload;
const { Title, Text } = Typography;

interface UploadComponentProps {
  onUploadSuccess: () => void;
}

const UploadComponent: React.FC<UploadComponentProps> = ({ onUploadSuccess }) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const response = await uploadExcel(file);

      if (response.success) {
        message.success(response.message || '文件上传成功！');
        onUploadSuccess();
      } else {
        message.error(response.message || '文件上传失败');
      }
    } catch (error: any) {
      console.error('上传失败:', error);
      message.error(error.response?.data?.message || '文件上传失败，请重试');
    } finally {
      setUploading(false);
    }
  };

  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: '.xlsx,.xls',
    beforeUpload: (file: File) => {
      const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
                     file.type === 'application/vnd.ms-excel';

      if (!isExcel) {
        message.error('只能上传Excel文件！');
        return false;
      }

      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('文件大小不能超过10MB！');
        return false;
      }

      handleUpload(file);
      return false; // 阻止默认上传行为
    },
    showUploadList: false,
  };

  return (
    <Card style={{ marginBottom: 24 }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={4}>上传HC数据文件</Title>
          <Text type="secondary">
            支持 .xlsx 和 .xls 格式，文件大小不超过10MB
          </Text>
        </div>

        <Dragger {...uploadProps} disabled={uploading} className="upload-area">
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
          </p>
          <p className="ant-upload-text">
            点击或拖拽文件到此区域上传
          </p>
          <p className="ant-upload-hint">
            Excel文件应包含：部门、月份、HC数量等列
          </p>
        </Dragger>

        <div style={{ textAlign: 'center' }}>
          <Upload {...uploadProps} disabled={uploading}>
            <Button
              icon={<UploadOutlined />}
              loading={uploading}
              size="large"
              type="primary"
            >
              {uploading ? '上传中...' : '选择文件上传'}
            </Button>
          </Upload>
        </div>

        <div style={{ background: '#f6f8fa', padding: '16px', borderRadius: '6px' }}>
          <Title level={5}>Excel文件格式要求：</Title>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li><strong>部门</strong>：部门名称（必填）</li>
            <li><strong>月份</strong>：格式为 YYYY-MM 或 YYYYMM（必填）</li>
            <li><strong>HC数量</strong>：数字格式（必填）</li>
            <li><strong>员工姓名</strong>：员工姓名（可选）</li>
          </ul>
        </div>
      </Space>
    </Card>
  );
};

export default UploadComponent;
