const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");

// const cname = "genetics-and-genomics";

// Given("I visit browse by collections page", () => {
//   cy.visit(`http://localhost:4200/pages/collection/${cname}`);
// });

// Then("I get all the collections", () => {
//   var links = [];
//   const wFile = "cypress/downloads/openCollections.json";
//   cy.get("a").each(($ele) => {
//     const collectionName = $ele.attr("href");
//     if (collectionName?.startsWith("/pages/collection")||collectionName?.startsWith("/content") ) {
//       links.push($ele.attr("href"));
//     }
//     cy.writeFile(wFile, links);
//   });
// });

// Then("I check response of first page articles", () => {
//   const rFile = "cypress/downloads/openCollections.json";
//   cy.readFile(rFile).then((data) => {
//     //process data
//     cy.log(data.length);
//     for (let i = 0; i < data.length; i++) {
//       var link = [];
//       const artiFile = "cypress/downloads/articles.json";
//       const text = data[i];

//       if (text?.startsWith(`/pages/collection/${cname}/page`)) {
//         cy.visit({
//           url: `http://localhost:4200${text}`,
//         });
//         cy.get("a").each(($ele) => {
//           const articles = $ele.attr("href");
//           if (articles?.startsWith("/content")) {
//             link.push(articles);
//           }
//           cy.writeFile(artiFile, link);
//         });
//       } else if (text?.startsWith("/content")) {
//         cy.request({
//           url: `https://bmjopen.bmj.com${text}`,
//           failOnStatusCode: false,
//         }).then((response) => {
//           if (response.status !== 200) {
//             cy.log(`${text} GIVES ${response.status}`);
//           } else {
//           }
//         });
//       } else {
//       }
//     }
//   });
// });

// Then("I check response of remaining page articles", () => {
//   const rFile = "cypress/downloads/articles.json";
//   cy.readFile(rFile).then((data) => {
//     //process data
//     cy.log(data.length);
//     for (let i = 0; i < data.length; i++) {
//       const text = data[i];
//       if (text?.startsWith("/content")) {
//         cy.request({
//           url: `https://bmjopen.bmj.com${text}`,
//           failOnStatusCode: false,
//         }).then((response) => {
//           if (response.status !== 200) {
//             cy.log(`${text} GIVES ${response.status}`);
//           } else {
//           }
//         });
//       } else {
//       }
//     }
//   });
// });

Given("I visit browse by collections page", () => {
  cy.visit("https://bmjopen.bmj.com/pages/collection/dermatology/page/10");
});

Then("I get all the collections", () => {
  var links = [];
  var article =[];
  const wFile = "cypress/downloads/openCollections.json";
  const aFile = "cypress/downloads/withoutDate.json";
  cy.get("article").each(($ele) => {
    cy.wrap($ele)
      .find("p")
      .then(($p) => {
        const date = $p.text();
        if (date.length) {
          cy.wrap($ele)
            .find("a")
            .then(($a) => {
              const hrefs = $a.attr("href");
              links.push(hrefs);
              cy.writeFile(wFile, links);
            });
        } else {
          cy.wrap($ele)
            .find("a")
            .then(($el) => {
              const title = $el.text();
              article.push(title);
              cy.writeFile(aFile, article);
            });
        }
      });
  });
  // cy.get("a").each(($ele) => {
  //   const collectionName = $ele.attr("href");
  //   if (collectionName?.startsWith("/pages/collection")||collectionName?.startsWith("/content") ) {
  //     links.push(collectionName);
  //   }
  //   cy.writeFile(wFile, links);
  // });
});

