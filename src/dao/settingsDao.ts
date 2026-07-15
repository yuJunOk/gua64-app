import type { SettingsRecord } from '../types';
import { ensureDatabase } from './database';

export const SETTINGS_TABLE = `
    CREATE TABLE IF NOT EXISTS app_settings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT NOT NULL UNIQUE,
        value TEXT NOT NULL,
        description TEXT
    );
`;

const DEFAULT_SETTINGS = [
    { key: 'theme', value: 'light', description: '主题设置（light/dark/system）' },
    { key: 'font_size', value: 'normal', description: '字体大小（small/normal/large）' },
    { key: 'coin_style', value: 'yuan', description: '硬币样式（yuan/tong/modern）' },
    { key: 'auto_save', value: '1', description: '自动保存历史记录（0/1）' },
    { key: 'show_animation', value: '1', description: '显示动画效果（0/1）' },
];

export const initSettings = async (): Promise<void> => {
    const db = await ensureDatabase();
    for (const setting of DEFAULT_SETTINGS) {
        await db.run(
            'INSERT OR IGNORE INTO app_settings (key, value, description) VALUES (?, ?, ?)',
            [setting.key, setting.value, setting.description]
        );
    }
};

export const getSetting = async (key: string): Promise<string | undefined> => {
    const db = await ensureDatabase();
    const results = await db.query<SettingsRecord>('SELECT * FROM app_settings WHERE key = ?', [key]);
    return results[0]?.value;
};

export const setSetting = async (key: string, value: string): Promise<void> => {
    const db = await ensureDatabase();
    await db.run(
        'INSERT OR REPLACE INTO app_settings (key, value) VALUES (?, ?)',
        [key, value]
    );
};

export const getAllSettings = async (): Promise<SettingsRecord[]> => {
    const db = await ensureDatabase();
    return await db.query<SettingsRecord>('SELECT * FROM app_settings');
};

export const deleteSetting = async (key: string): Promise<void> => {
    const db = await ensureDatabase();
    await db.run('DELETE FROM app_settings WHERE key = ?', [key]);
};

export const getBooleanSetting = async (key: string, defaultValue: boolean = false): Promise<boolean> => {
    const value = await getSetting(key);
    if (value === undefined) return defaultValue;
    return value === '1' || value === 'true';
};

export const setBooleanSetting = async (key: string, value: boolean): Promise<void> => {
    await setSetting(key, value ? '1' : '0');
};

export const getTheme = async (): Promise<string> => {
    return (await getSetting('theme')) || 'light';
};

export const setTheme = async (theme: string): Promise<void> => {
    await setSetting('theme', theme);
};

export const getCoinStyle = async (): Promise<string> => {
    return (await getSetting('coin_style')) || 'yuan';
};

export const setCoinStyle = async (style: string): Promise<void> => {
    await setSetting('coin_style', style);
};

export const isAutoSaveEnabled = async (): Promise<boolean> => {
    return await getBooleanSetting('auto_save', true);
};

export const isAnimationEnabled = async (): Promise<boolean> => {
    return await getBooleanSetting('show_animation', true);
};