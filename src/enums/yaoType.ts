export enum YaoType {
    LaoYin = 6,
    ShaoYang = 7,
    ShaoYin = 8,
    LaoYang = 9,
}

export const YAO_TYPE_LIST: YaoType[] = [
    YaoType.LaoYin,
    YaoType.ShaoYang,
    YaoType.ShaoYin,
    YaoType.LaoYang,
];

export const YAO_TYPE_LABELS: Record<YaoType, string> = {
    [YaoType.LaoYin]: '老阴',
    [YaoType.ShaoYang]: '少阳',
    [YaoType.ShaoYin]: '少阴',
    [YaoType.LaoYang]: '老阳',
};

export const YAO_TYPE_SYMBOLS: Record<YaoType, string> = {
    [YaoType.LaoYin]: '-- ×',
    [YaoType.ShaoYang]: '—',
    [YaoType.ShaoYin]: '--',
    [YaoType.LaoYang]: '— ○',
};

export function isMovingYao(yao: YaoType): boolean {
    return yao === YaoType.LaoYin || yao === YaoType.LaoYang;
}

export function isYangYao(yao: YaoType): boolean {
    return yao === YaoType.ShaoYang || yao === YaoType.LaoYang;
}

export function toBit(yao: YaoType): '0' | '1' {
    return isYangYao(yao) ? '1' : '0';
}

export function toChangedBit(yao: YaoType): '0' | '1' {
    if (yao === YaoType.LaoYin) return '1';
    if (yao === YaoType.LaoYang) return '0';
    return isYangYao(yao) ? '1' : '0';
}

export function getYaoKind(yao: YaoType): 'laoyin' | 'shaoyang' | 'shaoyin' | 'laoyang' {
    switch (yao) {
        case YaoType.LaoYin: return 'laoyin';
        case YaoType.ShaoYang: return 'shaoyang';
        case YaoType.ShaoYin: return 'shaoyin';
        case YaoType.LaoYang: return 'laoyang';
    }
}

export function getYaoLabel(yao: YaoType): string {
    return YAO_TYPE_LABELS[yao];
}

export function getYaoSymbol(yao: YaoType): string {
    return YAO_TYPE_SYMBOLS[yao];
}