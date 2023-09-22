const { defineConfig } = require("cypress");
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

  // Make sure to return the config object as it might have been modified by the plugin.
  return config;
}

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter", // for html reports
  e2e: {
    viewportWidth: 1100,
    viewportHeight: 1100,
    requestTimeout: 3000,
    defaultCommandTimeout: 6000,
    retries: 1,
    watchForFileChanges: false,
    chromeWebSecurity: false,
    specPattern: "**/*.feature",
    setupNodeEvents,
  },
});
