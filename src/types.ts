export type YaoType = 6 | 7 | 8 | 9;

export interface HistoryRecord {
    id: number;
    created_at: string;
    hexagram_name: string;
    result_type: string;
    yao_data: string;
}

export interface DivinationResult {
    originalHexagram: import('./dao/hexagramDao').Hexagram;
    changedHexagram: import('./dao/hexagramDao').Hexagram;
    yaoData: YaoType[];
    movingYao: number[];
}
