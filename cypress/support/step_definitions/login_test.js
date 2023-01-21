const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given("I visit login page", () => {
    cy.visit('https://opensource-demo.orangehrmlive.com/')
});

Then("I enter valid username", () => {
    cy.get("input[placeholder='Username']").type('Admin')
});

Then("I enter valid password", () => {
    cy.get("input[placeholder='Password']").type('admin123')
});

When("I click on login button", () => {
    cy.get("button[type='submit']").click()
});

Then("I visit Homepage", () => {
    cy.title().should('include', 'Orange')
});

Then("I check profile", () => {
    let expName = 'Paul Collins'
    cy.get(".oxd-userdropdown-name").then((e) => {
        let actName = e.text()
        // BDD assertion
        expect(actName).to.equal(expName)
        //TDD assertion
        // assert.notEqual(actName,expName)
    })
});
