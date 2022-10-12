// import LAYOUT_TEST_IDS from 'components/Layout/testIds';
jest.setTimeout(30000);

const TEST_ACCOUNT_ADDRESS = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';

const escapeXpathString = str => {
  const splitedQuotes = str.replace(/'/g, `', "'", '`);
  return `concat('${splitedQuotes}', '')`;
};

describe('Auth', () => {
  it('should let user connect their injected wallet', async () => {
    await metamask.importPK('ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80');

    await metamask.addNetwork({
      // Add mainnet network
      networkName: 'BSC',
      rpc: 'https://bsc-dataseed.binance.org/',
      chainId: '56',
      symbol: 'BNB',
    });

    await page.setViewport({
      width: 1920,
      height: 1080,
    });

    await page.goto('http://localhost:3000');

    await page.bringToFront();

    // Click on connect button
    const connectButton = await page.$(`[data-testid="layout-header-connect-button"]`);
    await connectButton.click();

    // Click on MetaMask icon
    const metaMaskButton = await page.$(`[data-testid="wallet-MetaMask"]`);
    await metaMaskButton.click();

    // // Approve connection
    await metamask.approve();

    const expectedTruncatedAddress = `${TEST_ACCOUNT_ADDRESS.substring(
      0,
      4,
    )}...${TEST_ACCOUNT_ADDRESS.substring(TEST_ACCOUNT_ADDRESS.length - 4)}`;

    await page.bringToFront();

    // await page.waitForFunction(
    //   `document.querySelector('[data-testid="layout-header-connect-button"]').innerText.includes("${expectedTruncatedAddress}")`,
    // );

    const updatedConnectButton = await page.$('[data-testid="layout-header-connect-button"]');
    await updatedConnectButton.click();

    // await page.waitForFunction(async () => {
    //   return page.$x(`//*[contains(text(), "${escapeXpathString(TEST_ACCOUNT_ADDRESS)}")]`);
    // });

    // const address = await page.$x(
    //   `//*[contains(text(), "${escapeXpathString(TEST_ACCOUNT_ADDRESS)}")]`,
    // );

    await page.waitForFunction(`document.querySelector('[data-testid="123"]')`);

    const address = await page.$('[data-testid="123"]');
    const text = await (await address.getProperty('textContent')).jsonValue();

    expect(text).toBe(TEST_ACCOUNT_ADDRESS);
  });
});
