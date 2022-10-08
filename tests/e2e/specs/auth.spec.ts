import LAYOUT_TEST_IDS from 'components/Layout/testIds';
import en from 'translation/translations/en.json';

describe('Metamask', () => {
  it('should let user connect their injected wallet', () => {
    cy.visit('/');

    cy.get(`[data-testid="${LAYOUT_TEST_IDS.connectButton}"]`).click();

    // Click on MetaMask icon
    cy.get('div').contains(en.wallets.metamask).click();

    // Accept request to connect MetaMask wallet
    cy.acceptMetamaskAccess();

    // Check connect button now displays truncated account address
    // TODO: get truncated address from an imported value
    cy.get(`[data-testid="${LAYOUT_TEST_IDS.connectButton}"]`).should('have.text', '0xa2...cFC7');
  });
});