Then("I check response of first page articles", () => {
  const rFile = "cypress/downloads/openCollections.json";
  cy.readFile(rFile).then((data) => {
    //process data
    cy.log(data.length);
    for (let i = 0; i < data.length; i++) {
      var link = [];
      const artiFile = "cypress/downloads/articles.json";
      const text = data[i];

      if (text?.startsWith(`/pages/collection/${cname}/page`)) {
        cy.visit({
          url: `http://localhost:4200${text}`,
        });
        cy.get("a").each(($ele) => {
          const articles = $ele.attr("href");
          if (articles?.startsWith("/content")) {
            link.push(articles);
          }
          cy.writeFile(artiFile, link);
        });
      } else if (text?.startsWith("/content")) {
        cy.request({
          url: `https://bmjopen.bmj.com${text}`,
          failOnStatusCode: false,
        }).then((response) => {
          if (response.status !== 200) {
            cy.log(`${text} GIVES ${response.status}`);
          } else {
          }
        });
      } else {
      }
    }
  });
});

Then("I check response of remaining page articles", () => {
  const rFile = "cypress/downloads/articles.json";
  cy.readFile(rFile).then((data) => {
    //process data
    cy.log(data.length);
    for (let i = 0; i < data.length; i++) {
      const text = data[i];
      if (text?.startsWith("/content")) {
        cy.request({
          url: `https://bmjopen.bmj.com${text}`,
          failOnStatusCode: false,
        }).then((response) => {
          if (response.status !== 200) {
            cy.log(`${text} GIVES ${response.status}`);
          } else {
          }
        });
      } else {
      }
    }
  });
});

// Given("I visit browse by collections page", () => {
//   var col = [];
//   const wFile = "cypress/downloads/collections.json";
//   cy.visit("http://localhost:4200/pages/browse-by-collection");
//   cy.get("a").each(($ele) => {
//     const collectionName = $ele.attr("href");
//     if (collectionName?.startsWith("/pages/collection")) {
//       col.push(collectionName);
//     }
//   });
//   cy.writeFile(wFile, col);
// });

// Then("I visit all the collections", () => {
//   const rFile = "cypress/downloads/collections.json";
//   cy.readFile(rFile).then((data) => {
//     for(let j = 0; j < data.length; j++){
//       const cname = data[j];
//       cy.visit({
//         url: `http://localhost:4200${cname}`,
//       });
//       var links = [];
//       const wFile = "cypress/downloads/openCollections.json";

//       cy.get("a").each(($ele) => {
//         links.push($ele.attr("href"));
//         cy.writeFile(wFile, links);
//       });
//     }

//   });
// });

// Then("I get the title", () => {
//   cy.wait(5000);
//   cy.title().should("contain", "Question Bank");
// });

// Given("I visit browse by collections page", () => {
//   cy.visit("https://bmjopen.bmj.com/pages/browse-by-collection");
// });

// Then("I get all the collections", () => {
//   var links = [];
//   const wFile = "cypress/downloads/openCollections.json";

//   cy.get("a").each(($ele) => {
//     const collectionName = $ele.attr("href");
//     if (collectionName?.startsWith("/pages/collection")) {
//       links.push(collectionName);
//     }
//   });
//   cy.writeFile(wFile, links);
// });

// Then("I check response of each collections", () => {
//   const rFile = "cypress/downloads/openCollections.json";
//   cy.readFile(rFile).then((data) => {
//     //process data
//     cy.log(data.length);
//     for (let i = 0; i < data.length; i++) {
//         var link = []
//         const artiFile = "cypress/downloads/articles.json";
//       const text = data[i];
//       cy.visit({
//         url: `https://bmjopen.bmj.com${text}`,
//       });
//       cy.get("a").each(($ele) => {
//         const articles = $ele.attr("href");
//         if (articles?.startsWith("/content")) {
//           link.push(articles);
//         }
//         cy.writeFile(artiFile, link);
//       });

//     //   cy.request({
//     //     url: `https://bmjopen.bmj.com${text}`,
//     //     failOnStatusCode: false,
//     //   });
//     }
//   })
// //   .then((response) => {
// //     cy.log(response.status);
// //   });
// });

// // Then("I get the title", () => {
// //   cy.wait(5000);
// //   cy.title().should("contain", "Question Bank");
// // });
