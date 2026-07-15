export enum Fortune {
    Ji = '吉',
    Xiong = '凶',
    XiaoXiong = '小凶',
    Ping = '平',
}

export const FORTUNE_LIST: Fortune[] = [
    Fortune.Ji,
    Fortune.Xiong,
    Fortune.XiaoXiong,
    Fortune.Ping,
];

export const FORTUNE_LABELS: Record<Fortune, string> = {
    [Fortune.Ji]: '吉',
    [Fortune.Xiong]: '凶',
    [Fortune.XiaoXiong]: '小凶',
    [Fortune.Ping]: '平',
};

export const FORTUNE_COLORS: Record<Fortune, { bg: string; text: string }> = {
    [Fortune.Ji]: { bg: 'bg-emerald-500/30', text: 'text-emerald-100' },
    [Fortune.Xiong]: { bg: 'bg-red-500/30', text: 'text-red-100' },
    [Fortune.XiaoXiong]: { bg: 'bg-yellow-500/30', text: 'text-yellow-100' },
    [Fortune.Ping]: { bg: 'bg-gray-500/30', text: 'text-gray-100' },
};

export const FORTUNE_CARD_COLORS: Record<Fortune, { bg: string; text: string }> = {
    [Fortune.Ji]: { bg: 'bg-emerald-100', text: 'text-emerald-700' },
    [Fortune.Xiong]: { bg: 'bg-red-100', text: 'text-red-700' },
    [Fortune.XiaoXiong]: { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    [Fortune.Ping]: { bg: 'bg-gray-100', text: 'text-gray-600' },
};

export function getLabel(fortune: Fortune): string {
    return FORTUNE_LABELS[fortune];
}

export function getColor(fortune: Fortune): { bg: string; text: string } {
    return FORTUNE_COLORS[fortune];
}

export function getCardColor(fortune: Fortune): { bg: string; text: string } {
    return FORTUNE_CARD_COLORS[fortune];
}

export function fromLabel(label: string): Fortune | undefined {
    for (const [key, value] of Object.entries(FORTUNE_LABELS)) {
        if (value === label) {
            return key as Fortune;
        }
    }
    return undefined;
}