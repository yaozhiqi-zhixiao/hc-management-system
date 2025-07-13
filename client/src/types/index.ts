// HC记录接口
export interface HCRecord {
  id?: number;
  department: string;
  month: string;
  hc_count: number;
  employee_name?: string;
  upload_time: string;
  file_name: string;
}

// 统计数据接口
export interface StatisticsData {
  totalRecords: number;
  totalHC: number;
  departmentStats: Record<string, number>;
  monthStats: Record<string, number>;
  departmentMonthStats: {
    department: string;
    month: string;
    hc_count: number;
  }[];
  departments: string[];
  months: string[];
}

// API响应接口
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  total?: number;
}

// 筛选条件接口
export interface FilterConditions {
  departments?: string[];
  startMonth?: string;
  endMonth?: string;
}

// 上传响应接口
export interface UploadResponse {
  recordCount: number;
  fileName: string;
  departments: string[];
  months: string[];
}
