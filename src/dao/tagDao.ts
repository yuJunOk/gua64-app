import type { TagRecord } from '../types';
import { ensureDatabase } from './database';

export const TAG_TABLE = `
    CREATE TABLE IF NOT EXISTS tag (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE,
        color TEXT DEFAULT '#6B7280'
    );
`;

export const DIVINATION_TAG_TABLE = `
    CREATE TABLE IF NOT EXISTS divination_tag (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        divination_id INTEGER NOT NULL,
        tag_id INTEGER NOT NULL,
        UNIQUE (divination_id, tag_id)
    );
`;

export const saveTag = async (data: Omit<TagRecord, 'id'>): Promise<number> => {
    const db = await ensureDatabase();
    
    await db.run(
        'INSERT OR IGNORE INTO tag (name, color) VALUES (?, ?)',
        [data.name, data.color || '#6B7280']
    );

    const result = await db.query<{ id: number }>('SELECT id FROM tag WHERE name = ?', [data.name]);
    return result[0]?.id || 0;
};

export const getTagById = async (id: number): Promise<TagRecord | undefined> => {
    const db = await ensureDatabase();
    const results = await db.query<TagRecord>('SELECT * FROM tag WHERE id = ?', [id]);
    return results[0];
};

export const getTagByName = async (name: string): Promise<TagRecord | undefined> => {
    const db = await ensureDatabase();
    const results = await db.query<TagRecord>('SELECT * FROM tag WHERE name = ?', [name]);
    return results[0];
};

export const getAllTags = async (): Promise<TagRecord[]> => {
    const db = await ensureDatabase();
    return await db.query<TagRecord>('SELECT * FROM tag ORDER BY name ASC');
};

export const updateTag = async (id: number, data: Partial<TagRecord>): Promise<void> => {
    const db = await ensureDatabase();
    const updates: string[] = [];
    const params: any[] = [];

    if (data.name !== undefined) {
        updates.push('name = ?');
        params.push(data.name);
    }
    if (data.color !== undefined) {
        updates.push('color = ?');
        params.push(data.color);
    }

    if (updates.length === 0) return;

    params.push(id);
    await db.run(`UPDATE tag SET ${updates.join(', ')} WHERE id = ?`, params);
};

export const deleteTag = async (id: number): Promise<void> => {
    const db = await ensureDatabase();
    await db.run('DELETE FROM tag WHERE id = ?', [id]);
};

export const addTagToDivination = async (divinationId: number, tagId: number): Promise<void> => {
    const db = await ensureDatabase();
    await db.run(
        'INSERT OR IGNORE INTO divination_tag (divination_id, tag_id) VALUES (?, ?)',
        [divinationId, tagId]
    );
};

export const removeTagFromDivination = async (divinationId: number, tagId: number): Promise<void> => {
    const db = await ensureDatabase();
    await db.run(
        'DELETE FROM divination_tag WHERE divination_id = ? AND tag_id = ?',
        [divinationId, tagId]
    );
};

export const getTagsByDivination = async (divinationId: number): Promise<TagRecord[]> => {
    const db = await ensureDatabase();
    const results = await db.query<{ id: number; name: string; color: string }>(`
        SELECT t.id, t.name, t.color 
        FROM tag t
        JOIN divination_tag dt ON t.id = dt.tag_id
        WHERE dt.divination_id = ?
        ORDER BY t.name ASC
    `, [divinationId]);
    return results as TagRecord[];
};

export const getDivinationsByTag = async (tagId: number): Promise<number[]> => {
    const db = await ensureDatabase();
    const results = await db.query<{ divination_id: number }>(
        'SELECT divination_id FROM divination_tag WHERE tag_id = ?',
        [tagId]
    );
    return results.map(r => r.divination_id);
};