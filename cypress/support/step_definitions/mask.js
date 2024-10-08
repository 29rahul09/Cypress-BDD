const {
  Given,
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");

// Given("I visit journal page files", () => {
//   cy.fixture("pages").then((data) => {
//     for (let i = 0; i < data.length; i++) {
//       var unMasked = [];
//       var maskMedia = [];
//       const unmaskFile = "cypress/downloads/unmasked.json";
//       const maskFile = "cypress/downloads/masked.json";
//       const page = data[i];

//       cy.visit({
//         url: `${page}`,
//       });
//       cy.get("img").each(($ele) => {
//         const imgLinks = $ele.attr("src");
//         if (
//           imgLinks?.startsWith("https://bmjjournals-chicken.bmj.com") ||
//           imgLinks?.startsWith("https://stg-bmjjournals-chicken.bmj.com")
//         ) {
//           unMasked.push(imgLinks);
//         } else {
//           maskMedia.push(imgLinks);
//         }
//       });

//       cy.get("a").each(($ele) => {
//         const docLinks = $ele.attr("href");
//         if (
//           docLinks?.startsWith("https://bmjjournals-chicken.bmj.com") ||
//           docLinks?.startsWith("https://stg-bmjjournals-chicken.bmj.com")
//         ) {
//           unMasked.push(docLinks);
//         } else {
//           maskMedia.push(docLinks);
//         }
//       });

//       cy.writeFile(unmaskFile, unMasked);
//       cy.writeFile(maskFile, maskMedia);
//     }
//   });
// });

Given("Visit and check Homepage", () => {
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
          // cy.writeFile(maskFile, homeMasked);
        }
      });
    }
  });
});

Given("Visit and check subscribe page", () => {
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
        url: `${page}pages/subscribe/`,
        failOnStatusCode: false,
      }).then((response) => {
        if (response.status !== 200) {
          cy.log(`${page} GIVES ${response.status}`);
        } else {
          cy.visit({
            url: `${page}pages/subscribe/`,
          });

          cy.get("img").each(($ele) => {
            const imgLinks = $ele.attr("src");
            if (
              imgLinks?.startsWith("https://bmjjournals-chicken.bmj.com") ||
              imgLinks?.startsWith("https://stg-bmjjournals-chicken.bmj.com")
            ) {
              subUnmasked.push(imgLinks);
            } else {
              subMasked.push(imgLinks);
            }
          });

          cy.get("a").each(($ele) => {
            const docLinks = $ele.attr("href");
            if (
              docLinks?.startsWith("https://bmjjournals-chicken.bmj.com") ||
              docLinks?.startsWith("https://stg-bmjjournals-chicken.bmj.com")
            ) {
              subUnmasked.push(docLinks);
            } else {
              subMasked.push(docLinks);
            }
          });

          cy.writeFile(unmaskFile, subUnmasked);
          // cy.writeFile(maskFile, subMasked);
        }
      });
    }
  });
});

// Given("I visit editorial-board page", () => {
//   cy.fixture("pages").then((page)=>{
//     for (let i = 0; i < page.length; i++){
//       cy.log(page.length)
//       cy.visit(page[i])
//     }

//    })
//   // cy.visit("https://gh.bmj.com/pages/editorial-board/");
// });

// Then("I get all the media", () => {
//   var links = [];
//   const unmaskFile = "cypress/downloads/mediaTsaco.json";
//   cy.get("img").each(($ele) => {
//     links.push($ele.attr("src"));
//   });

//   cy.get("a").each(($ele) => {
//     links.push($ele.attr("href"));
//   });

//   cy.writeFile(unmaskFile, links);
// });

// Then("I get all the media files with img tag on the page", () => {
//   var links = [];
//   const unmaskFile = "cypress/downloads/imgTsaco.json";
//   cy.get("img").each(($ele) => {
//     links.push($ele.attr("src"));
//     cy.writeFile(unmaskFile, links);
//   });
// });

// Then("I get all the media files with anchor tag on the page", () => {
//   var links = [];
//   const unmaskFile = "cypress/downloads/pdfTsaco.json";
//   cy.get("a").each(($ele) => {
//     links.push($ele.attr("href"));
//     cy.writeFile(unmaskFile, links);
//   });
// });

// Then("I check masking of media files", () => {
//   const rFile = "cypress/downloads/mediaTsaco.json";
//   cy.readFile(rFile)
//     .then((data) => {
//       //process data
//       cy.log(data.length);
//       for (let i = 0; i < data.length; i++) {
//         const text = data[i];
//          if (text?.startsWith("https://bmjjournals-chicken.bmj.com")) {
//           cy.request({
//             url: `${text}`,
//             failOnStatusCode: false,
//           });
//           cy.log('UNMASKED URL')
//         } else if(text?.startsWith("https://stg-bmjjournals-chicken.bmj.com")) {
//           cy.request({
//             url: `${text}`,
//             failOnStatusCode: false,
//           });
//           cy.log('STAGING URL')
//         }else{

//         }
//       }
//     })
//     // .then((response) => {
//     //   cy.log(response.status);
//     // });
// });

// Then("I get the title", () => {
//   cy.wait(5000);
//   cy.title().should("contain", "Question Bank");
// });
