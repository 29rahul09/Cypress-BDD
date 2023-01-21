Cypress.Commands.add('LaunchApp',()=>{
    cy.visit('https://opensource-demo.orangehrmlive.com/')
});

Cypress.Commands.add('InsertUsername',()=>{
   cy.fixture("elements").then((el)=>{
    cy.get(el.userField).should('exist').type(el.Username)
   })
});

Cypress.Commands.add('InsertPassword',()=>{
    cy.fixture("elements").then((el)=>{
        cy.get(el.passwordField).should('exist').type(el.Password)
       })
});

Cypress.Commands.add('ClickLogin',()=>{
    cy.fixture("elements").then((el)=>{
        cy.get(el.loginButton).should('exist').click()
       })
});

// Cypress.Commands.add('VarifyProduct',()=>{
//     cy.title().should('include', 'Orange')
// });