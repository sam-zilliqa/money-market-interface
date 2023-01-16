import config from 'config';
import { Multicall } from 'ethereum-multicall';
import { useMemo } from 'react';
import { useWeb3 } from 'clients/web3';

import { multicall } from '../../constants/contracts/addresses/main.json';

const useMulticall = () => {
  const web3 = useWeb3();
  return useMemo(
    () =>
      new Multicall({
        multicallCustomContractAddress: multicall[config.chainId],
        web3Instance: web3,
        tryAggregate: true,
      }),
    [web3],
  );
};

export default useMulticall;
