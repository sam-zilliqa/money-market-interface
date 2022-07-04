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
    cy.get(`[data-test-id="${TEST_IDS.header.totalSupply.text}"]`).should(
      'have.text',
      en.market.totalSupply,
    );
    cy.get(`[data-test-id="${TEST_IDS.header.totalSupply.value}"]`).should('have.text', 1);
  });
});
