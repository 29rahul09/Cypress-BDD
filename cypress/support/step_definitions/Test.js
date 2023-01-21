const { Given,When, Then } = require("@badeball/cypress-cucumber-preprocessor");

Given("I visit google.com", () => {
  cy.visit('https://www.google.com')
});

Then("I search for doubtnut.com", () => {
  cy.get('.gLFyf').type('doubtnut.com{enter}')
});

Then("I select videos", () => {
  cy.contains('Videos').click()
});

When("I click on Questionbank", () => {
  cy.contains('Question Bank').click()
});

Then("I get the title", () => {
  cy.wait(5000)
  cy.title().should('be.empty')
});

