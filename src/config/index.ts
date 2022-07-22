import sample from 'lodash/sample';
import { BscChainId } from 'types';

import { BSC_SCAN_URLS } from 'constants/bsc';
import { API_ENDPOINT_URLS, RPC_URLS } from 'constants/endpoints';

export interface Config {
  chainId: BscChainId;
  isOnTestnet: boolean;
  rpcUrl: string;
  apiUrl: string;
  bscScanUrl: string;
}

const chainId: BscChainId = process.env.REACT_APP_CHAIN_ID
  ? parseInt(process.env.REACT_APP_CHAIN_ID, 10)
  : BscChainId.MAINNET;

const isOnTestnet = chainId === BscChainId.TESTNET;
const envRpcUrls = process.env.REACT_APP_CYPRESS ? RPC_URLS.cypress : RPC_URLS[chainId];
const rpcUrl = sample(envRpcUrls) as string;
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
