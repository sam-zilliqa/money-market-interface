import { useContext, useMemo } from 'react';
import { BigNumber } from 'bignumber.js';
import { useGetDailyXvsWei, useGetMarkets } from 'clients/api';
import { convertWeiToCoins } from 'utilities/common';
import { XVS_TOKEN_ID } from 'constants/xvs';
import { AuthContext } from 'context/AuthContext';

export const useDailyXvsWei = () => {
  const { account: { address: accountAddress = '' } = {} } = useContext(AuthContext);
  const { data: dailyXvsWei, isLoading: isGetDailyXvsLoading } = useGetDailyXvsWei(
    { accountAddress: accountAddress || '' },
    { enabled: !!accountAddress },
  );

  const { data: getMarketsData, isLoading: isGetMarketsLoading } = useGetMarkets();
  const xvsPriceDollars: BigNumber | undefined = useMemo(
    () => (getMarketsData?.markets || []).find(market => market.id === XVS_TOKEN_ID)?.tokenPrice,
    [JSON.stringify(getMarketsData?.markets)],
  );

  const { dailyXvsDistributionInterestsCents } = useMemo(() => {
    const dailyXvsTokens =
      dailyXvsWei &&
      convertWeiToCoins({
        valueWei: dailyXvsWei,
        tokenId: XVS_TOKEN_ID,
      });

    return {
      dailyXvsDistributionInterestsCents:
        accountAddress && xvsPriceDollars
          ? dailyXvsTokens?.multipliedBy(xvsPriceDollars).times(100)
          : new BigNumber(0),
    };
  }, [JSON.stringify(dailyXvsWei), JSON.stringify(getMarketsData?.markets), accountAddress]);

  return {
    isLoading: isGetDailyXvsLoading || isGetMarketsLoading,
    dailyXvsDistributionInterestsCents,
  };
};