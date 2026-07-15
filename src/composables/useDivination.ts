import { ref } from 'vue';
import type { YaoType, DivinationResult } from '../types';
import { findHexagramByCode } from '../dao/hexagramDao';
import {
    YaoType as YaoTypeEnum,
    YAO_TYPE_LIST,
    toBit,
    toChangedBit,
    isMovingYao,
} from '../enums';

export function useDivination() {
  const yaoData = ref<YaoType[]>([]);
  const isDivining = ref(false);

  const tossCoin = (): number => {
    return Math.random() > 0.5 ? 3 : 2;
  };

  const calculateYao = (): YaoType => {
    const sum = tossCoin() + tossCoin() + tossCoin();
    switch (sum) {
      case 6: return YaoTypeEnum.LaoYin;
      case 7: return YaoTypeEnum.ShaoYang;
      case 8: return YaoTypeEnum.ShaoYin;
      case 9: return YaoTypeEnum.LaoYang;
      default: return YaoTypeEnum.ShaoYang;
    }
  };

  const generateHexagramCode = (yaoArray: YaoType[]): string => {
    return yaoArray.map(yao => toBit(yao)).join('');
  };

  const generateChangedHexagramCode = (yaoArray: YaoType[]): string => {
    return yaoArray.map(yao => toChangedBit(yao)).join('');
  };

  const findMovingYao = (yaoArray: YaoType[]): number[] => {
    const movingYao: number[] = [];
    yaoArray.forEach((yao, index) => {
      if (isMovingYao(yao)) {
        movingYao.push(6 - index);
      }
    });
    return movingYao;
  };

  const autoDivination = async (): Promise<DivinationResult> => {
    isDivining.value = true;
    yaoData.value = [];

    for (let i = 0; i < 6; i++) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const yao = calculateYao();
      yaoData.value.push(yao);
    }

    const result = getDivinationResult(yaoData.value);
    isDivining.value = false;
    return result;
  };

  const manualDivination = (inputYaoData: YaoType[]): DivinationResult => {
    if (inputYaoData.length !== 6) {
      throw new Error('必须输入6个爻值');
    }

    const validYao = inputYaoData.every(yao => YAO_TYPE_LIST.includes(yao));
    if (!validYao) {
      throw new Error('爻值必须是6、7、8、9之一');
    }

    yaoData.value = inputYaoData;
    return getDivinationResult(inputYaoData);
  };

  const getDivinationResult = (yaoArray: YaoType[]): DivinationResult => {
    const originalCode = generateHexagramCode(yaoArray);
    const changedCode = generateChangedHexagramCode(yaoArray);
    const movingYao = findMovingYao(yaoArray);

    const originalHexagram = findHexagramByCode(originalCode) || {
      id: 0,
      name: '未知',
      symbol: originalCode,
      nature: '未知卦',
      category: '未知',
    };

    const changedHexagram = findHexagramByCode(changedCode) || {
      id: 0,
      name: '未知',
      symbol: changedCode,
      nature: '未知卦',
      category: '未知',
    };

    return {
      originalHexagram,
      changedHexagram,
      yaoData: yaoArray,
      movingYao,
    };
  };

  const resetDivination = () => {
    yaoData.value = [];
    isDivining.value = false;
  };

  return {
    yaoData,
    isDivining,
    autoDivination,
    manualDivination,
    getDivinationResult,
    resetDivination,
  };
}