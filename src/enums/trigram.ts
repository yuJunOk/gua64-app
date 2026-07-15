export enum Trigram {
    Qian = 1,
    Kun = 2,
    Zhen = 3,
    Xun = 4,
    Kan = 5,
    Li = 6,
    Gen = 7,
    Dui = 8,
}

export const TRIGRAM_LIST: Trigram[] = [
    Trigram.Qian,
    Trigram.Kun,
    Trigram.Zhen,
    Trigram.Xun,
    Trigram.Kan,
    Trigram.Li,
    Trigram.Gen,
    Trigram.Dui,
];

export const TRIGRAM_LABELS: Record<Trigram, string> = {
    [Trigram.Qian]: '乾',
    [Trigram.Kun]: '坤',
    [Trigram.Zhen]: '震',
    [Trigram.Xun]: '巽',
    [Trigram.Kan]: '坎',
    [Trigram.Li]: '离',
    [Trigram.Gen]: '艮',
    [Trigram.Dui]: '兑',
};

export const TRIGRAM_NATURES: Record<Trigram, string> = {
    [Trigram.Qian]: '天',
    [Trigram.Kun]: '地',
    [Trigram.Zhen]: '雷',
    [Trigram.Xun]: '风',
    [Trigram.Kan]: '水',
    [Trigram.Li]: '火',
    [Trigram.Gen]: '山',
    [Trigram.Dui]: '泽',
};

export const TRIGRAM_SYMBOLS: Record<Trigram, string> = {
    [Trigram.Qian]: '111',
    [Trigram.Kun]: '000',
    [Trigram.Zhen]: '001',
    [Trigram.Xun]: '110',
    [Trigram.Kan]: '010',
    [Trigram.Li]: '101',
    [Trigram.Gen]: '100',
    [Trigram.Dui]: '011',
};

export function getLabel(trigram: Trigram): string {
    return TRIGRAM_LABELS[trigram];
}

export function getNature(trigram: Trigram): string {
    return TRIGRAM_NATURES[trigram];
}

export function getSymbol(trigram: Trigram): string {
    return TRIGRAM_SYMBOLS[trigram];
}

export function fromSymbol(symbol: string): Trigram | undefined {
    for (const [key, value] of Object.entries(TRIGRAM_SYMBOLS)) {
        if (value === symbol) {
            return parseInt(key) as Trigram;
        }
    }
    return undefined;
}

export function fromLabel(label: string): Trigram | undefined {
    for (const [key, value] of Object.entries(TRIGRAM_LABELS)) {
        if (value === label) {
            return parseInt(key) as Trigram;
        }
    }
    return undefined;
}