import BigNumber from 'bignumber.js';
import { convertWeiToTokens } from 'utilities';

import { TOKENS } from 'constants/tokens';

const getReadableFeeVai = ({
  valueWei,
  mintFeePercentage,
}: {
  valueWei: BigNumber;
  mintFeePercentage: number;
}) => {
  const feeWei = new BigNumber(valueWei || 0).multipliedBy(mintFeePercentage).dividedBy(100);
  return convertWeiToTokens({
    valueWei: feeWei,
    token: TOKENS.vai,
    returnInReadableFormat: true,
  });
};

export default getReadableFeeVai;
