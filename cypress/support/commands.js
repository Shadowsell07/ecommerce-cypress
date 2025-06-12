// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Custom command to verify element is visible and contains text
Cypress.Commands.add('shouldBeVisibleAndContain', (selector, text) => {
    cy.get(selector).should('be.visible').and('contain', text);
});

// Custom command to wait for loading spinner to disappear
Cypress.Commands.add('waitForLoader', () => {
    cy.get('.loader').should('not.exist');
});
