/** @jsxImportSource @emotion/react */
import Typography from '@mui/material/Typography';
import React, { useMemo } from 'react';
import { useTranslation } from 'translation';

import { ReactComponent as LedgerLogo } from 'assets/img/wallets/ledgerLogo.svg';
import { Connector, isRunningInLedgerLive } from 'clients/web3';

import { BscLink } from '../../BscLink';
import { SecondaryButton } from '../../Button';
import { EllipseAddress } from '../../EllipseAddress';
import { Icon } from '../../Icon';
import { WALLETS } from '../constants';
import { useStyles } from './styles';

export interface AccountDetailsProps {
  onLogOut: () => void;
  onCopyAccountAddress: (accountAddress: string) => void;
  account: {
    address: string;
    connector?: Connector;
  };
}

export const AccountDetails: React.FC<AccountDetailsProps> = ({
  onLogOut,
  onCopyAccountAddress,
  account,
}) => {
  const styles = useStyles();
  const { t } = useTranslation();

  const { Logo: WalletLogo, name: walletName } = useMemo(() => {
    if (isRunningInLedgerLive()) {
      return {
        Logo: LedgerLogo,
        name: t('authModal.accountDetails.ledgerLive'),
      };
    }

    // Grab the wallet info. Note that we default to the first wallet in the list
    // if no match is found, but in reality that case should never happen
    return WALLETS.find(wallet => wallet.connector === account.connector) || WALLETS[0];
  }, [account.connector]);

  // Hide log out button when dApp is running in Ledger Live (the latter is in
  // charge of authentication in that case)
  const shouldShowLogOutButton = !isRunningInLedgerLive();

  return (
    <div css={styles.container}>
      <div css={styles.infoContainer}>
        <WalletLogo css={styles.walletLogo} />

        <div css={styles.infoRightColumn}>
          <Typography component="span" css={styles.walletName}>
            {walletName}
          </Typography>

          <div css={styles.accountAddressContainer}>
            <Typography component="span" css={styles.accountAddress}>
              <EllipseAddress ellipseBreakpoint="md" address={account.address} />
            </Typography>

            <button
              onClick={() => onCopyAccountAddress(account.address)}
              type="button"
              css={styles.copyButton}
            >
              <Icon name="copy" css={styles.copyButtonIcon} />
            </button>
          </div>
        </div>
      </div>

      <BscLink css={styles.bscScanLinkContainer} hash={account.address} />

      {shouldShowLogOutButton && (
        <SecondaryButton css={styles.logOutButton} onClick={onLogOut} fullWidth>
          {t('authModal.accountDetails.logOutButtonLabel')}
        </SecondaryButton>
      )}
    </div>
  );
};
