import type { CategoryRecord } from '../types';
import { ensureDatabase } from './database';

export const CATEGORY_TABLE = `
    CREATE TABLE IF NOT EXISTS category (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        color TEXT DEFAULT '#3B82F6',
        icon TEXT,
        sort_order INTEGER DEFAULT 0
    );
`;

export const saveCategory = async (data: Omit<CategoryRecord, 'id'>): Promise<number> => {
    const db = await ensureDatabase();
    
    await db.run(
        'INSERT INTO category (name, color, icon, sort_order) VALUES (?, ?, ?, ?)',
        [data.name, data.color || '#3B82F6', data.icon || '', data.sort_order || 0]
    );

    const result = await db.query<{ id: number }>('SELECT MAX(id) as id FROM category');
    return result[0]?.id || 0;
};

export const getCategoryById = async (id: number): Promise<CategoryRecord | undefined> => {
    const db = await ensureDatabase();
    const results = await db.query<CategoryRecord>('SELECT * FROM category WHERE id = ?', [id]);
    return results[0];
};

export const getAllCategories = async (): Promise<CategoryRecord[]> => {
    const db = await ensureDatabase();
    return await db.query<CategoryRecord>('SELECT * FROM category ORDER BY sort_order ASC, id ASC');
};

export const updateCategory = async (id: number, data: Partial<CategoryRecord>): Promise<void> => {
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
    if (data.icon !== undefined) {
        updates.push('icon = ?');
        params.push(data.icon);
    }
    if (data.sort_order !== undefined) {
        updates.push('sort_order = ?');
        params.push(data.sort_order);
    }

    if (updates.length === 0) return;

    params.push(id);
    await db.run(`UPDATE category SET ${updates.join(', ')} WHERE id = ?`, params);
};

export const deleteCategory = async (id: number): Promise<void> => {
    const db = await ensureDatabase();
    await db.run('DELETE FROM category WHERE id = ?', [id]);
};

export const deleteCategoryCascade = async (id: number): Promise<void> => {
    const db = await ensureDatabase();
    await db.run('UPDATE collection SET category_id = NULL WHERE category_id = ?', [id]);
    await db.run('DELETE FROM category WHERE id = ?', [id]);
};