const { defineConfig } = require("cypress");
const fs = require('fs')
const webpack = require("@cypress/webpack-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");

async function setupNodeEvents(on, config) {
  screenshotOnRunFailure = true;
  require("cypress-mochawesome-reporter/plugin")(on); // for html reports
  // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    webpack({
      webpackOptions: {
        resolve: {
          extensions: [".ts", ".js"],
        },
        module: {
          rules: [
            {
              test: /\.feature$/,
              use: [
                {
                  loader: "@badeball/cypress-cucumber-preprocessor/webpack",
                  options: config,
                },
              ],
            },
          ],
        },
      },
    })
  );

  on('task', {
    countFiles(folderName) {
      return new Promise((resolve, reject) => {
        fs.readdir(folderName, (err, files) => {
          if (err) {
            return reject(err)
          }

          resolve(files)
        })
      })
    },
  })

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter", // for html reports
  e2e: {
    viewportWidth: 1100,
    viewportHeight: 1100,
    requestTimeout: 6000,
    pageLoadTimeout:90000,
    defaultCommandTimeout: 6000,
    retries: 0,
    watchForFileChanges: true,
    chromeWebSecurity: false,
    specPattern: "**/*.feature",
    setupNodeEvents,
  },
});
