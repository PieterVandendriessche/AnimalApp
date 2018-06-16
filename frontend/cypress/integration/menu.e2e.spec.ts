/// <reference types="Cypress" />
// Problem with typescript config in cypress, we need to define it once here
// see: https://github.com/cypress-io/cypress/issues/1065
declare namespace Cypress {
    interface Chainable {
        login(): void;
        logout(): void;
        resetDb(): void;
        addAnimal(animal: any, username: any): void;
        register(username, password): void;
        prepTest(): void;
    }
}



describe('menu', () => {
    beforeEach(() => {
        cy.prepTest();

        cy.logout();
    });

    it('Not logged in animal-list, should redirect to login page', () => {
        cy.visit("/")
        cy.get('[data-test=dierenBtn]').click();
        cy.url().should('include', 'login');
    });
    it('Not logged in store, should redirect to login page', () => {
        cy.visit("/")
        cy.get('[data-test=storeBtn]').click();
        cy.url().should('include', 'login');
    });
    it(' logged in animal-list, should redirect to animal-list', () => {
        cy.login();
        cy.visit("/notfoundpage")
        cy.get('[data-test=dierenBtn]').click();
        cy.url().should('include', 'animal-list');
    });
    it(' logged in store, should redirect to animal-list', () => {
        cy.login();
        cy.visit("/notfoundpage")
        cy.get('[data-test=storeBtn]').click();
        cy.url().should('include', 'animal-store');
    });
    it(' logged in, log out button , should redirect to loginpage', () => {
        cy.login();
        cy.visit("/notfoundpage")
        cy.get('[data-test=logoutBtnMenu]').click();
        cy.url().should('include', 'login');
    });
    it(' logged out, log in button , should redirect to loginpage', () => {

        cy.visit("/notfoundpage")
        cy.get('[data-test=loginBtnMenu]').click();
        cy.url().should('include', 'login');
    });





});