import { Token, ZilChainId } from 'types';

import vBnb from 'assets/img/tokens/vBnb.svg';
import vUsdc from 'assets/img/tokens/vUsdc.svg';
import vZil from 'assets/img/tokens/zil.svg';

import VZIL_TOKEN_ADDRESSES from '../../contracts/addresses/vZilTokens.json';

export const TESTNET_ZIL_TOKENS = {
  bnb: {
    id: 'bnb',
    symbol: 'vBNB',
    address: VZIL_TOKEN_ADDRESSES.bnb[ZilChainId.TESTNET],
    decimals: 8,
    asset: vBnb,
  } as Token,
  zil: {
    id: 'zil',
    symbol: 'vZIL',
    address: VZIL_TOKEN_ADDRESSES.zil[ZilChainId.TESTNET],
    decimals: 8,
    asset: vZil,
  } as Token,
  usdc: {
    id: 'usdc',
    symbol: 'vUSDC',
    address: VZIL_TOKEN_ADDRESSES.usdc[ZilChainId.TESTNET],
    decimals: 8,
    asset: vUsdc,
  } as Token,
};
