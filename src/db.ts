import { Capacitor } from '@capacitor/core';
import type { HistoryRecord } from './types';

// 内存数据库实现（用于web环境）
class MemoryDatabase {
    private data: HistoryRecord[] = [];
    private nextId = 1;

    async execute(sql: string): Promise<void> {
        // 模拟执行SQL
        console.log('Executing SQL:', sql);
    }

    async run(sql: string, params: any[]): Promise<void> {
        if (sql.includes('INSERT INTO history')) {
            const [createdAt, hexagramName, resultType, yaoData] = params;
            this.data.push({
                id: this.nextId++,
                created_at: createdAt,
                hexagram_name: hexagramName,
                result_type: resultType,
                yao_data: yaoData
            });
        } else if (sql.includes('DELETE FROM history WHERE id = ?')) {
            const [id] = params;
            this.data = this.data.filter(item => item.id !== id);
        } else if (sql.includes('DELETE FROM history')) {
            this.data = [];
        }
    }

    async query(sql: string): Promise<{ values: HistoryRecord[] }> {
        if (sql.includes('SELECT * FROM history')) {
            return { values: [...this.data].reverse() };
        }
        return { values: [] };
    }
}

let db: any = null;

// 初始化数据库
export const initDatabase = async (): Promise<void> => {
    try {
        if (Capacitor.getPlatform() === 'web') {
            // Web平台使用内存数据库
            db = new MemoryDatabase();
        } else {
            // 移动平台使用SQLite
            const { CapacitorSQLite } = await import('@capacitor-community/sqlite');

            // 创建数据库连接
            await CapacitorSQLite.createConnection({
                database: 'gua64',
                version: 1,
                encrypted: false
            });

            // 打开数据库
            await CapacitorSQLite.open({ database: 'gua64' });

            db = CapacitorSQLite;

            // 创建历史记录表
            await CapacitorSQLite.execute({
                database: 'gua64',
                statements: `
                  CREATE TABLE IF NOT EXISTS history (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    created_at TEXT NOT NULL,
                    hexagram_name TEXT NOT NULL,
                    result_type TEXT,
                    yao_data TEXT
                  );
                `
            });
        }
    } catch (error) {
        console.error('初始化数据库失败:', error);
        // 降级到内存数据库
        db = new MemoryDatabase();
    }
};

// 保存算卦结果
export const saveResult = async (data: {
    hexagram_name: string;
    result_type: string;
    yao_data: string;
}): Promise<void> => {
    if (!db) {
        await initDatabase();
    }

    if (!db) {
        throw new Error('数据库未初始化');
    }

    try {
        const createdAt = new Date().toISOString();

        if (Capacitor.getPlatform() === 'web') {
            // Web平台使用内存数据库
            await db.run(
                'INSERT INTO history (created_at, hexagram_name, result_type, yao_data) VALUES (?, ?, ?, ?)',
                [createdAt, data.hexagram_name, data.result_type, data.yao_data]
            );
        } else {
            // 移动平台使用SQLite
            const { CapacitorSQLite } = await import('@capacitor-community/sqlite');
            await CapacitorSQLite.run({
                database: 'gua64',
                statement: 'INSERT INTO history (created_at, hexagram_name, result_type, yao_data) VALUES (?, ?, ?, ?)',
                values: [createdAt, data.hexagram_name, data.result_type, data.yao_data]
            });
        }
    } catch (error) {
        console.error('保存算卦结果失败:', error);
        throw error;
    }
};

// 获取历史记录
export const getHistory = async (): Promise<HistoryRecord[]> => {
    if (!db) {
        await initDatabase();
    }

    if (!db) {
        throw new Error('数据库未初始化');
    }

    try {
        if (Capacitor.getPlatform() === 'web') {
            // Web平台使用内存数据库
            const result = await db.query('SELECT * FROM history ORDER BY created_at DESC');
            return result.values as HistoryRecord[];
        } else {
            // 移动平台使用SQLite
            const { CapacitorSQLite } = await import('@capacitor-community/sqlite');
            const result = await CapacitorSQLite.query({
                database: 'gua64',
                statement: 'SELECT * FROM history ORDER BY created_at DESC',
                values: []
            });
            return result.values as HistoryRecord[];
        }
    } catch (error) {
        console.error('获取历史记录失败:', error);
        return [];
    }
};

// 删除历史记录
export const deleteHistory = async (id: number): Promise<void> => {
    if (!db) {
        await initDatabase();
    }

    if (!db) {
        throw new Error('数据库未初始化');
    }

    try {
        if (Capacitor.getPlatform() === 'web') {
            // Web平台使用内存数据库
            await db.run('DELETE FROM history WHERE id = ?', [id]);
        } else {
            // 移动平台使用SQLite
            const { CapacitorSQLite } = await import('@capacitor-community/sqlite');
            await CapacitorSQLite.run({
                database: 'gua64',
                statement: 'DELETE FROM history WHERE id = ?',
                values: [id]
            });
        }
    } catch (error) {
        console.error('删除历史记录失败:', error);
        throw error;
    }
};

// 清空历史记录
export const clearHistory = async (): Promise<void> => {
    if (!db) {
        await initDatabase();
    }

    if (!db) {
        throw new Error('数据库未初始化');
    }

    try {
        if (Capacitor.getPlatform() === 'web') {
            // Web平台使用内存数据库
            await db.run('DELETE FROM history');
        } else {
            // 移动平台使用SQLite
            const { CapacitorSQLite } = await import('@capacitor-community/sqlite');
            await CapacitorSQLite.run({
                database: 'gua64',
                statement: 'DELETE FROM history',
                values: []
            });
        }
    } catch (error) {
        console.error('清空历史记录失败:', error);
        throw error;
    }
};