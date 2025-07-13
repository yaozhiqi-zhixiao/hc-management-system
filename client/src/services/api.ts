import axios from 'axios';
import { ApiResponse, HCRecord, StatisticsData, FilterConditions, UploadResponse } from '../types';

// 创建axios实例
const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API请求失败:', error);
    return Promise.reject(error);
  }
);

// 上传Excel文件
export const uploadExcel = async (file: File): Promise<ApiResponse<UploadResponse>> => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 获取所有HC数据
export const getHCData = async (): Promise<ApiResponse<HCRecord[]>> => {
  return api.get('/data');
};

// 按条件筛选HC数据
export const getFilteredHCData = async (conditions: FilterConditions): Promise<ApiResponse<HCRecord[]>> => {
  const params = new URLSearchParams();

  if (conditions.departments && conditions.departments.length > 0) {
    conditions.departments.forEach(dept => params.append('departments', dept));
  }

  if (conditions.startMonth) {
    params.append('startMonth', conditions.startMonth);
  }

  if (conditions.endMonth) {
    params.append('endMonth', conditions.endMonth);
  }

  return api.get(`/data/filter?${params.toString()}`);
};

// 获取统计数据
export const getStatistics = async (): Promise<ApiResponse<StatisticsData>> => {
  return api.get('/data/statistics');
};

// 获取部门列表
export const getDepartments = async (): Promise<ApiResponse<string[]>> => {
  return api.get('/data/departments');
};

// 获取月份列表
export const getMonths = async (): Promise<ApiResponse<string[]>> => {
  return api.get('/data/months');
};

// 导出数据
export const exportData = async (conditions?: FilterConditions): Promise<void> => {
  const params = new URLSearchParams();

  if (conditions?.departments && conditions.departments.length > 0) {
    conditions.departments.forEach(dept => params.append('departments', dept));
  }

  if (conditions?.startMonth) {
    params.append('startMonth', conditions.startMonth);
  }

  if (conditions?.endMonth) {
    params.append('endMonth', conditions.endMonth);
  }

  const response = await axios.get(`/api/data/export?${params.toString()}`, {
    responseType: 'blob',
  });

  // 创建下载链接
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `HC数据导出_${new Date().toISOString().split('T')[0]}.xlsx`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

// 清空所有数据
export const clearAllData = async (): Promise<ApiResponse<any>> => {
  return api.delete('/data/clear');
};
