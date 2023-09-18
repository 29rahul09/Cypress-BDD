const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");

Given("Visit and check Subscription media masking", () => {
  cy.fixture("journals").then((data) => {
    //process data
    cy.log(data.length);
    //visit each journal
    for (let i = 0; i < data.length; i++) {
      var subMasked = [];
      var subUnmasked = [];
      const unmaskFile = "cypress/downloads/Subscribe/unmasked.json";
      const maskFile = "cypress/downloads/Subscribe/masked.json";
      const page = data[i];
      cy.request({
        url: `${page}/pages/subscribe/`,
        failOnStatusCode: false,
      }).then((response) => {
        if (response.status !== 200) {
          cy.log(`${page} GIVES ${response.status}`);
        } else {
          cy.visit({
            url: `${page}/pages/subscribe/`,
          });

          cy.get("img").each(($ele) => {
            const imgLinks = $ele.attr("src");
            if (
              imgLinks?.startsWith("https://bmjjournals-chicken.bmj.com") ||
              imgLinks?.startsWith("https://stg-bmjjournals-chicken.bmj.com")
            ) {
              subUnmasked.push(`${page} => ${imgLinks}`);
            } else {
              subMasked.push(`${page} => ${imgLinks}`);
            }
          });

          cy.get("a").each(($ele) => {
            const docLinks = $ele.attr("href");
            if (
              docLinks?.startsWith("https://bmjjournals-chicken.bmj.com") ||
              docLinks?.startsWith("https://stg-bmjjournals-chicken.bmj.com")
            ) {
              subUnmasked.push(`${page} => ${docLinks}`);
            } else {
              subMasked.push(`${page} => ${docLinks}`);
            }
          });

          cy.writeFile(unmaskFile, subUnmasked);
          cy.writeFile(maskFile, subMasked);
        }
      });
    }
  });
});
