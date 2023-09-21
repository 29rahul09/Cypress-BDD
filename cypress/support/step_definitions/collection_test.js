const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");

Given("I visit the collection page", () => {
  cy.getCollectionPage();
});

Then("I get all the collections topic", () => {
  cy.getCollectionTopic();
});

Then("I visit the topics article pages", () => {
  cy.getTopicArticles();
});

Then("I check the response of articles", () => {
  cy.getArticleResponse();
});

Then("I check for the missing article data", () => {
  cy.getMissingData();
});
