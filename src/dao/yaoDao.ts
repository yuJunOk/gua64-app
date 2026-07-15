import yaoData1 from '../data/yao-data-1.json';
import yaoData2 from '../data/yao-data-2.json';
import yaoData3 from '../data/yao-data-3.json';
import yaoData4 from '../data/yao-data-4.json';
import yaoData5 from '../data/yao-data-5.json';
import yaoData6 from '../data/yao-data-6.json';
import { getHexagramBySymbol } from './hexagramDao';

export interface YaoData {
    hexagramId: number;
    position: number;
    yaoType: string;
    fortune: string;
    yaoText: string;
    yaoTextTranslation: string;
    xiangText?: string;
    xiangTextTranslation?: string;
    heloNumber?: string;
    heloDescription?: string;
}

const allYaoData: YaoData[] = [
    ...yaoData1,
    ...yaoData2,
    ...yaoData3,
    ...yaoData4,
    ...yaoData5,
    ...yaoData6
];

export const getYaoDataByHexagramId = (hexagramId: number): YaoData[] => {
    return allYaoData
        .filter(y => y.hexagramId === hexagramId)
        .sort((a, b) => a.position - b.position);
};

export const getYaoDataBySymbol = (symbol: string): YaoData[] => {
    const hexagram = getHexagramBySymbol(symbol);
    if (!hexagram) return [];
    return getYaoDataByHexagramId(hexagram.id);
};

export const getYaoData = (hexagramId: number, position: number): YaoData | undefined => {
    return allYaoData.find(y => y.hexagramId === hexagramId && y.position === position);
};
