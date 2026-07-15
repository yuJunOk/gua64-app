import type { HistoryRecord } from '../types';
import { ensureDatabase } from './database';

export const HISTORY_TABLE = `
    CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL,
        hexagram_name TEXT NOT NULL,
        result_type TEXT,
        yao_data TEXT
    );
`;

export const saveResult = async (data: {
    hexagram_name: string;
    result_type: string;
    yao_data: string;
}): Promise<void> => {
    const db = await ensureDatabase();
    const createdAt = new Date().toISOString();
    
    await db.run(
        'INSERT INTO history (created_at, hexagram_name, result_type, yao_data) VALUES (?, ?, ?, ?)',
        [createdAt, data.hexagram_name, data.result_type, data.yao_data]
    );
};

export const getHistory = async (): Promise<HistoryRecord[]> => {
    const db = await ensureDatabase();
    return await db.query<HistoryRecord>('SELECT * FROM history ORDER BY created_at DESC');
};

export const deleteHistory = async (id: number): Promise<void> => {
    const db = await ensureDatabase();
    await db.run('DELETE FROM history WHERE id = ?', [id]);
};

export const clearHistory = async (): Promise<void> => {
    const db = await ensureDatabase();
    await db.run('DELETE FROM history');
};
