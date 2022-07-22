// / <reference types="cypress" />
import config from 'config';

import marketResponse from '__mocks__/api/governance.json';
import en from 'translation/translations/en.json';

import TEST_IDS from './testIds';

describe('pages/Market', () => {
  beforeEach(() => {
    cy.intercept('GET', `${config.apiUrl}/governance/venus`, marketResponse);
    cy.visit('http://localhost:3000/market');
  });

  it('header displays protocol totals', () => {
    cy.get(`[data-testid="${TEST_IDS.header.totalSupply.text}"]`).should(
      'have.text',
      en.market.totalSupply,
    );
    cy.get(`[data-testid="${TEST_IDS.header.totalSupply.value}"]`).should(
      'have.text',
      '$2,061,197,719.09',
    );

    cy.get(`[data-testid="${TEST_IDS.header.totalBorrow.text}"]`).should(
      'have.text',
      en.market.totalBorrow,
    );
    cy.get(`[data-testid="${TEST_IDS.header.totalBorrow.value}"]`).should(
      'have.text',
      '$637,311,933.68',
    );

    cy.get(`[data-testid="${TEST_IDS.header.availableLiquidity.text}"]`).should(
      'have.text',
      en.market.availableLiquidity,
    );
    cy.get(`[data-testid="${TEST_IDS.header.availableLiquidity.value}"]`).should(
      'have.text',
      '$1,433,512,287.56',
    );
    cy.get(`[data-testid="${TEST_IDS.header.totalTreasury.text}"]`).should(
      'have.text',
      en.market.totalTreasury,
    );
    cy.get(`[data-testid="${TEST_IDS.header.totalTreasury.value}"]`).should(
      'have.text',
      '$10,474,401.10',
    );
  });
});
