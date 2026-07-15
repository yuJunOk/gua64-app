import { YaoType } from '../enums';
import { getLiteratureByHexagramId, type Hexagram } from '../dao/hexagramDao';
import { getYaoDataByHexagramId } from '../dao/yaoDao';
import type { InterpretationResult } from '../types';

type YaoTextItem = {
    position: number;
    positionName: string;
    yaoType: string;
    yaoText: string;
    yaoTextTranslation: string;
    xiangText?: string;
    fortune: string;
};

function filterYaoTexts(arr: (YaoTextItem | undefined)[]): YaoTextItem[] {
    return arr.filter((item): item is YaoTextItem => item !== undefined);
}

export interface InterpretationInput {
    originalHexagram: Hexagram;
    changedHexagram: Hexagram;
    yaoValues: YaoType[];
    movingYao: number[];
}

export function interpretHexagram(input: InterpretationInput): InterpretationResult {
    const { originalHexagram, changedHexagram, yaoValues, movingYao } = input;
    const movingCount = movingYao.length;

    switch (movingCount) {
        case 0:
            return interpretNoMoving(originalHexagram);
        case 1:
            return interpretOneMoving(originalHexagram, yaoValues, movingYao);
        case 2:
            return interpretTwoMoving(originalHexagram, yaoValues, movingYao);
        case 3:
            return interpretThreeMoving(originalHexagram, changedHexagram, yaoValues, movingYao);
        case 4:
            return interpretFourMoving(originalHexagram, changedHexagram, yaoValues, movingYao);
        case 5:
            return interpretFiveMoving(originalHexagram, changedHexagram, yaoValues, movingYao);
        case 6:
            return interpretAllMoving(originalHexagram, changedHexagram);
        default:
            return interpretNoMoving(originalHexagram);
    }
}

function interpretNoMoving(hexagram: Hexagram): InterpretationResult {
    const literature = getLiteratureByHexagramId(hexagram.id);
    return {
        scenario: 'no_moving',
        primaryText: literature?.hexagramText || '',
        notes: ['六爻皆静，以本卦卦辞解之']
    };
}

function interpretOneMoving(hexagram: Hexagram, _yaoValues: YaoType[], movingYao: number[]): InterpretationResult {
    const yaoDataList = getYaoDataByHexagramId(hexagram.id);
    const movingPos = movingYao[0];
    const yaoData = yaoDataList.find(y => y.position === movingPos);
    
    const yaoTexts = yaoData ? [{
        position: yaoData.position,
        positionName: yaoData.yaoType,
        yaoType: yaoData.yaoType,
        yaoText: yaoData.yaoText,
        yaoTextTranslation: yaoData.yaoTextTranslation,
        xiangText: yaoData.xiangText,
        fortune: yaoData.fortune
    }] : [];

    return {
        scenario: 'one_moving',
        primaryText: yaoData?.yaoText || '',
        yaoTexts,
        notes: [`一爻动，以第${movingPos}爻爻辞解之`]
    };
}

function interpretTwoMoving(hexagram: Hexagram, _yaoValues: YaoType[], movingYao: number[]): InterpretationResult {
    const sortedMoving = [...movingYao].sort((a, b) => b - a);
    const yaoDataList = getYaoDataByHexagramId(hexagram.id);
    
    const yaoTexts = filterYaoTexts(sortedMoving.map(pos => {
        const yaoData = yaoDataList.find(y => y.position === pos);
        if (!yaoData) return undefined;
        return {
            position: yaoData.position,
            positionName: yaoData.yaoType,
            yaoType: yaoData.yaoType,
            yaoText: yaoData.yaoText,
            yaoTextTranslation: yaoData.yaoTextTranslation,
            xiangText: yaoData.xiangText,
            fortune: yaoData.fortune
        };
    }));

    const primaryYao = yaoTexts[0];
    const secondaryYao = yaoTexts[1];

    return {
        scenario: 'two_moving',
        primaryText: primaryYao?.yaoText || '',
        secondaryText: secondaryYao?.yaoText || '',
        yaoTexts,
        notes: [`二爻动，以第${sortedMoving[0]}、${sortedMoving[1]}爻爻辞解之，以上爻（第${sortedMoving[0]}爻）为主`]
    };
}

