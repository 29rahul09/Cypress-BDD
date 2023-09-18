const {
    Given,
    When,
    Then,
  } = require("@badeball/cypress-cucumber-preprocessor");
  
  Given("Visit and check Editorial Board Page media masking", () => {
    cy.fixture("journals").then((data) => {
      //process data
      cy.log(data.length);
      //visit each journal
      for (let i = 0; i < data.length; i++) {
        var Unmasked = [];
        var Masked = [];
        const unmaskFile = "cypress/downloads/Editorial/unmasked.json";
        const maskFile = "cypress/downloads/Editorial/masked.json";
        const page = data[i];
        cy.request({
          url: `${page}/pages/editorial-board`,
          failOnStatusCode: false,
        }).then((response) => {
          if (response.status !== 200) {
            cy.log(`${page} GIVES ${response.status}`);
          } else {
            cy.visit({
              url: `${page}/pages/editorial-board`,
            });
  
            cy.get("img").each(($ele) => {
              const imgLinks = $ele.attr("src");
              if (
                imgLinks?.startsWith("https://bmjjournals-chicken.bmj.com") ||
                imgLinks?.startsWith("https://stg-bmjjournals-chicken.bmj.com")
              ) {
                Unmasked.push(imgLinks);
              } else if (imgLinks?.startsWith("/")) {
                cy.request({
                  url: `${page}${imgLinks}`,
                  failOnStatusCode: false,
                }).then((response) => {
                  if (response.status !== 200) {
                    Masked.push(`${page}${imgLinks}`);
                  } else {
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
                Unmasked.push(docLinks);
              } else if (docLinks?.startsWith("/")) {
                cy.request({
                  url: `${page}${docLinks}`,
                  failOnStatusCode: false,
                }).then((response) => {
                  if (response.status !== 200) {
                    Masked.push(docLinks);
                  } else {
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
  