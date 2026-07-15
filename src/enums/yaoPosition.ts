export enum YaoPosition {
    Chu = 1,
    Er = 2,
    San = 3,
    Si = 4,
    Wu = 5,
    Shang = 6,
}

export const YAO_POSITION_LIST: YaoPosition[] = [
    YaoPosition.Chu,
    YaoPosition.Er,
    YaoPosition.San,
    YaoPosition.Si,
    YaoPosition.Wu,
    YaoPosition.Shang,
];

export const YAO_POSITION_LABELS: Record<YaoPosition, string> = {
    [YaoPosition.Chu]: '初爻',
    [YaoPosition.Er]: '二爻',
    [YaoPosition.San]: '三爻',
    [YaoPosition.Si]: '四爻',
    [YaoPosition.Wu]: '五爻',
    [YaoPosition.Shang]: '上爻',
};

export const YAO_POSITION_NAMES: Record<YaoPosition, string> = {
    [YaoPosition.Chu]: '初',
    [YaoPosition.Er]: '二',
    [YaoPosition.San]: '三',
    [YaoPosition.Si]: '四',
    [YaoPosition.Wu]: '五',
    [YaoPosition.Shang]: '上',
};

export function fromIndex(index: number): YaoPosition {
    return YAO_POSITION_LIST[index] ?? YaoPosition.Chu;
}

export function toIndex(position: YaoPosition): number {
    return position - 1;
}

export function getLabel(position: YaoPosition): string {
    return YAO_POSITION_LABELS[position];
}

export function getName(position: YaoPosition): string {
    return YAO_POSITION_NAMES[position];
}

export function isValid(position: number): boolean {
    return position >= 1 && position <= 6;
}