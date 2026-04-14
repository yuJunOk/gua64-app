export type YaoType = 6 | 7 | 8 | 9;

export interface HexagramData {
    id: number;
    name: string;
    code: string;
    desc: string;
    yaoCi: string[];
}

export interface HistoryRecord {
    id: number;
    created_at: string;
    hexagram_name: string;
    result_type: string;
    yao_data: string;
}

export interface DivinationResult {
    originalHexagram: HexagramData;
    changedHexagram: HexagramData;
    yaoData: YaoType[];
    movingYao: number[];
}