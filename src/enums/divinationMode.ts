export enum DivinationMode {
    Auto = 'auto',
    Manual = 'manual',
}

export const DIVINATION_MODE_LIST: DivinationMode[] = [
    DivinationMode.Auto,
    DivinationMode.Manual,
];

export const DIVINATION_MODE_LABELS: Record<DivinationMode, string> = {
    [DivinationMode.Auto]: '自动',
    [DivinationMode.Manual]: '手动',
};

export const DIVINATION_MODE_ICONS: Record<DivinationMode, string> = {
    [DivinationMode.Auto]: '🎲',
    [DivinationMode.Manual]: '✍️',
};

export function getLabel(mode: DivinationMode): string {
    return DIVINATION_MODE_LABELS[mode];
}

export function getIcon(mode: DivinationMode): string {
    return DIVINATION_MODE_ICONS[mode];
}

export function fromLabel(label: string): DivinationMode | undefined {
    for (const [key, value] of Object.entries(DIVINATION_MODE_LABELS)) {
        if (value === label) {
            return key as DivinationMode;
        }
    }
    return undefined;
}