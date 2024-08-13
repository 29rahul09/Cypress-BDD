const { Given, When, Then,} = require("@badeball/cypress-cucumber-preprocessor");

Given("visit journals HomePage and check masking", () => {
  cy.getHomePage();
});

Then("visit journals AboutPage and check masking", () => {
  cy.getAboutPage();
});

Then("visit journals AuthorPage and check masking", () => {
  cy.getAuthorPage();
});

Then("visit journals EditorialBoardPage and check masking", () => {
  cy.getEditorialPage();
});

Then("visit journals ContactUsPage and check masking", () => {
  cy.getHelpPage();
});

Then("visit journals SubscribePage and check masking", () => {
  cy.getSubscribePage();
});

Then("visit journals SpecialPages and check masking", () => {
  cy.getSpecialPage();
});

