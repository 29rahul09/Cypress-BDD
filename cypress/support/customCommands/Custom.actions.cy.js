const journal = "https://gut.bmj.com";

Cypress.Commands.add("getCollectionPage", () => {
  cy.visit(`${journal}/pages/browse-by-collection`);
});

Cypress.Commands.add("getCollectionTopic", () => {
  let links = [];
  const wFile = "cypress/fixtures/collections.json";
  cy.get('[data-testid="topic-page"] > ul > li').each(($el) => {
    const href = $el.find("a").attr("href");
    links.push(href);
    cy.writeFile(wFile, links);
  });
});

Cypress.Commands.add("getTopicArticles", () => {
  cy.fixture("collections").then((topic) => {
    for (let i = 0; i < topic.length; i++) {
      cy.visit({
        url: `${journal}${topic[i]}`,
      });
      cy.getPageCount(topic[i]);
    }
  });
});

Cypress.Commands.add("getPageCount", (topic) => {
  cy.getArticleDetails(topic);
  cy.get('[data-testid="pagination"] > a').each(($ele) => {
    const next = $ele.text();
    const page = $ele.attr("href");
    const url = `${journal}${page}`;
    if (next != "Next") {
      cy.visit(url);
      cy.getArticleDetails(url.replace(`${journal}`, ""));
    }
  });
});

Cypress.Commands.add("getArticleDetails", (topic) => {
  let details = [];
  const wFile = `cypress/downloads/${topic}.json`;
  cy.get("article").each(($ele) => {
    const title = $ele.find("a").text();
    const author = $ele.find("div").text();
    const date = $ele.find("p").text();
    const href = $ele.find("a").attr("href");
    details.push({ title, author, date, href });
  });
  cy.writeFile(wFile, details);
});

Cypress.Commands.add("getArticleResponse", () => {
    cy.fixture("collections").then((topic) => {
      for (let i = 0; i < topic.length; i++) {
        cy.visit({
          url: `${journal}${topic[i]}`,
        });
        cy.getHrefs(topic[i]);
      }
    });
  });
  
  Cypress.Commands.add("getHrefs", (topic) => {
    cy.getResponse(topic);
    cy.get('[data-testid="pagination"] > a').each(($ele) => {
      const next = $ele.text();
      const page = $ele.attr("href");
      const url = `${journal}${page}`;
      if (next != "Next") {
        cy.visit(url);
        cy.getResponse(url.replace(`${journal}`, ""));
      }
    });
  });

Cypress.Commands.add("getResponse", (topic) => {
  const links = [];
  const wFile = `cypress/downloads/Response/${topic}.json`;
  cy.get("article")
    .find("a")
    .each(($a) => {
      const href = $a.attr("href");
      cy.request({
        url: `${href}`,
        failOnStatusCode: false,
      }).then((response) => {
        if (response.status !== 200) {
          links.push(href);
          cy.writeFile(wFile, links);
          cy.log(`${href} GIVES ${response.status}`);
        }
      });
    });
});

Cypress.Commands.add("getMissingData", () => {
    cy.fixture("collections").then((topic) => {
      for (let i = 0; i < topic.length; i++) {
        cy.visit({
          url: `${journal}${topic[i]}`,
        });
        cy.getPageData(topic[i]);
      }
    });
  });
  
  Cypress.Commands.add("getPageData", (topic) => {
    cy.getArticleData(topic);
    cy.get('[data-testid="pagination"] > a').each(($ele) => {
      const next = $ele.text();
      const page = $ele.attr("href");
      const url = `${journal}${page}`;
      if (next != "Next") {
        cy.visit(url);
        cy.getArticleData(url.replace(`${journal}`, ""));
      }
    });
  });
Cypress.Commands.add("getArticleData", (topic) => {
    let details = [];
    const wFile = `cypress/downloads/Missed/${topic}.json`;
    cy.get("article").each(($ele) => {
      const title = $ele.find("a").text();
      const author = $ele.find("div").text();
      const date = $ele.find("p").text();
      if (!title.length || !author.length || !date.length) {
        details.push({ title, author, date });
      }
    });
    cy.writeFile(wFile, details);
  });
