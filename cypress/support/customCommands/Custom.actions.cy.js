Cypress.Commands.add("getHomePage", () => {
  cy.fixture("journals").then((data) => {
    for (let i = 0; i < data.length; i++) {
      const journal = data[i];
      const page = journal.slice(8, -7);
      const url = page.replace(".", "/Homepage");
      cy.request({
        url: `${journal}`,
        failOnStatusCode: false,
      }).then((response) => {
        if (response.status !== 200) {
          cy.log(`${journal} GIVES ${response.status}`);
        } else {
          cy.visit({
            url: `${journal}`,
          });
        }
        cy.getMediaUrl(url);
      });
      
    }
  });
});

Cypress.Commands.add("getAboutPage", () => {
  cy.fixture("journals").then((data) => {
    for (let i = 0; i < data.length; i++) {
      const journal = data[i];
      const page = journal.slice(8, -7);
      const url = page.replace(".", "/About");
      cy.request({
        url: `${journal}/pages/about/`,
        failOnStatusCode: false,
      }).then((response) => {
        if (response.status !== 200) {
          cy.log(`${journal} GIVES ${response.status}`);
        } else {
          cy.visit({
            url: `${journal}/pages/about/`,
          });
          cy.getMediaUrl(url);
        }
      });
      
    }
  });
});

Cypress.Commands.add("getAuthorPage", () => {
  cy.fixture("journals").then((data) => {
    for (let i = 0; i < data.length; i++) {
      const journal = data[i];
      const page = journal.slice(8, -7);
      const url = page.replace(".", "/Author");
      cy.request({
        url: `${journal}/pages/authors/`,
        failOnStatusCode: false,
      }).then((response) => {
        if (response.status !== 200) {
          cy.log(`${journal} GIVES ${response.status}`);
        } else {
          cy.visit({
            url: `${journal}/pages/authors/`,
          });
          cy.getMediaUrl(url);
        }
      });
     
    }
  });
});

Cypress.Commands.add("getEditorialPage", () => {
  cy.fixture("journals").then((data) => {
    for (let i = 0; i < data.length; i++) {
      const journal = data[i];
      const page = journal.slice(8, -7);
      const url = page.replace(".", "/Editorial");
      cy.request({
        url: `${journal}/pages/editorial-board/`,
        failOnStatusCode: false,
      }).then((response) => {
        if (response.status !== 200) {
          cy.log(`${journal} GIVES ${response.status}`);
        } else {
          cy.visit({
            url: `${journal}/pages/editorial-board/`,
          });
          cy.getMediaUrl(url);
        }
      });
     
    }
  });
});

Cypress.Commands.add("getHelpPage", () => {
  cy.fixture("journals").then((data) => {
    for (let i = 0; i < data.length; i++) {
      const journal = data[i];
      const page = journal.slice(8, -7);
      const url = page.replace(".", "/Help");
      cy.request({
        url: `${journal}/pages/contact-us/`,
        failOnStatusCode: false,
      }).then((response) => {
        if (response.status !== 200) {
          cy.log(`${journal} GIVES ${response.status}`);
        } else {
          cy.visit({
            url: `${journal}/pages/contact-us/`,
          });
          cy.getMediaUrl(url);
        }

      });
      
    }
  });
});

Cypress.Commands.add("getSubscribePage", () => {
  cy.fixture("journals").then((data) => {
    for (let i = 0; i < data.length; i++) {
      const journal = data[i];
      const page = journal.slice(8, -7);
      const url = page.replace(".", "/Subscribe");
      cy.request({
        url: `${journal}/pages/subscribe`,
        failOnStatusCode: false,
      }).then((response) => {
        if (response.status !== 200) {
          cy.log(`${journal} GIVES ${response.status}`);
        } else {
          cy.visit({
            url: `${journal}/pages/subscribe`,
          });
          cy.getMediaUrl(url);
        }
       
      });
     
    }
  });
});

Cypress.Commands.add("getSpecialPage", () => {
  cy.fixture("pages").then((data) => {
    const notFound = []
    const wFile = "cypress/downloads/pageNotFound.json";
    for (let i = 0; i < data.length; i++) {
      const page = data[i];
      const url = page.slice(30, -1);
      cy.request({
        url: `${page}`,
        failOnStatusCode: false,
      }).then((response) => {
        if (response.status !== 200) {
            notFound.push(page)
            cy.writeFile(wFile, notFound);
          cy.log(`${page} GIVES ${response.status}`);
        } else {
          cy.visit({
            url: `${page}`,
          });
          cy.getMediaUrl(url);
        }
      });
    
    }
  });
});

Cypress.Commands.add("getMediaUrl", (url) => {
  var Unmasked = [];
  var Masked = [];
  var Blank = [];
  const unmaskFile = `cypress/downloads/Journal/${url}/Unmasked.json`;
  const maskFile = `cypress/downloads/Journal/${url}/Masked.json`;
  cy.get("a").each(($ele) => {
    const docLinks = $ele.attr("href");
    if (
      docLinks?.indexOf("chiken") > -1 ||
      docLinks?.indexOf("stg") > -1 ||
      docLinks?.startsWith("https://bmjjournals-chicken.bmj.com") ||
      docLinks?.startsWith("https://stg-bmjjournals-chicken.bmj.com")
    ) {
      Unmasked.push(docLinks);
    } else if (docLinks?.length < 3 || docLinks?.startsWith("https://www.prisma-statement.org/")) {
      Blank.push(docLinks);
    } else {
      Masked.push(docLinks);
    }
  });
  cy.get("img").each(($ele) => {
    const imgLinks = $ele.attr("src");
    if (
      imgLinks?.indexOf("chiken") > -1 ||
      imgLinks?.indexOf("stg") > -1 ||
      imgLinks?.startsWith("https://bmjjournals-chicken.bmj.com") ||
      imgLinks?.startsWith("https://stg-bmjjournals-chicken.bmj.com")
    ) {
      Unmasked.push(imgLinks);
    } else if (imgLinks?.length < 3 || imgLinks?.startsWith("https://www.prisma-statement.org/")) {
      Blank.push(imgLinks);
    } else {
      Masked.push(imgLinks);
    }
  });
  cy.writeFile(unmaskFile, Unmasked);
  cy.writeFile(maskFile, Masked);
//   cy.getResponse(Masked);
});

Cypress.Commands.add("getResponse", (url) => {
  var today = new Date();
  var time = today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
  const wFile = `cypress/downloads/Response/At+${time.toString()}.json`;
  const links = [];
  url.forEach((element) => {
    cy.request({
      url: `${element}`,
      failOnStatusCode: false,
    }).then((response) => {
      if (response.status !== 200) {
        links.push(element);
        cy.writeFile(wFile, links);
        cy.log(`${element} GIVES ${response.status}`);
      }
    });
  });
});
