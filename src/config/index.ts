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

const chainId: BscChainId =
  process.env.REACT_APP_CHAIN_ID && !process.env.REACT_APP_IS_RUNNING_E2E
    ? parseInt(process.env.REACT_APP_CHAIN_ID, 10)
    : BscChainId.MAINNET;

const isOnTestnet = chainId === BscChainId.TESTNET;
const rpcUrl = sample(RPC_URLS[process.env.REACT_APP_IS_RUNNING_E2E ? 'e2e' : chainId]) as string;

// TODO: point to local API when running e2e tests
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
