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

describe('add-animal', () => {
    beforeEach(() => {
        cy.prepTest();
        cy.logout();
        cy.login();
    });

   it('New animal should be a beaver. shoudl redirect', () => {
       cy.visit('/animal-store')
       cy.get('[data-test=addAnimalBtn]').click();
       cy.get('[data-test=animalName]').type("HalloNieuweVriend")
       cy.get('[data-test=soortSelect]').select("Bever");
       cy.get('[data-test=btnSubmit]').click();
       cy.url().should('include', 'animal-list');
       cy.contains('0 jaar');
   });

   it('Animal creation, should fail, name too short', () => {
    cy.visit('/animal-store')
    cy.get('[data-test=addAnimalBtn]').click();
    cy.get('[data-test=animalName]').type("hi")
    cy.get('[data-test=soortSelect]').select("Bever");
    cy.get('[data-test=btnSubmit]').click();
    cy.contains('3 karakters');
});
it('new animal, fails, no name', () => {
    cy.visit('/animal-store')
    cy.get('[data-test=addAnimalBtn]').click();
    cy.get('[data-test=soortSelect]').select("Bever");
    cy.get('[data-test=btnSubmit]').click();
    cy.contains('3 karakters');
});

it('new animal, second one should fail, not enough money', () => {
    cy.visit('/animal-store')
    cy.get('[data-test=addAnimalBtn]').click();
    cy.get('[data-test=animalName]').type("Deze lukt wel!")
    cy.get('[data-test=soortSelect]').select("Bever");
    cy.get('[data-test=btnSubmit]').click();
    cy.visit('/animal-store')
    cy.get('[data-test=addAnimalBtn]').click();
    cy.get('[data-test=animalName]').type("Deze lukt wel!")
    cy.get('[data-test=soortSelect]').select("Bever");
    cy.get('[data-test=btnSubmit]').click();
    cy.contains('Te weinig geld');
});

it('new animal, succeeds to give animal food', () => {
    cy.visit('/animal-store')
    cy.get('[data-test=addAnimalBtn]').click();
    cy.get('[data-test=animalName]').type("Deze lukt wel!")
    cy.get('[data-test=soortSelect]').select("Bever");
    cy.get('[data-test=btnSubmit]').click();
    cy.get('[data-test=addFoodBtn]').click();
    cy.get('[data-test=addFoodBtn]').click();
    cy.get('[data-test=addFoodBtn]').click();
    cy.contains('0 jaar');
});

it('new animal, giving all our food succeeds', () => {
    cy.visit('/animal-store')
    cy.get('[data-test=addAnimalBtn]').click();
    cy.get('[data-test=animalName]').type("Deze lukt wel!")
    cy.get('[data-test=soortSelect]').select("Bever");
    cy.get('[data-test=btnSubmit]').click();
  
    for(let i=0; i<10; i++){
        cy.get('[data-test=addFoodBtn]').click();
        cy.contains(15+(i+1));
    }
    cy.contains('Voedsel: 0');
});

it('new animal, giving all our food with one extra fails', () => {
    cy.visit('/animal-store')
    cy.get('[data-test=addAnimalBtn]').click();
    cy.get('[data-test=animalName]').type("Deze lukt wel!")
    cy.get('[data-test=soortSelect]').select("Bever");
    cy.get('[data-test=btnSubmit]').click();
  
    for(let i=0; i<10; i++){
        cy.get('[data-test=addFoodBtn]').click();
        cy.contains(15+(i+1));
    }
    cy.get('[data-test=addFoodBtn]').click();
    cy.contains('25%');
    cy.contains('Voedsel: 0');
});





  
});

