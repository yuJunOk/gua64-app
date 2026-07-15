import type { CollectionRecord } from '../types';
import { ensureDatabase } from './database';

export const COLLECTION_TABLE = `
    CREATE TABLE IF NOT EXISTS collection (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        divination_id INTEGER NOT NULL UNIQUE,
        category_id INTEGER,
        collected_at TEXT NOT NULL
    );
`;

export const saveCollection = async (data: Omit<CollectionRecord, 'id'>): Promise<void> => {
    const db = await ensureDatabase();
    const collectedAt = new Date().toISOString();
    
    await db.run(
        'INSERT OR REPLACE INTO collection (divination_id, category_id, collected_at) VALUES (?, ?, ?)',
        [data.divination_id, data.category_id || null, collectedAt]
    );
};

export const removeCollection = async (divinationId: number): Promise<void> => {
    const db = await ensureDatabase();
    await db.run('DELETE FROM collection WHERE divination_id = ?', [divinationId]);
};

export const getCollectionByDivinationId = async (divinationId: number): Promise<CollectionRecord | undefined> => {
    const db = await ensureDatabase();
    const results = await db.query<CollectionRecord>('SELECT * FROM collection WHERE divination_id = ?', [divinationId]);
    return results[0];
};

export const getAllCollections = async (): Promise<CollectionRecord[]> => {
    const db = await ensureDatabase();
    return await db.query<CollectionRecord>('SELECT * FROM collection ORDER BY collected_at DESC');
};

export const getCollectionsByCategory = async (categoryId: number): Promise<CollectionRecord[]> => {
    const db = await ensureDatabase();
    return await db.query<CollectionRecord>('SELECT * FROM collection WHERE category_id = ? ORDER BY collected_at DESC', [categoryId]);
};

export const isCollected = async (divinationId: number): Promise<boolean> => {
    const db = await ensureDatabase();
    const results = await db.query<{ count: number }>(
        'SELECT COUNT(*) as count FROM collection WHERE divination_id = ?',
        [divinationId]
    );
    return results[0]?.count > 0;
};