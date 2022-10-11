import LAYOUT_TEST_IDS from 'components/Layout/testIds';
import en from 'translation/translations/en.json';

import { TEST_ACCOUNT_ADDRESS } from '../constants';

describe('Metamask', () => {
  it('should let user connect their injected wallet', () => {
    cy.visit('/');

    cy.get(`[data-testid="${LAYOUT_TEST_IDS.connectButton}"]`).click();

    // Click on MetaMask icon
    cy.get('div').contains(en.wallets.metamask).click();

    // Accept request to connect MetaMask wallet
    cy.acceptMetamaskAccess();

    // Check connect button now displays truncated account address
    const expectedTruncatedAddress = `${TEST_ACCOUNT_ADDRESS.substring(
      0,
      4,
    )}...${TEST_ACCOUNT_ADDRESS.substring(TEST_ACCOUNT_ADDRESS.length - 4)}`;

    cy.get(`[data-testid="${LAYOUT_TEST_IDS.connectButton}"]`).should(
      'have.text',
      expectedTruncatedAddress,
    );
  });
});
