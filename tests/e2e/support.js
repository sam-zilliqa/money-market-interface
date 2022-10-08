import '@synthetixio/synpress/support/index';

before(() => {
  // Add testnet network
  cy.addMetamaskNetwork({
    networkName: 'BSC Testnet',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    chainId: '97',
    symbol: 'BNB',
    blockExplorer: 'https://explorer.binance.org/smart-testnet',
    isTestnet: true,
  });
});
