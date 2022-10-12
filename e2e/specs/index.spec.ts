// import LAYOUT_TEST_IDS from 'components/Layout/testIds';

describe('Auth', () => {
  it('should let user connect their injected wallet', async () => {
    await page.setViewport({
      width: 1920,
      height: 1080,
    });

    await page.goto('http://localhost:3000');

    // Click on connect button
    const connectButton = await page.$(`[data-testid="layout-header-connect-button"]`);
    await connectButton.click();

    // Click on MetaMask icon
    const metaMaskButton = await page.$(`[data-testid="wallet-MetaMask"]`);
    await metaMaskButton.click();

    // // Approve connection
    // await metamask.approve();

    await page.waitForSelector(`[data-testid="layout-header-connect-button"]`);

    // // Wait until promise resolves
    // await new Promise(resolve => {
    //   // wait for event (simulated with setTimeout)
    //   setTimeout(() => {
    //     // event happens, resolve promise
    //     resolve('');
    //   }, 5000);
    // });
  });
});
