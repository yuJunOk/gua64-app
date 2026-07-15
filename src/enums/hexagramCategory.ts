export enum HexagramCategory {
    Qian = '乾宫',
    Kun = '坤宫',
    Zhen = '震宫',
    Xun = '巽宫',
    Kan = '坎宫',
    Li = '离宫',
    Gen = '艮宫',
    Dui = '兑宫',
}

export const HEXAGRAM_CATEGORY_LIST: HexagramCategory[] = [
    HexagramCategory.Qian,
    HexagramCategory.Kun,
    HexagramCategory.Zhen,
    HexagramCategory.Xun,
    HexagramCategory.Kan,
    HexagramCategory.Li,
    HexagramCategory.Gen,
    HexagramCategory.Dui,
];

export const HEXAGRAM_CATEGORY_LABELS: Record<HexagramCategory, string> = {
    [HexagramCategory.Qian]: '乾宫',
    [HexagramCategory.Kun]: '坤宫',
    [HexagramCategory.Zhen]: '震宫',
    [HexagramCategory.Xun]: '巽宫',
    [HexagramCategory.Kan]: '坎宫',
    [HexagramCategory.Li]: '离宫',
    [HexagramCategory.Gen]: '艮宫',
    [HexagramCategory.Dui]: '兑宫',
};

export function getLabel(category: HexagramCategory): string {
    return HEXAGRAM_CATEGORY_LABELS[category];
}

export function fromLabel(label: string): HexagramCategory | undefined {
    for (const [key, value] of Object.entries(HEXAGRAM_CATEGORY_LABELS)) {
        if (value === label) {
            return key as HexagramCategory;
        }
    }
    return undefined;
}

export function getAllCategories(): HexagramCategory[] {
    return HEXAGRAM_CATEGORY_LIST;
}