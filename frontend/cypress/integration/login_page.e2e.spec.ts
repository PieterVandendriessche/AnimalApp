/// <reference types="Cypress" />
// Problem with typescript config in cypress, we need to define it once here
// see: https://github.com/cypress-io/cypress/issues/1065
declare namespace Cypress {
    interface Chainable {
        login(): void;
        logout(): void;
        resetDb(): void;
        register(username, password): void;
        prepTest(): void;
    }
}

describe('Login Page', () => {
    beforeEach(() => {
        cy.prepTest();
        cy.register('Pieter', 'testtesttest');

    });

   it('should go to the login page and try to login', () => {
        cy.logout();
        cy.visit('');

       cy.get('[data-test=username]').type('Pieter');
       cy.get('[data-test=password]').type('testtesttest');
       cy.get('[data-test=loginBtn]').click();

       cy.url().should('include', 'animal-list');
       cy.contains('pieter uitloggen');
   });

   it('should show an error when the login is invalid', () => {
    cy.logout();   
    cy.visit('');

       cy.get('[data-test=username]').type('Henk');
       cy.get('[data-test=password]').type('invalid');
       cy.get('[data-test=loginBtn]').click();

     
    cy.contains('Welkom! Log in of maak een account om mee te spelen!'); });

   it('should not be possible to click the login button when the username is not filled in ', () => {
    cy.logout();   
    cy.visit('');

       cy.get('[data-test=username]').type('Henk');

       cy.get('[data-test=loginBtn]').should('be.disabled');
   });

    it('should not be possible to click the login button when the password is not filled in ', () => {
        cy.logout();
        cy.visit('');

        cy.get('[data-test=password]').type('invalid');

        cy.get('[data-test=loginBtn]').should('be.disabled');
    });
});