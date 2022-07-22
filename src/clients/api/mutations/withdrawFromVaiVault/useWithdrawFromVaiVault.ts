import { MutationObserverOptions, useMutation } from 'react-query';
import { getContractAddress } from 'utilities';

import {
  WithdrawFromVaiVaultInput,
  WithdrawFromVaiVaultOutput,
  queryClient,
  withdrawFromVaiVault,
} from 'clients/api';
import { useVaiVaultContract } from 'clients/contracts/hooks';
import FunctionKey from 'constants/functionKey';
import { TOKENS } from 'constants/tokens';

const VAI_VAULT_ADDRESS = getContractAddress('vaiVault');

type Options = MutationObserverOptions<
  WithdrawFromVaiVaultOutput,
  Error,
  Omit<WithdrawFromVaiVaultInput, 'vaiVaultContract'>
>;

const useWithdrawFromVaiVault = (options?: Options) => {
  const vaiVaultContract = useVaiVaultContract();

  return useMutation(
    FunctionKey.WITHDRAW_FROM_VAI_VAULT,
    (params: Omit<WithdrawFromVaiVaultInput, 'vaiVaultContract'>) =>
      withdrawFromVaiVault({
        vaiVaultContract,
        ...params,
      }),
    {
      ...options,
      onSuccess: async (...onSuccessParams) => {
        const { fromAccountAddress } = onSuccessParams[1];

        // Invalidate cached user info, including staked amount
        queryClient.invalidateQueries([FunctionKey.GET_VAI_VAULT_USER_INFO, fromAccountAddress]);

        // Invalidate cached user balance
        queryClient.invalidateQueries([
          FunctionKey.GET_BALANCE_OF,
          fromAccountAddress,
          TOKENS.vai.id,
        ]);

        // Invalidate cached vault data
        queryClient.invalidateQueries([
          FunctionKey.GET_BALANCE_OF,
          VAI_VAULT_ADDRESS,
          TOKENS.vai.id,
        ]);

        queryClient.invalidateQueries(FunctionKey.GET_VENUS_VAI_VAULT_DAILY_RATE_WEI);

        if (options?.onSuccess) {
          options.onSuccess(...onSuccessParams);
        }
      },
    },
  );
};

export default useWithdrawFromVaiVault;
