import { css } from '@emotion/react';
import { useTheme } from '@mui/material';

export const useStyles = () => {
  const theme = useTheme();

  return {
    selectButtonsContainer: css`
      display: flex;
      flex-direction: row;
    `,
    selectButton: css`
      flex: 1;
      border-radius: ${theme.spacing(13)};
      padding-left: ${theme.spacing(2)};
      padding-right: ${theme.spacing(2)};

      &:not(:last-child) {
        margin-right: ${theme.spacing(4)};
      }
    `,
    tokenTextFieldFooter: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,
    binanceConnect: css`
      display: flex;
      align-items: center;
      color: ${theme.palette.interactive.primary};
    `,
    binanceConnectLogo: css`
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      margin-right: ${theme.spacing(2)};
    `,
    binanceConnectText: css`
      color: inherit;
      margin-right: ${theme.spacing(1)};
    `,
    binanceConnectIcon: css`
      color: inherit;
      width: ${theme.spacing(3)};
      height: ${theme.spacing(3)};
    `,
  };
};