function interpretThreeMoving(original: Hexagram, changed: Hexagram, _yaoValues: YaoType[], movingYao: number[]): InterpretationResult {
    const originalLiterature = getLiteratureByHexagramId(original.id);
    const changedLiterature = getLiteratureByHexagramId(changed.id);
    
    const yaoDataList = getYaoDataByHexagramId(original.id);
    const sortedMoving = [...movingYao].sort((a, b) => b - a);
    
    const yaoTexts = filterYaoTexts(sortedMoving.map(pos => {
        const yaoData = yaoDataList.find(y => y.position === pos);
        if (!yaoData) return undefined;
        return {
            position: yaoData.position,
            positionName: yaoData.yaoType,
            yaoType: yaoData.yaoType,
            yaoText: yaoData.yaoText,
            yaoTextTranslation: yaoData.yaoTextTranslation,
            xiangText: yaoData.xiangText,
            fortune: yaoData.fortune
        };
    }));

    return {
        scenario: 'three_moving',
        primaryText: originalLiterature?.hexagramText || '',
        secondaryText: changedLiterature?.hexagramText || '',
        yaoTexts,
        notes: [
            '三爻动，以本卦卦辞与变卦卦辞合参',
            `本卦「${original.name}」为贞（体），变卦「${changed.name}」为悔（用）`
        ]
    };
}

function interpretFourMoving(_original: Hexagram, changed: Hexagram, _yaoValues: YaoType[], movingYao: number[]): InterpretationResult {
    const staticYaoPositions = [1, 2, 3, 4, 5, 6].filter(p => !movingYao.includes(p));
    const sortedStatic = [...staticYaoPositions].sort((a, b) => a - b);
    
    const changedYaoDataList = getYaoDataByHexagramId(changed.id);
    
    const yaoTexts = filterYaoTexts(sortedStatic.map(pos => {
        const yaoData = changedYaoDataList.find(y => y.position === pos);
        if (!yaoData) return undefined;
        return {
            position: yaoData.position,
            positionName: yaoData.yaoType,
            yaoType: yaoData.yaoType,
            yaoText: yaoData.yaoText,
            yaoTextTranslation: yaoData.yaoTextTranslation,
            xiangText: yaoData.xiangText,
            fortune: yaoData.fortune
        };
    }));

    const primaryYao = yaoTexts[0];
    const secondaryYao = yaoTexts[1];

    return {
        scenario: 'four_moving',
        primaryText: primaryYao?.yaoText || '',
        secondaryText: secondaryYao?.yaoText || '',
        yaoTexts,
        notes: [`四爻动，以变卦中两个静爻（第${sortedStatic[0]}、${sortedStatic[1]}爻）爻辞解之，以下爻为主`]
    };
}

function interpretFiveMoving(_original: Hexagram, changed: Hexagram, _yaoValues: YaoType[], movingYao: number[]): InterpretationResult {
    const staticYaoPosition = [1, 2, 3, 4, 5, 6].find(p => !movingYao.includes(p));
    
    const changedYaoDataList = getYaoDataByHexagramId(changed.id);
    const yaoData = staticYaoPosition ? changedYaoDataList.find(y => y.position === staticYaoPosition) : undefined;
    
    const yaoTexts = yaoData ? [{
        position: yaoData.position,
        positionName: yaoData.yaoType,
        yaoType: yaoData.yaoType,
        yaoText: yaoData.yaoText,
        yaoTextTranslation: yaoData.yaoTextTranslation,
        xiangText: yaoData.xiangText,
        fortune: yaoData.fortune
    }] : [];

    return {
        scenario: 'five_moving',
        primaryText: yaoData?.yaoText || '',
        yaoTexts,
        notes: [`五爻动，以变卦中唯一静爻（第${staticYaoPosition}爻）爻辞解之`]
    };
}

function interpretAllMoving(original: Hexagram, changed: Hexagram): InterpretationResult {
    if (original.id === 1) {
        return {
            scenario: 'all_moving',
            primaryText: '见群龙无首，吉。',
            notes: ['六爻全变，乾卦用「用九」辞']
        };
    }
    
    if (original.id === 2) {
        return {
            scenario: 'all_moving',
            primaryText: '利永贞。',
            notes: ['六爻全变，坤卦用「用六」辞']
        };
    }

    const changedLiterature = getLiteratureByHexagramId(changed.id);
    return {
        scenario: 'all_moving',
        primaryText: changedLiterature?.hexagramText || '',
        notes: [`六爻全变，以变卦「${changed.name}」卦辞解之`]
    };
}

export function calculateYiBianYao(yaoValues: YaoType[]): number {
    const sum = yaoValues.reduce((acc, yao) => acc + yao, 0);
    const N = 55 - sum;
    
    if (N <= 0) return 0;
    
    let remainder = N % 6;
    return remainder === 0 ? 6 : remainder;
}

export function getScenarioLabel(scenario: InterpretationResult['scenario']): string {
    const labels: Record<InterpretationResult['scenario'], string> = {
        'no_moving': '六爻皆静',
        'one_moving': '一爻动',
        'two_moving': '二爻动',
        'three_moving': '三爻动',
        'four_moving': '四爻动',
        'five_moving': '五爻动',
        'all_moving': '六爻全变'
    };
    return labels[scenario];
}