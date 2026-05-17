import type { YaoType } from '../types';

/** 自下标 0（初爻）到 5（上爻）的爻位名 */
export const YAO_POSITION_NAMES = [
  '初爻',
  '二爻',
  '三爻',
  '四爻',
  '五爻',
  '上爻',
] as const;

export function isMovingYao(yao: YaoType): boolean {
  return yao === 6 || yao === 9;
}

export function getYaoKindLabel(yao: YaoType): string {
  switch (yao) {
    case 6:
      return '老阴';
    case 7:
      return '少阳';
    case 8:
      return '少阴';
    case 9:
      return '老阳';
    default:
      return '';
  }
}

export function getPositionName(indexFromBottom: number): string {
  return YAO_POSITION_NAMES[indexFromBottom] ?? `第${indexFromBottom + 1}爻`;
}

/** 自上而下展示用的六行（上爻在前） */
export function buildHexagramRows(
  code: string,
  yaoData?: YaoType[],
): Array<{
  bit: '0' | '1';
  indexFromBottom: number;
  positionName: string;
  yaoType?: YaoType;
  yaoCi?: string;
}> {
  const bits = code.padEnd(6, '0').slice(0, 6).split('') as ('0' | '1')[];
  const rows = [];
  for (let displayIdx = 0; displayIdx < 6; displayIdx++) {
    const indexFromBottom = 5 - displayIdx;
    rows.push({
      bit: bits[indexFromBottom]!,
      indexFromBottom,
      positionName: getPositionName(indexFromBottom),
      yaoType: yaoData?.[indexFromBottom],
      yaoCi: undefined,
    });
  }
  return rows;
}
