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

// 解析Excel文件
function parseExcelFile(filePath: string): Omit<HCRecord, 'id'>[] {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // 转换为JSON
  const jsonData = XLSX.utils.sheet_to_json(worksheet);

  const records: Omit<HCRecord, 'id'>[] = [];
  const uploadTime = new Date().toISOString();
  const fileName = path.basename(filePath);

  jsonData.forEach((row: any) => {
    // 支持多种列名格式
    const department = row['部门'] || row['Department'] || row['department'] || '';
    const month = row['月份'] || row['Month'] || row['month'] || '';
    const hcCount = parseInt(row['HC数量'] || row['HC_Count'] || row['hc_count'] || row['HC'] || '0');
    const employeeName = row['员工姓名'] || row['Employee_Name'] || row['employee_name'] || '';

    if (department && month && !isNaN(hcCount)) {
      // 格式化月份为YYYY-MM格式
      let formattedMonth = month.toString();
      if (formattedMonth.length === 6) {
        // 如果是YYYYMM格式，转换为YYYY-MM
        formattedMonth = `${formattedMonth.substring(0, 4)}-${formattedMonth.substring(4, 6)}`;
      } else if (!formattedMonth.includes('-') && formattedMonth.length === 8) {
        // 如果是YYYYMMDD格式，提取YYYY-MM
        formattedMonth = `${formattedMonth.substring(0, 4)}-${formattedMonth.substring(4, 6)}`;
      }

      records.push({
        department: department.toString(),
        month: formattedMonth,
        hc_count: hcCount,
        employee_name: employeeName ? employeeName.toString() : undefined,
        upload_time: uploadTime,
        file_name: fileName
      });
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
        message: 'Excel文件中没有找到有效的HC数据，请检查文件格式'
      });
    }

    // 保存到数据库
    await insertHCRecords(records);

    console.log(`成功处理 ${records.length} 条HC记录`);

    res.json({
      success: true,
      message: `成功上传并处理了 ${records.length} 条HC记录`,
      data: {
        recordCount: records.length,
        fileName: req.file.originalname,
        departments: [...new Set(records.map(r => r.department))],
        months: [...new Set(records.map(r => r.month))].sort()
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
