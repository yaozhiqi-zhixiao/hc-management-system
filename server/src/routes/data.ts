import express from 'express';
import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import {
  getAllHCRecords,
  getHCRecordsByFilter,
  getDepartments,
  getMonths,
  clearAllData,
  HCRecord
} from '../database';

const router = express.Router();

// 获取所有HC数据
router.get('/', async (req, res) => {
  try {
    const records = await getAllHCRecords();
    res.json({
      success: true,
      data: records,
      total: records.length
    });
  } catch (error) {
    console.error('获取HC数据失败:', error);
    res.status(500).json({
      success: false,
      message: '获取数据失败: ' + (error as Error).message
    });
  }
});

// 按条件筛选HC数据
router.get('/filter', async (req, res) => {
  try {
    const { departments, startMonth, endMonth } = req.query;

    let departmentList: string[] | undefined;
    if (departments) {
      departmentList = Array.isArray(departments)
        ? departments as string[]
        : [departments as string];
    }

    const records = await getHCRecordsByFilter(
      departmentList,
      startMonth as string,
      endMonth as string
    );

    res.json({
      success: true,
      data: records,
      total: records.length,
      filters: {
        departments: departmentList,
        startMonth,
        endMonth
      }
    });
  } catch (error) {
    console.error('筛选HC数据失败:', error);
    res.status(500).json({
      success: false,
      message: '筛选数据失败: ' + (error as Error).message
    });
  }
});

// 获取部门列表
router.get('/departments', async (req, res) => {
  try {
    const departments = await getDepartments();
    res.json({
      success: true,
      data: departments
    });
  } catch (error) {
    console.error('获取部门列表失败:', error);
    res.status(500).json({
      success: false,
      message: '获取部门列表失败: ' + (error as Error).message
    });
  }
});

// 获取月份列表
router.get('/months', async (req, res) => {
  try {
    const months = await getMonths();
    res.json({
      success: true,
      data: months
    });
  } catch (error) {
    console.error('获取月份列表失败:', error);
    res.status(500).json({
      success: false,
      message: '获取月份列表失败: ' + (error as Error).message
    });
  }
});

// 获取统计数据
router.get('/statistics', async (req, res) => {
  try {
    const records = await getAllHCRecords();

    // 按部门统计
    const departmentStats = records.reduce((acc, record) => {
      if (!acc[record.department]) {
        acc[record.department] = 0;
      }
      acc[record.department] += record.hc_count;
      return acc;
    }, {} as Record<string, number>);

    // 按月份统计
    const monthStats = records.reduce((acc, record) => {
      if (!acc[record.month]) {
        acc[record.month] = 0;
      }
      acc[record.month] += record.hc_count;
      return acc;
    }, {} as Record<string, number>);

    // 按部门和月份统计
    const departmentMonthStats = records.reduce((acc, record) => {
      const key = `${record.department}-${record.month}`;
      if (!acc[key]) {
        acc[key] = {
          department: record.department,
          month: record.month,
          hc_count: 0
        };
      }
      acc[key].hc_count += record.hc_count;
      return acc;
    }, {} as Record<string, { department: string; month: string; hc_count: number }>);

    res.json({
      success: true,
      data: {
        totalRecords: records.length,
        totalHC: records.reduce((sum, record) => sum + record.hc_count, 0),
        departmentStats,
        monthStats,
        departmentMonthStats: Object.values(departmentMonthStats),
        departments: Object.keys(departmentStats),
        months: Object.keys(monthStats).sort()
      }
    });
  } catch (error) {
    console.error('获取统计数据失败:', error);
    res.status(500).json({
      success: false,
      message: '获取统计数据失败: ' + (error as Error).message
    });
  }
});

// 导出数据为Excel
router.get('/export', async (req, res) => {
  try {
    const { departments, startMonth, endMonth } = req.query;

    let departmentList: string[] | undefined;
    if (departments) {
      departmentList = Array.isArray(departments)
        ? departments as string[]
        : [departments as string];
    }

    const records = await getHCRecordsByFilter(
      departmentList,
      startMonth as string,
      endMonth as string
    );

    // 创建工作簿
    const workbook = XLSX.utils.book_new();

    // 准备数据
    const exportData = records.map(record => ({
      '部门': record.department,
      '月份': record.month,
      'HC数量': record.hc_count,
      '员工姓名': record.employee_name || '',
      '上传时间': record.upload_time,
      '文件名': record.file_name
    }));

    // 创建工作表
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'HC数据');

    // 生成文件
    const fileName = `HC数据导出_${new Date().toISOString().split('T')[0]}.xlsx`;
    const filePath = path.join(__dirname, '../../uploads', fileName);

    XLSX.writeFile(workbook, filePath);

    // 发送文件
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('文件下载失败:', err);
      }
      // 删除临时文件
      fs.unlink(filePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error('删除临时文件失败:', unlinkErr);
        }
      });
    });

  } catch (error) {
    console.error('导出数据失败:', error);
    res.status(500).json({
      success: false,
      message: '导出数据失败: ' + (error as Error).message
    });
  }
});

// 清空所有数据
router.delete('/clear', async (req, res) => {
  try {
    await clearAllData();
    res.json({
      success: true,
      message: '所有数据已清空'
    });
  } catch (error) {
    console.error('清空数据失败:', error);
    res.status(500).json({
      success: false,
      message: '清空数据失败: ' + (error as Error).message
    });
  }
});

export { router as dataRouter };
