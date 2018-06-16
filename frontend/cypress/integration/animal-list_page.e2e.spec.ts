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

const animal1 = [{
    name: 'Henk',
    male: true,
    birthdate: new Date(),
    food: '80',
    pleasure: '20',
    soort: 'EEND',
    drink: '100',
    lastFoodUpdate: new Date(),
    lastPleasureUpdate: new Date(),
    lastDrinkUpdate: new Date(),
    alive: true
}]

describe('animal-list', () => {
    beforeEach(() => {
        cy.prepTest();
        
        cy.logout();
        cy.login();
    });

   it('New user, no animals message should be shown', () => {
       cy.visit('/animal-list')
       cy.contains('Helaas! Je hebt nog geen dieren.');
      
   });

   it('New user, animal added should me dead', () => {
    cy.register("HenkdeSteenVis","testtesttest")
    cy.addAnimal(animal1,"HenkdeSteenVis");
    cy.visit('/animal-list')
    cy.contains("Gestorven")
 });
 it('Animal in list deleted', () => {
    cy.register("HenkdeSteenVis","testtesttest")
    cy.addAnimal(animal1,"HenkdeSteenVis");
    cy.visit('/animal-list')
    cy.get('[data-test=detailBtn]').click();
    cy.get('[data-test=deleteBtn]').click();
    cy.contains('Helaas! Je hebt nog geen dieren.');
 });


  
});