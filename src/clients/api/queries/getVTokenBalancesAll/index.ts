import { VenusLens } from 'types/contracts';

export interface GetVTokenBalancesAllInput {
  venusLensContract: VenusLens;
  account: string;
  vTokenAddresses: string[];
}

interface GetVTokenBalancesAllResponse extends Array<string> {
  balanceOf: string;
  balanceOfUnderlying: string;
  borrowBalanceCurrent: string;
  tokenAllowance: string;
  tokenBalance: string;
  vToken: string;
}

interface GetVTokenBalanceOutput {
  balanceOf: string;
  balanceOfUnderlying: string;
  borrowBalanceCurrent: string;
  tokenAllowance: string;
  tokenBalance: string;
  vToken: string;
}

export type IGetVTokenBalancesAllOutput = {
  balances: GetVTokenBalanceOutput[];
};

const getVTokenBalancesAll = async ({
  venusLensContract,
  vTokenAddresses,
  account,
}: GetVTokenBalancesAllInput): Promise<IGetVTokenBalancesAllOutput> => {
  console.log('vTokenAddresses', vTokenAddresses);
  const response = await venusLensContract.methods
    .vTokenBalancesAll(vTokenAddresses, account?.toLowerCase())
    .call();

  // console.log(90, response)

  // This is original returned as an array with these properties but at some
  // point the properties are getting removed from the type
  const balances = (response as unknown as GetVTokenBalancesAllResponse[]).map(item => ({
    balanceOf: item.balanceOf,
    balanceOfUnderlying: item.balanceOfUnderlying,
    borrowBalanceCurrent: item.borrowBalanceCurrent,
    tokenAllowance: item.tokenAllowance,
    tokenBalance: item.tokenBalance,
    vToken: item.vToken,
  }));

  // console.log(balances)

  return { balances };
};

export default getVTokenBalancesAll;
