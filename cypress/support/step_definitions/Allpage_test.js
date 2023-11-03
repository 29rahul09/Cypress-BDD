const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");

Given("journal pages list", () => {
  cy.task("countFiles", "cypress/pageCollection").then((data) => {
    var notFound = [];
    const wFile = "cypress/downloads/Special/pageNotFound.json";
    for (let i = 0; i < data.length; i++) {
      const files = data[i];
      cy.readFile(`cypress/pageCollection/${files}`).then((pages) => {
        for (let i = 0; i < pages.length; i++) {
          const page = pages[i];
          cy.request({
            url: `${page}`,
            failOnStatusCode: false,
          }).then((response) => {
            if (response.status !== 200) {
              notFound.push(page);
              cy.log(`${page} GIVES ${response.status}`);
            } else {
              cy.visit({
                url: `${page}`,
              });
              cy.getPageUrl(page);
            }
          });
        }
        cy.writeFile(wFile, notFound);
      });
    }
  });
});
