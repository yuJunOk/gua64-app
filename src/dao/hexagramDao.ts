import hexagrams from '../data/hexagrams.json';
import hexagramLiterature from '../data/hexagram-literature.json';

export interface Hexagram {
    id: number;
    name: string;
    nature: string;
    symbol: string;
    category: string;
}

export interface HexagramLiterature {
    hexagramId: number;
    fortune: string;
    hexagramText: string;
    hexagramTextTranslation: string;
    tuanText: string;
    xiangText: string;
    xiangTextTranslation: string;
    heloDescription: string;
    heloSource: string;
}

export const getAllHexagrams = (): Hexagram[] => {
    return [...hexagrams];
};

export const getHexagramById = (id: number): Hexagram | undefined => {
    return hexagrams.find(h => h.id === id);
};

export const getHexagramBySymbol = (symbol: string): Hexagram | undefined => {
    return hexagrams.find(h => h.symbol === symbol);
};

export const searchHexagrams = (keyword: string): Hexagram[] => {
    if (!keyword.trim()) {
        return [...hexagrams];
    }
    const lowerKeyword = keyword.toLowerCase();
    return hexagrams.filter(h =>
        h.name.toLowerCase().includes(lowerKeyword) ||
        h.nature.toLowerCase().includes(lowerKeyword)
    );
};

export const filterHexagramsByCategory = (category: string): Hexagram[] => {
    if (!category || category === '全部') {
        return [...hexagrams];
    }
    return hexagrams.filter(h => h.category === category);
};

export const getLiteratureByHexagramId = (hexagramId: number): HexagramLiterature | undefined => {
    return hexagramLiterature.find(l => l.hexagramId === hexagramId);
};

export const getLiteratureBySymbol = (symbol: string): HexagramLiterature | undefined => {
    const hexagram = getHexagramBySymbol(symbol);
    if (!hexagram) return undefined;
    return getLiteratureByHexagramId(hexagram.id);
};

export const getCategories = (): string[] => {
    const categories = new Set(hexagrams.map(h => h.category));
    return ['全部', ...Array.from(categories)];
};

export const findHexagramByCode = (code: string): Hexagram | undefined => {
    return hexagrams.find(h => h.symbol === code);
};
