import { BscChainId, ZilChainId } from 'types';

export const API_ENDPOINT_URLS = {
  [BscChainId.MAINNET]: 'https://api.venus.io/api',
  // [BscChainId.TESTNET]: 'https://testnetapi.venus.io/api',
  [BscChainId.TESTNET]: 'https://money-market-api.vercel.app',
  [ZilChainId.TESTNET]: 'https://money-market-api.vercel.app',
  // [BscChainId.TESTNET]: 'http://localhost:5001',
};

export const RPC_URLS: {
  [key: string]: string[];
} = {
  [BscChainId.MAINNET]: [
    'https://bsc-dataseed1.ninicoin.io',
    'https://bsc-dataseed1.defibit.io',
    'https://bsc-dataseed.binance.org',
  ],
  [BscChainId.TESTNET]: ['https://bsc-testnet.nodereal.io/v1/f9777f42cc9243f0a766937df1c6a5f3'],
  [ZilChainId.TESTNET]: ['https://evmdev-l2api.dev.z7a.xyz'],
};
