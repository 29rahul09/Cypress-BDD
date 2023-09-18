const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");

Given("Visit and check Homepage media masking", () => {
  cy.fixture("journals").then((data) => {
    //process data
    cy.log(data.length);
    //visit each journal
    for (let i = 0; i < data.length; i++) {
      var homeUnmasked = [];
      var homeMasked = [];
      const unmaskFile = "cypress/downloads/Homepage/unmasked.json";
      const maskFile = "cypress/downloads/Homepage/masked.json";
      const page = data[i];
      cy.request({
        url: `${page}`,
        failOnStatusCode: false,
      }).then((response) => {
        if (response.status !== 200) {
          cy.log(`${page} GIVES ${response.status}`);
        } else {
          cy.visit({
            url: `${page}`,
          });

          cy.get("img").each(($ele) => {
            const imgLinks = $ele.attr("src");
            if (
              imgLinks?.startsWith("https://bmjjournals-chicken.bmj.com") ||
              imgLinks?.startsWith("https://stg-bmjjournals-chicken.bmj.com")
            ) {
              homeUnmasked.push(imgLinks);
            } else {
              homeMasked.push(imgLinks);
            }
          });

          cy.get("a").each(($ele) => {
            const docLinks = $ele.attr("href");
            if (
              docLinks?.startsWith("https://bmjjournals-chicken.bmj.com") ||
              docLinks?.startsWith("https://stg-bmjjournals-chicken.bmj.com")
            ) {
              homeUnmasked.push(docLinks);
            } else {
              homeMasked.push(docLinks);
            }
          });

          cy.writeFile(unmaskFile, homeUnmasked);
          cy.writeFile(maskFile, homeMasked);
        }
      });
    }
  });
});
