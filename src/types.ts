import { YaoType, DivinationMode } from './enums';

export type { YaoType };

export interface HistoryRecord {
    id: number;
    created_at: string;
    hexagram_name: string;
    result_type: DivinationMode;
    yao_data: string;
}

export interface DivinationResult {
    originalHexagram: import('./dao/hexagramDao').Hexagram;
    changedHexagram: import('./dao/hexagramDao').Hexagram;
    yaoData: YaoType[];
    movingYao: number[];
}