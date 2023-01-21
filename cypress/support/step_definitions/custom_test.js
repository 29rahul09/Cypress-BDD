const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given("visit login page", () => {
   cy.LaunchApp()
});

Then("enter valid username", () => {
    cy.InsertUsername()
});

Then("enter valid password", () => {
    cy.InsertPassword()
});

When("click on login button", () => {
    cy.ClickLogin()
});