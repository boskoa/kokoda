const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: `http://localhost:${process.env.CYPRESS_PORT ?? 5173}`,
  },
  screenshotOnRunFailure: false,
  video: false,
  env: {
    BACKEND: `http://localhost:${process.env.CYPRESS_PORT ?? 443}/api`,
  }
});
