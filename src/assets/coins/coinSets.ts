import kangxiObv from './kangxi-tongbao/obv.png';
import kangxiRev from './kangxi-tongbao/rev.png';

export const DEFAULT_COIN_SET_ID = 'kangxi-tongbao' as const;

export type CoinSetId = typeof DEFAULT_COIN_SET_ID;

export interface CoinSet {
  id: CoinSetId;
  label: string;
  obv: string;
  rev: string;
}

export const coinSets: Record<CoinSetId, CoinSet> = {
  'kangxi-tongbao': {
    id: 'kangxi-tongbao',
    label: '康熙通宝',
    obv: kangxiObv,
    rev: kangxiRev,
  },
};

export function getCoinSet(id: CoinSetId = DEFAULT_COIN_SET_ID): CoinSet {
  return coinSets[id];
}
