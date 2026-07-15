import { YaoType } from '../enums';

export { getYaoLabel } from '../enums/yaoType';
export { getLabel as getPositionName } from '../enums/yaoPosition';
export { isMovingYao } from '../enums/yaoType';

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
      positionName: `${indexFromBottom === 0 ? '初' : indexFromBottom === 1 ? '二' : indexFromBottom === 2 ? '三' : indexFromBottom === 3 ? '四' : indexFromBottom === 4 ? '五' : '上'}爻`,
      yaoType: yaoData?.[indexFromBottom],
      yaoCi: undefined,
    });
  }
  return rows;
}