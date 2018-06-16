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

describe('Register Page', () => {
    beforeEach(() => {
        cy.prepTest();
        
        cy.logout();
    });

   it('Should register a new user and redirect', () => {
       cy.visit('/register')
       cy.get('[data-test=username]').type('pietervandendriessche');
       cy.get('[data-test=password]').type('ikbeneenwachtwoord');
       cy.get('[data-test=passwordConfirm]').type('ikbeneenwachtwoord');
       cy.get('[data-test=submitBtn]').click();
       
       cy.url().should('include', 'animal-list');
       cy.contains('pietervandendriessche uitloggen');
   });

   it('Should fail a with new user with same name', () => {
    cy.visit('/register')
    cy.register("HenkdeSteenVis","testtesttest")
    cy.get('[data-test=username]').type('HenkdeSteenVis');
    cy.get('[data-test=password]').type('ikbeneenwachtwoord');
    cy.get('[data-test=passwordConfirm]').type('ikbeneenwachtwoord');
    
    cy.contains('Een gebruiker met deze naam bestaat al!');
});

it('Should fail password to short', () => {
    cy.visit('/register')
    cy.get('[data-test=username]').type('pietervandendriessche');
    cy.get('[data-test=password]').type('ikbenc');
    cy.get('[data-test=passwordConfirm]').type('ikbenc');
    cy.contains('Wachtwoord is te kort');
});
it('Should fail password dont match', () => {
    cy.visit('/register')
    cy.get('[data-test=username]').type('pietervandendriessche');
    cy.get('[data-test=password]').type('isditeenlanggenoegwachtwoord');
    cy.get('[data-test=passwordConfirm]').type('needitkomtabsoluutnietovereenmetelkaar');
    cy.get('[data-test=submitBtn]').should('be.disabled')
});

it('Should fail username contains illegal character', () => {
    cy.visit('/register')
    cy.get('[data-test=username]').type('pietervandendriessche!!');
    cy.get('[data-test=password]').type('isditeenlanggenoegwachtwoord?');
    cy.get('[data-test=submitBtn]').should('be.disabled')
    cy.contains('Enkel letters en cijfers zijn toegestaan.');
});
  
});