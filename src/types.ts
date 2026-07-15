import { YaoType, DivinationMode } from './enums';

export type { YaoType };

export interface DivinationRecord {
    id: number;
    created_at: string;
    divination_time: string;
    question: string;
    title: string;
    original_hexagram_seq: number;
    changed_hexagram_seq: number | null;
    yao_values: string;
    moving_yao_positions: string;
    result_type: DivinationMode;
    is_collected: number;
    note: string;
}

export interface CollectionRecord {
    id: number;
    divination_id: number;
    category_id: number | null;
    collected_at: string;
}

export interface CategoryRecord {
    id: number;
    name: string;
    color: string;
    icon: string;
    sort_order: number;
}

export interface TagRecord {
    id: number;
    name: string;
    color: string;
}

export interface DivinationTagRecord {
    id: number;
    divination_id: number;
    tag_id: number;
}

export interface SettingsRecord {
    id: number;
    key: string;
    value: string;
    description: string;
}

export interface DivinationResult {
    originalHexagram: import('./dao/hexagramDao').Hexagram;
    changedHexagram: import('./dao/hexagramDao').Hexagram;
    yaoData: YaoType[];
    movingYao: number[];
    interpretation?: InterpretationResult;
}

export interface InterpretationResult {
    scenario: 'no_moving' | 'one_moving' | 'two_moving' | 'three_moving' | 'four_moving' | 'five_moving' | 'all_moving';
    primaryText?: string;
    secondaryText?: string;
    yaoTexts?: Array<{
        position: number;
        positionName: string;
        yaoType: string;
        yaoText: string;
        yaoTextTranslation: string;
        xiangText?: string;
        fortune: string;
    }>;
    notes?: string[];
}

export interface HexagramDetail {
    hexagram: import('./dao/hexagramDao').Hexagram;
    literature: import('./dao/hexagramDao').HexagramLiterature | undefined;
    yaoList: import('./dao/yaoDao').YaoData[];
}