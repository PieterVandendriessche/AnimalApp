/// <reference types="Cypress" />
// Problem with typescript config in cypress, we need to define it once here
// see: https://github.com/cypress-io/cypress/issues/1065
declare namespace Cypress {
    interface Chainable {
        login(): void;
        logout(): void;
        resetDb(): void;
        addAnimal(animal:any, username:any):void;
        register(username, password): void;
        prepTest(): void;
    }
}


describe('add-food', () => {
    beforeEach(() => {
        cy.prepTest();
        cy.logout();
        cy.login();
    });

   it('New user, money enough buy cocktail succeeds', () => {
        cy.visit('/animal-store')
        cy.get('[data-test=addFood]').click();
        cy.get('[data-test=cocktailBtn]').click();
       cy.contains('Gelukt!');
       cy.contains("Drinken: 35")
      
   });
   
   it('New user, not enough to buy 3 cocktail fails', () => {
    cy.visit('/animal-store')
    cy.get('[data-test=addFood]').click();
    cy.get('[data-test=cocktailBtn]').click();
   cy.contains('Gelukt!');
   cy.contains("Drinken: 35")
   cy.get('[data-test=cocktailBtn]').click();
   cy.contains("Drinken: 60")
   cy.contains('Gelukt!');
   cy.get('[data-test=cocktailBtn]').click();
   cy.contains("Te weinig geld")
  
});

  
  
});