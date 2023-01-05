import sample from 'lodash/sample';
import { ZilChainId } from 'types';

import { BSC_SCAN_URLS } from 'constants/bsc';
import { API_ENDPOINT_URLS, RPC_URLS } from 'constants/endpoints';

export interface Config {
  chainId: ZilChainId;
  isOnTestnet: boolean;
  rpcUrl: string;
  apiUrl: string;
  bscScanUrl: string;
}

// const chainId: BscChainId = process.env.REACT_APP_CHAIN_ID
//   ? parseInt(process.env.REACT_APP_CHAIN_ID, 10)
//   : BscChainId.MAINNET;

const chainId: ZilChainId = process.env.REACT_APP_CHAIN_ID
  ? parseInt(process.env.REACT_APP_CHAIN_ID, 10)
  : ZilChainId.TESTNET;

// const isOnTestnet = chainId === BscChainId.TESTNET
const isOnTestnet = true;
const rpcUrl = sample(RPC_URLS[chainId]) as string;
const apiUrl = API_ENDPOINT_URLS[chainId];
const bscScanUrl = BSC_SCAN_URLS[chainId];

const config: Config = {
  chainId,
  isOnTestnet,
  rpcUrl,
  apiUrl,
  bscScanUrl,
};

export default config;
