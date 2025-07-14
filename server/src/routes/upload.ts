import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import * as XLSX from 'xlsx';
import { v4 as uuidv4 } from 'uuid';
import { insertHCRecords, HCRecord } from '../database';

const router = express.Router();

// 确保上传目录存在
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 配置multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('只支持Excel文件格式 (.xlsx, .xls)'));
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB限制
  }
});

// 解析Excel文件 - 支持新的复杂格式
function parseExcelFile(filePath: string): Omit<HCRecord, 'id'>[] {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // 转换为JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  const records: Omit<HCRecord, 'id'>[] = [];
  const uploadTime = new Date().toISOString();
  const fileName = path.basename(filePath);

  // 月份映射
  const monthColumns = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ];

  jsonData.forEach((row: any, index: number) => {
    try {
      // 构建部门层级信息
      const departmentParts = [];

      // 收集所有部门级别
      const dept1 = row['一级部门'] || '';
      const dept2 = row['二级部门'] || '';
      const dept3 = row['三级部门'] || '';
      const dept4 = row['四级部门'] || '';
      const dept5 = row['五级部门'] || '';
      const dept6 = row['六级部门'] || '';

      // 构建部门路径
      if (dept1) departmentParts.push(dept1);
      if (dept2) departmentParts.push(dept2);
      if (dept3) departmentParts.push(dept3);
      if (dept4) departmentParts.push(dept4);
      if (dept5) departmentParts.push(dept5);
      if (dept6) departmentParts.push(dept6);

      const department = departmentParts.join(' > ') || '未知部门';

      // 获取其他信息
      const employeeType = row['员工类型'] || '';
      const jobFamily = row['job family'] || '';
      const jobGroup = row['job group'] || '';
      const jobLevel = row['职级'] || '';
      const city = row['城市'] || '';

      // 构建员工信息
      const employeeInfo = [employeeType, jobFamily, jobGroup, jobLevel, city]
        .filter(info => info && info.toString().trim())
        .join(' | ');

      // 处理每个月的HC数据
      monthColumns.forEach((monthCol, monthIndex) => {
        const hcValue = row[monthCol];

        if (hcValue !== undefined && hcValue !== null && hcValue !== '') {
          const hcCount = parseInt(hcValue.toString()) || 0;

          if (hcCount > 0) {
            // 构建月份格式 (YYYY-MM)
            const currentYear = new Date().getFullYear();
            const monthNum = (monthIndex + 1).toString().padStart(2, '0');
            const formattedMonth = `${currentYear}-${monthNum}`;

            records.push({
              department: department,
              month: formattedMonth,
              hc_count: hcCount,
              employee_name: employeeInfo || undefined,
              upload_time: uploadTime,
              file_name: fileName
            });
          }
        }
      });

    } catch (error) {
      console.warn(`处理第 ${index + 2} 行数据时出错:`, error);
    }
  });

  return records;
}

// 上传Excel文件接口
router.post('/', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: '请选择要上传的Excel文件'
      });
    }

    console.log(`开始处理文件: ${req.file.originalname}`);

    // 解析Excel文件
    const records = parseExcelFile(req.file.path);

    if (records.length === 0) {
      // 删除上传的文件
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        message: 'Excel文件中没有找到有效的HC数据，请检查文件格式。\n\n期望的列名包括：\n- 一级部门、二级部门、三级部门、四级部门、五级部门、六级部门\n- 员工类型、job family、job group、职级、城市\n- 1月、2月、3月...12月'
      });
    }

    // 保存到数据库
    await insertHCRecords(records);

    console.log(`成功处理 ${records.length} 条HC记录`);

    // 统计信息
    const departments = [...new Set(records.map(r => r.department))];
    const months = [...new Set(records.map(r => r.month))].sort();
    const totalHC = records.reduce((sum, r) => sum + r.hc_count, 0);

    res.json({
      success: true,
      message: `成功上传并处理了 ${records.length} 条HC记录`,
      data: {
        recordCount: records.length,
        totalHC: totalHC,
        fileName: req.file.originalname,
        departments: departments,
        months: months,
        departmentCount: departments.length,
        monthCount: months.length
      }
    });

  } catch (error) {
    console.error('文件上传处理失败:', error);

    // 清理上传的文件
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: '文件处理失败: ' + (error as Error).message
    });
  }
});

export { router as uploadRouter };
