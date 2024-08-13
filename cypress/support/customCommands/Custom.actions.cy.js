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
          // cy.wait(9000);
        }
        // cy.getMediaUrl(url);
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
          cy.wait(9000);
          // cy.getMediaUrl(url);
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
          // cy.wait(5000);
          // cy.getMediaUrl(url);
        }
      });
    }
  });
});

Cypress.Commands.add("getSpecialPage", () => {
  cy.readFile("cypress/pageCollection/ebn.json").then((data) => {
    const notFound = [];
    const wFile = "cypress/downloads/Special/pageNotFound.json";
    for (let i = 0; i < data.length; i++) {
      const page = data[i];
      const url = page.slice(30, -1);
      cy.request({
        url: `${page}`,
        failOnStatusCode: false,
      }).then((response) => {
        if (response.status !== 200) {
          notFound.push(page);
          cy.writeFile(wFile, notFound);
          cy.log(`${page} GIVES ${response.status}`);
        } else {
          cy.visit({
            url: `${page}`,
          });
          cy.getPageUrl(url);
        }
      });
    }
  });
});

Cypress.Commands.add("getMediaUrl", (url) => {
  var Unmasked = [];
  var Masked = [];
  var Blank = [];
  var Hrefs = [];
  var skip = [
    "https://bmjopengastro.bmj.com/pages/",
    "data:image/svg+xml;base64",
  ];
  const unmaskFile = `cypress/downloads/Journal/${url}_Unmasked.json`;
  const maskFile = `cypress/downloads/Journal/${url}_Masked.json`;
  const pageHrefs = `cypress/downloads/Journal/${url}_Hrefs.json`;
  cy.get("a").each(($ele) => {
    const docLinks = $ele.attr("href");
    if (
      docLinks?.indexOf("chicken") > -1 ||
      docLinks?.indexOf("stg") > -1 ||
      docLinks?.startsWith("https://bmjjournals-chicken.bmj.com") ||
      docLinks?.startsWith("https://stg-bmjjournals-chicken.bmj.com")
    ) {
      Unmasked.push(docLinks);
      cy.writeFile(unmaskFile, Unmasked);
    } else if (docLinks?.length < 3 || docLinks?.startsWith(skip[0])) {
      Blank.push(docLinks);
    } else if (
      docLinks?.endsWith(".pdf") ||
      docLinks?.endsWith(".doc") ||
      docLinks?.endsWith(".docx")
    ) {
      Masked.push(docLinks);
    } else {
      Hrefs.push(docLinks);
    }
  });
  cy.get("img").each(($ele) => {
    const imgLinks = $ele.attr("src");
    if (
      imgLinks?.indexOf("chicken") > -1 ||
      imgLinks?.indexOf("stg") > -1 ||
      imgLinks?.startsWith("https://bmjjournals-chicken.bmj.com") ||
      imgLinks?.startsWith("https://stg-bmjjournals-chicken.bmj.com")
    ) {
      Unmasked.push(imgLinks);
      cy.writeFile(unmaskFile, Unmasked);
    } else if (imgLinks?.length < 3 || imgLinks?.startsWith(skip[1])) {
      Blank.push(imgLinks);
    } else {
      Masked.push(imgLinks);
    }
  });

  // cy.writeFile(unmaskFile, Unmasked);
  // cy.writeFile(maskFile, Masked);
  // cy.writeFile(pageHrefs, Hrefs);
  // cy.getResponse(Hrefs);
});

Cypress.Commands.add("getResponse", (url) => {
  var today = new Date();
  var time =
    today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
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
      }
    });
  });
});

Cypress.Commands.add("getAllPage", () => {
  cy.fixture("pages").then((data) => {
    const links = [];
    const wFile = "cypress/downloads/links.json";
    cy.visit(data[0]);
    cy.get('[data-testid="top-menu-container"] a').each(($el)=>{
      const href = $el.attr("href")
      links.push(href)
      cy.writeFile(wFile, links)
    });
    

  });
});

Cypress.Commands.add("getPageUrl", (url) => {
  var Unmasked = [];
  const test = url.split(".");
          const testone = test[0].slice(8)
          const testtwo = test[2].slice(10)
          // cy.log(`test ${testone.toString()}`)
          // cy.log(`test ${testtwo.toString()}`)
  const unmaskFile = `cypress/downloads/Special/${testone}.json`;
  
  cy.get("a").each(($ele) => {
    const docLinks = $ele.attr("href");
    if (
      docLinks?.indexOf("chicken") > -1 ||
      docLinks?.indexOf("stg") > -1 ||
      docLinks?.startsWith("https://bmjjournals-chicken.bmj.com") ||
      docLinks?.startsWith("https://stg-bmjjournals-chicken.bmj.com")
    ) {
      Unmasked.push(`${testtwo} => ${docLinks}`);
      cy.writeFile(unmaskFile, Unmasked);
    } 
  });
  cy.get("img").each(($ele) => {
    const imgLinks = $ele.attr("src");
    if (
      imgLinks?.indexOf("chicken") > -1 ||
      imgLinks?.indexOf("stg") > -1 ||
      imgLinks?.startsWith("https://bmjjournals-chicken.bmj.com") ||
      imgLinks?.startsWith("https://stg-bmjjournals-chicken.bmj.com")
    ) {
      Unmasked.push(`${testtwo} => ${imgLinks}`);
      cy.writeFile(unmaskFile, Unmasked);
    } 
  });
  // cy.writeFile(unmaskFile, Unmasked);
});


Cypress.Commands.add("sitemap", () => {

it('should succesfully load each url in the sitemap', () => {
  urls.forEach(cy.visit)
})

});

Cypress.Commands.add("stagenext",()=>{
  
})
