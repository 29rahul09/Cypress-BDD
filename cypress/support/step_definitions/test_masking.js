const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");

Given("visit journals Homepage and check masking", () => {
  cy.getHomePage();
});

Then("visit journals Aboutpage and check masking", () => {
  cy.getAboutPage();
});

Then("visit journals Authorpage and check masking", () => {
  cy.getAuthorPage();
});

Then("visit journals EditorialBoardpage and check masking", () => {
  cy.getEditorialPage();
});

Then("visit journals ContactUspage and check masking", () => {
  cy.getHelpPage();
});

Then("visit journals Subscribepage and check masking", () => {
  cy.getSubscribePage();
});

Then("visit journals Specialpages and check masking", () => {
  cy.getSpecialPage();
});

