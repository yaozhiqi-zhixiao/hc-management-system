import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '../data/hc_data.db');

// 创建数据库连接
export const db = new sqlite3.Database(dbPath);

// HC数据接口
export interface HCRecord {
  id?: number;
  department: string;
  month: string;
  hc_count: number;
  employee_name?: string;
  upload_time: string;
  file_name: string;
}

// 初始化数据库
export async function initDatabase(): Promise<void> {
  return new Promise((resolve, reject) => {
    // 创建HC数据表
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS hc_records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        department TEXT NOT NULL,
        month TEXT NOT NULL,
        hc_count INTEGER NOT NULL,
        employee_name TEXT,
        upload_time DATETIME DEFAULT CURRENT_TIMESTAMP,
        file_name TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    db.run(createTableSQL, (err) => {
      if (err) {
        reject(err);
      } else {
        console.log('HC数据表创建成功');
        resolve();
      }
    });
  });
}

// 插入HC记录
export async function insertHCRecords(records: Omit<HCRecord, 'id'>[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const insertSQL = `
      INSERT INTO hc_records (department, month, hc_count, employee_name, upload_time, file_name)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const stmt = db.prepare(insertSQL);

    db.serialize(() => {
      db.run('BEGIN TRANSACTION');

      records.forEach((record) => {
        stmt.run([
          record.department,
          record.month,
          record.hc_count,
          record.employee_name || null,
          record.upload_time,
          record.file_name
        ]);
      });

      db.run('COMMIT', (err) => {
        if (err) {
          db.run('ROLLBACK');
          reject(err);
        } else {
          resolve();
        }
      });
    });

    stmt.finalize();
  });
}

// 获取所有HC记录
export async function getAllHCRecords(): Promise<HCRecord[]> {
  return new Promise((resolve, reject) => {
    const selectSQL = `
      SELECT * FROM hc_records
      ORDER BY month DESC, department ASC
    `;

    db.all(selectSQL, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows as HCRecord[]);
      }
    });
  });
}

// 按部门和月份筛选HC记录
export async function getHCRecordsByFilter(
  departments?: string[],
  startMonth?: string,
  endMonth?: string
): Promise<HCRecord[]> {
  return new Promise((resolve, reject) => {
    let whereClause = '';
    const params: any[] = [];

    if (departments && departments.length > 0) {
      whereClause += ` AND department IN (${departments.map(() => '?').join(',')})`;
      params.push(...departments);
    }

    if (startMonth) {
      whereClause += ' AND month >= ?';
      params.push(startMonth);
    }

    if (endMonth) {
      whereClause += ' AND month <= ?';
      params.push(endMonth);
    }

    const selectSQL = `
      SELECT * FROM hc_records
      WHERE 1=1 ${whereClause}
      ORDER BY month DESC, department ASC
    `;

    db.all(selectSQL, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows as HCRecord[]);
      }
    });
  });
}

// 获取部门列表
export async function getDepartments(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const selectSQL = 'SELECT DISTINCT department FROM hc_records ORDER BY department';

    db.all(selectSQL, (err, rows: any[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows.map(row => row.department));
      }
    });
  });
}

// 获取月份列表
export async function getMonths(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const selectSQL = 'SELECT DISTINCT month FROM hc_records ORDER BY month DESC';

    db.all(selectSQL, (err, rows: any[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows.map(row => row.month));
      }
    });
  });
}

// 清空所有数据
export async function clearAllData(): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM hc_records', (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
