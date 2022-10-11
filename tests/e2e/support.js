import '@synthetixio/synpress/support/index';

before(() => {
  // Add mainnet network
  cy.addMetamaskNetwork({
    // Add mainnet network
    networkName: 'BSC',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    chainId: '56',
    symbol: 'BNB',
    blockExplorer: 'https://bscscan.com',
    isTestnet: false,
  });
});
