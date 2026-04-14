import { ref } from 'vue';
import type { YaoType, DivinationResult } from './types';
import { findHexagramByCode } from './data';

export function useDivination() {
  const yaoData = ref<YaoType[]>([]);
  const isDivining = ref(false);

  // 模拟抛硬币
  const tossCoin = (): number => {
    return Math.random() > 0.5 ? 3 : 2; // 3为阳，2为阴
  };

  // 计算爻值
  const calculateYao = (): YaoType => {
    const sum = tossCoin() + tossCoin() + tossCoin();
    switch (sum) {
      case 6: return 6; // 老阴
      case 7: return 7; // 少阳
      case 8: return 8; // 少阴
      case 9: return 9; // 老阳
      default: return 7; // 默认少阳
    }
  };

  // 生成卦象代码
  const generateHexagramCode = (yaoArray: YaoType[]): string => {
    return yaoArray.map(yao => {
      if (yao === 6 || yao === 8) return '0'; // 阴
      if (yao === 7 || yao === 9) return '1'; // 阳
      return '0';
    }).join('');
  };

  // 生成变卦代码
  const generateChangedHexagramCode = (yaoArray: YaoType[]): string => {
    return yaoArray.map(yao => {
      if (yao === 6) return '1'; // 老阴变阳
      if (yao === 9) return '0'; // 老阳变阴
      if (yao === 7) return '1'; // 少阳不变
      if (yao === 8) return '0'; // 少阴不变
      return '0';
    }).join('');
  };

  // 找出动爻
  const findMovingYao = (yaoArray: YaoType[]): number[] => {
    const movingYao: number[] = [];
    yaoArray.forEach((yao, index) => {
      if (yao === 6 || yao === 9) {
        movingYao.push(6 - index); // 爻位从下往上数
      }
    });
    return movingYao;
  };

  // 自动算卦
  const autoDivination = async (): Promise<DivinationResult> => {
    isDivining.value = true;
    yaoData.value = [];

    // 模拟抛六次硬币
    for (let i = 0; i < 6; i++) {
      await new Promise(resolve => setTimeout(resolve, 500)); // 模拟抛掷过程
      const yao = calculateYao();
      yaoData.value.push(yao);
    }

    const result = getDivinationResult(yaoData.value);
    isDivining.value = false;
    return result;
  };

  // 手动输入算卦
  const manualDivination = (inputYaoData: YaoType[]): DivinationResult => {
    if (inputYaoData.length !== 6) {
      throw new Error('必须输入6个爻值');
    }

    const validYao = inputYaoData.every(yao => [6, 7, 8, 9].includes(yao));
    if (!validYao) {
      throw new Error('爻值必须是6、7、8、9之一');
    }

    yaoData.value = inputYaoData;
    return getDivinationResult(inputYaoData);
  };

  // 获取算卦结果
  const getDivinationResult = (yaoArray: YaoType[]): DivinationResult => {
    const originalCode = generateHexagramCode(yaoArray);
    const changedCode = generateChangedHexagramCode(yaoArray);
    const movingYao = findMovingYao(yaoArray);

    const originalHexagram = findHexagramByCode(originalCode) || {
      id: 0,
      name: '未知',
      code: originalCode,
      desc: '未知卦象',
      yaoCi: []
    };

    const changedHexagram = findHexagramByCode(changedCode) || {
      id: 0,
      name: '未知',
      code: changedCode,
      desc: '未知卦象',
      yaoCi: []
    };

    return {
      originalHexagram,
      changedHexagram,
      yaoData: yaoArray,
      movingYao
    };
  };

  // 重置算卦
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
    resetDivination
  };
}