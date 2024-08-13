const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");

Given("journals stagenext sites", () => {
  let j = 0;
  let k = 1;
  cy.fixture("stagenext").then((data) => {
    var notFound = [];
    const wFile = "cypress/downloads/Special/stagenextpages.json";
    for (let i = j; i < j + k; i++) {


        
      const journal = data[i];
      // cy.log(JSON.stringify(page))
      cy.visit({
        url: `${journal}`,
        failOnStatusCode: false,
      });
      cy.get('[data-testid="page-contain-link"]');
    //   cy.get('[data-testid="link-number-0"] > li > .decoration-none').wait(1000).click();
      cy.get('[data-testid="link-number-1"] > li > .decoration-none').wait(1000).click();
    //   .then(($ele) => {
    //     if ($ele.find('[data-testid="link-number-0"]').text("Homepage")) {

    //     }
    //   });
    //   cy.writeFile(wFile, notFound);
    }
  });
});
