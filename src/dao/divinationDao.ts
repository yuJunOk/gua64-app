import type { DivinationRecord as DivinationRecordType } from '../types';
import { ensureDatabase } from './database';

export type { DivinationRecord } from '../types';
type DivinationRecord = DivinationRecordType;

export const DIVINATION_TABLE = `
    CREATE TABLE IF NOT EXISTS divination (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at TEXT NOT NULL,
        divination_time TEXT,
        question TEXT,
        title TEXT,
        original_hexagram_seq INTEGER NOT NULL,
        changed_hexagram_seq INTEGER,
        yao_values TEXT NOT NULL,
        moving_yao_positions TEXT,
        result_type TEXT NOT NULL,
        is_collected INTEGER DEFAULT 0,
        note TEXT
    );
`;

export const saveDivination = async (data: Omit<DivinationRecord, 'id'>): Promise<number> => {
    const db = await ensureDatabase();
    const createdAt = new Date().toISOString();
    
    await db.run(
        'INSERT INTO divination (created_at, divination_time, question, title, original_hexagram_seq, changed_hexagram_seq, yao_values, moving_yao_positions, result_type, is_collected, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [
            createdAt,
            data.divination_time || createdAt,
            data.question || '',
            data.title || '',
            data.original_hexagram_seq,
            data.changed_hexagram_seq || null,
            data.yao_values,
            data.moving_yao_positions || '[]',
            data.result_type,
            data.is_collected || 0,
            data.note || ''
        ]
    );

    const result = await db.query<{ id: number }>('SELECT MAX(id) as id FROM divination');
    return result[0]?.id || 0;
};

export const getDivinationById = async (id: number): Promise<DivinationRecord | undefined> => {
    const db = await ensureDatabase();
    const results = await db.query<DivinationRecord>('SELECT * FROM divination WHERE id = ?', [id]);
    return results[0];
};

export const getAllDivinations = async (): Promise<DivinationRecord[]> => {
    const db = await ensureDatabase();
    return await db.query<DivinationRecord>('SELECT * FROM divination ORDER BY created_at DESC');
};

export const getDivinationsByPage = async (page: number, pageSize: number): Promise<DivinationRecord[]> => {
    const db = await ensureDatabase();
    const offset = (page - 1) * pageSize;
    return await db.query<DivinationRecord>(
        'SELECT * FROM divination ORDER BY created_at DESC LIMIT ? OFFSET ?',
        [pageSize, offset]
    );
};

export const getDivinationCount = async (): Promise<number> => {
    const db = await ensureDatabase();
    const results = await db.query<{ count: number }>('SELECT COUNT(*) as count FROM divination');
    return results[0]?.count || 0;
};

export const getDivinationsByHexagram = async (seq: number): Promise<DivinationRecord[]> => {
    const db = await ensureDatabase();
    return await db.query<DivinationRecord>('SELECT * FROM divination WHERE original_hexagram_seq = ? ORDER BY created_at DESC', [seq]);
};

export const getCollectedDivinations = async (): Promise<DivinationRecord[]> => {
    const db = await ensureDatabase();
    return await db.query<DivinationRecord>('SELECT * FROM divination WHERE is_collected = 1 ORDER BY created_at DESC');
};

export const updateDivination = async (id: number, data: Partial<DivinationRecord>): Promise<void> => {
    const db = await ensureDatabase();
    const updates: string[] = [];
    const params: any[] = [];

    if (data.question !== undefined) {
        updates.push('question = ?');
        params.push(data.question);
    }
    if (data.title !== undefined) {
        updates.push('title = ?');
        params.push(data.title);
    }
    if (data.is_collected !== undefined) {
        updates.push('is_collected = ?');
        params.push(data.is_collected);
    }
    if (data.note !== undefined) {
        updates.push('note = ?');
        params.push(data.note);
    }

    if (updates.length === 0) return;

    params.push(id);
    await db.run(`UPDATE divination SET ${updates.join(', ')} WHERE id = ?`, params);
};

export const deleteDivination = async (id: number): Promise<void> => {
    const db = await ensureDatabase();
    await db.run('DELETE FROM divination WHERE id = ?', [id]);
};

export const clearDivinations = async (): Promise<void> => {
    const db = await ensureDatabase();
    await db.run('DELETE FROM divination');
};

export const searchDivinations = async (keyword: string): Promise<DivinationRecord[]> => {
    const db = await ensureDatabase();
    const results = await db.query<DivinationRecord>(
        'SELECT * FROM divination WHERE question LIKE ? OR title LIKE ? OR note LIKE ? ORDER BY created_at DESC',
        [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`]
    );
    return results;
};