const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");

Given("journals sitemap list", () => {
  let j = 0;
  let k = 2;
  cy.fixture("sitemap").then((data) => {
    var notFound = [];
    const wFile = "cypress/downloads/Special/pageNotFound.json";
    for (let i = j; i < j + k; i++) {
      const journal = data[i];
      // const page = journal.slice(8, -25);
      // cy.log(JSON.stringify(page))
      // const url = page.replace(".", "/Sitemap");
      // cy.log(JSON.stringify(url))
      cy.request({
        url: journal,
        failOnStatusCode: false,
      }).then((response) => {
        if (response.status == 200) {
          const xml = Cypress.$.parseXML(response.body);
          const urls = xml.getElementsByTagName("url");
          Cypress.$(urls).each(function () {
            const link = Cypress.$(this).find("loc").text();
            cy.log(JSON.stringify(link));
            if (
              link?.startsWith("https://egastro.bmj.com/pages/call-for-papers")
            ) {
              cy.log(`${link} GIVES 404`);
            } else {
              cy.request({
                url: link,
                failOnStatusCode: false,
              }).then((response) => {
                if (response.status !== 200) {
                  notFound.push(link);
                  cy.log(`${link} GIVES ${response.status}`);
                } else {
                  cy.visit({
                    url: link,
                    failOnStatusCode: false,
                  });
                  cy.getPageUrl(link);
                }
              });
            }
          });
        }
      });
      cy.writeFile(wFile, notFound);
    }
  });
});
