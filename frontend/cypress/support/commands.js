Cypress.Commands.add('prepTest', () => {
    cy.login();
    cy.resetDb();
    cy.logout();
});

Cypress.Commands.add('login', () => {
    // small trick to avoid index problems on username in mongo
    const username = 'admin' + new Date().getTime();
    cy.register('admin' + new Date().getTime(), 'testtesttest');

    cy.request({
        method: 'POST',
        url: 'http://localhost:4200/API/users/login',
        body: {username, password: 'testtesttest'},
    }).then(res => localStorage.setItem('currentUser', res.body.token));
});

Cypress.Commands.add('register', (username, password) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4200/API/users/register',
        body: {username, password},
    }).then(res => localStorage.setItem('currentUser', res.body.token));
});

Cypress.Commands.add('logout', () => {
    localStorage.removeItem('currentUser');
});


Cypress.Commands.add('addAnimal', (animal,username) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4200/API/animals/add/' + username,
        body: animal,
        headers: {'Authorization': `Bearer ${localStorage.getItem('currentUser')}`}
    });
});

Cypress.Commands.add('resetDb', () => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:4200/API/reset_db',
        headers: {'Authorization': `Bearer ${localStorage.getItem('currentUser')}`}
    });
});