/** @jsxImportSource @emotion/react */
import Paper from '@mui/material/Paper';
import BigNumber from 'bignumber.js';
import { Spinner, Tabs } from 'components';
import React, { useContext, useMemo } from 'react';
import { useTranslation } from 'translation';
import { convertWeiToTokens } from 'utilities';

import {
  useConvertVrt,
  useGetBalanceOf,
  useGetVrtConversionEndTime,
  useGetVrtConversionRatio,
  useGetXvsWithdrawableAmount,
  useWithdrawXvs,
} from 'clients/api';
import { XVS_TOKEN_ID } from 'constants/xvs';
import { AuthContext } from 'context/AuthContext';
import { VError } from 'errors/VError';

import Convert, { ConvertProps } from './Convert';
import Withdraw, { WithdrawProps } from './Withdraw';
import { VRT_ID } from './constants';
import { useStyles } from './styles';

export type ConvertVrtUiProps = ConvertProps & WithdrawProps;

export const ConvertVrtUi = ({
  xvsToVrtConversionRatio,
  vrtConversionEndTime,
  userVrtBalanceWei,
  convertVrtLoading,
  convertVrt,
  withdrawXvsLoading,
  withdrawXvs,
  xvsWithdrawableAmount,
}: ConvertVrtUiProps) => {
  const { t } = useTranslation();
  const styles = useStyles();

  const tabsContent = [
    {
      title: t('convertVrt.convert'),
      content: (
        <Convert
          xvsToVrtConversionRatio={xvsToVrtConversionRatio}
          vrtConversionEndTime={vrtConversionEndTime}
          userVrtBalanceWei={userVrtBalanceWei}
          convertVrtLoading={convertVrtLoading}
          convertVrt={convertVrt}
        />
      ),
    },
    {
      title: t('convertVrt.withdraw'),
      content: (
        <Withdraw
          xvsWithdrawableAmount={xvsWithdrawableAmount}
          withdrawXvsLoading={withdrawXvsLoading}
          withdrawXvs={withdrawXvs}
        />
      ),
    },
  ];

  return (
    <div css={[styles.root, styles.marginTop]}>
      <Paper css={styles.tabs}>
        <Tabs tabsContent={tabsContent} />
      </Paper>
    </div>
  );
};

const ConvertVrt = () => {
  const { account } = useContext(AuthContext);
  const accountAddress = account?.address;
  const { data: vrtConversionEndTime } = useGetVrtConversionEndTime();
  const { data: vrtConversionRatio } = useGetVrtConversionRatio();
  const { data: userVrtBalanceData } = useGetBalanceOf(
    { accountAddress: accountAddress || '', tokenId: VRT_ID },
    { enabled: !!accountAddress },
  );

  const { data: { totalWithdrawableAmount: xvsWithdrawableAmount } = {} } =
    useGetXvsWithdrawableAmount(
      { accountAddress: accountAddress || '' },
      { enabled: !!accountAddress },
    );

  const { mutateAsync: convertVrt, isLoading: convertVrtLoading } = useConvertVrt();
  const { mutateAsync: withdrawXvs, isLoading: withdrawXvsLoading } = useWithdrawXvs();

  const handleConvertVrt = async (amount: string) => {
    if (!accountAddress) {
      throw new VError({ type: 'unexpected', code: 'walletNotConnected' });
    }

    return convertVrt({
      amountWei: amount,
      accountAddress,
    });
  };

  const handleWithdrawXvs = async () => {
    if (!accountAddress) {
      throw new VError({ type: 'unexpected', code: 'walletNotConnected' });
    }

    return withdrawXvs({
      accountAddress,
    });
  };

  const conversionRatio = useMemo(() => {
    if (vrtConversionRatioData?.conversionRatio) {
      return convertWeiToTokens({
        valueWei: new BigNumber(vrtConversionRatioData.conversionRatio),
        tokenId: XVS_TOKEN_ID,
      });
    }

    return undefined;
  }, [vrtConversionRatioData?.conversionRatio]);

  if (conversionRatio && vrtConversionEndTimeData?.conversionEndTime) {
    return (
      <ConvertVrtUi
        xvsToVrtConversionRatio={conversionRatio}
        userVrtBalanceWei={userVrtBalanceData?.balanceWei}
        vrtConversionEndTime={vrtConversionEndTime}
        convertVrtLoading={convertVrtLoading}
        convertVrt={handleConvertVrt}
        withdrawXvs={handleWithdrawXvs}
        withdrawXvsLoading={withdrawXvsLoading}
        xvsWithdrawableAmount={xvsWithdrawableAmount}
      />
    );
  }

  // @TODO - Handle error state
  return <Spinner />;
};

export default ConvertVrt;
