const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");

const jName = "https://neurologyopen.bmj.com";

Given("Visit and check All Pages media masking", () => {
  cy.fixture("pages").then((data) => {
    //process data
    cy.log(data.length);
    //visit each journal
    for (let i = 0; i < data.length; i++) {
      var Unmasked = [];
      var Masked = [];
      const unmaskFile = "cypress/downloads/unmasked.json";
      const maskFile = "cypress/downloads/masked.json";
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
              Unmasked.push(`${page} => ${imgLinks}`);
            } else if (imgLinks?.startsWith("/")) {
              cy.request({
                url: `${jName}${imgLinks}`,
                failOnStatusCode: false,
              }).then((response) => {
                if (response.status !== 200) {
                  Masked.push(`${page} => ${imgLinks}`);
                }
              });
            } else {
              cy.request({
                url: `${imgLinks}`,
                failOnStatusCode: false,
              }).then((response) => {
                if (response.status !== 200) {
                  Masked.push(`${page} => ${imgLinks}`);
                }
              });
            }
          });

          cy.get("a").each(($ele) => {
            const docLinks = $ele.attr("href");
            if (
              docLinks?.startsWith("https://bmjjournals-chicken.bmj.com") ||
              docLinks?.startsWith("https://stg-bmjjournals-chicken.bmj.com")
            ) {
              Unmasked.push(`${page} => ${docLinks}`);
            } else if (docLinks?.startsWith("/")) {
              cy.request({
                url: `${jName}${docLinks}`,
                failOnStatusCode: false,
              }).then((response) => {
                if (response.status !== 200) {
                  Masked.push(`${page} => ${docLinks}`);
                }
              });
            }else{
              cy.request({
                url: `${docLinks}`,
                failOnStatusCode: false,
              }).then((response) => {
                if (response.status !== 200) {
                  Masked.push(`${page} => ${docLinks}`);
                }
              });
            }
          });

          cy.writeFile(unmaskFile, Unmasked);
          cy.writeFile(maskFile, Masked);
        }
      });
    }
  });
});
