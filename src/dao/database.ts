import { Capacitor } from '@capacitor/core';

export interface DatabaseAdapter {
    execute(sql: string): Promise<void>;
    run(sql: string, params?: any[]): Promise<void>;
    query<T = any>(sql: string, params?: any[]): Promise<T[]>;
}

/**
 * Web端数据库适配器（基于localStorage持久化）
 * 网站部署时使用，数据存储在浏览器localStorage中，刷新页面不会丢失
 */
class MemoryAdapter implements DatabaseAdapter {
    /** 内存数据表缓存 */
    private tables: Map<string, any[]> = new Map();
    /** localStorage存储键名前缀 */
    private readonly STORAGE_KEY = 'gua64_db';

    constructor() {
        this.loadFromStorage();
    }

    /** 从localStorage加载数据到内存 */
    private loadFromStorage(): void {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            if (data) {
                const parsed = JSON.parse(data);
                Object.keys(parsed).forEach(tableName => {
                    this.tables.set(tableName, parsed[tableName]);
                });
            }
        } catch (error) {
            console.warn('从localStorage加载数据失败:', error);
        }
    }

    /** 将内存数据保存到localStorage */
    private saveToStorage(): void {
        try {
            const data: Record<string, any[]> = {};
            this.tables.forEach((records, tableName) => {
                data[tableName] = records;
            });
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        } catch (error) {
            console.warn('保存数据到localStorage失败:', error);
        }
    }

    /**
     * 执行建表等DDL语句
     * @param sql SQL语句
     */
    async execute(sql: string): Promise<void> {
        console.log('[MemoryAdapter] 执行SQL:', sql);
    }

    /**
     * 执行写操作（INSERT/UPDATE/DELETE）
     * @param sql SQL语句
     * @param params 参数数组
     */
    async run(sql: string, params: any[] = []): Promise<void> {
        // 处理INSERT语句
        const insertMatch = sql.match(/INSERT INTO (\w+)/i);
        if (insertMatch) {
            const tableName = insertMatch[1];
            if (!this.tables.has(tableName)) {
                this.tables.set(tableName, []);
            }
            const table = this.tables.get(tableName)!;
            const columnMatch = sql.match(/INSERT INTO \w+ \(([^)]+)\)/i);
            if (columnMatch) {
                const columns = columnMatch[1].split(',').map(c => c.trim());
                const record: any = { id: table.length + 1 };
                columns.forEach((col, index) => {
                    record[col] = params[index];
                });
                table.push(record);
                this.saveToStorage();
            }
            return;
        }

        // 处理DELETE语句
        const deleteMatch = sql.match(/DELETE FROM (\w+)(?: WHERE (\w+) = \?)?/i);
        if (deleteMatch) {
            const tableName = deleteMatch[1];
            const whereColumn = deleteMatch[2];
            if (this.tables.has(tableName)) {
                if (whereColumn) {
                    const table = this.tables.get(tableName)!;
                    this.tables.set(tableName, table.filter((item: any) => item[whereColumn] !== params[0]));
                } else {
                    this.tables.set(tableName, []);
                }
                this.saveToStorage();
            }
            return;
        }

        // 处理UPDATE语句
        const updateMatch = sql.match(/UPDATE (\w+) SET (\w+) = \? WHERE (\w+) = \?/i);
        if (updateMatch) {
            const tableName = updateMatch[1];
            const setColumn = updateMatch[2];
            const whereColumn = updateMatch[3];
            if (this.tables.has(tableName)) {
                const table = this.tables.get(tableName)!;
                table.forEach((item: any) => {
                    if (item[whereColumn] === params[1]) {
                        item[setColumn] = params[0];
                    }
                });
                this.saveToStorage();
            }
        }
    }

    /**
     * 执行查询操作（SELECT）
     * @param sql SQL语句
     * @param params 参数数组
     * @returns 查询结果数组
     */
    async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
        const selectMatch = sql.match(/SELECT (.+) FROM (\w+)/i);
        if (selectMatch) {
            const columns = selectMatch[1].trim();
            const tableName = selectMatch[2];
            
            if (this.tables.has(tableName)) {
                let data = [...this.tables.get(tableName)!];
                
                // 处理WHERE条件
                const whereMatch = sql.match(/WHERE (\w+) = \?/i);
                if (whereMatch) {
                    const whereColumn = whereMatch[1];
                    data = data.filter((item: any) => item[whereColumn] === params[0]);
                }
                
                // 处理ORDER BY排序
                const orderMatch = sql.match(/ORDER BY (\w+)(?: (ASC|DESC))?/i);
                if (orderMatch) {
                    const orderColumn = orderMatch[1];
                    const orderDirection = orderMatch[2] || 'ASC';
                    data.sort((a: any, b: any) => {
                        if (a[orderColumn] < b[orderColumn]) {
                            return orderDirection === 'ASC' ? -1 : 1;
                        }
                        if (a[orderColumn] > b[orderColumn]) {
                            return orderDirection === 'ASC' ? 1 : -1;
                        }
                        return 0;
                    });
                }
                
                // 返回所有列或指定列
                if (columns === '*') {
                    return data as T[];
                } else {
                    const columnList = columns.split(',').map(c => c.trim());
                    return data.map((item: any) => {
                        const result: any = {};
                        columnList.forEach(col => {
                            result[col] = item[col];
                        });
                        return result;
                    }) as T[];
                }
            }
        }
        return [];
    }
}

