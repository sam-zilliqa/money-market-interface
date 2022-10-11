import '@nomicfoundation/hardhat-toolbox';
import { HardhatUserConfig } from 'hardhat/config';

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  solidity: {
    compilers: [
      {
        version: '0.5.16',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  networks: {
    hardhat: {
      forking: {
        url: 'https://bsc-mainnet.nodereal.io/v1/ba380d7666604315bf64626983685899',
        blockNumber: 19700553,
      },
      // TODO: add accounts
      // accounts: { mnemonic: secrets.mnemonic },
    },
  },
  mocha: {
    timeout: 20000,
  },
};

export default config;