/**
 * 移动端数据库适配器（基于Capacitor SQLite）
 * iOS/Android原生应用使用，数据存储在SQLite数据库文件中
 */
class SQLiteAdapter implements DatabaseAdapter {
    /** 数据库名称 */
    private database: string;

    /**
     * 构造函数
     * @param database 数据库名称
     */
    constructor(database: string) {
        this.database = database;
    }

    /**
     * 执行多条SQL语句
     * @param sql SQL语句（可包含多条，用分号分隔）
     */
    async execute(sql: string): Promise<void> {
        const { CapacitorSQLite } = await import('@capacitor-community/sqlite');
        await CapacitorSQLite.execute({
            database: this.database,
            statements: sql
        });
    }

    /**
     * 执行写操作
     * @param sql SQL语句
     * @param params 参数数组
     */
    async run(sql: string, params: any[] = []): Promise<void> {
        const { CapacitorSQLite } = await import('@capacitor-community/sqlite');
        await CapacitorSQLite.run({
            database: this.database,
            statement: sql,
            values: params
        });
    }

    /**
     * 执行查询操作
     * @param sql SQL语句
     * @param params 参数数组
     * @returns 查询结果数组
     */
    async query<T = any>(sql: string, params: any[] = []): Promise<T[]> {
        const { CapacitorSQLite } = await import('@capacitor-community/sqlite');
        const result = await CapacitorSQLite.query({
            database: this.database,
            statement: sql,
            values: params
        });
        return result.values as T[];
    }
}

/** 全局数据库实例 */
let db: DatabaseAdapter | null = null;

/**
 * 初始化数据库
 * 根据运行平台自动选择适配器：
 * - Web端：MemoryAdapter（基于localStorage持久化）
 * - 移动端：SQLiteAdapter（基于Capacitor SQLite）
 * 
 * @param tables 可选的建表语句数组，初始化时自动创建表
 */
export const initDatabase = async (tables?: string[]): Promise<void> => {
    try {
        if (Capacitor.getPlatform() === 'web') {
            // 网站部署使用MemoryAdapter，数据自动持久化到localStorage
            db = new MemoryAdapter();
        } else {
            // 移动端使用SQLiteAdapter
            const { CapacitorSQLite } = await import('@capacitor-community/sqlite');

            await CapacitorSQLite.createConnection({
                database: 'gua64',
                version: 1,
                encrypted: false
            });

            await CapacitorSQLite.open({ database: 'gua64' });

            db = new SQLiteAdapter('gua64');

            // 如果传入了建表语句，执行建表
            if (tables) {
                for (const table of tables) {
                    await db.execute(table);
                }
            }
        }
    } catch (error) {
        console.error('初始化数据库失败:', error);
        // 降级到内存适配器
        db = new MemoryAdapter();
    }
};

/**
 * 获取数据库实例（同步）
 * 如果数据库未初始化，会抛出错误
 * @returns 数据库适配器实例
 */
export const getDatabase = (): DatabaseAdapter => {
    if (!db) {
        throw new Error('数据库未初始化，请先调用 initDatabase()');
    }
    return db;
};

/**
 * 获取数据库实例（异步）
 * 如果数据库未初始化，会自动初始化
 * @returns 数据库适配器实例
 */
export const ensureDatabase = async (): Promise<DatabaseAdapter> => {
    if (!db) {
        await initDatabase();
    }
    return db!;
};
